import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/img";
import ContentWrapper from "../../../components/contentWrapper/contentWrapper";
import "./heroBanner.scss";

interface Movie {
  backdrop_path: string | null;
}
const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state: any) => state.home);

  const { data = { results: [] }, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    if (data && url.backdrop) {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const movie = data.results[randomIndex] as Movie;
      setBackground(url.backdrop + (movie?.backdrop_path ?? ""));
    }
  }, [data]);

  const searchQueryHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  const handleButtonClick = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="wrapper">
          <div className="heroBannerContent">
            <span className="title">Welcome!</span>
            <span className="subTitle">
              Millions of movies, TV shows and people to discover. Explore now.
            </span>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show..."
                onKeyUp={searchQueryHandler}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button onClick={handleButtonClick}>Search</button>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
