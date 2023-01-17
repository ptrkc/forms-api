import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'forms',
  entities: ['dist/**/*.entity.{js,ts}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
