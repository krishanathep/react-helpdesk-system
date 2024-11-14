import React from "react";
import { Link } from 'react-router-dom'
import { useForm, useFieldArray, Controller } from "react-hook-form";

const TestFunctions = () => {
  const { register, control, handleSubmit, reset, trigger, setError } = useForm(
    {
      // defaultValues: {}; you can populate the fields by this attribute
      defaultValues: {
        test: [
          {
            firstName: "",
            lastName: "",
          },
        ],
      },
    }
  );
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Test Functions</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Test Functions</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card card-outline card-primary">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <form
                          onSubmit={handleSubmit((data) =>
                            alert(JSON.stringify(data))
                          )}
                        >
                          {fields.map((item, index) => (
                            <div
                              className="card shadow-none border"
                              key={item.index}
                            >
                              <div className="card-body">
                                <div className="group-form">
                                  <label htmlFor="">Fist Name :</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    {...register(`test.${index}.firstName`)}
                                    placeholder="Please Enter First Name"
                                  />
                                </div>
                                <div className="group-form">
                                  <label htmlFor="">Last Name :</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    {...register(`test.${index}.lastName`)}
                                    placeholder="Please Enter Last Name"
                                  />
                                </div>
                               <div className="col-md-12">
                                <div className="float-right mt-2">
                                <button
                                  className="btn btn-secondary btn-sm"
                                  type="button"
                                  onClick={() =>
                                    append({ firstName: "", lastName: "" })
                                  }
                                >
                                  <i className="fas fa-plus"></i>
                                </button> {' '}
                                <button
                                  className="btn btn-secondary btn-sm"
                                  type="button"
                                  onClick={() => remove(index)}
                                >
                                  <i className="fas fa-minus"></i>
                                </button>
                                </div>
                               </div>
                              </div>
                            </div>
                          ))}
                          <div className="col-md-12">
                            <div className="float-right">
                              <input
                                className="btn btn-primary"
                                type="submit"
                                value={"SUBMIT"}
                              />{' '}
                              <Link className="btn btn-danger">CANCEL</Link>
                            </div>
                          </div>
                        </form>
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

export default TestFunctions;
