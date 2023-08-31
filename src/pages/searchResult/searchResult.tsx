import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/contentWrapper";
import MovieCard from "../../components/movieCard/movieCard";
import Spinner from "../../components/spinner/spinner";
import noResults from "../../assets/no-results.png";
import "./searchResult.scss";
export interface Result {
  name: string;
  id: string;
  total_pages: number
  media_type: string;
  vote_average: string;
  genre_ids: string[];
  title: string;
  release_date: string | number;
  poster_path: string;
  results: {
    key: null | string
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
  }[];
  total_results: number
}

const SearchResult = () => {
  const [data, setData] = useState<Result | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res: Result) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    setPageNum(1)
    fetchInitialData();
  }, [query]);
  return <div className="searchResultsPage">
    {loading && <Spinner initial={true} />}
    {!loading && (
      <ContentWrapper>
        {data && data.results.length > 0 ? (
          <>
            <div className="pageTitle">
              {`Search ${data.total_results > 1 ? "results" : "result"} of '${query}'`}
            </div>
            <InfiniteScroll className="content" dataLength={data.results && data.results.length || 0} next={fetchNextPageData} hasMore={pageNum <= data?.total_pages} loader={<Spinner />}>
              {data.results.map((item, index) => {
                if(item.media_type === "person") return
                return(
                  <MovieCard key={index} data={item} fromSearch={true} mediaType={""} />

                )
              })}
            </InfiniteScroll>
          </>

        ): (
          <span className="resoultNotFound">
            Sorry,Resoults not found!
          </span>
        )}
      </ContentWrapper>
    )}
  </div>;
};

export default SearchResult;
