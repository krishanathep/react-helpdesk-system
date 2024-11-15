import React, { useState, useEffect } from "react";
import { DataTable } from "mantine-datatable";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

const PAGE_SIZES = [10, 20, 30];

const Repair = () => {
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [repair, setRepair] = useState([
    {
      id: 999999999,
      repair: "Computer",
      type: "Hardware",
      detail: "คอมพิวเตอร์เปิดไม่ติด",
      name: "kwang",
      status: "รอดำเนินการ",
      remark: "ลองเสียบปลั้กกแล้วก็ไม่ติด",
      created_at: "15-11-24",
    },
    {
      id: 222222222,
      repair: "Computer",
      type: "Hardware",
      detail: "คอมพิวเตอร์เปิดไม่ติด",
      name: "kwang",
      status: "รอดำเนินการ",
      remark: "เครื่องไม่ติดเเต่หน้าจอติดนะ",
      created_at: "15-11-24",
    },
  ]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState(repair.slice(0, pageSize));

  const getData = async () => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    await axios
      .get("http://129.200.6.52/laravel_auth_jwt_api_afd/public/api/petty-cash")
      .then((res) => {
        setRepair(res.data.data);
        setRecords(res.data.data.slice(from, to));
        setLoading(false);
      });
  };

  useEffect(() => {
    //getData();
  }, [page, pageSize]);

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">รายการแจ้งซ่อม</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Repair</li>
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
                      <div className="col-md-12">
                        <button className="btn btn-success mb-2 float-right">
                          เพิ่มรายการซ่อม
                        </button>
                      </div>
                      <div className="col-md-12">
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
                          //fetching={loading}
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
                              accessor: "id",
                              title: "หมายเลข",
                              textAlignment: "center",
                              width: 180,
                            },
                            {
                              accessor: "type",
                              title: "ประเภท",
                              textAlignment: "center",
                            },
                            {
                              accessor: "repair",
                              title: "แจ้งซ่อม",
                              textAlignment: "center",
                            },
                            {
                              accessor: "detail",
                              title: "รายละเอียด",
                              textAlignment: "center",
                            },
                            {
                              accessor: "name",
                              title: "ผู้แจ้ง",
                              textAlignment: "center",
                            },
                            {
                              accessor: "status",
                              title: "สถานะ",
                              textAlignment: "center",
                            },
                            {
                              accessor: "remark",
                              title: "หมายเหตุ",
                              textAlignment: "center",
                            },
                            {
                              accessor: "created_at",
                              title: "วันที่จัดทำ",
                              textAlignment: "center",
                              width: 150,
                              render: ({ created_at }) =>
                                dayjs(created_at).format("DD-MMM-YYYY"),
                            },
                            {
                              accessor: "actions",
                              textAlignment: "center",
                              title: "ดำเนินการ",
                              width: 250,
                              render: (blogs) => (
                                <>
                                  <button className="btn btn-info">
                                    <i className="fas fa-eye"></i>
                                  </button>{" "}
                                  <Link className="btn btn-primary">
                                    <i className="fas fa-edit"></i>
                                  </Link>{" "}
                                  <button className="btn btn-danger">
                                    <i className="fas fa-trash-alt"></i>
                                  </button>
                                </>
                              ),
                            },
                          ]}
                          records={records}
                          minHeight={200}
                          totalRecords={repair.length}
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
        </div>
      </div>
    </>
  );
};

export default Repair;
