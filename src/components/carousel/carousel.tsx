import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/contentWrapper";
import Img from "../lazyLoadImage/img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/circleRating";

import "./carousel.scss";
import Genres from "../genres/genres";

interface CarouselProps {
  data: {
    key: null | string;
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
  loading: string | null | boolean;
  endpoint?: string;
  title?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  data,
  loading,
  endpoint,
  title,
}) => {
  const carouselContainer = useRef<HTMLDivElement | null>(null);
  const { url } = useSelector((state: any) => state.home);
  const navigate = useNavigate();

  const navigation = (dir: string) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container!.scrollLeft - (container!.offsetWidth + 20)
        : container!.scrollLeft + (container!.offsetWidth + 20);
    container?.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock"></div>
        <div className="textBlock">
          <div className="title"></div>
          <div className="date"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel" ref={carouselContainer}>
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRightNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {Array.isArray(data) &&
              data.map((item) => {
                const posterUrl = item.poster_path
                  ? url.poster + item.poster_path
                  : PosterFallback;
                return (
                  <div
                    key={item.id}
                    className="carouselItem"
                    onClick={() =>
                      navigate(`/${item.media_type || endpoint}/${item.id}`)
                    }
                  >
                    <div className="posterBlock">
                      <Img src={posterUrl} />
                      <CircleRating rating={item.vote_average} />
                      <Genres data={item.genre_ids.slice(0, 2)} />
                    </div>
                    <div className="textBlock">
                      <span className="title">{item.title || item.name}</span>
                      <span className="date">
                        {dayjs(item.release_date).format("MMM D, YYYY")}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
