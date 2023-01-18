import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';

export const typeOrmConfig: TypeOrmModuleOptions = {
  ...dataSourceOptions,
  autoLoadEntities: true,
  synchronize: true,
};
