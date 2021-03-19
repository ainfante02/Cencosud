import {inject} from '@loopback/core';
import {DefaultKeyValueRepository, juggler} from '@loopback/repository';
import {RedisDataSource} from '../datasources';
import {Cities} from '../models';

export class CitiesRepository extends DefaultKeyValueRepository<
  Cities
> {
  constructor(
    @inject('datasources.redis') dataSource: RedisDataSource,
  ) {
    super(Cities, dataSource);
  }
}
