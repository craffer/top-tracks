import React from "react";

export default class SearchResult extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.updateArtist(this.props.artist);
    this.props.setLoading(true);
    const url = "api/v1/tracks";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        artist_name: this.props.artist.name,
        artist_id: this.props.artist.spotify_id,
      }),
    })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.props.updateTracks(data.tracks);
        this.props.setLoading(false);
      })
      .catch((error) => console.log(error));
    this.props.clearArtistSearch();
  }

  render() {
    return (
      <a
        className="list-group-item list-group-item-action d-flex align-items-center p-2 px-md-4 py-md-3"
        onClick={this.handleClick}
      >
        <img
          className="album-art mr-2 mr-md-3 shadow-sm"
          src={
            this.props.artist.images.length > 0
              ? this.props.artist.images[0].url
              : ""
          }
        />
        <h4 className="artist-search">{this.props.artist.name}</h4>
      </a>
    );
  }
}
