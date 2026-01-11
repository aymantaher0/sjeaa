export type PlanType = 'free' | 'pro_lite' | 'pro_standard' | 'pro_plus';
export type SiteStatus = 'draft' | 'published';
export type LayoutType = 'full_width' | 'boxed';
export type ElementType = 'text' | 'image' | 'button' | 'form' | 'social' | 'embed' | 'timer' | 'container';

export interface User {
  id: string;
  email: string;
  plan_type: PlanType;
  max_sites: number;
  storage_limit_mb: number;
  created_at: string;
}

export interface SiteSettings {
  title: string;
  description: string;
  language: string;
  meta_tags: string[];
  favicon_url: string;
  analytics_id: string;
  social_preview_image: string;
}

export interface Site {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  status: SiteStatus;
  plan_type_used: PlanType;
  settings: SiteSettings;
  created_at: string;
  updated_at: string;
}

export interface BackgroundConfig {
  type: 'color' | 'gradient' | 'image' | 'video';
  value: string;
}

export interface LayoutConfig {
  maxWidth: string;
  padding: string;
}

export interface Padding {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

export interface Element {
  id?: string;
  section_id?: string;
  type: ElementType;
  order: number;
  props: Record<string, any>;
  style: Record<string, any>;
}

export interface Section {
  id?: string;
  page_id?: string;
  order: number;
  layout: LayoutType;
  padding: Padding;
  background_override?: BackgroundConfig;
  elements: Element[];
}

export interface PageStructure {
  id: string;
  site_id: string;
  background_config: BackgroundConfig;
  layout_config: LayoutConfig;
  sections: Section[];
}

export interface Template {
  id: string;
  name: string;
  category: string;
  preview_image: string;
  base_structure: {
    background_config: BackgroundConfig;
    sections: Section[];
  };
}
