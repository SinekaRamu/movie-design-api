import { useState } from "react";
import { IMovie } from "../type";
import FormInputs from "./FormInputs";

import Loading from "./Loading";
import { Link } from "react-router-dom";
interface IForm {
  type: string;
  addingMovie?: (m: IMovie) => void;
  getMovie?: IMovie;
}

const Form: React.FC<IForm> = ({ type, getMovie, addingMovie }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState(
    getMovie || { title: "", year: undefined }
  );
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value === undefined ? "" : value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    if (addingMovie) {
      addingMovie(movie);
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {movie && (
        <>
          <div className="form-input">
            <FormInputs
              label="Enter Movie Title"
              type="text"
              name="title"
              value={movie.title}
              handleChange={handleChange}
            />
            <FormInputs
              label="Enter Release Year"
              type="number"
              name="year"
              min="1895"
              max="2024"
              value={movie.year}
              handleChange={handleChange}
            />
          </div>

          <div className="form-input home-bar">
            <button type="submit" className="form-btn" disabled={isLoading}>
              {isLoading && <Loading />}
              {type == "edit" ? <>update</> : <>Add</>}
            </button>
            <Link to="/" role="button" className="form-btn">
              {type == "edit" ? <>Back</> : <>Cancel</>}
            </Link>
          </div>
        </>
      )}
    </form>
  );
};

export default Form;
