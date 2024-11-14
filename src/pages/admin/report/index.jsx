import React, { useState, useEffect } from "react";
import { DataTable } from "mantine-datatable";
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
      .get(import.meta.env.VITE_API_KEY + "/api/petty-cash")
      .then((res) => {
        setPettyCash(res.data.data);
        setRecords(res.data.data.slice(from, to));
        setLoading(false);
      });
  };

  const dateFilter = async (key) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get(import.meta.env.VITE_API_KEY + "/api/petty-cash")
      .then((res) => {
        const date = res.data.data.filter((p) => p.created_at.includes(key));
        setPettyCash(date);
        setRecords(date.slice(from, to));
        setLoading(false);
      });
  }

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
                <h1 className="m-0">PETTY CASH REPORT</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Report</li>
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
                      <div className="col-md-10 mt-3 mb-2">
                        <h5>บริษัท ไทยรุ่งยูเนี่ยนคาร์ จำกัด (มหาชน)</h5>
                        <h5>รายงานการสั่งจ่ายเงินสดย่อย</h5>
                      </div>
                      <div className="col-md-2">
                        <label htmlFor="">วันที่รายงาน</label>
                        <input 
                        className="form-control" 
                        type="date" 
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
                          width: 50,
                          render: (record) => records.indexOf(record) + 1,
                        },
                        {
                          accessor: "petty_cash_id",
                          title: "หมายเลขเอกสาร",
                          textAlignment: "center",
                          width: 180,
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
                          accessor: "dept",
                          title: "ฝ่ายงาน",
                          textAlignment: "center",
                        },
                        {
                          accessor: "pay_list",
                          title: "รายการที่จ่าย",
                          textAlignment: "center",
                          width: 200,
                          render: ({ pay_list }) => (
                            <div>
                              {pay_list.map((pay, index) => (
                                <p>{pay.description}</p>
                              ))}
                            </div>
                          ),
                        },
                        {
                          accessor: "pay_list",
                          title: "จำนวนเงิน",
                          textAlignment: "center",
                          render: ({ pay_list }) => (
                            <div>
                              {pay_list.map((pay, index) => (
                                <p>{pay.amount}</p>
                              ))}
                            </div>
                          ),
                        },
                        {
                            accessor: "pay_list",
                            title: "ประเภทการจ่าย",
                            textAlignment: "center",
                            render: ({ pay_list }) => (
                              <div>
                                {pay_list.map((pay, index) => (
                                  <p>{pay.pay_type}</p>
                                ))}
                              </div>
                            ),
                          },
                        // {
                        //   accessor: "pay_list",
                        //   title: "ค่าเดินทาง",
                        //   textAlignment: "center",
                        //   render: ({ pay_list }) => (
                        //     <div>
                        //       {pay_list.map((pay, index) => (
                        //         <p key={index}>
                        //           {pay.pay_type === "ค่าเดินทาง"
                        //             ? pay.amount
                        //             : ""}
                        //         </p>
                        //       ))}
                        //     </div>
                        //   ),
                        // },
                        // {
                        {
                          accessor: "created_at",
                          title: "วันที่จัดทำ",
                          textAlignment: "center",
                          width: 150,
                          render: ({ created_at }) =>
                            dayjs(created_at).format("DD-MMM-YYYY"),
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
