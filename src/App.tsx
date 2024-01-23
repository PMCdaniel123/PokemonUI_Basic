import React from "react";
import "./App.css";

// để biết này là 1 react function component
const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
      </div>
    </div>
  );
}

export default App;
