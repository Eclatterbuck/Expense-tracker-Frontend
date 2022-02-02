import React, { useState, useEffect } from "react";
import { auth } from "./services/firebase";
import "./index.css";
import Header from "./components/Header"
import Main from "./components/Main"

export default function App() {
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => setUser(user))
  }, [])

  return (
    <div className="App">
      <Header user={user} />
      <Main user={user} />
    </div>
  );
}
