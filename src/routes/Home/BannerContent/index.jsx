import React from "react";
import "./BannerContent.scss";
import BannerContentImage from "../../../assets/imges/content-image.png";
import BannerContentImage1 from "../../../assets/imges/content-image1.png";
import { useSelector } from "react-redux";
export default function BannerContent() {
  const { newcollection } = useSelector(
    (state) => state?.dashboardContent?.dashboardContent
  );

  return (
    <div>
      <div className="banner-content-all-alignment">
        <div className="container-lg">
          <div className="grid">
            <div className="grid-items">
              <img
                src={
                  newcollection?.length && newcollection[0]?.image
                    ? newcollection[0]?.image
                    : BannerContentImage
                }
                alt="BannerContentImage"
              />
              <div className="blur-div"></div>
              <div className="content-alignment">
                <div>
                  <h4>
                    {newcollection?.length && newcollection[0]?.name
                      ? newcollection[0]?.name
                      : BannerContentImage1}
                  </h4>
                  <button>shop now</button>
                </div>
              </div>
            </div>
            <div className="grid-items">
              <img
                src={newcollection?.length && newcollection[1]?.image}
                alt="BannerContentImage1"
              />
              <div className="blur-div"></div>
              <div className="content-alignment">
                <div>
                  <h4>{newcollection?.length && newcollection[1]?.name}</h4>
                  <button>shop now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
