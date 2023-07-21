import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faEye,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [meals, setMeals] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchMeals();
  }, [currentPage]);

  const goToForm = () => {
    navigate("/MealForm");
  };

  const fetchMeals = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/meals", {
        params: {
          page: currentPage,
          size: 8, // Number of meals per page
        },
      });
      const fetchedMeals = response.data.content;
      setMeals(fetchedMeals);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const renderFormattedDescription = (description: string) => {
    return { __html: description };
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-buttons">
          <button className="dashboard-button" onClick={goToForm}>
            <FontAwesomeIcon icon={faPlusCircle} className="dashboard-icon" />
            Add
          </button>
          <button className="dashboard-button">
            <FontAwesomeIcon icon={faEye} className="dashboard-icon" />
            Read
          </button>
          <button className="dashboard-button">
            <FontAwesomeIcon icon={faEdit} className="dashboard-icon" />
            Update
          </button>
          <button className="dashboard-button">
            <FontAwesomeIcon icon={faTrashAlt} className="dashboard-icon" />
            Delete
          </button>
        </div>
      </div>

      <div className="cards-container">
        {meals.map((meal) => (
          <div key={meal.id} className="card">
            <div className="card-content">
              <h3 className="card-title">{meal.name}</h3>
              <div
                className="card-description"
                dangerouslySetInnerHTML={renderFormattedDescription(
                  meal.description
                )}
              ></div>
            </div>
            <div className="card-details">
              <p>
                <span>Calories: {meal.calories}</span>
              </p>
              <p>
                <span>Category: {meal.category}</span>
              </p>
              <p>
                <span>Meal Type: {meal.mealtype}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          className="pagination-button"
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
