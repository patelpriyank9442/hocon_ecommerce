import React from "react";
import { useSelector } from "react-redux";
import "./Help.scss";
export default function Help() {
  const { help } = useSelector((state) => state.footerContent.footerContent);
  return (
    <div>
      <div className="edit-profile-all-content-alignment">
        <div className="box-header">
          <span>Help</span>
        </div>
        <div className="box-body">
          {help?.length > 0 ? (
            help?.map((row, i) => {
              return (
                <div className="help_item" key={i}>
                  <div className="help_title">{row?.data?.heading}</div>
                  <div className="help_desc">{row?.data?.description}</div>
                </div>
              );
            })
          ) : (
            <div className="no_help">No help content published.</div>
          )}
        </div>
      </div>
    </div>
  );
}
