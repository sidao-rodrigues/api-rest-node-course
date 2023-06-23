import { Request, Response } from 'express';
import ListUserService from '@modules/users/services/ListUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';
import ShowUserService from '@modules/users/services/ShowUserService';

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;

    const listUser = container.resolve(ListUserService);

    const users = await listUser.execute({ page, limit });

    return response.json(instanceToInstance(users));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUser = container.resolve(ShowUserService);

    const users = await showUser.execute({ id });

    return response.json(instanceToInstance(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(instanceToInstance(user));
  }
}
