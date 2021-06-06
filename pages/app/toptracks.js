import React from "react";
import { connect } from "react-redux";
import { setTop } from "../../redux/actions/apiReducer";
class TopTracks extends React.Component {
    render(){
        return <h1>In development</h1>
    }
}

export default connect((state) => state, { setTop })(TopTracks);
