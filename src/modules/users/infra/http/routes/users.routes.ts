import isAutenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import UserController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import Joi from 'joi';
import uploadConfig from '@config/upload';
import multer from 'multer';

const usersRouter = Router();
const usersController = new UserController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);

usersRouter.get('/', isAutenticated, usersController.index);

usersRouter.get(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
    },
  }),
  usersController.show,
);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  isAutenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
