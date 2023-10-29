import Layout from "../components/Layout";
import Form from "../components/Form";
import Model from "../components/Model";
import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { updateMovie, getMovie } from "../services/api";
import { IMovie,IShowError } from "../type";

const EditPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovie>();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });

  useEffect(() => {
    console.log("Getting info of ", id);
    
    async function getMoviesFromAPI(id: number) {
      try {
        if (id) {
          const response = await getMovie(id);
          setMovie(response.data);
          
        }
      } catch (error) {
        console.log(error)
    }
    }
    if (id) {
      const parsedId = parseInt(id);
        getMoviesFromAPI(parsedId);   
    }
  }, [id]);
  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
    navigate("/")
  };
  const handleUpdate = async (movie: IMovie) => {
    try {
      if (id) {
        await updateMovie(movie, parseInt(id));
        setShowModalMsg({
          action: "Succes",
          msg: "Movie successfully updated",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting movie:", error);
        setShowModalMsg({
          action: "Failed",
          msg: error.message,
        });
    }
    }finally{
      setShowModal(true);
    }
  };
  return (
    <>
    {movie && (

    <Layout title={`edit:${movie.title}`}>
      <h1>Editing {movie.title} movie</h1>
      <Form type="edit" getMovie={movie} addingMovie={handleUpdate} />
      {showModal&&<Model
            showModalMsg={showModalMsg}
            toggleModel={toggleModal}
          />}
    </Layout>
    )}
    </>
  );
};

export default EditPage;
