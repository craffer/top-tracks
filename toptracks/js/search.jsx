import React from "react";

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      results: [],
    };

    this.search = this.search.bind(this);
  }

  search() {
    const url = `api/v1/search?q=${encodeURI(this.state.query)}`;
    fetch(url, { credentials: "same-origin" })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({
          results: data.artists,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search for an artist"
          value={this.state.query}
          onChange={(event) => this.setState({ query: event.target.value })}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              this.search();
            }
          }}
        ></input>
        <ul className="list-group">
          {this.state.results.map((result) => {
            return (
              <SearchResult
                key={result.name}
                name={result.name}
                image={result.images.length > 0 ? result.images[0].url : ""}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="list-group-item d-flex align-items-center">
        <img className="album-art mr-3" src={this.props.image} />
        <h4>{this.props.name}</h4>
      </li>
    );
  }
}
