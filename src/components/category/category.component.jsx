import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { CategoriesContex } from "../contexts/categories.context";
import ProductCard from "../product-card/product-card.component";

import "./category.styles.scss";

function Category() {
  const { category } = useParams();
  const fixedCategoryName = category.toLowerCase();
  const { categoriesMap } = useContext(CategoriesContex);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(
      categoriesMap[
        fixedCategoryName[0].toUpperCase() + fixedCategoryName.slice(1)
      ]
    );
  }, [category, fixedCategoryName, categoriesMap]);

  return (
    <div className="category-container">
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
}

export default Category;
