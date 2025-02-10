import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { setLoading, setProducts } from "../redux/appSlice";
import CategoryService from "../services/CategoryService";
import { toast } from "react-toastify";
import ProductService from "../services/ProductService";
import { ProductType } from "../Types/Types";

function Category() {
  const dispatch = useDispatch();

  const handlecategory = async (
    e: React.ChangeEvent<HTMLInputElement>,
    categoriName: string
  ) => {
    try {
      if (e.target.checked) {
        const products: ProductType[] =
          await CategoryService.getProductsByCategoryName(categoriName);

        dispatch(setProducts(products));
      } else {
        const products: ProductType[] = await ProductService.getAllProducts();
        dispatch(setProducts(products));
      }
    } catch (error) {
      toast.error("Kategori getirilirken hata..." + error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const [categories, setcategories] = useState<string[]>();

  const getAllCategories = async () => {
    try {
      dispatch(setLoading(true));
      const categories: string[] = await CategoryService.getAllProducts();
      setcategories(categories);
    } catch (error) {
      toast.error("Katgori getirilirken hata..");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div style={{ margin: "70px 10px" }}>
      <h2>Kategoriler</h2>
      <FormGroup>
        {categories &&
          categories.map((categori: string, index: number) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handlecategory(e, categori)
                  }
                />
              }
              label={categori}
              style={{ marginTop: "20px" }}
            />
          ))}
      </FormGroup>
    </div>
  );
}

export default Category;
