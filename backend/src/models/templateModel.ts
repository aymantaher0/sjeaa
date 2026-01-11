import { query } from '../db';
import { Template, TemplateCategory } from '../types';

export const getTemplates = async (category?: TemplateCategory): Promise<Template[]> => {
  if (category) {
    const result = await query('SELECT * FROM templates WHERE category = $1 ORDER BY created_at DESC', [
      category,
    ]);
    return result.rows;
  }

  const result = await query('SELECT * FROM templates ORDER BY created_at DESC');
  return result.rows;
};

export const getTemplateById = async (id: string): Promise<Template | null> => {
  const result = await query('SELECT * FROM templates WHERE id = $1', [id]);
  return result.rows[0] || null;
};
