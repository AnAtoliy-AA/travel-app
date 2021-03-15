import { Country } from './../shared/interfaces';
import axios from 'axios';
import { updateShorthandPropertyAssignment } from 'typescript';

const TRAVEL_APP_API = 'https://travel-app-back-end.herokuapp.com/api/';

export const travelAppApi = {
    getAllCountries() {
        return axios
        .get(`${TRAVEL_APP_API}countries`)
        .then((response) => {
          const allCountriesInfo = response.data.map((el: { list: Country[]; }) => {
            return el.list[0]
          })
          return allCountriesInfo;
        });
    },
    
    login(email: string, password: string) {
      return  axios
            .post(`${TRAVEL_APP_API}auth/login`, {
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

    register(userName: string, email: string, password: string) {
      return  axios
            .post(`${TRAVEL_APP_API}auth/register`, {
                userName: userName,
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

    updateCountryMark(countryId: string, token: string) {
    axios
    .get(
        `${TRAVEL_APP_API}countries/?id=604b6e432d686818644151d6`,
        // {
        //     list: {
        //         fieldSize: fieldSize,
        //         fieldWidth: fieldWidth,
        //         fieldHeight: fieldHeight,
        //         bombsQuantity: bombsQuantity,
        //         fieldStyle: fieldStyle,
        //         gameSoundVolume: gameSoundVolume,
        //         gameMusicVolume: gameMusicVolume,
        //         gameLanguage: gameLanguage,
        //     },
        // },
        {
            headers: {
                authorization: token,
            },
        },
    )
    .then((response) => {
      return response.data
    })
    
  }
}