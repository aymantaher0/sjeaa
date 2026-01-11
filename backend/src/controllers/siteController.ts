import { Response } from 'express';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth';
import {
  createSite,
  getSitesByUserId,
  getSiteById,
  updateSite,
  deleteSite,
  verifySiteOwnership,
} from '../models/siteModel';
import { getPageStructure, getPageBySiteId, updatePage } from '../models/pageModel';
import {
  createSection,
  getSectionsByPageId,
  updateSection,
  deleteSection,
} from '../models/sectionModel';
import { createElement, updateElement, deleteElement } from '../models/elementModel';
import { publishSite } from '../services/publishingService';
import { getClient } from '../db';

const createSiteSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
});

const updateSiteSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  status: z.enum(['draft', 'published']).optional(),
  settings: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      language: z.string().optional(),
      meta_tags: z.array(z.string()).optional(),
      favicon_url: z.string().optional(),
      analytics_id: z.string().optional(),
      social_preview_image: z.string().optional(),
    })
    .optional(),
});

export const createSiteHandler = async (req: AuthRequest, res: Response) => {
  try {
    const { name, slug } = createSiteSchema.parse(req.body);

    const site = await createSite(req.userId!, name, slug, req.userPlan!);

    res.status(201).json(site);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }

    if (error.code === '23505') {
      return res.status(400).json({ error: 'Slug already taken' });
    }

    console.error('Create site error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSites = async (req: AuthRequest, res: Response) => {
  try {
    const sites = await getSitesByUserId(req.userId!);
    res.json(sites);
  } catch (error) {
    console.error('Get sites error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSite = async (req: AuthRequest, res: Response) => {
  try {
    const { siteId } = req.params;

    const isOwner = await verifySiteOwnership(siteId, req.userId!);
    if (!isOwner) {
      return res.status(404).json({ error: 'Site not found' });
    }

    const site = await getSiteById(siteId);
    res.json(site);
  } catch (error) {
    console.error('Get site error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateSiteHandler = async (req: AuthRequest, res: Response) => {
  try {
    const { siteId } = req.params;

    const isOwner = await verifySiteOwnership(siteId, req.userId!);
    if (!isOwner) {
      return res.status(404).json({ error: 'Site not found' });
    }

    const data = updateSiteSchema.parse(req.body);
    const site = await updateSite(siteId, data);

    res.json(site);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }

    if (error.code === '23505') {
      return res.status(400).json({ error: 'Slug already taken' });
    }

    console.error('Update site error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteSiteHandler = async (req: AuthRequest, res: Response) => {
  try {
    const { siteId } = req.params;

    const isOwner = await verifySiteOwnership(siteId, req.userId!);
    if (!isOwner) {
      return res.status(404).json({ error: 'Site not found' });
    }

    await deleteSite(siteId);
    res.status(204).send();
  } catch (error) {
    console.error('Delete site error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPageStructureHandler = async (req: AuthRequest, res: Response) => {
  try {
    const { siteId } = req.params;

    const isOwner = await verifySiteOwnership(siteId, req.userId!);
    if (!isOwner) {
      return res.status(404).json({ error: 'Site not found' });
    }

    const structure = await getPageStructure(siteId);
    res.json(structure);
  } catch (error) {
    console.error('Get page structure error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updatePageStructureHandler = async (req: AuthRequest, res: Response) => {
  try {
    const { siteId } = req.params;
    const { background_config, layout_config, sections } = req.body;

    const isOwner = await verifySiteOwnership(siteId, req.userId!);
    if (!isOwner) {
      return res.status(404).json({ error: 'Site not found' });
    }

    const page = await getPageBySiteId(siteId);
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }

    const client = await getClient();

    try {
      await client.query('BEGIN');

      if (background_config || layout_config) {
        await updatePage(page.id, {
          ...(background_config && { background_config }),
          ...(layout_config && { layout_config }),
        });
      }

      const existingSections = await getSectionsByPageId(page.id);
      const existingSectionIds = new Set(existingSections.map((s) => s.id));

      const updatedSectionIds = new Set<string>();

      for (const section of sections || []) {
        if (section.id && existingSectionIds.has(section.id)) {
          await client.query(
            `UPDATE sections
             SET "order" = $1, layout = $2, padding = $3, background_override = $4
             WHERE id = $5`,
            [
              section.order,
              section.layout,
              JSON.stringify(section.padding),
              section.background_override ? JSON.stringify(section.background_override) : null,
              section.id,
            ]
          );
          updatedSectionIds.add(section.id);
        } else {
          const newSection = await client.query(
            `INSERT INTO sections (page_id, "order", layout, padding, background_override)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [
              page.id,
              section.order,
              section.layout,
              JSON.stringify(section.padding),
              section.background_override ? JSON.stringify(section.background_override) : null,
            ]
          );
          section.id = newSection.rows[0].id;
          updatedSectionIds.add(section.id);
        }

        const existingElements = await client.query(
          'SELECT id FROM elements WHERE section_id = $1',
          [section.id]
        );
        const existingElementIds = new Set(existingElements.rows.map((e: any) => e.id));

        const updatedElementIds = new Set<string>();

        for (const element of section.elements || []) {
          if (element.id && existingElementIds.has(element.id)) {
            await client.query(
              `UPDATE elements
               SET type = $1, "order" = $2, props = $3, style = $4
               WHERE id = $5`,
              [element.type, element.order, JSON.stringify(element.props), JSON.stringify(element.style), element.id]
            );
            updatedElementIds.add(element.id);
          } else {
            const newElement = await client.query(
              `INSERT INTO elements (section_id, type, "order", props, style)
               VALUES ($1, $2, $3, $4, $5)
               RETURNING *`,
              [section.id, element.type, element.order, JSON.stringify(element.props), JSON.stringify(element.style)]
            );
            updatedElementIds.add(newElement.rows[0].id);
          }
        }

        for (const elementId of existingElementIds) {
          if (!updatedElementIds.has(elementId)) {
            await client.query('DELETE FROM elements WHERE id = $1', [elementId]);
          }
        }
      }

      for (const sectionId of existingSectionIds) {
        if (!updatedSectionIds.has(sectionId)) {
          await client.query('DELETE FROM sections WHERE id = $1', [sectionId]);
        }
      }

      await client.query('COMMIT');

      const updatedStructure = await getPageStructure(siteId);
      res.json(updatedStructure);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Update page structure error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const publishSiteHandler = async (req: AuthRequest, res: Response) => {
  try {
    const { siteId } = req.params;

    const isOwner = await verifySiteOwnership(siteId, req.userId!);
    if (!isOwner) {
      return res.status(404).json({ error: 'Site not found' });
    }

    const result = await publishSite({ siteId, userId: req.userId! });

    res.json(result);
  } catch (error: any) {
    console.error('Publish site error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};
