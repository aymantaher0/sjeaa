import { query, getClient } from '../db';
import { Site, SiteSettings, Page, Section, Element } from '../types';

export const createSite = async (
  userId: string,
  name: string,
  slug: string,
  planType: string
): Promise<Site> => {
  const client = await getClient();

  try {
    await client.query('BEGIN');

    const siteResult = await client.query(
      `INSERT INTO sites (user_id, name, slug, plan_type_used)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, name, slug, planType]
    );

    const site = siteResult.rows[0];

    await client.query(
      `INSERT INTO pages (site_id)
       VALUES ($1)`,
      [site.id]
    );

    await client.query('COMMIT');

    return site;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const getSitesByUserId = async (userId: string): Promise<Site[]> => {
  const result = await query(
    'SELECT * FROM sites WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
};

export const getSiteById = async (siteId: string): Promise<Site | null> => {
  const result = await query('SELECT * FROM sites WHERE id = $1', [siteId]);
  return result.rows[0] || null;
};

export const getSiteBySlug = async (slug: string): Promise<Site | null> => {
  const result = await query('SELECT * FROM sites WHERE slug = $1', [slug]);
  return result.rows[0] || null;
};

export const updateSite = async (
  siteId: string,
  data: Partial<Pick<Site, 'name' | 'slug' | 'status' | 'settings'>>
): Promise<Site> => {
  const updates: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  if (data.name !== undefined) {
    updates.push(`name = $${paramCount++}`);
    values.push(data.name);
  }
  if (data.slug !== undefined) {
    updates.push(`slug = $${paramCount++}`);
    values.push(data.slug);
  }
  if (data.status !== undefined) {
    updates.push(`status = $${paramCount++}`);
    values.push(data.status);
  }
  if (data.settings !== undefined) {
    updates.push(`settings = $${paramCount++}`);
    values.push(JSON.stringify(data.settings));
  }

  values.push(siteId);

  const result = await query(
    `UPDATE sites SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
    values
  );

  return result.rows[0];
};

export const deleteSite = async (siteId: string): Promise<void> => {
  await query('DELETE FROM sites WHERE id = $1', [siteId]);
};

export const verifySiteOwnership = async (siteId: string, userId: string): Promise<boolean> => {
  const result = await query('SELECT id FROM sites WHERE id = $1 AND user_id = $2', [siteId, userId]);
  return result.rows.length > 0;
};
