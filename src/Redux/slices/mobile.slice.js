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
    reducers:{}, 
    extraReducers : (builder ) => {


        builder.addCase(
            getMobiles.fulfilled, (state, action) => {
                state.mobiles = action.payload.data.mobiles;

                console.log(state ,action)
            }
        )
     

    }
})


export default mobileSlice.reducer;