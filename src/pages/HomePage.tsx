import { useEffect, useState } from "react";
import { IMovie, IShowError } from "../type";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { deleteMovie, getMovies } from "../services/api";
import Loading from "../components/Loading";
import Model from "../components/Model";
import MovieCard from "../components/MovieCard";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });
  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
    
  };
  useEffect(() => {
    async function getMoviesFromAPI() {
      setIsLoading(true);
      try {
        const response = await getMovies();
        setMovies(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setShowModal(true);
          setShowModalMsg({
            action: "failed",
            msg: error.message,
          });
      } }finally {
        setIsLoading(false);
      }
    }
    getMoviesFromAPI();
  }, [refresh]);

  async function handleDelete(id: number | undefined) {
    try {
      if (id) {
        await deleteMovie(id);
      }
      setShowModalMsg({
        action: "success",
        msg: "Movie deleted",
      });
      setShowModal(true);
    } catch (error) {
      if (error instanceof Error) {
        setShowModalMsg({
          action: "failed",
          msg: error.message,
        });
      } 
    } finally {
      setRefresh((pre)=> !pre);
    }
  }

  return (
    <>
    <Layout title="home">
      <h1>Movie API</h1>
      <div className="home-bar">
        <Link to="/add" role="button">
          ➕
        </Link>
        <button
          className="refresh-btn"
          disabled={isLoading}
          onClick={() => setRefresh((prev) => !prev)}
        >
       {isLoading ? <Loading /> : <>🔃</>}
        </button>
      </div>
      {isLoading ? (
        <p>Loading Movies..</p>
      ) : (
        <div className="gridBox">
          {movies.map((m, i) => (
            <article className="movie-card" key={i}>
               <MovieCard movie={m} handleDelete={handleDelete} />
            </article>
          ))}
        </div>
      )}
      
    </Layout>
    {showModal && (
      <Model showModalMsg={showModalMsg} toggleModel={toggleModal} />
    )}
    </>
  );
};

export default HomePage;
