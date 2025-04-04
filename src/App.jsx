import React from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { Router } from "./routes/index.jsx";

const App = () => {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Router />
      </main>
      <Footer />
    </div>
  );
};

export default App;
