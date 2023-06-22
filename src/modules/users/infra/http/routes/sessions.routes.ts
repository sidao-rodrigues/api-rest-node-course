import { Router } from 'express';
import { Segments, celebrate } from 'celebrate';
import Joi from 'joi';
import SessionsCrontroller from '../controllers/SessionsController';

const sessionsRouter = Router();
const usersController = new SessionsCrontroller();

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
