import {Entity, model, property} from '@loopback/repository';

@model()
export class Cities extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
  })
  lon?: number;

  @property({
    type: 'number',
  })
  lat?: number;


  constructor(data?: Partial<Cities>) {
    super(data);
  }
}

export interface CitiesRelations {
  // describe navigational properties here
}

export type CitiesWithRelations = Cities & CitiesRelations;
