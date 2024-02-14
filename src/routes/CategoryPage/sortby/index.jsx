import React, { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../sidebar";
import "./sortby.scss";
export default function Sortby() {
  const [filterpanel, setFilterpanel] = useState(false);
  const { catProds } = useSelector((state) => state.categrory);

  return (
    <div>
      <div className="mobile-filter-show">
        <div
          className="button-right-alignment"
          onClick={() => setFilterpanel(!filterpanel)}
        >
          <button>Filter View</button>
        </div>
      </div>
      <div className="sort-by-all-contnet-alignment">
        <span>{catProds?.length} Items</span>
        <select name="" id="">
          <option value="">Sort by</option>
        </select>
      </div>
      {filterpanel && <div className="mobile-view-filter-blur"></div>}
      <div
        className={
          filterpanel
            ? "mobile-filter-show-slider m-filter-show"
            : "mobile-filter-show-slider m-filter-hidden"
        }
      >
        <Sidebar />
      </div>
    </div>
  );
}
