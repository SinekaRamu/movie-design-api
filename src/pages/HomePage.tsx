import { useEffect, useState } from "react";
import { IMovie, IShowError } from "../type";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { deleteMovie, getMovies } from "../services/api";
import Loading from "../components/Loading";
import Model from "../components/Model";

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
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    getMoviesFromAPI();
  }, [refresh]);

  async function handleDelete(id: number | undefined) {
    toggleModal();
    try {
      setRefresh(true);
      if (id) {
        await deleteMovie(id);
      }
      setShowModalMsg({
        action: "success",
        msg: "Card deleted",
      });
    } catch (error) {
      if (error instanceof Error) {
        setShowModalMsg({
          action: "failed",
          msg: error.message,
        });
      } else {
        setShowModalMsg({
          action: "failed",
          msg: "An unknown error occurred.",
        });
      }
    } finally {
      setRefresh(false);
    }
  }

  return (
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
          🔃
        </button>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="gridBox">
          {movies.map((m, i) => (
            <article className="movie-card" key={i}>
              <h3>{m.title}</h3>
              <h4>{m.year}</h4>
              <div className="action">
                <Link to={`/edit/${m.id}`} role="button" state={m}>
                  📝
                </Link>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="refresh-btn"
                >
                  🚮
                </button>
              </div>
              {showModal && (
                <>
                  <Model
                    showModalMsg={showModalMsg}
                    toggleModel={toggleModal}
                  />
                </>
              )}
            </article>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default HomePage;
