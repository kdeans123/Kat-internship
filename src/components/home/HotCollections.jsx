import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

const HotCollections = () => {
  const [items, setItems] = useState([]);

  async function getItems() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

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
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-up">Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="nft-items-slider">
            <Slider {...settings}>
              {items.map((item, index) => (
                <div className="px-2" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy img-fluid"
                          alt=""
                          data-aos="fade-up"
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt=""
                          data-aos="fade-up"
                        />
                      </Link>
                      <i className="fa fa-check" data-aos="fade-up"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4 data-aos="fade-up">{item.title}</h4>
                      </Link>
                      <span data-aos="fade-up">ERC-{item.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;