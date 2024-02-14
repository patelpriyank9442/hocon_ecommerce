import React from "react";
import { useSelector } from "react-redux";
import "./sidebar.scss";
export default function Sidebar() {
  const { colors } = useSelector((state) => state.colors);

  return (
    <div className="sidebar-design">
      <div className="sidebar-header">
        <span>Filters</span>
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div className="content-all-alignment">
        <h4>Category</h4>
        <div className="all-checkbox-alignment">
          <div className="checkbox-text">
            <div>
              <input type="checkbox" id="Donuts1" />
              <label htmlFor="Donuts1"></label>
            </div>
            <div>
              <span>Saree</span>
            </div>
          </div>
          <div className="checkbox-text">
            <div>
              <input type="checkbox" id="Donuts1" />
              <label htmlFor="Donuts1"></label>
            </div>
            <div>
              <span>Kurti</span>
            </div>
          </div>
          <div className="checkbox-text">
            <div>
              <input type="checkbox" id="Donuts1" />
              <label htmlFor="Donuts1"></label>
            </div>
            <div>
              <span>Gown & Dupatta</span>
            </div>
          </div>
          <div className="checkbox-text">
            <div>
              <input type="checkbox" id="Donuts1" />
              <label htmlFor="Donuts1"></label>
            </div>
            <div>
              <span>One Piece</span>
            </div>
          </div>
        </div>
      </div>
      <div className="content-all-alignment">
        <h4>Product Status</h4>
        <div className="all-checkbox-alignment">
          <div className="checkbox-text">
            <div>
              <input type="checkbox" id="Donuts1" />
              <label htmlFor="Donuts1"></label>
            </div>
            <div>
              <span>In Stock</span>
            </div>
          </div>
          <div className="checkbox-text">
            <div>
              <input type="checkbox" id="Donuts1" />
              <label htmlFor="Donuts1"></label>
            </div>
            <div>
              <span>On Sale</span>
            </div>
          </div>
        </div>
      </div>
      <div className="content-all-alignment">
        <h4>Price</h4>
        <div className="range-alignment">
          <span>₹0 - ₹5000</span>
          <input
            type="range"
            min="1"
            max="100"
            className="slider"
            id="myRange"
          />
        </div>
      </div>
      <div className="content-all-alignment">
        <h4>Color</h4>
        <div className="all-checkbox-alignment">
          {colors.map((row, i) => {
            return (
              <div className="checkbox-text-color" key={i}>
                <div className="color_left">
                  <div>
                    <input type="checkbox" id="Donuts1" />
                    <label htmlFor="Donuts1"></label>
                  </div>
                  <div>
                    <span>{row?.name}</span>
                  </div>
                </div>
                <div
                  className="color_right"
                  style={{ background: `#${row.code}` }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="content-all-alignment">
        <h4>Size</h4>
        <div className="all-checkbox-alignment">
          <div className="checkbox-text">
            <div>
              <input type="checkbox" id="Donuts1" />
              <label htmlFor="Donuts1"></label>
            </div>
            <div>
              <span>XXS</span>
            </div>
          </div>
          <div className="checkbox-text">
            <div>
              <input type="checkbox" id="Donuts1" />
              <label htmlFor="Donuts1"></label>
            </div>
            <div>
              <span>XS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
