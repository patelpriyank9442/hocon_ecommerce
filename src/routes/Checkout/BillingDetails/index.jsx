import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./BillingDetails.scss";
export default function BillingDetails(props) {
  const { inputData, handleChange } = props;

  return (
    <div>
      <div className="billing-details-all-content-alignment">
        <h1>Billing details</h1>
        <div className="two-col-grid">
          <div className="two-col-grid-items">
            <div className="input">
              <label>First name *</label>
              <input
                type="text"
                name="firstName"
                value={inputData?.firstName}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
          </div>
          <div className="two-col-grid-items">
            <div className="input">
              <label>Last name *</label>
              <input
                type="text"
                name="lastName"
                value={inputData?.lastName}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
          </div>
          <div className="two-col-grid-items">
            <div className="input">
              <label>Company name (optional)</label>
              <input
                type="text"
                name="companyName"
                value={inputData?.companyName}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
          </div>
          <div className="two-col-grid-items">
            <div className="input">
              <label>Country / Region *</label>
              <input
                type="text"
                name="country"
                value={inputData?.country}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
          </div>
        </div>
        <div className="input input-bottom-alignment">
          <label>Street address *</label>
          <input
            type="text"
            placeholder="House number and street name"
            style={{ margin: "0 0 10px 0" }}
            name="addressOne"
            value={inputData?.addressOne}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            type="text"
            placeholder="Apartment, suite, unit, etc (Optional)"
            name="addressTwo"
            value={inputData?.addressTwo}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="two-col-grid">
          <div className="input">
            <label>Town / City *</label>
            <input
              type="text"
              name="city"
              value={inputData?.city}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="input">
            <label>Pin *</label>
            <input
              type="number"
              name="pincode"
              value={inputData?.pincode}
              onChange={(e) => {
                e.target.value.length <= 6 && handleChange(e);
              }}
            />
          </div>
          <div className="input">
            <label>State *</label>
            <input
              type="text"
              name="state"
              value={inputData?.state}
              onChange={(e) => {
                //e.target.value.length <= 6 && handleChange(e);
                handleChange(e);
              }}
            />
          </div>
          <div className="input">
            <label>Phone *</label>
            <input
              type="number"
              name="mobile"
              value={inputData?.mobile}
              onChange={(e) => {
                e.target.value.length <= 10 && handleChange(e);
              }}
            />
          </div>
        </div>
        <div className="input input-bottom-alignment">
          <label>Email address *</label>
          <input
            type="text"
            name="email"
            value={inputData?.email}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="input ">
          <label>Additional Notes</label>
          <textarea
            placeholder="Note about your order"
            name="notes"
            value={inputData.notes}
            onChange={(e) => {
              handleChange(e);
            }}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
