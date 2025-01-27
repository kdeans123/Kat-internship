import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Import Slider and its CSS
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollections = () => {
  // State management for NFT items and loading state
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Slider configuration with responsive breakpoints
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

  // Fetch NFT collections from the API
  async function getItems() {
    try {
      setIsLoading(true); // Enable loading state before fetch
      const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false); // Disable loading state after fetch
    }
  }

  // Fetch data on component mount
  useEffect(() => {
    getItems();
  }, []);

  // Loading skeleton component for better UX during data fetch
  const LoadingSkeleton = () => (
    <div className="px-2">
      <div className="nft_coll" style={{ opacity: 0.7 }}>
        <div className="nft_wrap">
          <div className="lazy img-fluid skeleton-loading" style={{ height: "200px", background: "#eee" }}></div>
        </div>
        <div className="nft_coll_pp">
          <div className="lazy pp-coll skeleton-loading" style={{ height: "50px", width: "50px", background: "#eee", borderRadius: "50%" }}></div>
        </div>
        <div className="nft_coll_info">
          <div className="skeleton-loading" style={{ height: "20px", width: "80%", background: "#eee", margin: "10px 0" }}></div>
          <div className="skeleton-loading" style={{ height: "15px", width: "40%", background: "#eee" }}></div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          {/* Section Header */}
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          
          {/* NFT Collections Slider Container */}
          <div className="col-lg-12">
            <div className="nft-collection-slider">
              {isLoading ? (
                // Show loading skeletons while data is being fetched
                <Slider {...settings}>
                  {[1, 2, 3, 4].map((_, index) => (
                    <LoadingSkeleton key={index} />
                  ))}
                </Slider>
              ) : (
                // Show actual NFT collections once data is loaded
                <Slider {...settings}>
                  {items.map((item, index) => (
                    // Added px-2 class for card spacing
                    <div className="px-2" key={index}>
                      <div className="nft_coll" onClick={() => navigate(`${item.nftId}`)}>
                        {/* NFT Image Container */}
                        <div className="nft_wrap">
                          <Link to="/item-details">
                            <img src={item.nftImage} className="lazy img-fluid" alt="" />
                          </Link>
                        </div>
                        {/* Author Profile Picture */}
                        <div className="nft_coll_pp">
                          <Link to="/author">
                            <img className="lazy pp-coll" src={item.authorImage} alt="" />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        {/* NFT Collection Info */}
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{item.title}</h4>
                          </Link>
                          <span>ERC-{item.code}</span>
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

export default HotCollections;