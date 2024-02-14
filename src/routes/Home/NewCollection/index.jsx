import React from "react";
import "./NewCollection.scss";
import CollectionImage from "../../../assets/imges/new-collec tion.png";
import CollectionImage1 from "../../../assets/imges/child-collection.png";
import { useSelector } from "react-redux";
export default function NewCollection() {
  const { newcollection } = useSelector(
    (state) => state?.dashboardContent?.dashboardContent
  );

  return (
    <div>
      <div className="new-collections-all-content-alignment">
        <div className="container-lg">
          <div className="grid">
            <div className="grid-items">
              <div className="first-image-style">
                <img
                  src={
                    newcollection[0]?.image
                      ? newcollection[0]?.image
                      : CollectionImage
                  }
                  alt="CollectionImage"
                />
              </div>
              <h3>{newcollection[0]?.name}</h3>
              <p>{newcollection[0]?.description}</p>
              <button>shop now</button>
            </div>
            <div className="grid-items">
              <h3>{newcollection[1]?.name}</h3>
              <p>{newcollection[1]?.description}</p>
              <button>shop now</button>
              <div className="child-image">
                <img
                  src={
                    newcollection[1]?.image
                      ? newcollection[1]?.image
                      : CollectionImage1
                  }
                  alt="CollectionImage1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
