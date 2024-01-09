import Game from './game/Game.jsx'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={`${process.env.PUBLIC_URL}static/images/logo.svg`} className="App-logo" alt="logo" />
      </header>
      <div>
        <Game />
      </div>
    </div>
  );
}

export default App;
