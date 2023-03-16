import { Car } from '../../../models/car';

export const carMock1: Car = {
  brand: 'VW',
  carId: 1,
  constructionYear: 2020,
  createdOn: '',
  currency: 'EUR',
  model: 'Golf',
  precision: 0,
  price: 100,
};
export const carMock2: Car = {
  brand: 'Opel',
  carId: 2,
  constructionYear: 2014,
  createdOn: '',
  currency: 'EUR',
  model: 'Kadett',
  precision: 0,
  price: 200,
};
export const carMock3: Car = {
  brand: 'Mercedes',
  carId: 3,
  constructionYear: 2018,
  createdOn: '',
  currency: 'EUR',
  model: 'A-Class',
  precision: 0,
  price: 300,
};

export const carsMock: Car[] = [
  carMock1,
  carMock2,
  carMock3,
  carMock1,
  carMock2,
  carMock3,
  carMock1,
  carMock2,
  carMock3,
  carMock1,
  carMock2,
  carMock3,
];
