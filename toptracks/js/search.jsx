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
    this.clearResults();
    this.props.updateTracks([]);
    this.props.setLoading(true);
    const url = `api/v1/search?q=${encodeURI(this.state.query)}`;
    fetch(url, { credentials: "same-origin" })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          results: data.artists,
        });
        this.props.setLoading(false);
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
      <div>
        <div className="mt-3">
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
                className="btn btn-outline-light"
                type="button"
                onClick={this.search}
              >
                <div>
                  <i className="fas fa-search"></i>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div>
            {this.state.results.length > 0 && (
              <Results
                resultsList={this.state.results}
                updateArtist={this.props.updateArtist}
                updateTracks={this.props.updateTracks}
                clearResults={this.clearResults}
                setLoading={this.props.setLoading}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMore: false,
    };

    this.toggleShow = this.toggleShow.bind(this);
  }

  toggleShow() {
    this.setState((prevState) => ({
      showMore: !prevState.showMore,
    }));
  }

  render() {
    let needMore = this.props.resultsList.some(
      (result) => result["popularity"] <= 20
    );
    return (
      <div className="mt-4">
        <ul className="list-group">
          {this.props.resultsList.map((result) => {
            if (result.popularity > 20 || this.state.showMore) {
              return (
                <SearchResult
                  key={result.spotify_id}
                  artist={result}
                  updateArtist={this.props.updateArtist}
                  updateTracks={this.props.updateTracks}
                  clearArtistSearch={this.props.clearResults}
                  setLoading={this.props.setLoading}
                />
              );
            }
          })}
        </ul>
        {needMore && (
          <ShowResults
            toggleShow={this.toggleShow}
            more={this.state.showMore}
          />
        )}
      </div>
    );
  }
}

class ShowResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        className="btn btn-link text-white"
        onClick={this.props.toggleShow}
      >
        Show {this.props.more ? "fewer" : "more"} results
      </button>
    );
  }
}
