import { create } from 'zustand';
import { PageStructure, Section, Element, BackgroundConfig, LayoutConfig } from '../types';
import { sitesApi } from '../api/mockSites';

interface BuilderState {
  siteId: string | null;
  pageStructure: PageStructure | null;
  selectedElementId: string | null;
  selectedSectionId: string | null;
  history: PageStructure[];
  historyIndex: number;
  isSaving: boolean;
  previewMode: 'desktop' | 'mobile';

  setSiteId: (siteId: string) => void;
  loadPageStructure: (siteId: string) => Promise<void>;
  setPageStructure: (structure: PageStructure) => void;

  updateBackgroundConfig: (config: BackgroundConfig) => void;
  updateLayoutConfig: (config: LayoutConfig) => void;

  addSection: (section: Omit<Section, 'id' | 'page_id'>) => void;
  updateSection: (sectionId: string, updates: Partial<Section>) => void;
  deleteSection: (sectionId: string) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;

  addElement: (sectionId: string, element: Omit<Element, 'id' | 'section_id'>) => void;
  updateElement: (elementId: string, updates: Partial<Element>) => void;
  deleteElement: (elementId: string) => void;
  reorderElements: (sectionId: string, fromIndex: number, toIndex: number) => void;

  selectElement: (elementId: string | null) => void;
  selectSection: (sectionId: string | null) => void;

  save: () => Promise<void>;

  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  setPreviewMode: (mode: 'desktop' | 'mobile') => void;
}

const addToHistory = (state: BuilderState): Partial<BuilderState> => {
  if (!state.pageStructure) return {};

  const newHistory = state.history.slice(0, state.historyIndex + 1);
  newHistory.push(JSON.parse(JSON.stringify(state.pageStructure)));

  return {
    history: newHistory.slice(-50),
    historyIndex: Math.min(newHistory.length - 1, 49),
  };
};

