import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { readData, writeData } from 'src/utils/file-control';


@Injectable()
export class CountryService {
  create(createCountryDto: CreateCountryDto) {
    const country = readData();
    const newcountry = {id: !country.length ? 1 : country.at(-1).id + 1, ...createCountryDto};
    country.push(newcountry);
    writeData(country);
    return {
      statusCode: 201,
      message: 'success',
      data: newcountry
    }
  }

  findAll() {
    return {
      statusCode: 200,
      message: 'success',
      data: readData()
    }
  }

  findOne(id: number) {
    const country = readData();
    const res = country.find((country:any) => country.id === id)
    if(!country) {
      return {
        statusCode: 404,
        message: `Not found by id: ${id}`
      }    
    } 

    return {
      statusCode: 200,
      message: 'success',
      data: res
    }
  }
  

  update(id: number, updateCountryDto: UpdateCountryDto) {
    const countries = readData();
    const index = countries.find((country:any) => country.id === id);
    if(!index) {
      return {
        statusCode: 404,
        message: `Not found by id: ${id}`
      }    
    } 
    countries[index] = {...countries[index], ...updateCountryDto}
    countries.writeData();
    return {
      statusCode: 200,
      message: 'success',
      data: countries[index]
    }
  }

  remove(id: number) {
    const countries = readData();
    const index = countries.find((country:any) => country.id === id);
    if(!index) {
      return {
        statusCode: 404,
        message: `Not found by id: ${id}`
      }    
    } 
    countries.splice(index, 1)
    countries.writeData();
    return {
      statusCode: 200,
      message: 'success',
      data: {}
    }
  }
}