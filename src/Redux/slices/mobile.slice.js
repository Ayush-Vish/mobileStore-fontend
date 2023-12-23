import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axios";
import toast from "react-hot-toast";


const initialState = {
    user : {
        name : "", 
        email : "", 
    }, 
    mobiles : [],
    cart: [],
    isMenuOpen : false,
    priceFilter : null, 
    brandFilter : null , 
    processorFilter : null, 
    oSFilter : null, 
    appliedFilters : [], 
    filteredMobiles : []

}

export const searchMobiles = createAsyncThunk("mobile/searchMobiles",async ( value) => {
    try {
        console.log(value);

        const res = await axiosInstance.get(`/search?search=${value}&`);
        return (await res).data;

    } catch (error) {
        console.log(error.message);

    }
} )

export const getMobiles = createAsyncThunk("mobile/getMobiles", async ( { name, type, processor, memory, OS, price}) => {
    try {
        let queryParams= "";
        if(name) queryParams += `name=${name}&`;
        if(type) queryParams += `type=${type}&`;
        if(processor) queryParams += `processor=${processor}&`;
        if(memory) queryParams += `memory=${memory}&`;
        if(OS) queryParams += `OS=${OS}&`;
        if(price) queryParams += `price=${price}&`;
        console.log(queryParams)

        const res=  axiosInstance.get(`/api/mobiles?${queryParams}`);
        console.log("wjdbfawjdbfhjksdb")
        toast.promise(res  , {
            loading : "Loading",
            success : "Mobiles Loaded",
            error : "Something went wrong"

        })
        return (await res).data
    } catch (error) {
        console.log(error)
        toast.error("Something " , error.message )
    }
})


export const getAllMobiles = createAsyncThunk("mobile/getAllMobiles", async ( ) => {
    try {
      

        const res=  axiosInstance.get(`/api/mobiles`);

        
        return (await res).data
    } catch (error) {

        toast.error("Something " , error.message )
    }
})
const mobileSlice = createSlice({
    name : "mobile",
    initialState,
    reducers:{
        toggleMenu : (state) => {
            state.isMenuOpen = !state.isMenuOpen
        },
        applyFilter: (state, action) => {
            console.log(action);

            state.appliedFilters.push(action.payload);
            if (action.payload.type.type === "price") state.priceFilter = action.payload.type.value;
            if (action.payload.type.type === "brand") state.brandFilter = action.payload.type.value;
            if (action.payload.type.type === "processor") state.processorFilter = action.payload.type.value;
            if (action.payload.type.type === "os") state.oSFilter = action.payload.type.value;


            console.log(state)
          },
        removeFilter: (state, action) => {
            console.log(action);
            console.log(state.appliedFilters)
            state.appliedFilters = state.appliedFilters.filter(
                (filter) => filter.type.type !== action.payload.type || filter.type.value !== action.payload.value
            );
            if (action.payload.type === "price") state.priceFilter = null;
            if (action.payload.type === "brand") state.brandFilter = null;
            if (action.payload.type === "processor") state.processorFilter = null;
            if (action.payload.type === "os") state.oSFilter = null;


        }, 
  
    }, 
    extraReducers : (builder ) => {


        builder.addCase(
            getAllMobiles.fulfilled, (state, action) => {
                console.log(action);

                state.mobiles = action.payload.data.mobiles;

            }

        )
        .addCase(getMobiles.fulfilled , (state , action ) => { 
            state.filteredMobiles=action.payload.data.mobiles;
        })
        .addCase(searchMobiles.fulfilled , (state , action ) => {
            console.log(action);
            state.filteredMobiles=action.payload.data.mobiles;
        })
     

    }
})



export const {toggleMenu , applyFilter , removeFilter } = mobileSlice.actions;


export default mobileSlice.reducer;