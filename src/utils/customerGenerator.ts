// src/utils/customerGenerator.ts
import Chance from 'chance';
import { Customer } from '../types/Customer';

const chance = new Chance();

let currentId = 0;

export const generateCustomers = (count: number): Customer[] => {
  return Array(count).fill(0).map(() => ({
    id: ++currentId,
    name: chance.name(),
    title: chance.profession(),
    address: chance.address(),
  }));
};