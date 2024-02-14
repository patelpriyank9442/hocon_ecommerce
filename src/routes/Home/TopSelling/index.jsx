import React from "react";
import ProductCard from "../../../components/ProductCard";
import LineVector from "../../../assets/imges/line.svg";
import "./TopSelling.scss";
import { useSelector } from "react-redux";

export default function TopSelling() {
  const { bestSelling } = useSelector((state) => state.bestSelling);

  return (
    <div>
      {bestSelling?.length > 0 && (
        <div className="top-selling-all-content-alignment">
          <div className="top-selling-content-alignment">
            <h2>Top Selling</h2>
            <div className="line-center-alignment">
              <img src={LineVector} alt="LineVector" />
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida.
            </p>
          </div>

          <div className="container-lg">
            <div className="grid">
              {bestSelling?.map((data, i) => {
                return (
                  <div className="grid-items" key={i}>
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
