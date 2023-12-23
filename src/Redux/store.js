import { configureStore } from "@reduxjs/toolkit";

import mobileSlicereducer from "./slices/mobile.slice";
const store = configureStore({  
    reducer  :{
        mobile : mobileSlicereducer, 
       
     } ,
    devTools  :true 
}); 

export default store; 