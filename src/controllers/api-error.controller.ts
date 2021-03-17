import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {ApiError} from '../models';
import {ApiErrorRepository} from '../repositories';

export class ApiErrorController {
  constructor(
    @repository(ApiErrorRepository)
    public apiErrorRepository : ApiErrorRepository,
  ) {}

  @post('/api-errors', {
    responses: {
      '200': {
        description: 'ApiError model instance',
        content: {'application/json': {schema: getModelSchemaRef(ApiError)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApiError, {
            title: 'NewApiError',
            exclude: ['id_api_error'],
          }),
        },
      },
    })
    apiError: Omit<ApiError, 'id_api_error'>,
  ): Promise<ApiError> {
    return this.apiErrorRepository.create(apiError);
  }

  @get('/api-errors/count', {
    responses: {
      '200': {
        description: 'ApiError model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ApiError) where?: Where<ApiError>,
  ): Promise<Count> {
    return this.apiErrorRepository.count(where);
  }

  @get('/api-errors', {
    responses: {
      '200': {
        description: 'Array of ApiError model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ApiError, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ApiError) filter?: Filter<ApiError>,
  ): Promise<ApiError[]> {
    return this.apiErrorRepository.find(filter);
  }

  @patch('/api-errors', {
    responses: {
      '200': {
        description: 'ApiError PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApiError, {partial: true}),
        },
      },
    })
    apiError: ApiError,
    @param.where(ApiError) where?: Where<ApiError>,
  ): Promise<Count> {
    return this.apiErrorRepository.updateAll(apiError, where);
  }

  @get('/api-errors/{id}', {
    responses: {
      '200': {
        description: 'ApiError model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ApiError, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ApiError, {exclude: 'where'}) filter?: FilterExcludingWhere<ApiError>
  ): Promise<ApiError> {
    return this.apiErrorRepository.findById(id, filter);
  }

  @patch('/api-errors/{id}', {
    responses: {
      '204': {
        description: 'ApiError PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApiError, {partial: true}),
        },
      },
    })
    apiError: ApiError,
  ): Promise<void> {
    await this.apiErrorRepository.updateById(id, apiError);
  }

  @put('/api-errors/{id}', {
    responses: {
      '204': {
        description: 'ApiError PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() apiError: ApiError,
  ): Promise<void> {
    await this.apiErrorRepository.replaceById(id, apiError);
  }

  @del('/api-errors/{id}', {
    responses: {
      '204': {
        description: 'ApiError DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.apiErrorRepository.deleteById(id);
  }
}
