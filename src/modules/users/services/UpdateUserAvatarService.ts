import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUpdateUserAvatar } from '../domain/models/IUpdateUserAvatar';
import { IUser } from '../domain/models/IUser';

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    userId,
    avatarFileName,
  }: IUpdateUserAvatar): Promise<IUser> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    if (uploadConfig.driver === 's3') {
      const s3Provider = new S3StorageProvider();
      if (user.avatar) {
        await s3Provider.deleteFile(user.avatar);
      }

      const fileName = await s3Provider.saveFile(avatarFileName);
      user.avatar = fileName;
    } else {
      const diskProvider = new DiskStorageProvider();

      if (user.avatar) {
        await diskProvider.deleteFile(user.avatar);
      }

      const fileName = await diskProvider.saveFile(avatarFileName);
      user.avatar = fileName;
    }

    await this.usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
