import React from "react";
import SearchResult from "./searchresult";

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      results: [],
    };

    this.search = this.search.bind(this);
    this.clearResults = this.clearResults.bind(this);
  }

  search() {
    this.props.updateTracks([]);
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

  clearResults() {
    this.setState({
      results: [],
    });
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
          <div className="input-group-append">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={this.search}
            >
              <div>
                <i className="fas fa-search"></i>
              </div>
            </button>
          </div>
        </div>
        <div className="mt-4">
          <h5>
            {this.state.results.length > 0
              ? "Click on an artist to see their top songs:"
              : ""}
          </h5>
          <ul className="list-group">
            {this.state.results.map((result) => {
              return (
                <SearchResult
                  key={result.spotify_id}
                  artist={result}
                  updateArtist={this.props.updateArtist}
                  updateTracks={this.props.updateTracks}
                  clearArtistSearch={this.clearResults}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
