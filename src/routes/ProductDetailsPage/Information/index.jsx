import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Information.scss";
export default function Information() {
  const [dataType, setDataType] = useState("desc");
  const { singleProduct } = useSelector((state) => state?.singleProduct);
  return (
    <div>
      <div className="all-information-content-alignment">
        <div className="container-lg">
          <div className="tab">
            <span
              onClick={() => {
                setDataType("desc");
              }}
            >
              Description
            </span>
            <span
              onClick={() => {
                setDataType("info");
              }}
            >
              Additional information
            </span>
          </div>
          {dataType === "desc" && (
            <div className="details-text-style">
              {singleProduct?.description}
            </div>
          )}
          {dataType === "info" && (
            <div className="details-text-style">
              <span>Fabric Details :Saree : Organza</span>
              <span>Blouse : Organza</span>
              <span>Work : Digital Print</span>
              <span>Saree Length : 5.5 Meter</span>
              <span>Blouse Length : 0.8 Meter</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
