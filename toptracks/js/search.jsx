import React from "react";

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      results: [],
    };

    this.search = this.search.bind(this);
  }

  search() {
    const url = `api/v1/search?q=${encodeURI(this.state.query)}`;
    fetch(url, { credentials: "same-origin" })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({
          results: data.artists,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="mt-5">
        <div className="input-group col-md-8 offset-md-2">
          <input
            className="form-control searchbar p-2"
            type="text"
            placeholder="Search for an artist"
            value={this.state.query}
            onChange={(event) => this.setState({ query: event.target.value })}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                this.search();
              }
            }}
          ></input>
          <div class="input-group-append">
            <button
              class="btn btn-secondary"
              type="button"
              onClick={this.search}
            >
              <div>
                <i class="fas fa-search"></i>
              </div>
            </button>
          </div>
        </div>
        <ul className="list-group">
          {this.state.results.map((result) => {
            return (
              <SearchResult
                key={result.spotify_id}
                artist={result}
                updateArtist={this.props.updateArtist}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

class SearchResult extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.updateArtist(this.props.artist);
  }

  render() {
    return (
      <a
        className="list-group-item list-group-item-action d-flex align-items-center"
        onClick={this.handleClick}
      >
        <img
          className="album-art mr-3"
          src={
            this.props.artist.images.length > 0
              ? this.props.artist.images[0].url
              : ""
          }
        />
        <h4>{this.props.artist.name}</h4>
      </a>
    );
  }
}
