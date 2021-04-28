import React, { Component } from "react";
import { getMovies } from "./services/fakeMovieService";
import "font-awesome/css/font-awesome.css";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import _ from "lodash";
import { paginate } from "./utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    page: 1,
    pageSize: 4,
    genre: "All Genres",
    sortColumn: { path: "title", order: "asc" },
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
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
    this.setState({ genre, page: 1 });
  };

  handleSort = (sortColumn) => {
    console.log(sortColumn.path);
    this.setState({ sortColumn });
  };

  getMoviesByGenre = (genre) => {
    return genre === "All Genres"
      ? this.state.movies
      : this.state.movies.filter((m) => m.genre.name === genre);
  };

  getPagedData = () => {
    const filtered = this.getMoviesByGenre(this.state.genre);
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
          />
        </div>
        <div className="movie-display col">
          <p>Showing {totalCount} movies in the database</p>
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
