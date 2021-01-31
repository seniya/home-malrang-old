import fetch from 'node-fetch';
import { IEmployee } from './employee.interface';

const url = 'http://localhost:3000/employees';
// 'http://dummy.restapiexample.com/api/v1/employees'
export const apiEmployees = async (): Promise<IEmployee> => {
  return await fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json() as Promise<IEmployee>;
  });
};
