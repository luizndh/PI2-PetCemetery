import './App.css';
import Login from './Paginas/Login';
import ClientIdContext from './components/ClientIdContext';

function App() {
  var clientId = "";
  return (
    <div className="App">
      <ClientIdContext.Provider value={clientId}>
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </ClientIdContext.Provider>
    </div>
  );
}

export default App;
