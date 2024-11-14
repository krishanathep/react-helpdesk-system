import React from "react";
import { NavLink as Link } from "react-router-dom";
import logo from "/assets/dist/img/AdminLTELogo.png";

export default function Sidebar() {
  return (
    <>
      <aside className="main-sidebar nav-pills sidebar-dark-primary sidebar-no-expand elevation-1">
        <Link to="/" className="brand-link">
          <img
            src={logo}
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-1"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">AdminLTE 3</span>
        </Link>
        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-header">MAIN MENU</li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="nav-icon fas fa-home"></i>
                  <p>DASHBOARD</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/pettycash" className="nav-link">
                <i className="nav-icon fas fa-toolbox"></i>
                  <p>HELP-DESK</p>
                </Link>
              </li>
              {/* <li className="nav-header">ADMIN MENU</li>
              <li className="nav-item">
                <Link to="/admin/dashboard" className="nav-link">
                  <i className="nav-icon fas fa-home"></i>
                  <p>แดชบอร์ด</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/finance" className="nav-link">
                <i className="nav-icon fas fa-piggy-bank"></i>
                  <p>เจ้าหน้าที่การเงิน</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/account" className="nav-link">
                  <i className="nav-icon fas fa-calculator"></i>
                  <p>เจ้าหน้าที่บัญชี</p>
                </Link>
              </li>
              <li className="nav-header">REPORT MENU</li>
              <li className="nav-item">
                <Link to="/admin/report" className="nav-link">
                <i className="nav-icon fas fa-chart-pie"></i>
                  <p>รายงานการสั่งจ่าย</p>
                </Link>
              </li> */}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
