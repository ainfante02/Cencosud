import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {DsDataSource} from '../datasources';

export interface Clima {

getCharacter(city: string, apikey: string): Promise<any>;
}

export class ClimaProvider implements Provider<Clima> {
  constructor(
    // ds must match the name property in the datasource json file
    @inject('datasources.ds')
    protected dataSource: DsDataSource = new DsDataSource(),
  ) {}

  value(): Promise<Clima> {
    return getService(this.dataSource);
  }
}
