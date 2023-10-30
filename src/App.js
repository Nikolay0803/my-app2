import CounterComponent from "./CounterComponent";
import { ListComponent } from "./ListComponent";
import "./App.css";
import RenderComponent from "./RenderComponent";
import MyClassComponent from "./MyClassComponent";
import { useState } from "react";
import ListClassComponent from "./ListClassComponent";
function App() {
  const [isShowTimer, setIsShowTimer] = useState(false)
  return (
    <div className="App">
      <header className="App-header">
        {/* <RenderComponent /> */}
        {/* {isShowTimer ? <MyClassComponent /> : <ListComponent />}
        <button onClick={() => setIsShowTimer((prev) => !prev)}>Show timer</button> */}
        <ListClassComponent />
      </header>
    </div>
  );
}

export default App;
