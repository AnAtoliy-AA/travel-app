import {ICONURL}from './api'

const getIcon=(icon:string)=>{
  return `${ICONURL}${icon}@2x.png`
}

export {getIcon }