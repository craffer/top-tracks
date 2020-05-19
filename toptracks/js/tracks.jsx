import React from "react";

export default class Tracks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let resultsDivs = [];
    this.props.tracks.forEach((track, index) => {
      resultsDivs.push(
        <Track key={track.spotify_id} track={track} ranking={index + 1} />
      );
    });
    return <ul className="list-group mb-4">{resultsDivs}</ul>;
  }
}

class Track extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let track = this.props.track;
    return (
      <li
        key={track.spotify_id}
        className="list-group-item d-flex align-items-center w-100 p-2 px-md-4 py-md-3"
      >
        <a href={track.external_url} target="_blank">
          <img
            className="album-art mr-2 mr-md-3 shadow-sm"
            src={track.album.images[1].url}
          />
        </a>
        <h1 className="mr-2 mr-md-3 ranking">{this.props.ranking}.</h1>
        <div className="col-7 px-0">
          <h4 className="song-name mb-0 mb-md-2 text-nowrap w-100 overflow-text">
            <a className="text-dark" href={track.external_url} target="_blank">
              {track.name}
            </a>
          </h4>
          <div className="text-muted text-nowrap w-100 overflow-text">
            {track.artists.map((res, index, arr) => {
              // for the last element, we don't want a comma and space after
              let nameDisplay = res.name;
              if (arr.length - 1 !== index) {
                nameDisplay += ", ";
              }
              return (
                <a
                  className="text-muted album-artist"
                  target="_blank"
                  key={res.spotify_id}
                  href={res.external_url}
                >
                  {nameDisplay}
                </a>
              );
            })}{" "}
            &middot;{" "}
            <a
              className="text-muted album-artist"
              href={track.album.external_url}
              target="_blank"
            >
              {track.album.name}
            </a>
          </div>
        </div>
        <div className="ml-auto d-flex flex-column align-items-center">
          <small>Score:</small>
          <h2 className="score">{track.popularity}</h2>
        </div>
      </li>
    );
  }
}
