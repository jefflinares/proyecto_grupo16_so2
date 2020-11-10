import routerx from 'express-promise-router';
import CasoRouter from './Caso'

const router = routerx();

router.use('/caso', CasoRouter);

export default router;