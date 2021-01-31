import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

const findAllRes = {
  status: 'success',
  data: [
    {
      id: '1',
      employee_name: 'Tiger Nixon',
      employee_salary: '320800',
      employee_age: '61',
      profile_image: '',
    },
    {
      id: '2',
      employee_name: 'ddd ssss',
      employee_salary: '110800',
      employee_age: '33',
      profile_image: '',
    },
  ],
};

@Injectable()
export class EmployeesService {
  create(createEmployeeDto: CreateEmployeeDto) {
    return 'This action adds a new employee';
  }

  findAll() {
    return findAllRes;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
