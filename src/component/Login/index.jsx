import React from "react"
import Input from "../../shared/input"
import { useForm } from "react-hook-form"
import Button from "../../shared/button"
import { Link } from "react-router-dom"
import axios from "axios"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const router = useNavigate()
  const loginSchema = yup.object({
    email: yup.string().required("Email is required. "),
    password: yup.string().required("Password is required. "),
  })

  const defaultValue = {
    email: undefined,
    password: undefined,
  }
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValue,
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async (values) => {
    const payload = {
      ...values,
    }
    try {
      const res = await axios.post(
        `https://qurinom-task.vercel.app/user/login`,
        payload
      )

      if (res) {
        alert("Login successfully")
        localStorage.setItem("token", res?.data?.token)
        localStorage.setItem("email", res?.data?.email)
        router("/dashboard")
        reset({ ...defaultValue })
      }
    } catch (error) {
      alert(error?.response?.data?.message)
    }
  }

  return (
    <div className="login-header">
      <div className="login-sub_header p-5 rounded-md shadow-sm border-gray-500 border">
        <h1 className="font-bold text-center text-2xl my-5">
          Login to <span className="text-emerald-600">Qurinom</span>
        </h1>

        <div>
          {/* <EmailIcon className="absolute top-10 left-2"/> */}
          <Input
            label="Email"
            placeholder="Enter email"
            labelClassName="text-md  my-2"
            mandatory
            type="email"
            className=" w-full border border-inherit px-2 py-1"
            rest={register("email")}
            error={errors?.email?.message}
            values={watch("email")}
            onChange={(e) => {
              setValue("email", e?.target?.value)
              clearErrors("email")
            }}
          />

          {/* <PasswordIcon className="absolute top-10 left-2"/> */}
          <Input
            label="Password"
            placeholder="Enter password"
            mandatory
            labelClassName="text-md  my-2"
            className="w-full border border-inherit px-2 py-1"
            type="password"
            rest={register("password")}
            error={errors?.password?.message}
            values={watch("password")}
            onChange={(e) => {
              setValue("password", e?.target?.value)
              clearErrors("password")
            }}
          />

          <div></div>
          <Button
            title="Login"
            className="my-5 w-full login-button   rounded-md border-r py-2"
            // onClick={handleSubmit(onSubmit)}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
        <p className="float-right font-semibold text-sm ">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
