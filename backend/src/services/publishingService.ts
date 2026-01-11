import fs from 'fs/promises';
import path from 'path';
import { getPageStructure } from '../models/pageModel';
import { getSiteById } from '../models/siteModel';
import { query } from '../db';

const PUBLISH_DIR = process.env.PUBLISH_DIR || './published_sites';

interface PublishOptions {
  siteId: string;
  userId: string;
}

export const publishSite = async ({ siteId, userId }: PublishOptions) => {
  const site = await getSiteById(siteId);

  if (!site || site.user_id !== userId) {
    throw new Error('Site not found or unauthorized');
  }

  const pageStructure = await getPageStructure(siteId);

  if (!pageStructure) {
    throw new Error('Page structure not found');
  }

  const html = generateHTML(site, pageStructure);
  const css = generateCSS(pageStructure);
  const js = generateJS(pageStructure);

  const siteDir = path.join(PUBLISH_DIR, site.slug);
  await fs.mkdir(siteDir, { recursive: true });

  await fs.writeFile(path.join(siteDir, 'index.html'), html);
  await fs.writeFile(path.join(siteDir, 'styles.css'), css);
  await fs.writeFile(path.join(siteDir, 'script.js'), js);

  await query('UPDATE sites SET status = $1 WHERE id = $2', ['published', siteId]);

  const domainResult = await query(
    `INSERT INTO domains (site_id, type, value, publish_status, last_published_at)
     VALUES ($1, $2, $3, $4, NOW())
     ON CONFLICT (site_id, type)
     DO UPDATE SET publish_status = $4, last_published_at = NOW()
     RETURNING *`,
    [siteId, 'subdomain', `${site.slug}.${process.env.SUBDOMAIN_BASE}`, 'published']
  );

  return {
    success: true,
    url: `https://${domainResult.rows[0].value}`,
    publishedAt: new Date(),
  };
};

function generateHTML(site: any, pageStructure: any): string {
  const settings = site.settings;
  const { background_config, sections } = pageStructure;

  const backgroundStyle = generateBackgroundStyle(background_config);

  const sectionsHTML = sections
    .map((section: any) => {
      const sectionBg = section.background_override
        ? generateBackgroundStyle(section.background_override)
        : '';

      const elementsHTML = section.elements
        .map((element: any) => generateElementHTML(element))
        .join('\n');

      const paddingStyle = `padding: ${section.padding.top} ${section.padding.right} ${section.padding.bottom} ${section.padding.left};`;

      return `
    <section class="section section-${section.layout}" style="${sectionBg}${paddingStyle}">
      <div class="section-content">
        ${elementsHTML}
      </div>
    </section>`;
    })
    .join('\n');

  const metaTags = (settings.meta_tags || []).map((tag: string) => `  ${tag}`).join('\n');

  const faviconTag = settings.favicon_url
    ? `  <link rel="icon" type="image/png" href="${settings.favicon_url}">`
    : '';

  const analyticsScript = settings.analytics_id
    ? `
  <script async src="https://www.googletagmanager.com/gtag/js?id=${settings.analytics_id}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${settings.analytics_id}');
  </script>`
    : '';

  const ogTags = `
  <meta property="og:title" content="${settings.title || site.name}">
  <meta property="og:description" content="${settings.description || ''}">
  ${settings.social_preview_image ? `<meta property="og:image" content="${settings.social_preview_image}">` : ''}
  <meta property="og:type" content="website">`;

  return `<!DOCTYPE html>
<html lang="${settings.language || 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${settings.title || site.name}</title>
  <meta name="description" content="${settings.description || ''}">
${metaTags}
${ogTags}
${faviconTag}
  <link rel="stylesheet" href="styles.css">
${analyticsScript}
</head>
<body style="${backgroundStyle}">
  <div class="page-container">
${sectionsHTML}
  </div>
  <script src="script.js"></script>
</body>
</html>`;
}

function generateBackgroundStyle(bg: any): string {
  if (!bg) return '';

  switch (bg.type) {
    case 'color':
      return `background-color: ${bg.value};`;
    case 'gradient':
      return `background: ${bg.value};`;
    case 'image':
      return `background-image: url('${bg.value}'); background-size: cover; background-position: center;`;
    case 'video':
      return '';
    default:
      return '';
  }
}

