import React from "react";
import "./filterPanel.scss";
import CloseIcon from "../../../assets/icons/close.svg";
export default function FilterPanel() {
  return (
    <div>
      <div className="filter-panel-all-content-alignment">
        <div className="all-button-alignment">
          <button>
            <span>Saree</span>
            <img src={CloseIcon} alt="CloseIcon" />
          </button>
          <button>
            <span>In Stock</span>
            <img src={CloseIcon} alt="CloseIcon" />
          </button>
          <button>
            <span>up to ₹1200</span>
            <img src={CloseIcon} alt="CloseIcon" />
          </button>
          <a>Clear All</a>
        </div>
      </div>
    </div>
  );
}
