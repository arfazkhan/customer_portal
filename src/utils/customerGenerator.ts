// src/utils/customerGenerator.ts
import Chance from 'chance';

const chance = new Chance();

export interface Customer {
  id: number;
  name: string;
  title: string;
  address: string;
}

export const generateCustomers = (count: number): Customer[] => {
  return Array(count).fill(0).map((_, index) => ({
    id: index + 1,
    name: chance.name(),
    title: chance.profession(),
    address: chance.address(),
  }));
};