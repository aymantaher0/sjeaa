import { Router } from 'express';
import { getTemplatesHandler, getTemplateHandler, applyTemplateHandler } from '../controllers/templateController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

router.get('/', getTemplatesHandler);
router.get('/:templateId', getTemplateHandler);
router.post('/:templateId/apply/:siteId', applyTemplateHandler);

export default router;
