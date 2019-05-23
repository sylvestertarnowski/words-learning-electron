import * as React from "react";
import Words from "./Words";
import Header from "./Header";

class App extends React.Component {
  render() {
    return (
      <div className="main-container">
        <Header />
        <Words />
      </div>
    )
  }
}

export default App;