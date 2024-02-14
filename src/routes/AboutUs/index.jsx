import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Breadcrumbs from "../../components/breadcrumbs";
import "../Whishlist/Whishlist.scss";
export default function AboutUs() {
  const { aboutus } = useSelector((state) => state.footerContent.footerContent);
  useEffect(() => {
    document.title = "Hoconn : About Us";
  }, []);
  return (
    <div>
      <div className="whishlist-breadcrumbs-alignment">
        <Breadcrumbs />
      </div>
      <div className="whishlist-card-all-content-alignment">
        <div className="container-lg">
          <div className="page_header">About Us</div>
          {aboutus?.length > 0 ? (
            aboutus?.map(({ data }, i) => {
              return (
                <div className="data_content" key={i}>
                  <div className="data_heading">{data?.heading}</div>
                  <div className="data_description">{data?.description}</div>
                </div>
              );
            })
          ) : (
            <div className="no_cats"> No about us listed.</div>
          )}
        </div>
      </div>
    </div>
  );
}
