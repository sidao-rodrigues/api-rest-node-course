import { Router } from 'express';
import UserController from '../controllers/UsersController';
import { Segments, celebrate } from 'celebrate';
import Joi from 'joi';
import isAutenticated from '../middlewares/isAuthenticated';

const usersRouter = Router();
const usersController = new UserController();

usersRouter.get('/', isAutenticated, usersController.index);

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

export default usersRouter;
