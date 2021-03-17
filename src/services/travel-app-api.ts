import axios from "axios";

export const TRAVEL_APP_API = "https://travel-app-back-end.herokuapp.com/";

export const travelAppApi = {
  getAllCountries() {
    return axios.get(`${TRAVEL_APP_API}api/countries`).then((response) => {
      return response.data;
    });
  },

  login(email: string, password: string) {
    return axios
      .post(`${TRAVEL_APP_API}api/auth/login`, {
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

  register(userName: string, email: string, password: string, image?: any) {
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    if (image) {
      formData.append("image", image);
    }
    return axios({
      method: "post",
      url: `${TRAVEL_APP_API}api/auth/register`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
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
        `${TRAVEL_APP_API}api/countries/`,
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
