export interface Country {
  country: string;
  countryFullInfo: {
    _id: string;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
    currency: string;
    countryInfo: {
      en: CountryDescription;
      ru: CountryDescription;
      be: CountryDescription;
    };
    marks: [
      {
        mark: string;
        userId: string;
        userName: string;
      }
    ]
  };
}

export interface CountryDescription {
  countryName: string;
  capital: string;
  timezone: number;
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
  month: string;
  day: string;
  year: string;
  hour: string;
  min: string;
  sec: string;
}

export interface CurrencyDescritpion {
  eur: number;
  rub: number;
  local: number;
}

export interface User {
  userName: string;
  email: string;
  password: string;
  imageSrc: string;
}