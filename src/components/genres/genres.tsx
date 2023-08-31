import { useSelector } from "react-redux";

import "./genres.scss";

interface GenresProps {
  data: string[];
}

const Genres = ({ data }: GenresProps) => {
    const { genres} = useSelector((state: any) => state.home)
  return <div className="genres">
    {data?.map((g: string, index) => {
        if(!genres[g]?.name) return;
        return (
            <div className="genre" key={index}>
                {genres[g]?.name}
            </div>
        )
    })}
  </div>;
};

export default Genres;
