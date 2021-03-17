
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
import {City} from '../models';
import {CityRepository, ApiErrorRepository} from '../repositories';
import {inject} from '@loopback/context';
import {Clima} from '../services';
export class CityController {

  constructor(
    @repository(CityRepository)
    public cityRepository : CityRepository,
    @repository(ApiErrorRepository)
    public apiErrorRepository : ApiErrorRepository,
    @inject('services.Clima')
    protected Clima: Clima
  ) {}

 /*  @get('/people/{personId}/')
  async getCharacter(
    @param.path.integer('personId') personId: number,
  ): Promise<object> {
    //Preconditions

    return this.Clima.getCharacter(personId);
  } */

  @get('/city/{city}')
  async getCharacter(
    @param.path.string('city') city: string,
  ): Promise<object> {
    //Preconditions

    let apikey: string = '51c8a38f9050eb355411f395da45b8ad';
    return  this.Clima.getCharacter( city,apikey);
  }
/* 
  @get('/city/{city}')
async getCharacter(@param.path.string('city') title: string): Promise<any> {
const titleArray: Array<string> = title.split(' ');
const requestTitle: string = titleArray.join('+');
console.log(`Calling OmdbApi Service for movie/show: ${title}`);
return await this.callOmdbapi(requestTitle);
}
async callOmdbapi(title: string): Promise<any> {
let apiKey: string = '51c8a38f9050eb355411f395da45b8ad';
return await this.Clima.getCharacter(apiKey, title);
} */

  @post('/cities', {
    responses: {
      '200': {
        description: 'City model instance',
        content: {'application/json': {schema: getModelSchemaRef(City)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(City, {
            title: 'NewCity',
            exclude: ['id_city'],
          }),
        },
      },
    })
    city: Omit<City, 'id_city'>,
  ): Promise<City> {
    return this.cityRepository.create(city);
  }

  @get('/cities/count', {
    responses: {
      '200': {
        description: 'City model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(City) where?: Where<City>,
  ): Promise<Count> {
    return this.cityRepository.count(where);
  }

  @get('/cities', {
    responses: {
      '200': {
        description: 'Array of City model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(City, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(City) filter?: Filter<City>,
  ): Promise<City[]> {

    if(Math.random() < 0.1){
      this.apiErrorRepository.create({ name: "Fallo" });

      throw new Error("Fallo");
      
    }

    return this.cityRepository.find(filter);
  }

  @patch('/cities', {
    responses: {
      '200': {
        description: 'City PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(City, {partial: true}),
        },
      },
    })
    city: City,
    @param.where(City) where?: Where<City>,
  ): Promise<Count> {
    return this.cityRepository.updateAll(city, where);
  }

  @get('/cities/{id}', {
    responses: {
      '200': {
        description: 'City model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(City, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(City, {exclude: 'where'}) filter?: FilterExcludingWhere<City>
  ): Promise<City> {
    return this.cityRepository.findById(id, filter);
  }

  @patch('/cities/{id}', {
    responses: {
      '204': {
        description: 'City PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(City, {partial: true}),
        },
      },
    })
    city: City,
  ): Promise<void> {
    await this.cityRepository.updateById(id, city);
  }

  @put('/cities/{id}', {
    responses: {
      '204': {
        description: 'City PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() city: City,
  ): Promise<void> {
    await this.cityRepository.replaceById(id, city);
  }

  @del('/cities/{id}', {
    responses: {
      '204': {
        description: 'City DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cityRepository.deleteById(id);
  }
}
