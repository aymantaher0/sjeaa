import { query } from '../db';
import { Section } from '../types';

export const createSection = async (
  pageId: string,
  order: number,
  layout: string = 'full_width',
  padding?: any,
  backgroundOverride?: any
): Promise<Section> => {
  const result = await query(
    `INSERT INTO sections (page_id, "order", layout, padding, background_override)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [
      pageId,
      order,
      layout,
      padding ? JSON.stringify(padding) : null,
      backgroundOverride ? JSON.stringify(backgroundOverride) : null,
    ]
  );

  return result.rows[0];
};

export const getSectionsByPageId = async (pageId: string): Promise<Section[]> => {
  const result = await query(
    'SELECT * FROM sections WHERE page_id = $1 ORDER BY "order"',
    [pageId]
  );
  return result.rows;
};

export const updateSection = async (
  sectionId: string,
  data: Partial<Pick<Section, 'order' | 'layout' | 'padding' | 'background_override'>>
): Promise<Section> => {
  const updates: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  if (data.order !== undefined) {
    updates.push(`"order" = $${paramCount++}`);
    values.push(data.order);
  }
  if (data.layout !== undefined) {
    updates.push(`layout = $${paramCount++}`);
    values.push(data.layout);
  }
  if (data.padding !== undefined) {
    updates.push(`padding = $${paramCount++}`);
    values.push(JSON.stringify(data.padding));
  }
  if (data.background_override !== undefined) {
    updates.push(`background_override = $${paramCount++}`);
    values.push(data.background_override ? JSON.stringify(data.background_override) : null);
  }

  values.push(sectionId);

  const result = await query(
    `UPDATE sections SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
    values
  );

  return result.rows[0];
};

export const deleteSection = async (sectionId: string): Promise<void> => {
  await query('DELETE FROM sections WHERE id = $1', [sectionId]);
};
