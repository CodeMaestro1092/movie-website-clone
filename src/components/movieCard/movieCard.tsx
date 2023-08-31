import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./movieCard.scss";
import Img from "../lazyLoadImage/img";
import CircleRating from "../circleRating/circleRating";
import Genres from "../genres/genres";
import PosterFallback from "../../assets/no-poster.png";

interface MovieCardProps {
  data: {
    title?: string;
    release_date?: string;
    adult: boolean;
    backdrop_path: string;
    id: number;
    name: string;
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: string[];
    popularity: number;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    origin_country: string[];
  };
  fromSearch: boolean;
  mediaType: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  data,
  fromSearch,
  mediaType,
}) => {
  const { url } = useSelector((state: any) => state.home);
  const navigate = useNavigate();
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallback;
  return (
    <div
      className="movieCard"
      onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
    >
      <div className="posterBlock">
        <Img className="posterImg" src={posterUrl} />
        {!fromSearch && (
          <React.Fragment>
            <CircleRating
              rating={
                typeof data.vote_average === "string"
                  ? parseFloat(data.vote_average)
                  : data.vote_average
              }
            />
            <Genres data={data.genre_ids.slice(0, 2)} />
          </React.Fragment>
        )}
      </div>
      <div className="textBlock">
        <span className="title">{data.title || data.name}</span>
        <span className="date">
          {dayjs(data.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
