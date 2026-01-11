-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  plan_type VARCHAR(50) NOT NULL DEFAULT 'free' CHECK (plan_type IN ('free', 'pro_lite', 'pro_standard', 'pro_plus')),
  max_sites INTEGER NOT NULL DEFAULT 1,
  storage_limit_mb INTEGER NOT NULL DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Site table
CREATE TABLE sites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  plan_type_used VARCHAR(50) NOT NULL DEFAULT 'free',
  settings JSONB DEFAULT '{
    "title": "",
    "description": "",
    "language": "en",
    "meta_tags": [],
    "favicon_url": "",
    "analytics_id": "",
    "social_preview_image": ""
  }'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Page table (one page per site)
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID UNIQUE NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  background_config JSONB DEFAULT '{
    "type": "color",
    "value": "#ffffff"
  }'::jsonb,
  layout_config JSONB DEFAULT '{
    "maxWidth": "1200px",
    "padding": "20px"
  }'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Section table
CREATE TABLE sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  "order" INTEGER NOT NULL,
  layout VARCHAR(50) NOT NULL DEFAULT 'full_width' CHECK (layout IN ('full_width', 'boxed')),
  padding JSONB DEFAULT '{
    "top": "40px",
    "right": "20px",
    "bottom": "40px",
    "left": "20px"
  }'::jsonb,
  background_override JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Element table
CREATE TABLE elements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('text', 'image', 'button', 'form', 'social', 'embed', 'timer', 'container')),
  "order" INTEGER NOT NULL,
  props JSONB NOT NULL DEFAULT '{}'::jsonb,
  style JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Template table
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL CHECK (category IN ('portfolio', 'landing', 'link_in_bio', 'event', 'business', 'personal')),
  preview_image VARCHAR(500),
  base_structure JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Domain/PublishConfig table
CREATE TABLE domains (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('subdomain', 'custom_domain')),
  value VARCHAR(255) NOT NULL,
  ssl_enabled BOOLEAN DEFAULT false,
  last_published_at TIMESTAMP WITH TIME ZONE,
  publish_status VARCHAR(50) DEFAULT 'pending' CHECK (publish_status IN ('pending', 'published', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(site_id, type)
);

-- Indexes for performance
CREATE INDEX idx_sites_user_id ON sites(user_id);
CREATE INDEX idx_pages_site_id ON pages(site_id);
CREATE INDEX idx_sections_page_id ON sections(page_id);
CREATE INDEX idx_sections_order ON sections(page_id, "order");
CREATE INDEX idx_elements_section_id ON elements(section_id);
CREATE INDEX idx_elements_order ON elements(section_id, "order");
CREATE INDEX idx_domains_site_id ON domains(site_id);
CREATE INDEX idx_templates_category ON templates(category);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sites_updated_at BEFORE UPDATE ON sites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sections_updated_at BEFORE UPDATE ON sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_elements_updated_at BEFORE UPDATE ON elements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_domains_updated_at BEFORE UPDATE ON domains
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
