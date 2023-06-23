import { Router } from 'express';
import { Segments, celebrate } from 'celebrate';
import Joi from 'joi';
import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const usersController = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default sessionsRouter;
