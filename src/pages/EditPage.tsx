import Layout from "../components/Layout";
import Form from "../components/Form";
import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { updateMovie, getMovie } from "../services/api";
import { IMovie } from "../type";

const EditPage = () => {
  const { id } = useParams();
  let { state } = useLocation();
  const [movie, setMovie] = useState<IMovie>();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Getting info of ", id);
    async function getMoviesFromAPI(id: number) {
      try {
        if (id) {
          const response = await getMovie(id);
          console.log(response);
          setMovie(response.data);
          console.log("data:", response.data);
          console.log(movie);
        }
      } catch (err) {
        console.log(err);
      } finally {
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
    <Layout title={`edit:${state.title}`}>
      <h1>Editing {state.title} movie</h1>
      <Form type="edit" getMovie={movie} editMovie={handleUpdate} />
    </Layout>
  );
};

export default EditPage;
