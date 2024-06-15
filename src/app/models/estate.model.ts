export class Estate {
    headline : string;
    description : string;
    estateType: EstateType;
    propertyType : PropertyType
    numberOfBedRooms: number;
    numberOfBathRooms: number;
    squareMeter: number;
    price: number;
    balcony: boolean;
    garden: boolean;
    city: string;
    postCode: string; 
    estateAgentId:string;
    estateCompanyId:number;// Add this property
    landlordName:string;
    landlordPhone:string;
    landlordEmail:string;
  
    // Add a constructor to initialize the properties
    constructor() {
      this.headline = "";
      this.description = ""; 
      this.estateType = EstateType.ForSale; // Example initialization
      this.propertyType = PropertyType.Apartment;
      this.numberOfBedRooms = 0; // Example initialization
      this.numberOfBathRooms = 0; // Example initialization
      this.squareMeter = 0; // Example initialization
      this.price = 0; // Example initialization
      this.balcony = false; // Example initialization
      this.garden = false; // Example initialization
      this.city = ''; // Example initialization
      this.postCode = ''; // Initialize postCode property
      this.estateAgentId = "";
      this.estateCompanyId = 0;
      this.landlordName = "";
      this.landlordEmail = "";
      this.landlordPhone = "";
    }
  }
  
  
  export enum EstateType {
    ForSale = 0,
    ForRent = 1,
    DailyRent = 2
  }
  
  export enum PropertyType {
    Apartment = 0,
    Villa = 1,
    Home = 2,
    Office = 3,
    Building = 4,
    TownHouse = 5,
    Shop = 6,
    Garage = 7
  }
  