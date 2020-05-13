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
      </div>
    );
  }
}
