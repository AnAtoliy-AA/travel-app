import {APIWEATHERURL, APIWEATHERKEY, APITIMEZONE, APITIMEKEY} from './api';

const getWeather=async (city:string='Moskaw')=> {
  const result=await fetch(`${APIWEATHERURL}${city}&appid=${APIWEATHERKEY}`)
    .then((resp)=> {
      return resp.json();
    })
    .then((data:any)=> data)
    .catch(function (error) {
      console.log("Something went wrong", error);
      return error
    });
    // console.log(result);

    return result
}
const getTime=async (city:string='Moskaw')=> {
  const result=await fetch(`${APITIMEZONE}?apiKey=${APITIMEKEY}&location=${city}`)
    .then((resp)=> {
      return resp.json();
    })
    .then((data:any)=> data)
    .catch(function (error) {
      console.log("Something went wrong", error);
      return error
    });
    // console.log(result);

    return result
}

export {getWeather,getTime}