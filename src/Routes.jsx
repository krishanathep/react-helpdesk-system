import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";

import WithNavbar from "./layouts/WithNavbar";
import WithOutnavbar from "./layouts/WithOutnavbar";

import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";

import Home from './pages/home'
import Repair from "./pages/repair";


const RoutesPage = () => {
  return (
    <Router>
      <Routes>
        <Route element={<WithOutnavbar />}>
          <Route exact  path="/auth/signin" element={<Signin />} />
          <Route path="/auth/signup" element={<Signup />} />
        </Route>
        <Route
          element={
            <RequireAuth loginPath={"/auth/signin"}>
              <WithNavbar />
            </RequireAuth>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/repair" element={<Repair />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RoutesPage;
