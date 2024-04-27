import checkToken from '@/config/middlewares/checkToken';
import { Router } from 'express';
import UserController from '../controller/UserController';

const router = Router();

router.get('/api/user/email/:email', [checkToken], UserController.findByEmail);
router.post('/api/user/auth', UserController.getAccessToken);

export const userRouter = router;
