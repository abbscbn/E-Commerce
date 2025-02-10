import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../Types/Types";

export interface BasketSliceType {
  basket: ProductType[];
  totalAmout: number;
}

const initialState: BasketSliceType = {
  basket: [],
  totalAmout: 0,
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    removeProductFromBasket: (
      state: BasketSliceType,
      action: PayloadAction<number>
    ) => {
      state.basket = [
        ...state.basket.filter(
          (product: ProductType) => product.id !== action.payload
        ),
      ];
    },
    calculateBasket: (state: BasketSliceType) => {
      let totelAmount: number = 0;
      state.basket &&
        state.basket.map((product: ProductType) => {
          if (product.count) {
            totelAmount += product.price * product.count;
          }
        });
      state.totalAmout = totelAmount;
    },
    setBasket: (
      state: BasketSliceType,
      action: PayloadAction<ProductType[]>
    ) => {
      state.basket = [...action.payload];
    },
    addProductToBakset: (
      state: BasketSliceType,
      action: PayloadAction<ProductType>
    ) => {
      if (state.basket.length == 0) {
        state.basket = [action.payload];
      } else {
        const findProduct = state.basket.find(
          (product: ProductType) => product.id === action.payload.id
        );
        if (findProduct) {
          if (findProduct.count && action.payload.count) {
            findProduct.count = findProduct.count + action.payload.count;

            state.basket = [
              ...state.basket.map((product: ProductType) =>
                product.id == findProduct.id ? findProduct : product
              ),
            ];
          }
        } else {
          state.basket = [...state.basket, action.payload];
        }
      }
      localStorage.setItem("basket", JSON.stringify(state.basket));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProductToBakset, setBasket, calculateBasket,removeProductFromBasket } =
  basketSlice.actions;

export default basketSlice.reducer;
