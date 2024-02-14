import confetti from "canvas-confetti";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn, updateUser } from "../../../store/ApiSlice/authSlice";
import "./EditProfile.scss";
import { toast } from "react-hot-toast";
export default function EditProfile() {
  const user = useSelector((state) => state.auth.user);
  // const [name, setName] = useState(user?.name);
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState(user);
  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const validation = () => {
    let formIsValid = true;

    if (
      !inputData?.firstName?.trim() &&
      !inputData?.lastName?.trim() &&
      !inputData?.mobile?.trim()
    ) {
      formIsValid = false;
      toast("Please fill the registration form.");
    } else if (!inputData?.firstName?.trim()) {
      formIsValid = false;
      toast("Please enter firstname.");
    } else if (!inputData?.lastName?.trim()) {
      formIsValid = false;
      toast("Please enter lastname.");
    } else if (!inputData?.mobile?.trim()) {
      formIsValid = false;
      toast("Please enter contact.");
    } else {
      return formIsValid;
    }
  };

  const handleUpdate = async () => {
    if (validation()) {
      dispatch(updateUser(inputData)).then((res) => {
        setModal({});
        toast.success("Profile Updated.");
      });
    }
  };

  return (
    <div>
      <div className="edit-profile-all-content-alignment">
        <div className="box-header">
          <span>Edit Profile</span>
        </div>
        <div className="box-body">
          <div className="two-col-grid">
            <div className="input">
              <label>First Name</label>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={inputData.firstName}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>

            <div className="input">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={inputData.lastName}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>

            <div className="input">
              <label>Mobile No</label>
              <input
                type="number"
                placeholder="Mobile No"
                name="mobile"
                value={inputData.mobile}
                onChange={(e) => {
                  e.target.value.length <= 10 && handleChange(e);
                }}
              />
            </div>

            <div className="input">
              <label>Email</label>
              <input type="text" disabled value={user?.email} />
            </div>
          </div>
          <div className="two-button-alignment">
            <button>Cancel</button>
            <button
              onClick={() => {
                handleUpdate();
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
