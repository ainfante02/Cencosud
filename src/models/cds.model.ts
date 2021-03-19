import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Cds extends Entity {
  @property({
    type: 'any',
    id: true,
    generated: false,
    required: true,
  })
  data: any;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Cds>) {
    super(data);
  }
}

export interface CdsRelations {
  // describe navigational properties here
}

export type CdsWithRelations = Cds & CdsRelations;
