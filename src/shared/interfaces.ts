export interface Country {
  country: string;
  countryFullInfo: {
    _id: string;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
    currency:string;
    countryInfo: {
      en: CountryDescription;
      ru: CountryDescription;
      be: CountryDescription;
    };
  };
}

export interface CountryDescription {
  countryName: string;
  capital: string;
  aboutCountry: string;
  attractions: AttractionDescription[];
  video: string;
}

export interface AttractionDescription {
  image: string;
  name: string;
  description: string;
}
export interface WeatherDescritpion {
  temp: string;
  wind: string;
  humidity: string;
  weather: {
    id: string;
    main: string;
    icon: string;
    description: string;
  },
}

export interface TimeDescritpion {
  time_24: string;
  date: string;
  timezone_offset:number
}

export interface CurrencyDescritpion {
  eur: any;
  rub: any;
  local: any;
}

