import 'reflect-metadata';
import 'dotenv/config';
import { app } from './app';
import { dataSource } from '../typeorm';

dataSource.initialize().then(() => {
  const server = app.listen(process.env.APP_PORT || 3333, () => {
    console.log(`Server started on port ${process.env.APP_PORT || 3333}!`);
  });
});
