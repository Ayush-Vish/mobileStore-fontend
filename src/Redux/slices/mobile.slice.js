import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axios";
import toast from "react-hot-toast";

const initialState = {
  user: {
    name: "",
    email: "",
  },
  mobiles: [],
  cart: [],
  isMenuOpen: false,
  priceFilter: null,
  brandFilter: null,
  processorFilter: null,
  oSFilter: null,
  memoryFilter: null,
  appliedFilters: [],
  filteredMobiles: [],
  pending : false, 
  pending2: false
};

export const searchMobiles = createAsyncThunk(
  "mobile/searchMobiles",
  async (value) => {
    try {

      const res =  axiosInstance.get(`/search?search=${value}&`);
      toast.promise(res, {
        loading: "Loading",
        success: "Mobiles Loaded",
        error: "Something went wrong",
      });
      return (await res).data;
    } catch (error) {
        toast.error(error.message);
    }
  }
);

export const getMobiles = createAsyncThunk(
  "mobile/getMobiles",
  async ({ name, type, processor, memory, OS, price }) => {
    try {
      let queryParams = "";
      if (name) queryParams += `name=${name}&`;
      if (type) queryParams += `type=${type}&`;
      if (processor) queryParams += `processor=${processor}&`;
      if (memory) queryParams += `memory=${memory}&`;
      if (OS) queryParams += `OS=${OS}&`;
      if (price) queryParams += `price=${price}&`;

      const res = axiosInstance.get(`/api/mobiles?${queryParams}`);
      toast.promise(res, {
        loading: "Loading",
        success: "Mobiles Loaded",
        error: "Something went wrong",
      });
      return (await res).data;
    } catch (error) {
      toast.error("Something ", error.message);
    }
  }
);

export const getAllMobiles = createAsyncThunk(
  "mobile/getAllMobiles",
  async () => {
    try {
      const res = axiosInstance.get(`/api/mobiles`);

      return (await res).data;
    } catch (error) {
      toast.error("Something ", error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "mobile/addToCart",
  async ({ id }) => {
    try {
      const res = axiosInstance.post(`/api/cart?id=${id}`);
      toast.promise(res, {
        loading: "Adding to cart",
        success: "Added to cart",
        error: "Something went wrong",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error.message);
    }
  }
);

export const getCarts = createAsyncThunk("mobile/getCarts", async () => {
  try {
    const res = axiosInstance.get(`/api/cart`);
    toast.promise(res, {
      loading: "Loading",
      success: "Loaded",
      error: "Something went wrong",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error.message);
  }
});

export const removeFromCart = createAsyncThunk(
  "mobile/removeFromCart",
  async ({ id }) => {
    try {
      const res = axiosInstance.delete(`/api/cart/${id}`);
      toast.promise(res, {
        loading: "Removing from cart",
        success: "Removed from cart",
        error: "Something went wrong",
      });
    } catch (error) {
      toast.error(error.message);
    }
  }
);


export const getCart = createAsyncThunk("mobile/getCart", async () => {
    try {
        const res = axiosInstance.get(`/api/cart`);
        toast.promise(res, {
            loading: "Loading",
            success: "Loaded",
            error: "Something went wrong",
        });
        return (await res).data;
    } catch (error) {
        toast.error(error.message);
    }
});

const mobileSlice = createSlice({
  name: "mobile",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    applyFilter: (state, action) => {

      state.appliedFilters.push(action.payload);
      if (action.payload.type.type === "price")
        state.priceFilter = action.payload.type.value;
      if (action.payload.type.type === "brand")
        state.brandFilter = action.payload.type.value;
      if (action.payload.type.type === "processor")
        state.processorFilter = action.payload.type.value;
      if (action.payload.type.type === "os")
        state.oSFilter = action.payload.type.value;
      if (action.payload.type.type === "memory")
        state.memoryFilter = action.payload.type.value;

    },
    removeFilter: (state, action) => {
      state.appliedFilters = state.appliedFilters.filter(
        (filter) =>
          filter.type.type !== action.payload.type ||
          filter.type.value !== action.payload.value
      );
      if (action.payload.type === "price") state.priceFilter = null;
      if (action.payload.type === "brand") state.brandFilter = null;
      if (action.payload.type === "processor") state.processorFilter = null;
      if (action.payload.type === "os") state.oSFilter = null;
      if (action.payload.type === "memory") state.memoryFilter = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMobiles.fulfilled, (state, action) => {
        console.log(action)
        state.mobiles = action?.payload?.data?.mobiles;
        state.pending = false;

      })
      .addCase(getAllMobiles.pending, (state, action) => {
        console.log(action)

        state.pending = true;
      } )
      .addCase(getAllMobiles.rejected, (state, action) => {
        console.log(action)

        state.pending = true;
        })

      .addCase(getMobiles.fulfilled, (state, action) => {
        state.filteredMobiles = action.payload.data.mobiles;
        state.pending = false;
      })
      .addCase(searchMobiles.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(searchMobiles.fulfilled, (state, action) => {
        state.filteredMobiles = action.payload.data.mobiles;
        state.pending = false;
        
      })
      
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action?.payload?.data.cart;
      })
      .addCase(getCarts.fulfilled, (state, action) => {
        state.cart = action?.payload.data.cart;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload.data.cart;
      })
        .addCase(getCart.fulfilled, (state, action) => {
            state.cart = action.payload.data.cart;
        });

      
  },
});

export const { toggleMenu, applyFilter, removeFilter } = mobileSlice.actions;

export default mobileSlice.reducer;
