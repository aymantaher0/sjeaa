import { Site, PageStructure } from '../types';

const SITES_KEY = 'carrd_demo_sites';
const STRUCTURES_KEY = 'carrd_demo_structures';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getCurrentUserId = (): string => {
  const user = localStorage.getItem('carrd_demo_user');
  return user ? JSON.parse(user).id : '';
};

const getSites = (): Site[] => {
  return JSON.parse(localStorage.getItem(SITES_KEY) || '[]');
};

const saveSites = (sites: Site[]) => {
  localStorage.setItem(SITES_KEY, JSON.stringify(sites));
};

const getStructures = (): Record<string, PageStructure> => {
  return JSON.parse(localStorage.getItem(STRUCTURES_KEY) || '{}');
};

const saveStructures = (structures: Record<string, PageStructure>) => {
  localStorage.setItem(STRUCTURES_KEY, JSON.stringify(structures));
};

export const sitesApi = {
  create: async (name: string, slug: string): Promise<Site> => {
    await delay(500);

    const sites = getSites();
    const userId = getCurrentUserId();

    // Check if slug already exists
    if (sites.find(s => s.slug === slug)) {
      throw { response: { data: { error: 'Slug already taken' } } };
    }

    const newSite: Site = {
      id: `site-${Date.now()}`,
      user_id: userId,
      name,
      slug,
      status: 'draft',
      plan_type_used: 'free',
      settings: {
        title: name,
        description: '',
        language: 'en',
        meta_tags: [],
        favicon_url: '',
        analytics_id: '',
        social_preview_image: '',
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    sites.push(newSite);
    saveSites(sites);

    // Create default page structure
    const structures = getStructures();
    structures[newSite.id] = {
      id: `page-${Date.now()}`,
      site_id: newSite.id,
      background_config: { type: 'color', value: '#ffffff' },
      layout_config: { maxWidth: '1200px', padding: '20px' },
      sections: [],
    };
    saveStructures(structures);

    return newSite;
  },

  getAll: async (): Promise<Site[]> => {
    await delay(300);
    const userId = getCurrentUserId();
    const sites = getSites();
    return sites.filter(s => s.user_id === userId);
  },

  getById: async (siteId: string): Promise<Site> => {
    await delay(200);
    const sites = getSites();
    const site = sites.find(s => s.id === siteId);
    if (!site) throw new Error('Site not found');
    return site;
  },

  update: async (siteId: string, data: Partial<Site>): Promise<Site> => {
    await delay(300);
    const sites = getSites();
    const index = sites.findIndex(s => s.id === siteId);

    if (index === -1) throw new Error('Site not found');

    sites[index] = { ...sites[index], ...data, updated_at: new Date().toISOString() };
    saveSites(sites);
    return sites[index];
  },

  delete: async (siteId: string): Promise<void> => {
    await delay(300);
    const sites = getSites();
    const filtered = sites.filter(s => s.id !== siteId);
    saveSites(filtered);

    // Also delete structure
    const structures = getStructures();
    delete structures[siteId];
    saveStructures(structures);
  },

  getStructure: async (siteId: string): Promise<PageStructure> => {
    await delay(200);
    const structures = getStructures();
    const structure = structures[siteId];

    if (!structure) {
      // Create default structure if doesn't exist
      const defaultStructure: PageStructure = {
        id: `page-${Date.now()}`,
        site_id: siteId,
        background_config: { type: 'color', value: '#ffffff' },
        layout_config: { maxWidth: '1200px', padding: '20px' },
        sections: [],
      };
      structures[siteId] = defaultStructure;
      saveStructures(structures);
      return defaultStructure;
    }

    return structure;
  },

  updateStructure: async (
    siteId: string,
    structure: Partial<PageStructure>
  ): Promise<PageStructure> => {
    await delay(300);
    const structures = getStructures();
    const existing = structures[siteId];

    if (!existing) throw new Error('Structure not found');

    structures[siteId] = { ...existing, ...structure };
    saveStructures(structures);

    return structures[siteId];
  },

  publish: async (siteId: string): Promise<{ success: boolean; url: string; publishedAt: string }> => {
    await delay(800);

    const sites = getSites();
    const index = sites.findIndex(s => s.id === siteId);

    if (index === -1) throw new Error('Site not found');

    sites[index].status = 'published';
    sites[index].updated_at = new Date().toISOString();
    saveSites(sites);

    return {
      success: true,
      url: `https://${sites[index].slug}.demo.com`,
      publishedAt: new Date().toISOString(),
    };
  },
};
