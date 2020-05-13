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

    this.updateTracks = this.updateTracks.bind(this);
  }

  updateTracks(newTracks) {
    this.setState({
      tracks: newTracks,
    });
  }

  render() {
    return (
      <div>
        <Search />
        <Submit
          artistId={this.state.artistId}
          updateTracks={this.updateTracks}
        />
        <Tracks tracks={this.state.tracks} />
      </div>
    );
  }
}
