import React from "react";

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.visible) {
      return (
        <img
          src="https://cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif"
          alt="loading..."
        />
      );
    } else {
      return null;
    }
  }
}
