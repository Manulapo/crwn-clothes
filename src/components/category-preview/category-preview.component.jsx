import { Link } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";
import "./category-preview.styles.scss";

function CategoryPreview({ title, products }) {
  return (
    <div>
      <div className="category-preview-container">
        <h2>
          <Link to={title.toLowerCase()} className="title">{title}</Link>
        </h2>
        <div className="preview">{products
        .filter((_, idx) => idx < 4)
        .map((product) =><ProductCard key={product.id} product={product}/>)
        }</div>
      </div>
    </div>
  );
}

export default CategoryPreview;
