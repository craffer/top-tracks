import React from "react";
import Tracks from "./tracks";
import Submit from "./submit";
import Search from "./search";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artist: "The Beatles",
      artistId: "3WrFJ7ztbogyGnTHbHJFl2",
      tracks: [],
    };

    this.updateResults = this.updateResults.bind(this);
  }

  updateResults(newTracks) {
    this.setState({
      results: newTracks,
    });
  }

  render() {
    return (
      <div>
        <Search />
        <Submit
          artistId={this.state.artistId}
          updateResults={this.updateResults}
        />
        <Tracks tracks={this.state.tracks} />
      </div>
    );
  }
}