export const useBuilderStore = create<BuilderState>((set, get) => ({
  siteId: null,
  pageStructure: null,
  selectedElementId: null,
  selectedSectionId: null,
  history: [],
  historyIndex: -1,
  isSaving: false,
  previewMode: 'desktop',

  setSiteId: (siteId) => set({ siteId }),

  loadPageStructure: async (siteId) => {
    try {
      const structure = await sitesApi.getStructure(siteId);
      set({
        siteId,
        pageStructure: structure,
        history: [JSON.parse(JSON.stringify(structure))],
        historyIndex: 0,
      });
    } catch (error) {
      console.error('Failed to load page structure:', error);
    }
  },

  setPageStructure: (structure) => {
    set((state) => ({
      pageStructure: structure,
      ...addToHistory({ ...state, pageStructure: structure }),
    }));
  },

  updateBackgroundConfig: (config) => {
    set((state) => {
      if (!state.pageStructure) return {};

      const newStructure = {
        ...state.pageStructure,
        background_config: config,
      };

      return {
        pageStructure: newStructure,
        ...addToHistory({ ...state, pageStructure: newStructure }),
      };
    });
  },

  updateLayoutConfig: (config) => {
    set((state) => {
      if (!state.pageStructure) return {};

      const newStructure = {
        ...state.pageStructure,
        layout_config: config,
      };

      return {
        pageStructure: newStructure,
        ...addToHistory({ ...state, pageStructure: newStructure }),
      };
    });
  },

  addSection: (section) => {
    set((state) => {
      if (!state.pageStructure) return {};

      const newSection: Section = {
        ...section,
        id: `temp-${Date.now()}`,
        page_id: state.pageStructure.id,
        order: state.pageStructure.sections.length,
      };

      const newStructure = {
        ...state.pageStructure,
        sections: [...state.pageStructure.sections, newSection],
      };

      return {
        pageStructure: newStructure,
        selectedSectionId: newSection.id,
        ...addToHistory({ ...state, pageStructure: newStructure }),
      };
    });
  },

  updateSection: (sectionId, updates) => {
    set((state) => {
      if (!state.pageStructure) return {};

      const newStructure = {
        ...state.pageStructure,
        sections: state.pageStructure.sections.map((section) =>
          section.id === sectionId ? { ...section, ...updates } : section
        ),
      };

      return {
        pageStructure: newStructure,
        ...addToHistory({ ...state, pageStructure: newStructure }),
      };
    });
  },

  deleteSection: (sectionId) => {
    set((state) => {
      if (!state.pageStructure) return {};

      const newStructure = {
        ...state.pageStructure,
        sections: state.pageStructure.sections
          .filter((section) => section.id !== sectionId)
          .map((section, index) => ({ ...section, order: index })),
      };

      return {
        pageStructure: newStructure,
        selectedSectionId: state.selectedSectionId === sectionId ? null : state.selectedSectionId,
        selectedElementId: null,
        ...addToHistory({ ...state, pageStructure: newStructure }),
      };
    });
  },

  reorderSections: (fromIndex, toIndex) => {
    set((state) => {
      if (!state.pageStructure) return {};

      const sections = [...state.pageStructure.sections];
      const [removed] = sections.splice(fromIndex, 1);
      sections.splice(toIndex, 0, removed);

      const newStructure = {
        ...state.pageStructure,
        sections: sections.map((section, index) => ({ ...section, order: index })),
      };

      return {
        pageStructure: newStructure,
        ...addToHistory({ ...state, pageStructure: newStructure }),
      };
    });
  },

  addElement: (sectionId, element) => {
    set((state) => {
      if (!state.pageStructure) return {};

      const newElement: Element = {
        ...element,
        id: `temp-${Date.now()}`,
        section_id: sectionId,
      };

      const newStructure = {
        ...state.pageStructure,
        sections: state.pageStructure.sections.map((section) =>
          section.id === sectionId
            ? { ...section, elements: [...section.elements, newElement] }
            : section
        ),
      };

      return {
        pageStructure: newStructure,
        selectedElementId: newElement.id,
        selectedSectionId: sectionId,
        ...addToHistory({ ...state, pageStructure: newStructure }),
      };
    });
  },

  updateElement: (elementId, updates) => {
    set((state) => {
      if (!state.pageStructure) return {};

      const newStructure = {
        ...state.pageStructure,
        sections: state.pageStructure.sections.map((section) => ({
          ...section,
          elements: section.elements.map((element) =>
            element.id === elementId ? { ...element, ...updates } : element
          ),
        })),
      };

      return {
        pageStructure: newStructure,
        ...addToHistory({ ...state, pageStructure: newStructure }),
      };
    });
  },

  deleteElement: (elementId) => {
    set((state) => {
      if (!state.pageStructure) return {};

      const newStructure = {
        ...state.pageStructure,
        sections: state.pageStructure.sections.map((section) => ({
          ...section,
          elements: section.elements
            .filter((element) => element.id !== elementId)
            .map((element, index) => ({ ...element, order: index })),
        })),
      };

      return {
        pageStructure: newStructure,
        selectedElementId: state.selectedElementId === elementId ? null : state.selectedElementId,
        ...addToHistory({ ...state, pageStructure: newStructure }),
      };
    });
  },

  reorderElements: (sectionId, fromIndex, toIndex) => {
    set((state) => {
      if (!state.pageStructure) return {};

      const newStructure = {
        ...state.pageStructure,
        sections: state.pageStructure.sections.map((section) => {
          if (section.id !== sectionId) return section;

          const elements = [...section.elements];
          const [removed] = elements.splice(fromIndex, 1);
          elements.splice(toIndex, 0, removed);

          return {
            ...section,
            elements: elements.map((element, index) => ({ ...element, order: index })),
          };
        }),
      };

      return {
        pageStructure: newStructure,
        ...addToHistory({ ...state, pageStructure: newStructure }),
      };
    });
  },

  selectElement: (elementId) => set({ selectedElementId: elementId }),
  selectSection: (sectionId) => set({ selectedSectionId: sectionId }),

  save: async () => {
    const { siteId, pageStructure } = get();
    if (!siteId || !pageStructure) return;

    set({ isSaving: true });

    try {
      await sitesApi.updateStructure(siteId, pageStructure);
    } catch (error) {
      console.error('Failed to save:', error);
      throw error;
    } finally {
      set({ isSaving: false });
    }
  },

  undo: () => {
    set((state) => {
      if (state.historyIndex <= 0) return {};

      const newIndex = state.historyIndex - 1;
      return {
        pageStructure: JSON.parse(JSON.stringify(state.history[newIndex])),
        historyIndex: newIndex,
      };
    });
  },

  redo: () => {
    set((state) => {
      if (state.historyIndex >= state.history.length - 1) return {};

      const newIndex = state.historyIndex + 1;
      return {
        pageStructure: JSON.parse(JSON.stringify(state.history[newIndex])),
        historyIndex: newIndex,
      };
    });
  },

  canUndo: () => {
    const { historyIndex } = get();
    return historyIndex > 0;
  },

  canRedo: () => {
    const { historyIndex, history } = get();
    return historyIndex < history.length - 1;
  },

  setPreviewMode: (mode) => set({ previewMode: mode }),
}));
