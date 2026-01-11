export type PlanType = 'free' | 'pro_lite' | 'pro_standard' | 'pro_plus';
export type SiteStatus = 'draft' | 'published';
export type LayoutType = 'full_width' | 'boxed';
export type ElementType = 'text' | 'image' | 'button' | 'form' | 'social' | 'embed' | 'timer' | 'container';
export type DomainType = 'subdomain' | 'custom_domain';
export type PublishStatus = 'pending' | 'published' | 'failed';
export type TemplateCategory = 'portfolio' | 'landing' | 'link_in_bio' | 'event' | 'business' | 'personal';

export interface User {
  id: string;
  email: string;
  password_hash: string;
  plan_type: PlanType;
  max_sites: number;
  storage_limit_mb: number;
  created_at: Date;
  updated_at: Date;
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
  created_at: Date;
  updated_at: Date;
}

export interface BackgroundConfig {
  type: 'color' | 'gradient' | 'image' | 'video';
  value: string;
}

export interface LayoutConfig {
  maxWidth: string;
  padding: string;
}

export interface Page {
  id: string;
  site_id: string;
  background_config: BackgroundConfig;
  layout_config: LayoutConfig;
  created_at: Date;
  updated_at: Date;
}

export interface Padding {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

export interface Section {
  id: string;
  page_id: string;
  order: number;
  layout: LayoutType;
  padding: Padding;
  background_override?: BackgroundConfig;
  created_at: Date;
  updated_at: Date;
}

export interface Element {
  id: string;
  section_id: string;
  type: ElementType;
  order: number;
  props: Record<string, any>;
  style: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  preview_image: string;
  base_structure: {
    background_config: BackgroundConfig;
    sections: Array<{
      order: number;
      layout: LayoutType;
      padding: Padding;
      elements: Array<{
        type: ElementType;
        order: number;
        props: Record<string, any>;
        style: Record<string, any>;
      }>;
    }>;
  };
  created_at: Date;
  updated_at: Date;
}

export interface Domain {
  id: string;
  site_id: string;
  type: DomainType;
  value: string;
  ssl_enabled: boolean;
  last_published_at?: Date;
  publish_status: PublishStatus;
  created_at: Date;
  updated_at: Date;
}

export interface PlanLimits {
  maxSites: number;
  customDomain: boolean;
  removeBranding: boolean;
  advancedForms: boolean;
  passwordProtection: boolean;
  exportCode: boolean;
  storageLimitMb: number;
  analyticsIntegration: boolean;
}

export const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  free: {
    maxSites: 1,
    customDomain: false,
    removeBranding: false,
    advancedForms: false,
    passwordProtection: false,
    exportCode: false,
    storageLimitMb: 50,
    analyticsIntegration: false,
  },
  pro_lite: {
    maxSites: 3,
    customDomain: false,
    removeBranding: true,
    advancedForms: false,
    passwordProtection: false,
    exportCode: false,
    storageLimitMb: 200,
    analyticsIntegration: false,
  },
  pro_standard: {
    maxSites: 10,
    customDomain: true,
    removeBranding: true,
    advancedForms: true,
    passwordProtection: false,
    exportCode: false,
    storageLimitMb: 500,
    analyticsIntegration: true,
  },
  pro_plus: {
    maxSites: 25,
    customDomain: true,
    removeBranding: true,
    advancedForms: true,
    passwordProtection: true,
    exportCode: true,
    storageLimitMb: 1000,
    analyticsIntegration: true,
  },
};
