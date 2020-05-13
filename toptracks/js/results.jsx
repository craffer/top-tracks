import React from "react";

export default class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let resultsDivs = [];
    this.props.results.forEach((result, index) => {
      resultsDivs.push(
        <li className="list-group-item d-flex align-items-center">
          <img className="album-art mr-3" src={result.album.images[1].url} />
          <div>
            <h5 className="mb-0">
              {index + 1}. {result.name}
            </h5>
            <small className="text-muted">
              {result.artists.map((res) => {
                console.log(res);
                return <div key={res.name}>{res.name}</div>;
              })}
            </small>
            <p className="mb-1 text-muted">{result.album.name}</p>
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
