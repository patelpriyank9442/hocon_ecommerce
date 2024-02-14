import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Breadcrumbs from "../../components/breadcrumbs";
import "../Whishlist/Whishlist.scss";
export default function PrivacyPolicy() {
  const { privacypolicy } = useSelector(
    (state) => state.footerContent.footerContent
  );
  useEffect(() => {
    document.title = "Hoconn : Privacy policy";
  }, []);

  return (
    <div>
      <div className="whishlist-breadcrumbs-alignment">
        <Breadcrumbs />
      </div>
      <div className="whishlist-card-all-content-alignment">
        <div className="container-lg">
          <div className="page_header">Privacy Policy</div>
          {privacypolicy?.length > 0 ? (
            privacypolicy?.map(({ data }, i) => {
              return (
                <div className="data_content" key={i}>
                  <div className="data_heading">{data?.heading}</div>
                  <div className="data_description">{data?.description}</div>
                </div>
              );
            })
          ) : (
            <div className="no_cats"> No privacy policies listed.</div>
          )}
        </div>
      </div>
    </div>
  );
}
