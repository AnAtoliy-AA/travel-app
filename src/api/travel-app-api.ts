import { Country } from "./../shared/interfaces";
import axios from "axios";

const TRAVEL_APP_API = "https://travel-app-back-end.herokuapp.com/api/";

export const travelAppApi = {
  getAllCountries() {
    return axios.get(`${TRAVEL_APP_API}countries`).then((response) => {
      //   const allCountriesInfo = response.data.map((el: { list: Country[]; }) => {
      //     return el.list[0]
      //   })
      return response.data;
    });
  },

  login(email: string, password: string) {
    return axios
      .post(`${TRAVEL_APP_API}auth/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        return response.data;
      })
      .catch((er) => {
        console.log("error: ", er.message);
      });
  },

  register(userName: string, email: string, password: string) {
    return axios
      .post(`${TRAVEL_APP_API}auth/register`, {
        userName: userName,
        email: email,
        password: password,
      })
      .then((response) => {
        return response.data;
      })
      .catch((er) => {
        console.log("error: ", er.message);
      });
  },

  updateCountryMark(
    countryId: string,
    token: string,
    userMark: number,
    userId: string,
    userName: string
  ) {
    axios
      .patch(
        `${TRAVEL_APP_API}countries/`,
        {
          id: countryId,
          mark: userMark,
          userId: userId,
          userName: userName,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((response) => {
        return response.data;
      });
  },
};
