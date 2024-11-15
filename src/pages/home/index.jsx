import React, { useState, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from 'axios'

export default function Home() {
  
  const [pettycashs, setPettyCash]  = useState(0)
  const [inprogress, setInprogress]  = useState(0)
  const [approverd, setApproved]  = useState(0)
  const [rejected, setRejected]  = useState(0)

  const profile = useAuthUser();

  const getData = async () => {
    await axios.get('http://129.200.6.52/laravel_auth_jwt_api_afd/public/api/petty-cash')
      .then((res)=>{

        const detpFilter = res.data.data.filter((f)=>f.dept===profile().dept)

        const status1 = detpFilter.filter(
          (ap) => ap.status === "รอสั่งจ่ายเงิน"
        );

        const status2 = detpFilter.filter(
          (ap) => ap.status === "จ่ายเงินสำเร็จ"
        );

        const status3 = detpFilter.filter(
          (ap) => ap.status === "ยกเลิกเอกสาร"
        );

        setPettyCash(detpFilter.length)
        setInprogress(status1.length)
        setApproved(status2.length)
        setRejected(status3.length)
      })
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">แดชบอร์ด</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a className="breadcrumb-item active">Dashboard</a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{pettycashs}</h3>
                  <p>รายการแจ้งซ่อม</p>
                </div>
                <div className="icon">
                <i className="fas fa-tools"></i>
                </div>
                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="small-box bg-primary">
                <div className="inner">
                  <h3>{inprogress}</h3>
                  <p>In-Progress</p>
                </div>
                <div className="icon">
                <i className="fas fa-cogs"></i>
                </div>
                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{approverd}</h3>
                  <p>Sueecee</p>
                </div>
                <div className="icon">
                <i className="fas fa-rocket"></i>
                </div>
                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{rejected}</h3>
                  <p>Rejected</p>
                </div>
                <div className="icon">
                <i className="fas fa-exclamation-circle"></i>
                </div>
                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
