import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import { PLAN_LIMITS, PlanType } from '../types';
import { query } from '../db';

export const checkSiteLimit = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;
    const userPlan = req.userPlan as PlanType;

    const result = await query('SELECT COUNT(*) as count FROM sites WHERE user_id = $1', [userId]);
    const currentSites = parseInt(result.rows[0].count);

    const limits = PLAN_LIMITS[userPlan];

    if (currentSites >= limits.maxSites) {
      return res.status(403).json({
        error: 'Site limit reached',
        message: `Your ${userPlan} plan allows up to ${limits.maxSites} site(s). Please upgrade to create more sites.`,
        currentSites,
        maxSites: limits.maxSites,
      });
    }

    next();
  } catch (error) {
    console.error('Error checking site limit:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const checkCustomDomain = (req: AuthRequest, res: Response, next: NextFunction) => {
  const userPlan = req.userPlan as PlanType;
  const limits = PLAN_LIMITS[userPlan];

  if (!limits.customDomain) {
    return res.status(403).json({
      error: 'Feature not available',
      message: 'Custom domains require a Pro Standard or Pro Plus plan.',
    });
  }

  next();
};

export const checkAdvancedForms = (req: AuthRequest, res: Response, next: NextFunction) => {
  const userPlan = req.userPlan as PlanType;
  const limits = PLAN_LIMITS[userPlan];

  if (!limits.advancedForms) {
    return res.status(403).json({
      error: 'Feature not available',
      message: 'Advanced forms require a Pro Standard or Pro Plus plan.',
    });
  }

  next();
};

export const checkPasswordProtection = (req: AuthRequest, res: Response, next: NextFunction) => {
  const userPlan = req.userPlan as PlanType;
  const limits = PLAN_LIMITS[userPlan];

  if (!limits.passwordProtection) {
    return res.status(403).json({
      error: 'Feature not available',
      message: 'Password protection requires a Pro Plus plan.',
    });
  }

  next();
};
