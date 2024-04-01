import React, { useState, useEffect } from "react";
import axios from "axios";
import "./navbar_css/caregiver.css";
import Navbar from "../components/navbar";
import { MdNotificationsNone } from "react-icons/md";
import { FaStar } from "react-icons/fa";

function Caregiver() {
  const [caregivers, setCaregivers] = useState([]);
  const [sortType, setSortType] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');
  const [activeSortButton, setActiveSortButton] = useState(null);
  const [sortInfo, setSortInfo] = useState('');

  useEffect(() => {
    // Fetch the caregivers from your API
    axios.get("http://localhost:5000/api/caregiver")
      .then(response => setCaregivers(response.data))
      .catch(error => console.error(error));
  }, []);

  const sortBy = (type) => {
    let info = '';
    if (type === sortType) {
      // If the same type is clicked, toggle the order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      info = sortOrder === 'asc' ? 'Highest to Lowest' : 'Lowest to Highest';
    } else {
      // If a different type is clicked, reset the order to ascending
      setSortType(type);
      setSortOrder('asc');
      info = type === 'price' ? 'Lowest to Highest' : 'Lowest to Highest';
    }
    // Set the active sorting button and sort info
    setActiveSortButton(type);
    setSortInfo(info);
  };

  const sortedCaregivers = [...caregivers].sort((a, b) => {
    if (sortType === 'price') {
      return sortOrder === 'asc' ? a.caregiver.hourly_rate - b.caregiver.hourly_rate : b.caregiver.hourly_rate - a.caregiver.hourly_rate;
    } else if (sortType === 'rating') {
      return sortOrder === 'asc' ? a.caregiver.rating - b.caregiver.rating : b.caregiver.rating - a.caregiver.rating;
    }
  });

  const getStarColor = (rating) => {
    const percentage = (rating / 5) * 100;
    if (percentage >= 80) {
      return "#FFD700"; // Gold color for 80% or more
    } else if (percentage >= 60) {
      return "#FFA500"; // Orange color for 60-80%
    } else if (percentage >= 40) {
      return "#FF6347"; // Tomato color for 40-60%
    } else {
      return "#CCCCCC"; // Gray color for less than 40%
    }
  };

  return (
    <>
      <Navbar />
      <div className="caregiver">
		<div className="dashboard-notification">
			<div className="small-profile-image">
				<img className="user-image"></img>
			</div>
			<div className="welcome-user">
			<p><b>Hello, user</b></p>
			<p>Displaying caregivers in 21121</p>
			</div>

			<div className="nofi-icon-container">
				<MdNotificationsNone className="nofi-icon" />
				{/* <MdNotificationsActive /> */}
			</div>	
		</div>
		
        <div className="caregiver-selection">
          <div className="sort-container">
            <button
              className={`sorting-button ${activeSortButton === 'price' ? 'active' : ''}`}
              onClick={() => sortBy('price')}
            >
              Sort by Price {activeSortButton === 'price' && `(${sortInfo})`}
            </button>
            <button
              className={`sorting-button ${activeSortButton === 'rating' ? 'active' : ''}`}
              onClick={() => sortBy('rating')}
            >
              Sort by Rating {activeSortButton === 'rating' && `(${sortInfo})`}
            </button>
          </div>

          {/* ///caregiver-info-list */}
          <div className="caregiver-info">
            {sortedCaregivers.map((caregiver, index) => (
              <div key={index} className="caregiver-list">
                <img
                  className="caregiver-image"
                  alt=""
                  src=""
                ></img>

                <div className="caregiver-name-container">
                  <p><b>{caregiver.fullname}</b></p>
                  <div className={`caregiver-rating-container ${activeSortButton === 'rating' ? 'rating-highlight' : ''}`}>
                    <FaStar color={getStarColor(caregiver.caregiver.rating)} /> <span>{`${caregiver.caregiver.rating} / 5 `}</span> </div>
                </div>
                <div className={`caregiver-price-container ${activeSortButton === 'price' ? 'highlight' : ''}`}>
                  <p id="price">${caregiver.caregiver.hourly_rate} / hour</p>
                </div>
              </div>
            ))}
          </div>


          <p>Scroll to load more</p>
        </div>
      </div>
    </>
  );

   return (
    <>
      <Navbar />
      <div className="caregiver">
        {/* ... (The rest of your components) */}
        <div className="caregiver-info">
          {sortedCaregivers.map((caregiver, index) => (
            <div key={index} className="caregiver-list">
              <img
                className="caregiver-image"
                alt=""
                src="" // Add path to your images or remove if not using images
              />

              <div className="caregiver-name-container">
                <p><b>{caregiver.fullname}</b></p>
                <div className={`caregiver-rating-container ${sortType === 'rating' ? 'rating-highlight' : ''}`}>
                  <FaStar color={getStarColor(caregiver.caregiver.rating)} /> <span>{`${caregiver.caregiver.rating} / 5 `}</span> </div>
              </div>
              <div className={`caregiver-price-container ${sortType === 'price' ? 'highlight' : ''}`}>
                <p id="price">${caregiver.caregiver.hourly_rate} / hour</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );


}

export default Caregiver;
