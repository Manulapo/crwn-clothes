import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../../category/category.component";
import { fetchCategoryAsync } from "../../../store/categories/category.action";

function Shop() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategoriesMap = async () => {
      dispatch(fetchCategoryAsync());
    };

    getCategoriesMap();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path={":category"} element={<Category />} />
    </Routes>
  );
}

export default Shop;
