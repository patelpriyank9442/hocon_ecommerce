import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/breadcrumbs";
import ProductCard from "../../components/ProductCard";
import { Product } from "../../store/ApiSlice/singleProduct";
import "./CategoryPage.scss";
import FilterPanel from "./filterPanel";
import Sidebar from "./sidebar";
import Sortby from "./sortby";
export default function CategoryPage() {
  const { catProds, singleCategory } = useSelector((state) => state.categrory);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("singleCategory", singleCategory.name);
  useEffect(() => {
    document.title = "Hoconn : " + singleCategory.name;
  }, []);

  return (
    <div>
      <div className="category-page-breadcrumbs-alignment">
        <Breadcrumbs />
      </div>
      <div className="category-page-all-content-alignment">
        <div className="container-lg">
          <div className="flex">
            <div className="flex-items">
              <Sidebar />
            </div>
            <div className="flex-items">
              {catProds?.length > 0 && (
                <>
                  <Sortby />
                  <FilterPanel />
                </>
              )}

              <div className="card-flex">
                {catProds?.length === 0 ? (
                  <div className="no_cats"> No products found.</div>
                ) : (
                  catProds?.length > 0 &&
                  catProds?.map((row, i) => {
                    return (
                      <div className="card-flex-items" key={i}>
                        <ProductCard product={row} />
                      </div>
                    );
                  })
                )}
              </div>
              {catProds?.length > 0 && (
                <div className="load-more-button">
                  <button>LOAD MORE</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
