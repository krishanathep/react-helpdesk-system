import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";

import WithNavbar from "./layouts/WithNavbar";
import WithOutnavbar from "./layouts/WithOutnavbar";

import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";

import Home from './pages/home'

import PettyCash from "./pages/pettycash";
import PettyCashCreate from "./pages/pettycash/create";
import PettyCashUpdate from './pages/pettycash/edit'
import PettyCashView from './pages/pettycash/view'

//Admin Menu
import Dashboard from "./pages/admin/dashboard";
import FinanceList from './pages/admin/finance'
import AccountList from './pages/admin/account'
import AccountUpdate from './pages/admin/account/edit'
import Report from './pages/admin/report'
import TestFunctions from "./pages/test";

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
          <Route path="/pettycash" element={<PettyCash />} />
          <Route path="/pettycash/create" element={<PettyCashCreate/>}/>
          <Route path="/pettycash/update/:id" element={<PettyCashUpdate/>}/>
          <Route path="/pettycash/view/:id" element={<PettyCashView/>}/>

          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/finance" element={<FinanceList />} />
          <Route path="/admin/account" element={<AccountList />} />
          <Route path="/admin/account/update/:id" element={<AccountUpdate />} />
          <Route path="/admin/report" element={<Report />} />

          <Route path='/test' element={<TestFunctions/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RoutesPage;
