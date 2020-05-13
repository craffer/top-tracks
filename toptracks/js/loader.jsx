import React from "react";

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.visible) {
      return (
        <div class="sk-circle-fade">
          <div class="sk-circle-fade-dot"></div>
          <div class="sk-circle-fade-dot"></div>
          <div class="sk-circle-fade-dot"></div>
          <div class="sk-circle-fade-dot"></div>
          <div class="sk-circle-fade-dot"></div>
          <div class="sk-circle-fade-dot"></div>
          <div class="sk-circle-fade-dot"></div>
          <div class="sk-circle-fade-dot"></div>
          <div class="sk-circle-fade-dot"></div>
          <div class="sk-circle-fade-dot"></div>
          <div class="sk-circle-fade-dot"></div>
          <div class="sk-circle-fade-dot"></div>
        </div>
      );
    } else {
      return null;
    }
  }
}
