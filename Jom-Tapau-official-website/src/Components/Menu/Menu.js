import React, { useState, useEffect } from "react";
import Item from "../Item/Item";
import "./Menu.css";
import Helmet from "react-helmet";
import { Nav, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Menu = ({ handleAddtoCart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [foods, setFood] = useState([]);
  const [foodBackup, setFoodBackup] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/food")
      .then((res) => res.json())
      .then((data) => {
        setFood(data);
        setFoodBackup(data);
        setIsLoading(false);
      });
  }, []);

  const clickCategory = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFood(foodBackup);
    } else {
      const filteredFood = foodBackup.filter((food) => food.category === category);
      setFood(filteredFood);
    }
  };

  const categoryOptions = [
    { label: "Halal", value: "Halal", icon: "fas fa-kaaba" },
    { label: "Non-Halal", value: "Non-Halal", icon: "fas fa-skull" },
    // ... other options
  ];

  const typeOptions = [
    { label: "BreakFast", value: "BreakFast", icon: "fa-solid fa-apple-whole" },
    { label: "Lunch", value: "Lunch", icon: "fas fa-hamburger" },
    { label: "Drinks", value: "Drinks", icon: "fas fa-glass-whiskey" },
    // ... other options
  ];

  const searchFood = () => {
    const filteredFood = foodBackup.filter((food) =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFood(filteredFood);
  };

  useEffect(() => {
    searchFood();
  }, [searchQuery]);

  return (
    <div className="menu">

      <Helmet>
        <meta charSet="utf-8" />
        <title>Menu-Jom Tapau</title>
      </Helmet>
      <div className="menu-container">

        <div>
          <Nav defaultActiveKey="#popular" className="categories">
            <select className="category-select" value={selectedCategory} onChange={(e) => clickCategory(e.target.value)}>
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  <FontAwesomeIcon icon={option.icon} /> {option.label}
                </option>
              ))}
            </select>
          </Nav>
        </div>
        <div>
          <Nav defaultActiveKey="#popular" className="categories">
            <select className="category-select" value={selectedCategory} onChange={(e) => clickCategory(e.target.value)}>
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  <FontAwesomeIcon icon={option.icon} /> {option.label}
                </option>
              ))}
            </select>
          </Nav>
        </div>
        <div className="search-bar">
          <button class="btn-search"><i class="fas fa-search"></i></button>
          <input
            id="search"
            type="search"
            placeholder="Search for food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-search"
          />
          <span class="caret"></span>
          {/* <button onClick={searchFood}>Search</button> */}
        </div>


      </div>

      {isLoading ? (
        <div className="w-100 d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
          <div class="three-body">
            <div class="three-body__dot"></div>
            <div class="three-body__dot"></div>
            <div class="three-body__dot"></div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="items">
        {foods.map((food) => (
          <div className="col-lg-4 col-md-6 col-sm-12" key={food._id}>
            <Item handleAddtoCart={handleAddtoCart} food={food} />
          </div>
        ))}
      </div>
      <div className="back-to-top">
        <button onClick={() => window.scrollTo(0, 0)} className="back-to-top-btn">
          <i className="fas fa-arrow-up shake"></i>
        </button>
      </div>
    </div>
  );
};

export default Menu;
