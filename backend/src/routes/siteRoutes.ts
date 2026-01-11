import { Router } from 'express';
import {
  createSiteHandler,
  getSites,
  getSite,
  updateSiteHandler,
  deleteSiteHandler,
  getPageStructureHandler,
  updatePageStructureHandler,
  publishSiteHandler,
} from '../controllers/siteController';
import { authenticateToken } from '../middleware/auth';
import { checkSiteLimit } from '../middleware/planLimits';

const router = Router();

router.use(authenticateToken);

router.post('/', checkSiteLimit, createSiteHandler);
router.get('/', getSites);
router.get('/:siteId', getSite);
router.put('/:siteId', updateSiteHandler);
router.delete('/:siteId', deleteSiteHandler);

router.get('/:siteId/structure', getPageStructureHandler);
router.put('/:siteId/structure', updatePageStructureHandler);

router.post('/:siteId/publish', publishSiteHandler);

export default router;
