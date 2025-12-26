import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PropertyBrokerWebsite from "./components/PropertyBrokerWebsite";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <PropertyBrokerWebsite />
    </>
  );
}

export default App;
