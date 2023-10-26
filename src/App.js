import CounterComponent from "./CounterComponent";
import { ListComponent } from "./ListComponent";
import "./App.css";
import RenderComponent from "./RenderComponent";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <RenderComponent /> */}
        <ListComponent />
        {/* <CounterComponent></CounterComponent> */}
      </header>
    </div>
  );
}

export default App;
