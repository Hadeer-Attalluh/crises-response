export class EmployeeLocation {
    long: any;
    lat: any;
    constructor(apimodel:any) {
        this.long = apimodel.long;
        this.lat = apimodel.lat;
        
    }
}