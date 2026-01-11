import { query } from '../db';
import { User, PlanType } from '../types';
import bcrypt from 'bcrypt';

export const createUser = async (
  email: string,
  password: string,
  planType: PlanType = 'free'
): Promise<User> => {
  const passwordHash = await bcrypt.hash(password, 10);

  const result = await query(
    `INSERT INTO users (email, password_hash, plan_type)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [email, passwordHash, planType]
  );

  return result.rows[0];
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
};

export const findUserById = async (id: string): Promise<User | null> => {
  const result = await query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const updateUserPlan = async (userId: string, planType: PlanType): Promise<User> => {
  const result = await query(
    'UPDATE users SET plan_type = $1 WHERE id = $2 RETURNING *',
    [planType, userId]
  );
  return result.rows[0];
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
