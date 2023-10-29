import { Link } from "react-router-dom";
import { IMovie } from "../type";


const MovieCard= (movie:IMovie) => {

 
  return (
    <>
      <h3>{movie.title}</h3>
      <h4>{movie.year}</h4>
      <div className="action">
        <Link to={`/edit/${movie.id}`} role="button" state={movie}>
          📝
        </Link>
        
      </div>
    </>
  );
};

export default MovieCard;
