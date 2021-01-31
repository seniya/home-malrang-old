export interface IEmployee {
  id: string;
  employee_name: string;
  employee_salary: string;
  employee_age: string;
  profile_image: string;
}

export interface IRequest {}

export interface IResponse {
  employees: IEmployee[];
}

export interface IError {
  message: string;
}
