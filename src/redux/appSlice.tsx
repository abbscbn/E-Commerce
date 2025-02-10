import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductType, UserType } from "../Types/Types";

export interface AppSliceType {
  currentUser: UserType | null;
  loading: boolean;
  drawer: boolean;
  product: ProductType[] | null;
}

const initialState: AppSliceType = {
  currentUser: null,
  loading: false,
  drawer: false,
  product: [],
};

const AppSliceType = createSlice({
  name: "app",
  initialState,
  reducers: {
    calculateBalance: (state: AppSliceType, action: PayloadAction<number>) => {
      if (state.currentUser) {
        const payload: UserType = {
          ...state.currentUser,
          balance: action.payload,
        };
        state.currentUser = payload;
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
      }
    },

    setDrawer: (state: AppSliceType, action: PayloadAction<boolean>) => {
      state.drawer = action.payload;
    },
    setLoading: (state: AppSliceType, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCurrentUser: (
      state: AppSliceType,
      action: PayloadAction<UserType | null>
    ) => {
      state.currentUser = action.payload;
    },
    setProducts: (
      state: AppSliceType,
      action: PayloadAction<ProductType[] | null>
    ) => {
      state.product = action.payload;
    },
    filterProducts: (state: AppSliceType, action: PayloadAction<string>) => {
      const tempList: ProductType[] = [];
      state.product?.map((product: ProductType) => {
        if (
          product.title.toLowerCase().includes(action.payload.toLowerCase())
        ) {
          tempList.push(product);
        }

        state.product = [...tempList];
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLoading,
  setCurrentUser,
  setProducts,
  filterProducts,
  setDrawer,
  calculateBalance,
} = AppSliceType.actions;

export default AppSliceType.reducer;
