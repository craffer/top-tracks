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
          <img className="album-art mr-3" src={track.album.images[1].url} />
          <h1 className="mr-3">{index + 1}.</h1>
          <div>
            <h4>
              <a className="text-dark" href={track.external_url}>
                {track.name}
              </a>
            </h4>
            <p className="text-muted mb-0">
              {track.artists.map((res, index, arr) => {
                // for the last element, we don't want a comma and space after
                let nameDisplay = res.name;
                if (arr.length - 1 !== index) {
                  nameDisplay += ", ";
                }
                return (
                  <a
                    className="text-muted"
                    key={res.spotify_id}
                    href={res.external_url}
                  >
                    {nameDisplay}
                  </a>
                );
              })}{" "}
              –{" "}
              <a className="text-muted" href={track.album.external_url}>
                {track.album.name}
              </a>
            </p>
          </div>
          <div className="ml-auto">
            <h2>{track.popularity}</h2>
          </div>
        </li>
      );
    });
    return <ul className="list-group">{resultsDivs}</ul>;
  }
}
