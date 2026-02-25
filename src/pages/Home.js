import { useEffect, useState, useMemo, useRef } from "react";
import { getPeople, getHomeworld, getSpecies, getFilm } from "../api/swapi";

import Loader from "../components/Loader";
import Error from "../components/Error";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";
import CharacterCard from "../components/CharacterCard";
import CharacterModal from "../components/CharacterModal";

import "../components/styles/layout.css";

const speciess = {};
const homeworldd = {};
const filmm = {};

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    species: "",
    homeworld: "",
    film: "",
  });

  const [selected, setSelected] = useState(null);

  const CharacterDetail = async (char) => {
    //  console.log("Charac", char.name)
    let speciesName = "Human";
    let homeworldData = null;
    let filmTitles = [];

    if (char.species.length) {
      const url = char.species[0];

      if (!speciess[url]) {
        const res = await getSpecies(url);
        // console.log(res, "Species");
        speciess[url] = res.data;
      }

      speciesName = speciess[url].name;
    }

    if (!homeworldd[char.homeworld]) {
      const hw = await getHomeworld(char.homeworld);
      homeworldd[char.homeworld] = hw.data;
    }

    homeworldData = homeworldd[char.homeworld];

    const films = await Promise.all(
      char.films.map(async (f) => {
        if (!filmm[f]) {
          const res = await getFilm(f);
          filmm[f] = res.data;
        }
        return filmm[f];
      }),
    );

    filmTitles = films.map((f) => f.title);

    return {
      ...char,
      speciesName,
      homeworldData,
      filmTitles,
    };
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getPeople(page);
      console.log(res, "ResponseGetPeople");
      setTotalPages(Math.ceil(res.data.count / 10));

      const charac = await Promise.all(res.data.results.map(CharacterDetail));
      console.log(charac, "Character Detail");
      setCharacters(charac);
    } catch (err) {
      setError("API server unreachable.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page]);

  // performance optimized search and filtering
  const filteredCharacters = useMemo(() => {
    return characters
      .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
      .filter((c) =>
        filters.species ? c.speciesName === filters.species : true,
      )
      .filter((c) =>
        filters.homeworld ? c.homeworldData?.name === filters.homeworld : true,
      )
      .filter((c) =>
        filters.film ? c.filmTitles.includes(filters.film) : true,
      );
  }, [characters, search, filters]);

  console.log("Filtered Charac", filteredCharacters);

  const speciesList = [...new Set(characters.map((c) => c.speciesName))];
  const homeworldList = [
    ...new Set(characters.map((c) => c.homeworldData?.name)),
  ];
  const filmList = [...new Set(characters.flatMap((c) => c.filmTitles))];

  return (
    <div className="container">
      <h1>Star Wars Characters List</h1>

      <SearchBar value={search} onChange={setSearch} />

      <Filter
        speciesList={speciesList}
        homeworldList={homeworldList}
        filmList={filmList}
        filters={filters}
        setFilters={setFilters}
      />

      {loading && <Loader />}
      {error && <Error message={error} />}

      <div className="grid">
        {filteredCharacters.map((char) => (
          <CharacterCard
            key={char.name}
            character={char}
            onClick={setSelected}
          />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      <CharacterModal character={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default Home;
