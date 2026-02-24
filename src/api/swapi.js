import axios from "axios";

const API = axios.create({
  baseURL: "https://swapi.dev/api/",
});

export const getPeople = (page) => API.get(`people/?page=${page}`);
export const getHomeworld = (url) => axios.get(url);
export const getSpecies = (url) => axios.get(url);
export const getFilm = (url) => axios.get(url);
