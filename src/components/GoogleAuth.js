import React from "react";

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

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
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignIn = () => {
    this.auth.signIn();
  };

  onSignOut = () => {
    this.auth.signOut();
  };

  rederAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOut}>
          <i className="google icon" />
          Google Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={this.onSignIn}>
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

export default GoogleAuth;
