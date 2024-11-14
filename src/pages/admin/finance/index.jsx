import React, { useState, useEffect } from "react";
import { DataTable } from "mantine-datatable";
import Swal from "sweetalert2";
import axios from "axios";
import dayjs from "dayjs";

const PAGE_SIZES = [10, 20, 30];

const Finance = () => {
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [pettycash, setPettyCash] = useState([]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState(pettycash.slice(0, pageSize));

  const getData = async () => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get(import.meta.env.VITE_API_KEY +"/api/petty-cash")
      .then((res) => {
        setPettyCash(res.data.data.filter((p)=>p.status=='จัดทำเอกสาร'));
        setRecords(res.data.data.filter((p)=>p.status!=='จัดทำเอกสาร').slice(from, to));
        setLoading(false);
      });
  };

  const numberFilter = async (key) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get(import.meta.env.VITE_API_KEY +"/api/petty-cash")
      .then((res) => {
        const number = res.data.data.filter((p) =>
          p.petty_cash_id.includes(key)
        );
        setPettyCash(number);
        setRecords(number.slice(from, to));
        setLoading(false);
      });
  };

  const employeeFilter = async (key) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get(import.meta.env.VITE_API_KEY +"/api/petty-cash")
      .then((res) => {
        const employee = res.data.data.filter((p) => p.emp_id.includes(key));
        setPettyCash(employee);
        setRecords(employee.slice(from, to));
        setLoading(false);
      });
  };

  const companyFilter = async (key) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get(import.meta.env.VITE_API_KEY +"/api/petty-cash")
      .then((res) => {
        const company = res.data.data.filter((p) => p.company === key);
        setPettyCash(company);
        setRecords(company.slice(from, to));
        setLoading(false);
      });
  };

  const deptFilter = async (key) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get(import.meta.env.VITE_API_KEY +"/api/petty-cash")
      .then((res) => {
        const dept = res.data.data.filter((p) => p.dept === key);
        setPettyCash(dept);
        setRecords(dept.slice(from, to));
        setLoading(false);
      });
  };

  const statusFilter = async (key) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get(import.meta.env.VITE_API_KEY +"/api/petty-cash")
      .then((res) => {
        const status = res.data.data.filter((p) => p.status === key);
        setPettyCash(status);
        setRecords(status.slice(from, to));
        setLoading(false);
      });
  };

  const dateFilter = async (key) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get(import.meta.env.VITE_API_KEY +"/api/petty-cash")
      .then((res) => {
        const date = res.data.data.filter((p) => p.created_at.includes(key));
        setPettyCash(date);
        setRecords(date.slice(from, to));
        console.log(key);
        setLoading(false);
      });
  };

  const handleApprovedSubmit = (blogs) => {

    Swal.fire({
      title: "ยืนยันการจ่ายเงิน",
      text: "คุณต้องการสั่งจ่ายเงินใช่ไหม",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ยืนยัน",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "ระบบได้ทำการส่งเอกสารเรียบร้อยแล้ว",
          showConfirmButton: false,
          timer: 2000,
        });
        setLoading(true);
        axios
          .put(
            import.meta.env.VITE_API_KEY +"/api/petty-cash-status-update/" +
              blogs.id, {status: "จ่ายเงินสำเร็จ"}
          )
          .then((res) => {
            console.log(res);
            getData();
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handleRejectedSubmit = (blogs) => {
    Swal.fire({
      title: "ยืนยันการยกเลิกเอกสาร",
      text: "คุณต้องการยกเลิกเอกสารฉบับนี้ใช่ไหม",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ยืนยัน",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "ระบบได้ทำการยกเลิกเอกสารเรียบร้อยแล้ว",
          showConfirmButton: false,
          timer: 2000,
        });
        setLoading(true);
        axios
          .put(
            import.meta.env.VITE_API_KEY +"/api/petty-cash-status-update/" +
              blogs.id, {status: "ยกเลิกเอกสาร"}
          )
          .then((res) => {
            console.log(res);
            getData();
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  useEffect(() => {
    getData();
  }, [page, pageSize]);

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">รายการเอกสารเงินสดย่อย</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Petty cash list</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card shadow-none border">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">หมายเลขเอกสาร</label>
                                  <input
                                    className="form-control"
                                    placeholder="กรุณาเพิ่มข้อมูล"
                                    onChange={(event) =>
                                      numberFilter(event.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">รหัสพนักงาน</label>
                                  <input
                                    className="form-control"
                                    placeholder="กรุณาเพิ่มข้อมูล"
                                    onChange={(event) =>
                                      employeeFilter(event.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">ฝ่ายงาน</label>
                                  <select
                                    className="form-control"
                                    onChange={(event) =>
                                      deptFilter(event.target.value)
                                    }
                                  >
                                    <option>กรุณาเลือกข้อมูล</option>
                                    <option value={"ITD"}>ITD</option>
                                    <option value={"HRD"}>HRD</option>
                                    <option value={"AFD"}>AFD</option>
                                    <option value={"PED"}>PED</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">ชื่อบริษัท</label>
                                  <select
                                    className="form-control"
                                    onChange={(event) =>
                                      companyFilter(event.target.value)
                                    }
                                  >
                                    <option>กรุณาเลือกข้อมูล</option>
                                    <option value={"TRU"}>TRU</option>
                                    <option value={"TRT"}>TRT</option>
                                    <option value={"TUC"}>TUC</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">สถานะ</label>
                                  <select
                                    className="form-control"
                                    onChange={(event) =>
                                      statusFilter(event.target.value)
                                    }
                                  >
                                    <option>กรุณาเลือกข้อมูล</option>
                                    <option value={"จัดทำเอกสาร"}>
                                      จัดทำเอกสาร
                                    </option>
                                    <option value={"รอสั่งจ่ายเงิน"}>
                                      รอสั่งจ่ายเงิน
                                    </option>
                                    <option value={"จ่ายเงินสำเร็จ"}>
                                      จ่ายเงินสำเร็จ
                                    </option>
                                    <option value={"ยกเลิกเอกสาร"}>
                                    ยกเลิกเอกสาร
                                    </option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="form-group">
                                  <label htmlFor="">วันที่จัดทำ</label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    onChange={(event) =>
                                      dateFilter(
                                        dayjs(event.target.value).format(
                                          "YYYY-MM-DD"
                                        )
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DataTable
                      style={{
                        fontFamily: "Prompt",
                      }}
                      withBorder
                      highlightOnHover
                      fontSize={"md"}
                      verticalSpacing="md"
                      paginationSize="md"
                      withColumnBorders
                      fetching={loading}
                      idAccessor="id"
                      columns={[
                        {
                          accessor: "index",
                          title: "#",
                          textAlignment: "center",
                          width: 80,
                          render: (record) => records.indexOf(record) + 1,
                        },
                        {
                          accessor: "petty_cash_id",
                          title: "หมายเลขเอกสาร",
                          textAlignment: "center",
                        },
                        {
                          accessor: "emp_id",
                          title: "รหัสพนักงาน",
                          textAlignment: "center",
                        },
                        {
                          accessor: "pay_to",
                          title: "จ่ายเงินให้",
                          textAlignment: "center",
                        },
                        {
                          accessor: "section",
                          title: "หน่วยงาน",
                          textAlignment: "center",
                        },
                        {
                          accessor: "division",
                          title: "ส่วนงาน",
                          textAlignment: "center",
                        },
                        {
                          accessor: "dept",
                          title: "ฝ่ายงาน",
                          textAlignment: "center",
                        },
                        {
                          accessor: "files",
                          title: "ไฟล์แนบ",
                          textAlignment: "center",
                          render: ({ files }) => (
                            <h5>
                              {files === "0" ? (
                                <i className="fas fa-ban text-danger"></i>
                              ) : (
                                <a
                                  href={
                                    import.meta.env.VITE_API_KEY +"/uploads/" +
                                    files
                                  }
                                  target="_blank"
                                >
                                  {/* <i className="fas fa-download"></i> */}
                                  <i className="fas fa-paperclip"></i>
                                </a>
                              )}
                            </h5>
                          ),
                        },
                        {
                          accessor: "company",
                          title: "ชื่อบริษัท",
                          textAlignment: "center",
                        },
                        {
                          accessor: "status",
                          title: "สถานะเอกสาร",
                          textAlignment: "center",
                          render: ({ status }) => (
                            <h5>
                              {status === "รอสั่งจ่ายเงิน" ? (
                                <span className="badge bg-primary">
                                  {status}
                                </span>
                              ) : status === "จ่ายเงินสำเร็จ" ? (
                                <span className="badge bg-success">
                                  {status}
                                </span>
                              ) : status === "จัดทำเอกสาร" ? (
                                <span className="badge bg-warning">
                                  <span className="text-white">{status}</span>
                                </span>
                                 ) : status === "ปิดรายการ" ? (
                                  <span className="badge bg-secondary">
                                    {status}
                                  </span>
                              ) : (
                                <span className="badge bg-danger">
                                  {status}
                                </span>
                              )}
                            </h5>
                          ),
                        },
                        {
                          accessor: "created_at",
                          title: "วันที่จัดทำ",
                          textAlignment: "center",
                          render: ({ created_at }) =>
                            dayjs(created_at).format("DD-MMM-YYYY"),
                        },
                        {
                          accessor: "actions",
                          textAlignment: "center",
                          title: "ดำเนินการ",
                          width: 150,
                          render: (blogs) => (
                            <>
                              <button
                                className="btn btn-info"
                                onClick={() => handleApprovedSubmit(blogs)}
                                disabled={blogs.status==="ยกเลิกเอกสาร" ? true : false}
                              >
                                <i className="fas fa-check-circle"></i>
                              </button>{" "}
                              <button
                                className="btn btn-danger"
                                onClick={() => handleRejectedSubmit(blogs)}
                              >
                                <i className="fas fa-times-circle"></i>
                              </button>
                            </>
                          ),
                        },
                      ]}
                      records={records}
                      minHeight={200}
                      totalRecords={pettycash.length}
                      recordsPerPage={pageSize}
                      page={page}
                      onPageChange={(p) => setPage(p)}
                      recordsPerPageOptions={PAGE_SIZES}
                      onRecordsPerPageChange={setPageSize}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Finance;
