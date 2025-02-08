import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
// Import Slider and its required CSS


import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Counter from "../UI/Counter";


const NewItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  // Carousel settings configuration
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // Responsive breakpoints for different screen sizes
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
      setIsLoading(true);
      const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getNewItems();
  }, []);





  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="px-2">
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
          {/* Section Header */}
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-up">New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {/* Carousel Container */}
          <div className="col-lg-12">
            <div className="nft-items-slider">
           
           
              {isLoading ? (
                // Loading state carousel
                <Slider {...settings}>
                  {[1, 2, 3, 4].map((_, index) => (
                    <LoadingSkeleton key={index} />
                  ))}
                </Slider>
                
              ) : (
                // Loaded content carousel
                <Slider {...settings}>
                  {items.map((item, index) => (
                    <div className="px-2" key={index}>
                      <div className="nft__item" >
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${item.authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Creator: Monica Lucas"
                          >
                            <img className="lazy" src={item.authorImage} alt="" data-aos="fade-up"/>
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                          <Counter itemExpiryDate={item.expiryDate} />

                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button data-aos="fade-up">Buy Now</button>
                              <div className="nft__item_share">
                                <h4 data-aos="fade-up">Share</h4>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-facebook fa-lg" data-aos="fade-up"></i>
                                </a>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-twitter fa-lg" data-aos="fade-up"></i>
                                </a>
                                <a href="">
                                  <i className="fa fa-envelope fa-lg" data-aos="fade-up"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                          <Link to={`/item-details/${item.nftId}`}>
                            <img
                              src={item.nftImage}
                              className="lazy nft__item_preview"
                              alt=""
                              data-aos="fade-up"
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info" data-aos="fade-up">
                          <Link to={`/item-details/${item.nftId}`}>
                            <h4 data-aos="fade-up">{item.title}</h4>
                          </Link>
                          <div className="nft__item_price" data-aos="fade-up">{item.price}</div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart" data-aos="fade-up"></i>
                            <span data-aos="fade-up">{item.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default NewItems;