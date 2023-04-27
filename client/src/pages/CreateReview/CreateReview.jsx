import React, { useEffect, useState } from "react";
import "./createReview.css";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Input from "../../components/Templates/InputField/Input";
import Button from "../../components/Templates/Button/Button";
import Validation from "./Validation.js";
import { logError, logInfo } from "../../../../server/src/util/logging";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import HoverRating from "../../components/Templates/Rating/Rating";
import { FcAddImage } from "react-icons/fc";
import { useAlert } from "react-alert";
import api from "../../util/api";
import Loading from "../../components/Templates/Loading/Loading";
import useFetch from "../../hooks/useFetch";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const CreateReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentReview = location?.state?.item;
  const reviewId = location?.state?.reviewId;
  const alert = useAlert();
  const [errors, setErrors] = useState({});
  const [type, setType] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState();
  const [visitedPlace, setVisitedPlace] = useState("");
  const [fileName, setFileName] = useState("");
  const [randomPhotos, setRandomPhotos] = useState("");
  const [photoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [values, setValues] = useState({
    userId: user.userId,
    username: user.name,
    visitedPlace: "",
    date: "",
    category: "",
    score: "",
    title: "",
    description: "",
    photo: "",
  });
  const optionList = [
    { value: "fun", label: "Fun" },
    { value: "cultural", label: "Cultural" },
    { value: "romantic", label: "Romantic" },
    { value: "business", label: "Business" },
    { value: "nature", label: "Nature" },
  ];

  //handle and convert it in base 64
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    setFileName(file?.name);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  useEffect(() => {
    if (type)
      setValues({ ...values, ["category"]: type.map((each) => each.label) });
  }, [type]);

  const review = {
    user: values.userId,
    userName: user.name,
    visitedPlace: visitedPlace,
    category: values.category,
    date: values.date,
    score: parseInt(values.score),
    title: values.title,
    description: values.description,
    photo: image ? image : values.photo,
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setErrors(Validation(values));
  }, [values]);

  const getPhotos = async () => {
    if (visitedPlace) {
      const place = visitedPlace.label.split(",")[0];
      if (visitedPlace) {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${place}&client_id=${process.env.REACT_APP_API_KEY_UNSPLASH}`
        );
        const data = await response.json();
        const randomImg =
          data?.results[Math.floor(Math.random() * data?.results.length)].urls
            ?.raw;
        setRandomPhotos(randomImg);
      }
    }
  };

  // useEffect(() => {
  //   getPhotos();
  // }, [visitedPlace]);

  useEffect(() => {
    if (!photoUrl) setValues({ ...values, ["photo"]: randomPhotos });
  }, [randomPhotos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await api.createReview(review);

      const res = result.data;
      if (res.success) {
        setLoading(false);
        alert.success("Successful");
        setTimeout(() => {
          navigate(`/detail/${res.msg?._id}`);
        }, 1200);
      }
    } catch (error) {
      setLoading(false);
      logError(error);
      alert.error("ERROR-Check Your Information");
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (reviewId) {
      try {
        setLoading(true);
        const result = await fetch(
          "http://localhost:5000/api/review/changeInfo",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: values.userId,
              userName: user.name,
              visitedPlace: visitedPlace
                ? visitedPlace
                : currentReview.visitedPlace,
              category: values.category
                ? values.category
                : currentReview.category[0],
              date: values.date ? values.date : currentReview.date,
              score: parseInt(values.score)
                ? parseInt(values.score)
                : currentReview.score,
              title: values.title ? values.title : currentReview.title,
              description: values.description
                ? values.description
                : currentReview.description,
              photo: image ? image : currentReview.photo,
              id: reviewId,
            }),
          }
        );
        if (result.ok) {
          setLoading(false);
          alert.success("Successful");
          setTimeout(() => {
            navigate("/profile");
          }, 1200);
        }
      } catch (error) {
        setLoading(false);
        logError(error);
        alert.error("ERROR-Check Your Information");
      }
    }
  };

  const handleSelect = (data) => {
    setSelectedOptions(data);
    setType(data);
  };

  const { performFetch } = useFetch(`/review/query?_id=${reviewId}`);
  const handleDelete = () => {
    performFetch({
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    navigate("/profile");
  };
  const submitAlert = () => {
    confirmAlert({
      message: "Are you sure to delete review?",
      confirmLabel: "Yes",
      cancelLabel: "Cancel",
      onConfirm: handleDelete,
      onCancel: navigate(`/detail/${reviewId}`),
    });
  };

  return (
    <div className="create-review-container">
      <h3
        id="title"
        style={{
          borderRadius: "60%",
          textAlign: "center",
          margin: "0rem",
          color: "white",
          fontSize: "2rem",
          zIndex: "2",
          backdropFilter: "blur(10px)",
          padding: "20px",
        }}
      >
        {reviewId ? (
          <span>EDIT YOUR EXPERIENCE</span>
        ) : (
          <span>SHARE YOUR EXPERIENCE</span>
        )}
      </h3>
      <div className="create-review-box">
        <div className="create-bg">
          <form className="review-inputs">
            <div className="input-container">
              <div className="left-inputs">
                <div className="review-input">
                  <label>Which Place Have You Visited?</label>
                  <div className="placeSearchBar address">
                    {/* <GooglePlacesAutocomplete
                      selectProps={{
                        visitedPlace,
                        onChange: setVisitedPlace,
                      }}
                      placeHolder="Find"
                      value="Place"
                      apiKey={process.env.REACT_APP_API_KEY}
                    /> */}
                    <input
                      id="placename"
                      type="text"
                      onChange={(e) => setVisitedPlace(e.target.value)}
                    />
                  </div>
                  {errors.visitedPlace && <p>{errors.visitedPlace}</p>}
                </div>

                <div className="review-input date">
                  <label>When Did You Visit There?</label>
                  <Input
                    handleChange={handleChange}
                    name="date"
                    value={values.date}
                    type="date"
                    required
                  />
                </div>
                <div className="rating">
                  <label
                    className="rate-text"
                    style={{ color: "white", padding: "8px" }}
                  >
                    Rate This Place
                  </label>
                  <HoverRating handleChange={handleChange} />
                </div>
                <div className="custom-file-upload">
                  <label className="custom-file-upload" htmlFor="files">
                    <span className="uploadHead">Upload Image </span>
                    <FcAddImage className="upload-icon" />
                    <span>{fileName}</span>
                  </label>
                  <input
                    onChange={handleImage}
                    id="files"
                    type="file"
                    name="photo"
                    style={{ display: "none" }}
                  ></input>
                </div>
              </div>
              <div className="right-inputs">
                <div className="review-input">
                  <label>Write A Title About Your Experience!</label>
                  <Input
                    name="title"
                    placeholder="Title..."
                    handleChange={handleChange}
                  />
                  {errors.title && <p>{errors.title}</p>}
                </div>
                <div className="review-input">
                  <div className="types-menu">
                    <label>Select Your Travel Type</label>
                    <div className="dropdown-container">
                      <Select
                        options={optionList}
                        placeholder="Select Type"
                        value={selectedOptions}
                        onChange={handleSelect}
                        isSearchable={true}
                        isMulti
                      />
                    </div>
                    {errors.category && <p>{errors.category}</p>}
                  </div>
                </div>
                <div className="review-input text">
                  <label htmlFor="">Write Your Experience!</label>
                  <textarea
                    name="description"
                    maxLength="500"
                    placeholder="Describe your experience here..."
                    onChange={handleChange}
                  ></textarea>
                  {errors.description && <p>{errors.description}</p>}
                  {reviewId && (
                    <button
                      type="submit"
                      className="deleteReview"
                      name=""
                      onClick={submitAlert}
                    >
                      Delete Review
                    </button>
                  )}
                </div>
              </div>
            </div>
            {reviewId ? (
              <Button type="submit" name="Edit Review" onClick={handleUpdate} />
            ) : (
              <Button
                type="submit"
                name="Create Review"
                onClick={handleSubmit}
              />
            )}
          </form>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default CreateReview;
