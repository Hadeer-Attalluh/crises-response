import { Employee } from "./employee.model";

export interface Crisis{
    id:string;
    employeeCheckList:Employee[];
}