import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../../components/ProductCard";
import "./RelatedProduct.scss";
export default function RelatedProduct() {
  const catProds = useSelector((state) => state.categrory.catProds);

  return (
    <div>
      {catProds?.length > 0 && (
        <div className="related-product-all-content-alignment">
          <div className="container-lg">
            <div className="section-title">
              <p>Related Product</p>
            </div>
            <div className="flex-box">
              {catProds?.map((data, i) => {
                return (
                  <div className="flex-box-items" key={i}>
                    <ProductCard product={data} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
