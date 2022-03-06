import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import "./App.css";

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
                  Customers App
                  <Link to="page-2">Click here for Details</Link>
                  <a href="/">Go Back</a>
                </header>
              </nav>
            }
          />
          <Route
            path="page-2"
            element={<header className="App-header">Customer Details</header>}
          />
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
