import React from "react";

export default class Tracks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let resultsDivs = [];
    this.props.tracks.forEach((track, index) => {
      resultsDivs.push(
        <li
          key={track.spotify_id}
          className="list-group-item d-flex align-items-center"
        >
          <a href={track.external_url} target="_blank">
            <img
              className="album-art mr-2 mr-md-3 shadow-sm"
              src={track.album.images[1].url}
            />
          </a>
          <h1 className="mr-2 mr-md-3 ranking">{index + 1}.</h1>
          <div>
            <h4 className="song-name mb-0 mb-md-2">
              <a
                className="text-dark"
                href={track.external_url}
                target="_blank"
              >
                {track.name}
              </a>
            </h4>
            <div className="text-muted">
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
              –{" "}
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
    });
    return <ul className="list-group mb-4">{resultsDivs}</ul>;
  }
}
