import { EstateAgent } from "./estateAgent.model";

export class Estate {
  id: number;
  headline: string;
  description: string;
  estateType: EstateType;
  propertyType: PropertyType;
  numberOfBedRooms: number;
  numberOfBathRooms: number;
  squareMeter: number;
  price: number;
  balcony: boolean;
  garden: boolean;
  city: string;
  postCode: string;
  estateAgentId: string;
  estateAgent: EstateAgent; 
  realEstateCompanyId: number;
  landLordName: string;
  landLordPhone: string;
  landLordEmail: string;
  estatePictures: EstatePicture[];

  constructor() {
    this.id = 0;
    this.headline = "";
    this.description = "";
    this.estateType = EstateType.ForSale;
    this.propertyType = PropertyType.Apartment;
    this.numberOfBedRooms = 0;
    this.numberOfBathRooms = 0;
    this.squareMeter = 0;
    this.price = 0;
    this.balcony = false;
    this.garden = false;
    this.city = '';
    this.postCode = '';
    this.estateAgentId = "";
    this.estateAgent = new EstateAgent(); // EstateAgent sınıfı için varsayılan değer
    this.realEstateCompanyId = 0;
    this.landLordName = "";
    this.landLordEmail = "";
    this.landLordPhone = "";
    this.estatePictures = [];
  }
}

export class EstatePicture {
  id: number;
  img: string; // Assuming the image is a base64 string
  estateId: number;

  constructor() {
    this.id = 0;
    this.img = '';
    this.estateId = 0;
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


