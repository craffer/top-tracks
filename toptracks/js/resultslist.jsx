import React from "react";
import SearchResult from "./searchresult";

export default class ResultsList extends React.Component {
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
    let needMore = this.props.results.some(
      (result) => result["popularity"] <= 20
    );
    return (
      <div className="mt-4">
        <ul className="list-group">
          {this.props.results.map((result) => {
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
