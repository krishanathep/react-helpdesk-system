import React from "react";
import { AuthProvider } from "react-auth-kit";
import "./App.css";
import Routes from "./Routes";

function App() {
  return (
    <>
      <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
      >
        <Routes />
      </AuthProvider>
    </>
  );
}

export default App;
