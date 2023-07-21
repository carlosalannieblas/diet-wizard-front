import React, { useRef, useState } from "react";
import axios from "axios";
import "./MealForm.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Modal from "../Modal/Modal";

interface Meal {
  name: string;
  description: string;
  calories: string;
  category: string;
  mealtype: string;
}

export const MealForm: React.FC = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const caloriesInputRef = useRef<HTMLInputElement>(null);
  const categoryInputRef = useRef<HTMLSelectElement>(null);
  const mealtypeInputRef = useRef<HTMLSelectElement>(null);
  const descriptionEditorRef = useRef<ReactQuill | null>(null);
  const [meal, setMeal] = useState<Meal>({
    name: "",
    description: "",
    calories: "",
    category: "",
    mealtype: "",
  });

  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const handleTextChange = (value: string) => {
    setMeal((prevState) => ({
      ...prevState,
      description: value,
    }));
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setMeal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if any field is empty
    if (
      !meal.name ||
      !meal.description ||
      !meal.calories ||
      !meal.category ||
      !meal.mealtype
    ) {
      setErrorModalOpen(true);
      return;
    }

    // All fields are filled, proceed with form submission
    try {
      await axios.post("http://localhost:8080/api/meals", meal);

      // Reset form input values
      setMeal({
        name: "",
        description: "",
        calories: "",
        category: "",
        mealtype: "",
      });

      // Reset individual form inputs using their respective refs
      if (nameInputRef.current) {
        nameInputRef.current.value = "";
      }
      if (caloriesInputRef.current) {
        caloriesInputRef.current.value = "";
      }
      if (categoryInputRef.current) {
        categoryInputRef.current.value = "";
      }
      if (mealtypeInputRef.current) {
        mealtypeInputRef.current.value = "";
      }
      // Clear ReactQuill value
      if (descriptionEditorRef.current) {
        const editor = descriptionEditorRef.current.getEditor();
        editor.setText("");
      }
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
    }
  };

  const closeModal = () => {
    setErrorModalOpen(false);
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <ul className="wrapper">
          <li className="form-row">
            <label>Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name of the meal"
              onChange={(e) => onInputChange(e)}
              ref={nameInputRef}
            />
          </li>
          <li className="form-row">
            <label>Description</label>
            <div className="descArea">
              <ReactQuill
                id="description"
                placeholder="Desctiption of the meal"
                onChange={handleTextChange}
                ref={descriptionEditorRef}
              />
            </div>
          </li>
          <li className="form-row">
            <label>Calories</label>
            <input
              type="number"
              name="calories"
              id="calories"
              placeholder="Total calories"
              onChange={(e) => onInputChange(e)}
              ref={caloriesInputRef}
            />
          </li>
          <li className="form-row">
            <label>Category</label>
            <select
              id="category"
              name="category"
              onChange={(e) => onInputChange(e)}
              ref={categoryInputRef}
            >
              <option value="" disabled selected>
                Nationality of the meal
              </option>
              <option value="JAPANESE">Japanese</option>
              <option value="MEXICAN">Mexican</option>
              <option value="AMERICAN">American</option>
              <option value="KOREAN">Korean</option>
              <option value="ITALIAN">Itallian</option>
            </select>
          </li>
          <li className="form-row">
            <label>Meal Type</label>
            <select
              id="mealtype"
              name="mealtype"
              onChange={(e) => onInputChange(e)}
              ref={mealtypeInputRef}
            >
              <option value="" disabled selected>
                When will the meal be consumed
              </option>
              <option value="BREAKFAST">Breakfast</option>
              <option value="LUNCH">Lunch</option>
              <option value="DINNER">Dinner</option>
              <option value="SNACK">Snack</option>
            </select>
          </li>
          <li className="form-row">
            <button type="submit">Submit</button>
          </li>
        </ul>
      </form>
      <Modal
        isOpen={errorModalOpen}
        onClose={closeModal}
        title="Error"
        message="All inputs must contain a value"
      />
    </div>
  );
};
