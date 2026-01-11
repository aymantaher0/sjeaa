import { query } from '../db';
import { Page, BackgroundConfig, LayoutConfig, Section, Element } from '../types';

export const getPageBySiteId = async (siteId: string): Promise<Page | null> => {
  const result = await query('SELECT * FROM pages WHERE site_id = $1', [siteId]);
  return result.rows[0] || null;
};

export const updatePage = async (
  pageId: string,
  data: Partial<Pick<Page, 'background_config' | 'layout_config'>>
): Promise<Page> => {
  const updates: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  if (data.background_config !== undefined) {
    updates.push(`background_config = $${paramCount++}`);
    values.push(JSON.stringify(data.background_config));
  }
  if (data.layout_config !== undefined) {
    updates.push(`layout_config = $${paramCount++}`);
    values.push(JSON.stringify(data.layout_config));
  }

  values.push(pageId);

  const result = await query(
    `UPDATE pages SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
    values
  );

  return result.rows[0];
};

export const getPageStructure = async (siteId: string) => {
  const pageResult = await query('SELECT * FROM pages WHERE site_id = $1', [siteId]);

  if (!pageResult.rows[0]) {
    return null;
  }

  const page = pageResult.rows[0];

  const sectionsResult = await query(
    'SELECT * FROM sections WHERE page_id = $1 ORDER BY "order"',
    [page.id]
  );

  const sections = await Promise.all(
    sectionsResult.rows.map(async (section) => {
      const elementsResult = await query(
        'SELECT * FROM elements WHERE section_id = $1 ORDER BY "order"',
        [section.id]
      );

      return {
        ...section,
        elements: elementsResult.rows,
      };
    })
  );

  return {
    ...page,
    sections,
  };
};
