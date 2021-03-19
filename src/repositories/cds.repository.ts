import {inject} from '@loopback/core';
import {DefaultKeyValueRepository, juggler} from '@loopback/repository';
import {RedisDataSource} from '../datasources';
import {Cds} from '../models';

export class CdsRepository extends DefaultKeyValueRepository<
  Cds
> {
  constructor(
    @inject('datasources.redis') dataSource: RedisDataSource,
  ) {
    super(Cds, dataSource);
  }
}
