import React from "react";
import Tracks from "./tracks";
import Search from "./search";
import Loader from "./loader";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artist: "The Beatles",
      artistId: "3WrFJ7ztbogyGnTHbHJFl2",
      tracks: [],
      loading: false,
    };

    this.updateTracks = this.updateTracks.bind(this);
    this.updateArtist = this.updateArtist.bind(this);
    this.setLoading = this.setLoading.bind(this);
  }

  setLoading(bool) {
    console.log("loading set", bool);
    this.setState({
      loading: bool,
    });
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
          setLoading={this.setLoading}
        />
        <Tracks tracks={this.state.tracks} />
        <Loader visible={this.state.loading} />
      </div>
    );
  }
}
