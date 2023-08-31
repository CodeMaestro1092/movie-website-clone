import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Home from "./pages/home/home";
import Details from "./pages/details/details";
import SearchResult from "./pages/searchResult/searchResult";
import Explore from "./pages/explore/explore";
import PageNotFound from "./pages/404/pageNotFound";

type GenresProps = {
  genres: [
    {
      id: number;
      name: string;
    }
  ];
};

const App = () => {
  const dispatch = useDispatch();
  const fetchApiConfig = async () => {
    try {
      fetchDataFromApi("/configuration").then((res) => {
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        };
        dispatch(getApiConfiguration(url));
      }); // Use the correct endpoint for configuration
    } catch (error) {
    }
  };
  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);
  const genresCall = async () => {
    let promises: any[] = [];
    let endPoint = ["tv", "movie"];
    let allGenres: { [key: number]: {} } = {}; // Define the type for allGenres

    endPoint.forEach((url: string) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }: GenresProps) => {
      return genres.forEach((item) => {
        allGenres[item.id] = item; // Assign item.name to the corresponding genre ID
      });
    });

    dispatch(getGenres(allGenres));
  };
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
