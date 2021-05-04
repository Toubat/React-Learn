import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { toast } from "react-toastify";

import "font-awesome/css/font-awesome.css";
import Pagination from "../common/pagination";
import MoviesTable from "./moviesTable";
import ListGroup from "../common/listGroup";
import _, { fromPairs } from "lodash";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import SearchBox from "../common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    page: 1,
    pageSize: 4,
    genre: "All Genres",
    sortColumn: { path: "title", order: "asc" },
    genres: [],
    search: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "all-genres", name: "All Genres" }, ...data];
    const { data: movies } = await getMovies();

    this.setState({ movies, genres });
  }

  handleDelete = async (movie) => {
    const prevMovies = this.state.movies;
    const movies = prevMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted.");

        this.setState({ movies: prevMovies });
      }
    }
  };

  handleLiked = (movie) => {
    const movies = this.state.movies;
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ page });
  };

  handleGenreChange = (genre) => {
    this.setState({ genre, page: 1, search: "" });
  };

  handleSort = (sortColumn) => {
    console.log(sortColumn.path);
    this.setState({ sortColumn });
  };

  handleSearchChange = (value) => {
    const search = value.toLowerCase();

    this.setState({ search, page: 1 });
  };

  getMoviesByGenre = (genre) => {
    return genre === "All Genres"
      ? this.state.movies
      : this.state.movies.filter((m) => m.genre.name === genre);
  };

  getMovieBySearchResult = () => {
    const result = [];
    for (let movie of this.state.movies) {
      var title = movie.title.toLowerCase();
      if (title.includes(this.state.search)) {
        result.push(movie);
      }
    }
    console.log(result);
    return result;
  };

  getPagedData = () => {
    let filtered = [];
    if (this.state.search) {
      filtered = this.getMovieBySearchResult();
    } else {
      filtered = this.getMoviesByGenre(this.state.genre);
    }
    const sorted = _.orderBy(
      filtered,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    const movies = paginate(sorted, this.state.page, this.state.pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    if (this.numMovies === 0) {
      return <p>There are no movies in the database.</p>;
    }

    const { totalCount, data: movies } = this.getPagedData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            onGenreChange={this.handleGenreChange}
            currentGenre={this.state.genre}
            shutDown={this.state.search !== ""}
            items={this.state.genres}
            textProperty="name"
            valueProperty="_id"
          />
        </div>
        <div className="movie-display col">
          <Link
            to="movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <p>Showing {totalCount} movies in the database</p>
          <SearchBox
            search={this.state.search}
            onChange={this.handleSearchChange}
          />
          <MoviesTable
            movies={movies}
            onLike={this.handleLiked}
            onDelete={this.handleDelete}
            pageSize={this.state.pageSize}
            page={this.state.page}
            onSort={this.handleSort}
            sortColumn={this.state.sortColumn}
          />
          <Pagination
            onPageChange={this.handlePageChange}
            itemCount={totalCount}
            pageSize={this.state.pageSize}
            currentPage={this.state.page}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
