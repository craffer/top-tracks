import React from "react";

export default class Submit extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.artistId !== undefined) {
      const url = "api/v1/tracks";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ artist_id: this.props.artistId }),
      })
        .then((response) => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then((data) => {
          this.props.updateTracks(data.tracks);
        })
        .catch((error) => console.log(error));
    }
  }

  render() {
    return (
      <button
        type="submit"
        className="btn btn-success"
        onClick={this.handleClick}
      >
        SUBMIT
      </button>
    );
  }
}
