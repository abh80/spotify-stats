import React from "react";
import { connect } from "react-redux";
import { setState } from "../redux/actions/state";
import Menu from "../components/menu";

class About extends React.Component {
  render() {
    return (
      <>
        <div className="flex fullscreen">
          <Menu />
          <div className="fullscreen" />
        </div>
      </>
    );
  }
}

export default connect(({ state }) => state, { set: setState })(About);
