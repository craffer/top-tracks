import React from "react";

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.visible) {
      return (
        <div className="w-100 d-flex flex-column align-items-center">
          <div className="sk-circle-fade">
            <div className="sk-circle-fade-dot"></div>
            <div className="sk-circle-fade-dot"></div>
            <div className="sk-circle-fade-dot"></div>
            <div className="sk-circle-fade-dot"></div>
            <div className="sk-circle-fade-dot"></div>
            <div className="sk-circle-fade-dot"></div>
            <div className="sk-circle-fade-dot"></div>
            <div className="sk-circle-fade-dot"></div>
            <div className="sk-circle-fade-dot"></div>
            <div className="sk-circle-fade-dot"></div>
            <div className="sk-circle-fade-dot"></div>
            <div className="sk-circle-fade-dot"></div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
