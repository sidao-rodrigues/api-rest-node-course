import { Router } from 'express';
import { Segments, celebrate } from 'celebrate';
import Joi from 'joi';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordRouter = Router();
const forgotPasswordCntroller = new ForgotPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordCntroller.create,
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordCntroller.create,
);

export default passwordRouter;
