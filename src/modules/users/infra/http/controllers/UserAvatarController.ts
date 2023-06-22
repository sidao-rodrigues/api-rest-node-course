import { Request, Response } from 'express';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { instanceToInstance } from 'class-transformer';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatarService = new UpdateUserAvatarService();

    const user = await updateAvatarService.execute({
      userId: request.user.id,
      avatarFileName: request.file?.filename as string,
    });

    return response.json(instanceToInstance(user));
  }
}
