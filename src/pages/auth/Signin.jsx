import React,{useState} from "react";
import { useForm } from "react-hook-form"
import { useSignIn } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'
import Preloader from "../../components/Preloader";
import logo from '/assets/imgs/kanda_logo.png'
import Swal from 'sweetalert2'
import axios from 'axios'

export default function Signin() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const signIn = useSignIn()
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async data => {
    try {
      setLoading(true)
      await axios.post(import.meta.env.VITE_API_KEY +'/api/auth/login', data)
        .then((res)=>{

          const token = res.data.access_token

          if(token != null) {
            if(signIn({
              token: res.data.access_token,
              authState: res.data.user,
              expiresIn: 60,
              tokenType: "Bearer",
            })){
              navigate('/')
            }
          } else {
            console.log('เกิดข้อผิดพลาด!!!')
          }
        })
    } catch(error){
      console.log(error.response.data)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data,
      })
      reset({
        email: "",
        password: "",
      });
    } finally {
      setLoading(false)
    }
  }

  if(loading === true) {
    return(
      <Preloader/>
    )
  }

  return (
    <body>
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="login-logo">
            <a href="#">
              {/* <b>OT-</b>REQUEST */}
              <img src={logo} width='60%' alt="" />
            </a>
          </div>
          <div  id="auth_bg" className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Sign in to start your session</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                <input className="form-control"  type="email" {...register("email", { required: true })} placeholder="Email" />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                {errors.email && <p className="text-danger">This username field is required</p>}
                <div className="input-group mb-3">
                <input className="form-control" type="password" {...register("password", { required: true })} placeholder="Password" />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                {errors.password && <p className="text-danger">This password field is required</p>}
                <div className="row">
                  <div className="col-8">
                  </div>
                  <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign In
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

