import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { getTemplates, getTemplateById } from '../models/templateModel';
import { getPageBySiteId, updatePage } from '../models/pageModel';
import { verifySiteOwnership } from '../models/siteModel';
import { getClient } from '../db';
import { TemplateCategory } from '../types';

export const getTemplatesHandler = async (req: AuthRequest, res: Response) => {
  try {
    const { category } = req.query;

    const templates = await getTemplates(category as TemplateCategory);
    res.json(templates);
  } catch (error) {
    console.error('Get templates error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTemplateHandler = async (req: AuthRequest, res: Response) => {
  try {
    const { templateId } = req.params;

    const template = await getTemplateById(templateId);

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    res.json(template);
  } catch (error) {
    console.error('Get template error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const applyTemplateHandler = async (req: AuthRequest, res: Response) => {
  try {
    const { templateId, siteId } = req.params;

    const isOwner = await verifySiteOwnership(siteId, req.userId!);
    if (!isOwner) {
      return res.status(404).json({ error: 'Site not found' });
    }

    const template = await getTemplateById(templateId);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    const page = await getPageBySiteId(siteId);
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }

    const client = await getClient();

    try {
      await client.query('BEGIN');

      await client.query('DELETE FROM sections WHERE page_id = $1', [page.id]);

      await updatePage(page.id, {
        background_config: template.base_structure.background_config,
      });

      for (const section of template.base_structure.sections) {
        const sectionResult = await client.query(
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

        const newSectionId = sectionResult.rows[0].id;

        for (const element of section.elements) {
          await client.query(
            `INSERT INTO elements (section_id, type, "order", props, style)
             VALUES ($1, $2, $3, $4, $5)`,
            [
              newSectionId,
              element.type,
              element.order,
              JSON.stringify(element.props),
              JSON.stringify(element.style),
            ]
          );
        }
      }

      await client.query('COMMIT');

      res.json({ success: true, message: 'Template applied successfully' });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Apply template error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
