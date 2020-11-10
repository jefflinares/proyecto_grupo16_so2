import routerx from 'express-promise-router';
import CasoController from '../controllers/CasoController';
const router=routerx();

router.get('/list', CasoController.list);
router.get('/getPie', CasoController.casosPie)
router.get('/listRedis', CasoController.listRedis)
router.get('/topCasos', CasoController.topCasos)
router.get('/casosCount', CasoController.casosCount)

export default router;