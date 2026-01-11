import { query } from '../db';
import { Element, ElementType } from '../types';

export const createElement = async (
  sectionId: string,
  type: ElementType,
  order: number,
  props: any = {},
  style: any = {}
): Promise<Element> => {
  const result = await query(
    `INSERT INTO elements (section_id, type, "order", props, style)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [sectionId, type, order, JSON.stringify(props), JSON.stringify(style)]
  );

  return result.rows[0];
};

export const getElementsBySectionId = async (sectionId: string): Promise<Element[]> => {
  const result = await query(
    'SELECT * FROM elements WHERE section_id = $1 ORDER BY "order"',
    [sectionId]
  );
  return result.rows;
};

export const updateElement = async (
  elementId: string,
  data: Partial<Pick<Element, 'type' | 'order' | 'props' | 'style'>>
): Promise<Element> => {
  const updates: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  if (data.type !== undefined) {
    updates.push(`type = $${paramCount++}`);
    values.push(data.type);
  }
  if (data.order !== undefined) {
    updates.push(`"order" = $${paramCount++}`);
    values.push(data.order);
  }
  if (data.props !== undefined) {
    updates.push(`props = $${paramCount++}`);
    values.push(JSON.stringify(data.props));
  }
  if (data.style !== undefined) {
    updates.push(`style = $${paramCount++}`);
    values.push(JSON.stringify(data.style));
  }

  values.push(elementId);

  const result = await query(
    `UPDATE elements SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
    values
  );

  return result.rows[0];
};

export const deleteElement = async (elementId: string): Promise<void> => {
  await query('DELETE FROM elements WHERE id = $1', [elementId]);
};
