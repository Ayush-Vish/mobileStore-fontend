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
    appliedFilters : [], 
    
}

export const getMobiles = createAsyncThunk("mobile/getMobiles", async () => {
    try {
        const res=  axiosInstance.get("/api/mobiles");
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
        }, 
        setPriceFilter: (state, action) => {
            state.priceFilter = action.payload;
        },
        setBrandFilter: (state, action) => {
            state.brandFilter = action.payload;
        },
    }, 
    extraReducers : (builder ) => {


        builder.addCase(
            getMobiles.fulfilled, (state, action) => {
                state.mobiles = action.payload.data.mobiles;

            }
        )
     

    }
})

export const {toggleMenu , applyFilter , removeFilter , setBrandFilter  , setPriceFilter} = mobileSlice.actions;


export default mobileSlice.reducer;