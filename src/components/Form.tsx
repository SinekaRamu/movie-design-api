import { useState } from "react";
import { IMovie } from "../type";
import FormInputs from "./FormInputs";
import FormButtons from "./FormButtons";
interface IForm {
  type: string;
  addingMovie?: (m: IMovie) => void;
  getMovie?: IMovie;
}

const Form: React.FC<IForm> = ({ type, getMovie, addingMovie }) => {
  const [movie, setMovie] = useState(getMovie ||
   {title: "",
   year: undefined})
   console.log(getMovie)
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (addingMovie) {
      addingMovie(movie);
    } 
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
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
              value={movie.year}
              handleChange={handleChange}
            />
          </div>
          {type == "edit" ? (
            <FormButtons btn1="Update" btn2="Cancel" />
          ) : (
            <FormButtons btn1="add" btn2="Back" />
          )}
        </>
   
    </form>
  );
};

export default Form;
