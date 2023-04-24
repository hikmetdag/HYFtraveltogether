/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { BsPersonFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { IoPencil } from "react-icons/io5";
import Card from "../../components/Card/Card";
import "./profile.css";
import { logError, logInfo } from "../../../../server/src/util/logging";
import { LoginContext } from "../../components/Context/LoginContext";
import AccordionProfile from "../../components/Templates/AccordionProfile/AccordionProfile.jsx";
import useFetch from "../../hooks/useFetch";
import { useAlert } from "react-alert";
import FavoritesReviews from "./FavoritesReviews";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Templates/Loading/Loading";

const ProfilePage = () => {
  const users = JSON.parse(localStorage.getItem("user"));
  const { setUserName, dispatch } = useContext(LoginContext);
  const [person, setPerson] = useState();
  const [data, setData] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [fileName, setFileName] = useState("");
  const [value, setValue] = useState(users.photoProfile || "");
  const [hookData, setHookdata] = useState();
  const [showFavorites, setShowFavorites] = useState(true);
  const [showReview, setShowReview] = useState(true);
  const [loading, setLoading] = useState(null);
  const token = JSON.parse(localStorage.getItem("token"));
  const id = users.userId;
  const navigate = useNavigate();
  const alert = useAlert();

  //handle and convert it in base 64

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setValue(reader.result);
    };
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    setFileName(file?.name);
  };

  const handleSubmitUserImage = async () => {
    if (users !== null) {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.BASE_SERVER_URL}/api/auth/profileImage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ photoUser: value, userId: users.userId }),
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          }
        );
        const newUserPhoto = await res.json();
        setHookdata(newUserPhoto);
      } catch (error) {
        logError(error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (name || surname || email || introduction) {
      const users = JSON.parse(localStorage.getItem("user"));
      users.name = person?.newUserInfo.name;
      users.surname = person?.newUserInfo.surname;
      users.email = person?.newUserInfo.email;
      setUserName(person?.newUserInfo.name);
      users.introduction = person?.newUserInfo.introduction;
      localStorage.setItem("user", JSON.stringify(users));
    }
  }, [person]);
  useEffect(() => {
    if (hookData) {
      const users = JSON.parse(localStorage.getItem("user"));
      users.photoProfile = hookData?.updatedPhoto;
      localStorage.setItem("user", JSON.stringify(users));
    }
  }, [hookData]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (users !== null) {
      if (name || surname || email || introduction) {
        setLoading(true);
        const res = await fetch(
          `${process.env.BASE_SERVER_URL}/api/user/change/info`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: users.userId,
              name: name ? name : users.name,
              surname: surname ? surname : users.surname,
              email: email ? email : users.email,
              introduction: introduction ? introduction : users.introduction,
            }),
          }
        );
        const newData = await res.json();
        setPerson(newData);
        setLoading(false);
        alert.success("Successful");
      }
    }
  };
  const fetchUserReviews = async () => {
    if (users !== null) {
      setLoading(true);
      const res = await fetch(
        `${process.env.BASE_SERVER_URL}/api/review/findBy/userId`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: users.userId,
          }),
        }
      );
      const data = await res.json();
      

      setUserReviews(data.userReviews);
      setLoading(false);
    }
  };
  
  const fetchData = async () => {
    if (users !== null) {
      setLoading(true);
      const res = await fetch(
        `${process.env.BASE_SERVER_URL}/api/review/getByUserFav`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reviewIds: users.fav,
          }),
        }
      );
      const data = await res.json();
      setData(data.favoredReviews);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    fetchUserReviews();
  }, []);

  const { performFetch } = useFetch(`/user/query?_id=${id}`);
  const handleDelete = () => {
    performFetch({
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const submitAlert = () => {
    confirmAlert({
      message: "Are you sure to delete your account?",
      confirmLabel: "Yes",
      cancelLabel: "Cancel",
      onConfirm: handleDelete,
      onCancel: navigate("/profile"),
    });
  };

  return (
    <div className="profile-page-container">
      <div className="personal-page">
        <div className="personal-images-container">
          <div className="personal-large-pic">
            <IoPencil
              className="change-personal-setting"
              onClick={() => setShowEditProfile(!showEditProfile)}
            />
            <div className="change-personal-info-container">
              <form
                onSubmit={handleSubmit}
                className={
                  showEditProfile ? "change-info-form" : "form-gone-left"
                }
              >
                <h1>change your Info</h1>
                <div className="label-input-container">
                  <span>Name: </span>
                  <input
                    type="text"
                    name={name}
                    value={name}
                    placeholder={users ? users.name : ""}
                    className="change-personal-input"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="label-input-container">
                  <span>Surname: </span>
                  <input
                    name={surname}
                    value={surname}
                    type="text"
                    placeholder={users ? users.surname : ""}
                    className="change-personal-input"
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
                <div className="label-input-container">
                  <span>Email: </span>

                  <input
                    name={email}
                    value={email}
                    type="text"
                    placeholder={users ? users.email : ""}
                    className="change-personal-input"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="label-input-container">
                  <span>About Me:</span>
                  <input
                    name={introduction}
                    value={introduction}
                    type="text"
                    placeholder="Say something about yourself"
                    className="change-personal-input"
                    onChange={(e) => setIntroduction(e.target.value)}
                  />
                </div>

                <button type="submit" className="change-submit-btn">
                  Submit
                </button>
                <br />
                <button
                  onClick={submitAlert}
                  className="change-submit-btn"
                  style={{ marginTop: 5 }}
                >
                  Delete my account
                </button>
              </form>
            </div>
          </div>

          <div className="image-personal-detail-container">
            <div className="real-person-image-container">
              <img
                src={
                  hookData
                    ? hookData?.updatedPhoto
                    : users?.photoProfile
                    ? users?.photoProfile
                    : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                }
                alt="person image"
                className="person-image"
              />
            </div>
            <div className="custom-file-upload">
              <label className="custom-file-upload" htmlFor="files">
                <span className="uploadHead">
                  {value && !fileName ? "Update Image" : "Upload Image"}
                </span>

                <span style={{ color: "green" }}>
                  {fileName?.split("").slice(0, 10)}
                </span>
              </label>
              <input
                onChange={handleImage}
                id="files"
                type="file"
                name="photo"
                style={{ display: "none" }}
              ></input>
              {fileName && (
                <button
                  type="submit"
                  onClick={() => {
                    handleSubmitUserImage(), setFileName("");
                  }}
                  className="submit-image-btn"
                >
                  Upload
                </button>
              )}
            </div>
            <div className="personal-detail">
              <h2>
                <span>{<BsPersonFill />}</span>
                {users && `${users.name}  ${users.surname}`}
              </h2>
              <h2>
                <span>{<MdAlternateEmail />}</span>
                {users && `${users.email}`}
              </h2>
              <h2>
                {users.introduction
                  ? users.introduction
                  : "Write something about yourself"}
              </h2>
            </div>
          </div>
        </div>
      </div>
      {/* <hr /> */}
      <div className="profile-reviews-favs-container">
        <div className="profile-page-fav-trips">
          <div className="review-btn-container">
            <button
              type="button"
              className="my-header"
              onClick={() => setShowReview(!showReview)}
            >
              My Reviews
              <span>
                {showReview ? (
                  <AiFillEye />
                ) : (
                  <AiFillEyeInvisible style={{ color: "red" }} />
                )}
              </span>
            </button>
          </div>
          {/* <div className="underlined"></div> */}
          {showReview && <FavoritesReviews data={userReviews} />}
        </div>
        <hr />
        <div className="profile-page-fav-trips">
          <div className="review-btn-container">
            <button
              type="button"
              className="my-header"
              onClick={() => setShowFavorites(!showFavorites)}
            >
              Favorite Places
              <span>
                {showFavorites ? (
                  <AiFillEye />
                ) : (
                  <AiFillEyeInvisible style={{ color: "red" }} />
                )}
              </span>
            </button>
          </div>
          {showFavorites && <FavoritesReviews data={data} />}
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default ProfilePage;
