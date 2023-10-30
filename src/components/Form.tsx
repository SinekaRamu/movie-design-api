import { useState } from "react";
import { IMovie } from "../type";
import FormInputs from "./FormInputs";
import { Link } from "react-router-dom";
// import FormButtons from "./FormButtons";
import Loading from "./Loading";
interface IForm {
  type: string;
  addingMovie?: (m: IMovie) => void;
  getMovie?: IMovie;
}

const Form: React.FC<IForm> = ({ type, getMovie, addingMovie }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState(getMovie ||
   {title: "",
   year: undefined})
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value=== undefined?"":value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true)
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
          <div className="form-input home-bar">
            <button type="submit" className="form-btn" disabled={isLoading}>
              {isLoading&& <Loading/>}
             {type=="edit" ? (<>update</>):(<>Add</>)}
            </button>
            <Link to="/" role="button" className="form-btn">
             {type=="edit" ? (<>Back</>):(<>Cancel</>)}  
            </Link>
          </div>
          {/* {type == "edit" ? (
            <FormButtons btn1="Update" btn2="Cancel" />
          ) : (
            <FormButtons btn1="add" btn2="Back" />
          )} */}
        </>
      
      
      
    </form>
  );
};

export default Form;
