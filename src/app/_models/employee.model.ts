import  {EmployeeLocation} from "./location.model";

export class Employee {
    crisisId?:string;
    db_idx?:number; //key in db
    id?: string; // work id
    name: string;
    mobile_number: string;
    home_address: string;
    emergency_contact: string;
    emergency_contact_mobile_number: string;
    location?: EmployeeLocation;
    is_safe?:boolean;
    support_requests?:string;
    constructor(apiModel: any) {
        this.id = apiModel?.id;
        this.name = apiModel?.name;
        this.mobile_number = apiModel?.mobile_number;
        this.home_address = apiModel?.home_address;
        this.emergency_contact = apiModel?.emergency_contact;
        this.emergency_contact_mobile_number = apiModel?.emergency_contact_mobile_number;
        this.location = apiModel.location&& new EmployeeLocation(apiModel.location);
        this.is_safe = apiModel.is_safe === null || apiModel.is_safe === undefined ? undefined:apiModel.is_safe;
        this.support_requests = apiModel.support_requests;
    }
}