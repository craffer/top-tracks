import React from "react";
import Tracks from "./tracks";
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
    this.updateArtist = this.updateArtist.bind(this);
  }

  updateArtist(newArtist) {
    this.setState({
      artist: newArtist.name,
      artistId: newArtist.spotify_id,
    });
  }

  updateTracks(newTracks) {
    this.setState({
      tracks: newTracks,
    });
  }

  render() {
    return (
      <div>
        <Search
          updateArtist={this.updateArtist}
          updateTracks={this.updateTracks}
        />
        <Tracks tracks={this.state.tracks} />
      </div>
    );
  }
}
