import pool from './index';

const templates = [
  {
    name: 'Simple Portfolio',
    category: 'portfolio',
    preview_image: '/templates/portfolio.jpg',
    base_structure: {
      background_config: { type: 'color', value: '#ffffff' },
      sections: [
        {
          order: 0,
          layout: 'boxed',
          padding: { top: '60px', right: '20px', bottom: '60px', left: '20px' },
          elements: [
            {
              type: 'text',
              order: 0,
              props: { content: '<h1>John Doe</h1><p>Designer & Developer</p>', tag: 'div' },
              style: { textAlign: 'center', color: '#333333' }
            },
            {
              type: 'image',
              order: 1,
              props: { src: 'https://via.placeholder.com/200', alt: 'Profile' },
              style: { width: '200px', height: '200px', borderRadius: '50%', margin: '20px auto' }
            }
          ]
        },
        {
          order: 1,
          layout: 'boxed',
          padding: { top: '40px', right: '20px', bottom: '40px', left: '20px' },
          elements: [
            {
              type: 'text',
              order: 0,
              props: { content: '<h2>About Me</h2><p>I create beautiful websites and applications.</p>', tag: 'div' },
              style: { textAlign: 'center', color: '#666666' }
            }
          ]
        }
      ]
    }
  },
  {
    name: 'Landing Page',
    category: 'landing',
    preview_image: '/templates/landing.jpg',
    base_structure: {
      background_config: { type: 'gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      sections: [
        {
          order: 0,
          layout: 'boxed',
          padding: { top: '80px', right: '20px', bottom: '80px', left: '20px' },
          elements: [
            {
              type: 'text',
              order: 0,
              props: { content: '<h1>Launch Your Product</h1><p>Build something amazing today</p>', tag: 'div' },
              style: { textAlign: 'center', color: '#ffffff' }
            },
            {
              type: 'button',
              order: 1,
              props: { label: 'Get Started', url: '#contact', target: '_self' },
              style: {
                backgroundColor: '#ffffff',
                color: '#667eea',
                padding: '15px 40px',
                borderRadius: '30px',
                margin: '20px auto',
                display: 'block',
                width: 'fit-content'
              }
            }
          ]
        }
      ]
    }
  },
  {
    name: 'Link in Bio',
    category: 'link_in_bio',
    preview_image: '/templates/linkinbio.jpg',
    base_structure: {
      background_config: { type: 'color', value: '#f5f5f5' },
      sections: [
        {
          order: 0,
          layout: 'boxed',
          padding: { top: '40px', right: '20px', bottom: '40px', left: '20px' },
          elements: [
            {
              type: 'image',
              order: 0,
              props: { src: 'https://via.placeholder.com/150', alt: 'Avatar' },
              style: { width: '150px', height: '150px', borderRadius: '50%', margin: '0 auto 20px' }
            },
            {
              type: 'text',
              order: 1,
              props: { content: '<h2>@username</h2><p>Links to all my stuff</p>', tag: 'div' },
              style: { textAlign: 'center' }
            },
            {
              type: 'button',
              order: 2,
              props: { label: 'My Website', url: 'https://example.com', target: '_blank' },
              style: {
                backgroundColor: '#000000',
                color: '#ffffff',
                padding: '15px',
                borderRadius: '10px',
                margin: '10px auto',
                display: 'block',
                width: '90%',
                maxWidth: '400px',
                textAlign: 'center'
              }
            },
            {
              type: 'button',
              order: 3,
              props: { label: 'My Portfolio', url: 'https://example.com', target: '_blank' },
              style: {
                backgroundColor: '#000000',
                color: '#ffffff',
                padding: '15px',
                borderRadius: '10px',
                margin: '10px auto',
                display: 'block',
                width: '90%',
                maxWidth: '400px',
                textAlign: 'center'
              }
            },
            {
              type: 'social',
              order: 4,
              props: {
                icons: [
                  { platform: 'twitter', url: 'https://twitter.com' },
                  { platform: 'instagram', url: 'https://instagram.com' },
                  { platform: 'github', url: 'https://github.com' }
                ]
              },
              style: { margin: '20px auto', textAlign: 'center' }
            }
          ]
        }
      ]
    }
  }
];

async function seed() {
  try {
    console.log('Seeding database...');

    for (const template of templates) {
      await pool.query(
        `INSERT INTO templates (name, category, preview_image, base_structure)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT DO NOTHING`,
        [template.name, template.category, template.preview_image, JSON.stringify(template.base_structure)]
      );
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
