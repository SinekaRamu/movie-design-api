import axios from "axios";
import { IMovie } from "../type";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5476",
  //   timeout: 1000,
});

export const getMovies = () => {
  return axiosInstance.get("/movies");
};

export const addMovie = (payload: IMovie) => {
  return axiosInstance.post("/movies", payload);
};

export const updateMovie = (payload: IMovie, movieId: number) => {
  return axiosInstance.put(`/movies/${movieId}`, payload);
};

export const deleteMovie = (movieId: number) => {
  return axiosInstance.delete(`/movies/${movieId}`);
};

export const getMovie = async (movieId: number) => {
  return axiosInstance.get(`/movies/${movieId}`);
};
