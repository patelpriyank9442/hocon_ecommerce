import React, { useEffect, useState } from "react";
import "./productImage.scss";
import ChildImage from "../../../assets/imges/child-p-image.jpg";
import { useSelector } from "react-redux";
export default function ProductImage() {
  const { singleProduct } = useSelector((state) => state.singleProduct);
  const [image, setImage] = useState(singleProduct?.images[0]?.src);
  useEffect(() => {
    setImage(singleProduct?.images[0]?.src);
  }, [singleProduct]);

  return (
    <div>
      <div className="product-details-iamge-all-content-alignment">
        <div className="image-grid">
          <div className="image-grid-items">
            {singleProduct?.images?.length > 0 &&
              singleProduct?.images?.map((data, i) => {
                return (
                  <div className="child-image" key={i}>
                    <img
                      onClick={() => {
                        setImage(data?.src);
                      }}
                      src={data?.src ? data?.src : ChildImage}
                    />
                  </div>
                );
              })}
          </div>
          <div className="image-grid-items">
            <div className="full-image">
              <img src={image} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
