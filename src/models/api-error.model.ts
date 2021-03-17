import {Entity, model, property} from '@loopback/repository';

@model()
export class ApiError extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_api_error?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;


  constructor(data?: Partial<ApiError>) {
    super(data);
  }
}

export interface ApiErrorRelations {
  // describe navigational properties here
}

export type ApiErrorWithRelations = ApiError & ApiErrorRelations;
