import { ToastContainer } from "react-toastify";
import "./App.css";
import RouterConfig from "./config/RouterConfig";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./companents/Spinner";
import Navbar from "./companents/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/Store";
import ProductService from "./services/ProductService";
import { setCurrentUser, setProducts } from "./redux/appSlice";
import { ProductType, UserType } from "./Types/Types";
import { useEffect } from "react";
import { setBasket } from "./redux/BasketSlice";
import BasketDetails from "./companents/BasketDetails";

function App() {
  const { currentUser } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  const getAllProducts = async () => {
    const products: ProductType[] = await ProductService.getAllProducts();
    dispatch(setProducts(products));
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    const currentUserString: string | null =
      localStorage.getItem("currentUser");
    if (currentUserString) {
      const currentUser: UserType = JSON.parse(currentUserString) as UserType;
      dispatch(setCurrentUser(currentUser));
    }
  }, []);

  useEffect(() => {
    const basketString = localStorage.getItem("basket");
    if (basketString) {
      const basket: ProductType[] = JSON.parse(basketString) as ProductType[];
      dispatch(setBasket(basket));
    }
  }, []);

  return (
    <div>
      <div>
        {currentUser && <Navbar />}
        <RouterConfig />
        <ToastContainer autoClose={500} />
        <Spinner />
        <BasketDetails/>
      </div>
    </div>
  );
}

export default App;
