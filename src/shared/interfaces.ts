export interface Country {
  country: string;
  countryFullInfo: {
    _id: string;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
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
