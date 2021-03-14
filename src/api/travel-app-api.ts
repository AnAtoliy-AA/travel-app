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
    
    login(email: string, password: string) {
      return  axios
            .post('https://travel-app-back-end.herokuapp.com/api/auth/login', {
                email: email,
                password: password,
            })
            .then((response) => {
                // authStore.setToken(response.data.token);
                // authStore.setIsAuth(true);
                // getSettings();
                // getLastGame();
                // getStatistics();
                return response.data;
            })
            .catch((er) => {
                console.log('error: ', er.message);
            });
    },
    
    
}