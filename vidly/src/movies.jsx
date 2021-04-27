import React, { Component } from "react";
import { getMovies } from "./services/fakeMovieService";
import "font-awesome/css/font-awesome.css";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./common/listGroup";

class Movies extends Component {
  state = {
    movies: getMovies(),
    page: 1,
    pageSize: 4,
    genre: "All Genres",
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

  getMoviesByGenre = (genre) => {
    return genre === "All Genres"
      ? this.state.movies
      : this.state.movies.filter((m) => m.genre.name === genre);
  };

  renderTable(movies) {
    const { page, pageSize } = this.state;
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paginate(movies, page, pageSize).map((movie) => {
            return (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLiked(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    if (this.numMovies === 0) {
      return <p>There are no movies in the database.</p>;
    }
    const movies = this.getMoviesByGenre(this.state.genre);
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            onGenreChange={this.handleGenreChange}
            currentGenre={this.state.genre}
          />
        </div>
        <div className="movie-display col">
          <p>Showing {movies.length} movies in the database</p>
          {this.renderTable(movies)}
          <Pagination
            onPageChange={this.handlePageChange}
            itemCount={movies.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.page}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
