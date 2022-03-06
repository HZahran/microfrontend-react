import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import "./App.css";

const Customers = React.lazy(
  //@ts-ignore
  async () => await import("customersApp/customers")
);

function App() {
  return (
    <div className="App">
      <React.Suspense fallback="Loading">
        <Routes>
          <Route
            path="*"
            element={
              <nav>
                <header className="App-header">
                  Main App
                  <Link to="customers">Click here for Customers.</Link>
                </header>
              </nav>
            }
          />
          <Route path="customers/*" element={<Customers />} />
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
