import { Routes, Route } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { useEffect } from "react";
import { getCategoriesAndDocuments } from "../../../utils/firebase/firebase.utils";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import { setCategoriesMap } from "../../../store/categories/category.action";

import Category from "../../category/category.component";

function Shop() {
  const dispatch = useDispatch()
  useEffect(() => {

    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      dispatch(setCategoriesMap(categoryMap))
    };

    getCategoriesMap()
  }, [dispatch]);

  return(
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path={":category"} element={<Category />} />
    </Routes>
  )
}

export default Shop;
