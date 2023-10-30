import { Link } from "react-router-dom";
import { IMovie } from "../type";
import Loading from "./Loading";
import { useState } from "react";
interface IMovieCard {
  movie: IMovie;
  handleDelete: (id: number | undefined) => void;
}
const MovieCard: React.FC<IMovieCard> = ({ movie, handleDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  function addDelete(id: number | undefined) {
    setIsLoading(true);
    handleDelete(id);
  }
  return (
    <>
      <h3>{movie.title}</h3>
      <h4>{movie.year}</h4>
      <div className="action">
        <Link to={`/edit/${movie.id}`} role="button">
          📝
        </Link>

        <>
          <button
            disabled={isLoading}
            onClick={() => addDelete(movie.id)}
            className="refresh-btn"
          >
            {isLoading ? <Loading /> : <>🚮</>}
          </button>
        </>
      </div>
    </>
  );
};

export default MovieCard;