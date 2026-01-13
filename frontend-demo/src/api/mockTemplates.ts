import { Template } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const templates: Template[] = [
  {
    id: 'template-1',
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
              props: { content: '<h1 style="font-size: 48px; margin-bottom: 10px;">John Doe</h1><p style="font-size: 24px; color: #666;">Designer & Developer</p>' },
              style: { textAlign: 'center', color: '#333333' },
            },
            {
              type: 'image',
              order: 1,
              props: { src: 'https://via.placeholder.com/200', alt: 'Profile' },
              style: { width: '200px', height: '200px', borderRadius: '50%', margin: '20px auto', display: 'block' },
            },
          ],
        },
        {
          order: 1,
          layout: 'boxed',
          padding: { top: '40px', right: '20px', bottom: '40px', left: '20px' },
          elements: [
            {
              type: 'text',
              order: 0,
              props: { content: '<h2 style="font-size: 36px; margin-bottom: 20px;">About Me</h2><p style="font-size: 18px; line-height: 1.8;">I create beautiful websites and applications. With over 5 years of experience in design and development, I bring ideas to life.</p>' },
              style: { textAlign: 'center', color: '#666666', maxWidth: '800px', margin: '0 auto' },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'template-2',
    name: 'Landing Page',
    category: 'landing',
    preview_image: '/templates/landing.jpg',
    base_structure: {
      background_config: { type: 'gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      sections: [
        {
          order: 0,
          layout: 'boxed',
          padding: { top: '100px', right: '20px', bottom: '100px', left: '20px' },
          elements: [
            {
              type: 'text',
              order: 0,
              props: { content: '<h1 style="font-size: 56px; margin-bottom: 20px;">Launch Your Product</h1><p style="font-size: 24px;">Build something amazing today. Turn your ideas into reality.</p>' },
              style: { textAlign: 'center', color: '#ffffff' },
            },
            {
              type: 'button',
              order: 1,
              props: { label: 'Get Started', url: '#contact', target: '_self' },
              style: {
                backgroundColor: '#ffffff',
                color: '#667eea',
                padding: '16px 48px',
                borderRadius: '30px',
                margin: '30px auto 0',
                display: 'block',
                width: 'fit-content',
                fontSize: '18px',
                fontWeight: 'bold',
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'template-3',
    name: 'Link in Bio',
    category: 'link_in_bio',
    preview_image: '/templates/linkinbio.jpg',
    base_structure: {
      background_config: { type: 'gradient', value: 'linear-gradient(to bottom, #ffecd2 0%, #fcb69f 100%)' },
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
              style: { width: '150px', height: '150px', borderRadius: '50%', margin: '0 auto 20px', display: 'block', border: '4px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
            },
            {
              type: 'text',
              order: 1,
              props: { content: '<h2 style="font-size: 32px; margin-bottom: 10px;">@username</h2><p style="font-size: 18px;">Links to all my stuff ✨</p>' },
              style: { textAlign: 'center', color: '#333' },
            },
            {
              type: 'button',
              order: 2,
              props: { label: '🌐 My Website', url: 'https://example.com', target: '_blank' },
              style: {
                backgroundColor: '#ffffff',
                color: '#333',
                padding: '16px',
                borderRadius: '12px',
                margin: '12px auto',
                display: 'block',
                width: '90%',
                maxWidth: '400px',
                textAlign: 'center',
                fontSize: '16px',
                fontWeight: '600',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              },
            },
            {
              type: 'button',
              order: 3,
              props: { label: '💼 My Portfolio', url: 'https://example.com', target: '_blank' },
              style: {
                backgroundColor: '#ffffff',
                color: '#333',
                padding: '16px',
                borderRadius: '12px',
                margin: '12px auto',
                display: 'block',
                width: '90%',
                maxWidth: '400px',
                textAlign: 'center',
                fontSize: '16px',
                fontWeight: '600',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              },
            },
            {
              type: 'button',
              order: 4,
              props: { label: '📧 Contact Me', url: 'mailto:hello@example.com', target: '_self' },
              style: {
                backgroundColor: '#ffffff',
                color: '#333',
                padding: '16px',
                borderRadius: '12px',
                margin: '12px auto',
                display: 'block',
                width: '90%',
                maxWidth: '400px',
                textAlign: 'center',
                fontSize: '16px',
                fontWeight: '600',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              },
            },
            {
              type: 'social',
              order: 5,
              props: {
                icons: [
                  { platform: 'twitter', url: 'https://twitter.com' },
                  { platform: 'instagram', url: 'https://instagram.com' },
                  { platform: 'github', url: 'https://github.com' },
                  { platform: 'linkedin', url: 'https://linkedin.com' },
                ],
              },
              style: { margin: '30px auto 0', textAlign: 'center' },
            },
          ],
        },
      ],
    },
  },
];

export const templatesApi = {
  getAll: async (category?: string): Promise<Template[]> => {
    await delay(300);
    if (category) {
      return templates.filter(t => t.category === category);
    }
    return templates;
  },

  getById: async (templateId: string): Promise<Template> => {
    await delay(200);
    const template = templates.find(t => t.id === templateId);
    if (!template) throw new Error('Template not found');
    return template;
  },

  apply: async (templateId: string, siteId: string): Promise<{ success: boolean }> => {
    await delay(500);
    // This would update the site structure with the template
    // For the demo, we'll just return success
    return { success: true };
  },
};
