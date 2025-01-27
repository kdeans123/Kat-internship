import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const NewItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();


// slider 

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  // Responsive settings for different screen sizes
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
};



  async function getNewItems() {
    try {
        const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
        setItems(data);
    } catch (error) {
        console.error("Error fetching items:", error);
    }
    finally {
      setIsLoading(false); // Disable loading state after fetch
    }

}

  useEffect(() => {
    getNewItems();
  }, []);



    // Loading skeleton 

    const LoadingSkeleton = () => (
      <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div className="nft__item" style={{ opacity: 0.7 }}>
          <div className="author_list_pp">
            <div className="lazy skeleton-loading" style={{ width: "50px", height: "50px", borderRadius: "50%", background: "#eee" }}></div>
          </div>
          <div className="de_countdown skeleton-loading" style={{ background: "#eee", height: "20px", width: "80%" }}></div>
          <div className="nft__item_wrap">
            <div className="skeleton-loading" style={{ height: "200px", background: "#eee", borderRadius: "8px" }}></div>
          </div>
          <div className="nft__item_info">
            <div className="skeleton-loading" style={{ height: "20px", width: "70%", background: "#eee", margin: "10px 0" }}></div>
            <div className="skeleton-loading" style={{ height: "15px", width: "40%", background: "#eee" }}></div>
          </div>
        </div>
      </div>
    );
  


  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {/* Show loading skeletons when data is being fetched */}
          {isLoading ? (
            // Render multiple skeleton loaders while content is loading
            [...Array(8)].map((_, index) => (
              <LoadingSkeleton key={index} />
            ))
          ) : (
            // Render actual NFT items once data is loaded
            items.map((item, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index} onClick={() => navigate(`${item.nftId}`)}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to="/author"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Creator: Monica Lucas"
                    >
                      <img className="lazy" src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="de_countdown">5h 30m 32s</div>
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <Link to="/item-details">
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <h4>{item.title}</h4>
                    </Link>
                    <div className="nft__item_price">{item.price}</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
