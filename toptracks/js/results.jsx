import React from "react";

export default class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let resultsDivs = [];
    this.props.results.forEach((result) => {
      console.log(result);
      resultsDivs.push(
        <div>
          <img src={result.album.images[0].url} />
          <div>
            <p>{result.name}</p>
            <small>{result.album.name}</small>
            <p>
              {result.artists.forEach((artist) => {
                return artist.name;
              })}
            </p>
            <p>{result.popularity}</p>
          </div>
        </div>
      );
    });
    return <div>{resultsDivs}</div>;
  }
}