function generateElementHTML(element: any): string {
  const styleStr = generateInlineStyle(element.style);
  const elementId = element.props.elementId || '';
  const idAttr = elementId ? ` id="${elementId}"` : '';

  switch (element.type) {
    case 'text':
      return `<div class="element element-text"${idAttr} style="${styleStr}">${element.props.content || ''}</div>`;

    case 'image':
      return `<img class="element element-image"${idAttr} src="${element.props.src || ''}" alt="${element.props.alt || ''}" style="${styleStr}">`;

    case 'button':
      const target = element.props.target || '_self';
      return `<a class="element element-button"${idAttr} href="${element.props.url || '#'}" target="${target}" style="${styleStr}">${element.props.label || 'Button'}</a>`;

    case 'form':
      const fields = element.props.fields || [];
      const fieldsHTML = fields
        .map(
          (field: any) =>
            `<div class="form-field">
          <label>${field.label}</label>
          <input type="${field.type || 'text'}" name="${field.name}" ${field.required ? 'required' : ''}>
        </div>`
        )
        .join('\n');

      return `<form class="element element-form"${idAttr} style="${styleStr}" data-handler="${element.props.handler || 'email'}">
        ${fieldsHTML}
        <button type="submit">Submit</button>
      </form>`;

    case 'social':
      const icons = element.props.icons || [];
      const iconsHTML = icons
        .map(
          (icon: any) =>
            `<a href="${icon.url}" target="_blank" rel="noopener noreferrer" class="social-icon social-${icon.platform}">
          <span>${icon.platform}</span>
        </a>`
        )
        .join('\n');

      return `<div class="element element-social"${idAttr} style="${styleStr}">
        ${iconsHTML}
      </div>`;

    case 'embed':
      if (element.props.embedType === 'iframe') {
        return `<div class="element element-embed"${idAttr} style="${styleStr}">
          <iframe src="${element.props.url || ''}" frameborder="0" allowfullscreen></iframe>
        </div>`;
      } else {
        return `<div class="element element-embed"${idAttr} style="${styleStr}">
          ${element.props.html || ''}
        </div>`;
      }

    case 'timer':
      return `<div class="element element-timer"${idAttr} style="${styleStr}" data-target="${element.props.targetDate || ''}">
        <div class="timer-display">00:00:00</div>
      </div>`;

    case 'container':
      return `<div class="element element-container"${idAttr} style="${styleStr}">
        ${element.props.content || ''}
      </div>`;

    default:
      return '';
  }
}

function generateInlineStyle(style: any): string {
  if (!style || typeof style !== 'object') return '';

  return Object.entries(style)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value}`;
    })
    .join('; ');
}

function generateCSS(pageStructure: any): string {
  return `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
}

.page-container {
  min-height: 100vh;
}

.section {
  width: 100%;
}

.section-full_width .section-content {
  max-width: 100%;
  padding: 0 20px;
}

.section-boxed .section-content {
  max-width: ${pageStructure.layout_config?.maxWidth || '1200px'};
  margin: 0 auto;
  padding: 0 20px;
}

.element {
  margin: 10px 0;
}

.element-text {
  line-height: 1.8;
}

.element-text h1, .element-text h2, .element-text h3 {
  margin: 20px 0 10px;
}

.element-text p {
  margin: 10px 0;
}

.element-image {
  max-width: 100%;
  height: auto;
  display: block;
}

.element-button {
  display: inline-block;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 4px;
  transition: opacity 0.3s;
  cursor: pointer;
}

.element-button:hover {
  opacity: 0.8;
}

.element-form {
  max-width: 500px;
}

.form-field {
  margin-bottom: 15px;
}

.form-field label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-field input,
.form-field textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.element-form button {
  background: #000;
  color: #fff;
  padding: 12px 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.element-form button:hover {
  opacity: 0.9;
}

.element-social {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #000;
  color: #fff;
  text-decoration: none;
  transition: transform 0.3s;
}

.social-icon:hover {
  transform: translateY(-3px);
}

.element-embed iframe {
  width: 100%;
  min-height: 400px;
}

.element-timer {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

@media (max-width: 768px) {
  .section-content {
    padding: 0 15px;
  }

  .element-timer {
    font-size: 1.5rem;
  }
}
`;
}

function generateJS(pageStructure: any): string {
  return `
// Form submission handler
document.querySelectorAll('.element-form').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const handler = form.dataset.handler;

    if (handler === 'email') {
      console.log('Form submitted:', data);
      alert('Form submitted! (Email handler would be configured in production)');
    }

    form.reset();
  });
});

// Timer/Countdown
document.querySelectorAll('.element-timer').forEach(timer => {
  const targetDate = timer.dataset.target;
  if (!targetDate) return;

  const target = new Date(targetDate).getTime();
  const display = timer.querySelector('.timer-display');

  function updateTimer() {
    const now = new Date().getTime();
    const distance = target - now;

    if (distance < 0) {
      display.textContent = 'EXPIRED';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    display.textContent = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
  }

  updateTimer();
  setInterval(updateTimer, 1000);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
`;
}
