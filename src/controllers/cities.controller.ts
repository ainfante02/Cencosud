// Uncomment these imports to begin using these cool features!

import { Filter, repository } from "@loopback/repository";
import { get, getModelSchemaRef, param, post, requestBody, ParseParams } from '@loopback/rest';
import { Cities } from "../models";
import { CdsRepository, CitiesRepository } from "../repositories";
import {Clima} from '../services';
 import {inject} from '@loopback/core';
 import { clearTimeout, setTimeout } from 'timers';
import { Cds } from '../models/cds.model';

export class CitiesController {

  constructor(
    @repository(CitiesRepository)
    public cityRepository : CitiesRepository,
    @repository(CdsRepository)
    public cdsRepository : CdsRepository,
    @inject('services.Clima')
    protected Clima: Clima
  ) {}


  @get('/cities/{cities}')
  async getCharacter(@param.path.string('cities') city: string,): Promise<object> {
  
    let apikey: string = '51c8a38f9050eb355411f395da45b8ad';  

    const res = await this.Clima.getCharacter( city,apikey)
    this.cdsRepository.set('cds', {
      'data':res,  
  })
 
    return await res;  

  }

  @post('/city', {
    responses: {
      '200': {
        description: 'Cities model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cities)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cities, {
            title: 'NewCities',
          }),
        },
      },
    })
    cities: Cities,
  ): Promise<any> {

    await this.cityRepository.set('cities', {
      'id':cities.id,
      'name':cities.name,
      'lon':cities.lon,
      'lat':cities.lat,
  });
    return cities
  }

  @get('/city', {
    responses: {
      '200': {
        description: 'Array of City model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Cities, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Cities) filter?: Filter<Cities>,
  ): Promise<any> {
    
    return await this.cityRepository.get('cities') ;
  }


  @get('/open', {
    responses: {
      '200': {
        description: 'Array of City model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Cds, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async findd(
    @param.filter(Cds) filter?: Filter<Cds>,
  ): Promise<any> {
    
    return await this.cdsRepository.get('cds') ;
  }

}


