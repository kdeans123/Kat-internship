import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import Counter from "../UI/Counter";



const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState([]);
  const navigate = useNavigate();


  async function getItems() {
    try {
        const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore");
        setItems(data);
    } catch (error) {
        console.error("Error fetching items:", error);
    }
}

  useEffect(() => {
    getItems();
  }, []);


  const loadMoreItems = () => {
    setVisibleCount(prevCount => prevCount + 4); // increase visible count by 4
  } 

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {items.map((item, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item" onClick={() => navigate(`${item.nftId}`)}>
            <div className="author_list_pp">
              <Link
                to="/author"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={AuthorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <Counter itemExpiryDate={item.expiryDate} />

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
                <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
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
      ))}
      <div className="col-md-12 text-center">
        <button id="loadmore" className="btn-main lead" onClick={loadMoreItems}>
          Load more
        </button>
      </div>
    </>
  );
};

export default ExploreItems;
