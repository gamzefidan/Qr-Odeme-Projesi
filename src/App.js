import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import BusinessPanel from "./pages/BusinessPanel";
import CustomerPanel from "./pages/CustomerPanel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BusinessPanel />} />
        <Route path="/business" element={<BusinessPanel />} />
        <Route path="/customer" element={<CustomerPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
