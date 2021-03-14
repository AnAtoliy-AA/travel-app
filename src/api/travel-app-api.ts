import { Country } from './../shared/interfaces';
import axios from 'axios';

const TRAVEL_APP_API = 'https://travel-app-back-end.herokuapp.com/';

export const travelAppApi = {
    getAllCountries() {
        return axios
        .get(`${TRAVEL_APP_API}api/countries`)
        .then((response) => {
          const allCountriesInfo = response.data.map((el: { list: Country[]; }) => {
            return el.list[0]
          })
          return allCountriesInfo;
        });
    },
}