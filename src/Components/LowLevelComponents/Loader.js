import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";

class Loader extends Component {
  render() {
    return (
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            overflow: "hidden"
          }
        }}
        open={this.props.open}
      >
        <div
          style={{
            height: this.props.size + 20,
            width: this.props.size + 20,
            opacity: 1
          }}
        >
          <CircularProgress size={this.props.size} />
        </div>
      </Dialog>
    );
  }
}

export default Loader;
