import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import MovieCard from "./MovieCard";

import UpdateMovie from "./UpdateMovie";


export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
    // console.log(props, "props")
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  handleUpdate = e => {
    e.preventDefault();
    this.props.history.push(`/movies/${this.state.movie.id}/update-movie/`);
  };

  handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
      .then(res => this.props.history.push('/'))
      .catch(err => console.log(err))
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    // console.log(this.state, "state");

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <Route
          path="/movies/:id/update-movie"
          render={props => <UpdateMovie {...props} movie={this.state.movie} />}
        />
        <button onClick={this.handleUpdate}>Edit</button>
        <button onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
}
