import React from "react";
import { connect } from "react-redux";
import { setTop } from "../../redux/actions/apiReducer";
class TopTracks extends React.Component {
    
}

export default connect((state) => state, { setTop })(TopTracks);
