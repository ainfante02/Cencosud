import {DefaultCrudRepository} from '@loopback/repository';
import {City, CityRelations} from '../models';
import {DbMemoriaDataSource, RedisDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CityRepository extends DefaultCrudRepository<
  City,
  typeof City.prototype.id_city,
  CityRelations
> {
  constructor(
    @inject('datasources.dbMemoria') dataSource: DbMemoriaDataSource,
  ) {
    super(City, dataSource);
  }
}
