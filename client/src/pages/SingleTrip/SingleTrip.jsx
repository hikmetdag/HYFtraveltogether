import React, { useState, useEffect } from "react";
import "./SingleTrip.css";
import { FaCommentDots } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Templates/Button/Button";
import api from "../../util/api";
import { logInfo } from "../../../../server/src/util/logging";
import Loading from "../../components/Templates/Loading/Loading";
import CommentContainer from "./CommentContainer";

const SingleTrip = () => {
  const [data, setData] = useState({});
  const [likedBy, setLikedBy] = useState([]);
  const [clicked, setClicked] = useState();
  const [reviewPhotos, setReviewPhotos] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const { performFetch, isLoading } = useFetch(`/review/find/${id}`, (data) => {
    setData(data);
    setComments(data?.result.comments);
    setReviewPhotos(data?.result.photo);
    setLikedBy(data.result.likedBy);
  });

  useEffect(() => {
    performFetch();
  }, [id]);

  const detail = data?.result;

  useEffect(async () => {
    if (user !== null && detail) {
      likedBy.includes(user.userId) ? setClicked(true) : setClicked(false);

      try {
        await api.likedBy(detail._id, { likedBy: likedBy });
      } catch (error) {
        logInfo(error);
      }
    }
  }, [likedBy]);

  const handleClickLike = () => {
    if (user === null) {
      navigate("/login");
    } else {
      if (!likedBy.includes(user.userId)) {
        setLikedBy((prev) => [...prev, user.userId]);
        setClicked(true);
      } else {
        setLikedBy(likedBy.filter((e) => e !== user.userId));
        setClicked(false);
      }
    }
  };

  // logInfo(comments);
  const sendInfo = async () => {
    if (user === null) {
      navigate("/login");
    } else {
      const res = await api.commentBy(detail._id, {
        comments: newComment,
        userName: user.name,
        userPhoto: user.photoProfile,
      });

      setComments(res?.data.comments);
      setNewComment("");
    }
  };

  return (
    <div className="single-trip-container">
      <div className="img-basic-info-container">
        <div className="description-container">
          <div className="description">
            <img src={reviewPhotos} alt="" />
            <div className="circle-like-btn">
              <div className="like-container">
                {clicked ? (
                  <AiFillLike onClick={handleClickLike} className="liked-btn" />
                ) : (
                  <AiOutlineLike
                    onClick={handleClickLike}
                    className="unliked-btn"
                  />
                )}

                <p>{likedBy?.length}</p>
              </div>
              <div className="like-container">
                <FaCommentDots className="comment-icon" />
                <p className="comment-btn"> {comments.length}</p>
              </div>
            </div>
          </div>
          <div className="commentBox">
            <textarea
              maxLength="200"
              name="description"
              placeholder="Write a comment to this review"
              value={newComment}
              id=""
              cols="30"
              rows="1"
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <Button onClick={sendInfo} type="submit" name="Comment" />
          </div>
          <div className="all-comments-container">
            {comments?.map((data, index) => (
              <CommentContainer data={data} key={index} />
            ))}
          </div>
        </div>
        <div className="basic-info">
          <h1 className="visited-place-header">{detail?.visitedPlace}</h1>
          <div className="stars-person-info-container">
            <div className="single-page-stars-container">
              {Array(detail?.score).fill(<AiFillStar className="fav-stars" />)}
            </div>
            |
            {detail?.category.map((each, index) => {
              return (
                <span key={index}>
                  {" "}
                  <p className="type-p-container">{each}</p>
                </span>
              );
            })}
            |<p className="type-p-container">{detail?.date}</p>
          </div>

          <p className="title">{detail?.title}</p>
          <p className="person-description-p">
            {" "}
            {detail?.description
              ? detail.description
              : "write your description here"}
          </p>
          <p className="name-style">by / {detail?.userName}</p>
          <div className="like-comment-container"></div>
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default SingleTrip;
