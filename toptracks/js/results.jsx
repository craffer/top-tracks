import React from "react";

export default class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let resultsDivs = [];
    this.props.results.forEach((result, index) => {
      resultsDivs.push(
        <li
          key={result.name}
          className="list-group-item d-flex align-items-center"
        >
          <img className="album-art mr-3" src={result.album.images[1].url} />
          <h1 className="mr-3">{index + 1}.</h1>
          <div>
            <h4>
              <a className="text-dark" href={result.external_url}>
                {result.name}
              </a>
            </h4>
            <p className="text-muted mb-0">
              {result.artists.map((res) => {
                return (
                  <a
                    className="text-muted"
                    key={res.name}
                    href={res.external_url}
                  >
                    {res.name}
                  </a>
                );
              })}{" "}
              –{" "}
              <a className="text-muted" href={result.album.external_url}>
                {result.album.name}
              </a>
            </p>
          </div>
          <div className="ml-auto">
            <h2>{result.popularity}</h2>
          </div>
        </li>
      );
    });
    return <ul className="list-group">{resultsDivs}</ul>;
  }
}
