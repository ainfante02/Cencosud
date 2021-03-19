import {DefaultCrudRepository} from '@loopback/repository';
import {ApiError, ApiErrorRelations} from '../models';
import {DbMemoriaDataSource, RedisDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ApiErrorRepository extends DefaultCrudRepository<
  ApiError,
  typeof ApiError.prototype.id_api_error,
  ApiErrorRelations
> {
  constructor(
    @inject('datasources.redis') dataSource: RedisDataSource,
  ) {
    super(ApiError, dataSource);
  }
}
