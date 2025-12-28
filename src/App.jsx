import { Routes, Route } from "react-router-dom";
import PropertyBrokerWebsite from "./components/PropertyBrokerWebsite";
import PropertyDetails from "./components/PropertyDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PropertyBrokerWebsite />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
    </Routes>
  );
}

export default App;
