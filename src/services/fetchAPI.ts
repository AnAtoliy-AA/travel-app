import {APIWEATHERURL, APIWEATHERKEY, APICURRANCY, APICURRANCYKEY} from './api';

const getWeather=async (city:string='Moskaw')=> {
  const result=await fetch(`${APIWEATHERURL}${city}&appid=${APIWEATHERKEY}&lang=en`)
    .then((resp)=> {
      return resp.json();
    })
    .then((data:any)=> {
      return data
    })
    .catch(function (error) {
      console.log("Something went wrong", error);
      return error
    });
    // console.log(result);

    return result
}
// const getTime=async (city:string='Moskaw')=> {
//   const result=await fetch(`${APITIMEZONE}?apiKey=${APITIMEKEY}&location=${city}`)
//     .then((resp)=> {
//       return resp.json();
//     })
//     .then((data:any)=> data)
//     .catch(function (error) {
//       console.log("Something went wrong", error);
//       return error
//     });
//     console.log(result);

//     return result
// }

const getCurrancy=async (val:string='RUB')=> {
  const result=await fetch(`${APICURRANCY}live?access_key=${APICURRANCYKEY}&currencies=EUR,RUB,${val}&format=1`)

    .then((resp)=> {
      return resp.json();
    })
    .then((data:any)=> {
      // console.log(data)
      return data
    })
    .catch(function (error) {
      console.log("Something went wrong", error);
      return error
    });
    // console.log(result);

    return result
}

export {getWeather,getCurrancy}