import React, { useEffect } from "react";
import "./Category.scss";
import CategoryImage from "../../../assets/imges/category-imatge.png";
import CategorySubImage from "../../../assets/imges/category-sub.png";
import { useDispatch, useSelector } from "react-redux";
import {
  CatProducts,
  getCategory,
  SingleCategory,
} from "../../../store/ApiSlice/categorySlice";
import { useNavigate } from "react-router-dom";

export default function Category() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const { category } = useSelector((state) => state.categrory);
  return (
    <div>
      <div className="all-category-content-alignment">
        <div className="container-lg">
          {/* <div className="grid">
            <div className="grid-items">
              <img src={CategoryImage} alt="CategoryImage" />
              <div className="content-alignment">
                <div className="text-style">
                  <span>Saree</span>
                </div>
              </div>
            </div>
            <div className="grid-items">
              <img src={CategoryImage} alt="CategoryImage" />
              <div className="content-alignment">
                <div className="text-style">
                  <span>Saree</span>
                </div>
              </div>
            </div>
            <div className="grid-items">
              <img src={CategoryImage} alt="CategoryImage" />
              <div className="content-alignment">
                <div className="text-style">
                  <span>Saree</span>
                </div>
              </div>
            </div>
          </div> */}
          {category?.length === 0 ? (
            <div className="no_cats"> No Categories found.</div>
          ) : (
            <div className="sub-grid">
              {category?.length > 0 &&
                category?.map((row, i) => {
                  return (
                    <div
                      className="sub-grid-items"
                      key={i}
                      onClick={() => {
                        dispatch(CatProducts(row.products));
                        dispatch(SingleCategory(row));

                        navigate("/category");
                      }}
                    >
                      <img
                        src={row?.image ? row?.image : CategoryImage}
                        alt="CategorySubImage"
                      />
                      <div className="content-alignment">
                        <div className="text-style">
                          <span>{row.name}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
