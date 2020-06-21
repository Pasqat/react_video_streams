import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    //  prefix con window in modo da far capire che la variabile gapi
    // è disponibile nel window scope e non nell'app altrimetni da errore
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          // restituisce una Promise quindi uso .then()
          clientId:
            "185674556325-f0u0o2t5p6qeaadd1asq3e7uujc7scvh.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          // verrà eseguito solo quando tutta la libreria gapi sarà pronta
          this.auth = window.gapi.auth2.getAuthInstance();

          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  rederAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOutClick}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={this.onSignInClick}>
          <i className="google icon" />
          Google Sign In
        </button>
      );
    }
  }

  render() {
    return <div>{this.rederAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
