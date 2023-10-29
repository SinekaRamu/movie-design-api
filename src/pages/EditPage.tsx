import Layout from "../components/Layout";
import Form from "../components/Form";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateMovie, getMovie } from "../services/api";
import { IMovie } from "../type";

const EditPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovie>();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Getting info of ", id);
    
    async function getMoviesFromAPI(id: number) {
      try {
        if (id) {
          const response = await getMovie(id);
          setMovie(response.data);
        }
      } catch (err) {
        console.log(err);
      } 
    }
    getMoviesFromAPI(parseInt(id));
  }, [id]);

  const handleUpdate = async (movie: IMovie) => {
    try {
      if (id) {
        await updateMovie(movie, parseInt(id));
      }
      navigate("/");
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };
  return (
    <>
    {movie && (

    <Layout title={`edit:${movie.title}`}>
      <h1>Editing {movie.title} movie</h1>
      <Form type="edit" getMovie={movie} addingMovie={handleUpdate} />
    </Layout>
    )}
    </>
  );
};

export default EditPage;
