import {Entity, model, property} from '@loopback/repository';

@model()
export class City extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_city?: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'number',
    required: true,
  })
  lon: number;

  @property({
    type: 'number',
    required: true,
  })
  lat: number;


  constructor(data?: Partial<City>) {
    super(data);
  }
}

export interface CityRelations {
  // describe navigational properties here
}

export type CityWithRelations = City & CityRelations;
