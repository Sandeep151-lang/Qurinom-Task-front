import React from "react"
import Input from "../../shared/input"
import { useForm } from "react-hook-form"
import Button from "../../shared/button"
import { Link } from "react-router-dom"
import * as yup from "yup"
import axios from 'axios'
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom"


const Register = () => {
  const router = useNavigate()

  const registerSchema =yup.object({
    name:yup.string().required("Name is required. "),
    email:yup.string().required("Email is required. "),
    phoneNo:yup.string().required("Phone no. is required."),
    password: yup.string().required("Password is required. "),
    confpassword: yup.string().required('Confirm password is required.').oneOf([yup.ref('password'), null], 'Passwords does not match.'),
})

 
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    
     resolver:yupResolver(registerSchema)
  })


  const onSubmit =async (values)=>{
    console.log(values,"ddd")
    const payload={
      ...values,
    }
    delete payload.confpassword
    try {
        const res =await axios.post(`https://qurinom-task.vercel.app/user/register`,payload)
        if(res){
          alert(res?.data?.message)
          router("/")
        
        
        }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="login-header">
      <div className="login-sub_header p-5 rounded-md shadow-sm border-gray-500 border">
        <h1 className="font-bold text-center text-2xl my-5">
          Register to <span className="text-emerald-600">Qurinom</span>
        </h1>
        <div>
         
          <Input
            label="Enter Name"
            placeholder="Enter name"
            mandatory
            labelClassName="text-md  my-2"
            className="w-full border border-inherit px-2 py-1"
            type="text"
            rest={register("name")}
            error={errors?.name?.message}
            values={watch("name")}
            onChange={(event)=>{
              setValue('name',event.target.value)
            clearErrors('name')}}
          />

          <Input
            label="Enter Phone"
            placeholder="Enter phone no"
            mandatory
            labelClassName="text-md  my-2"
            className="w-full border border-inherit px-2 py-1"
            type="number"
            rest={register("phoneNo")}
            error={errors?.phoneNo?.message}
            values={watch("phoneNo")}
            onChange={(event)=>{
              setValue('phoneNo',event.target.value)
            clearErrors('phoneNo')}}
          />

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
            onChange={(event)=>{
              setValue('email',event.target.value)
            clearErrors('email')}}
          />

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
            onChange={(event)=>{
              setValue('password',event.target.value)
            clearErrors('password')}}
          />

          <Input
            label="Confirm Password"
            placeholder="Enter confirm password"
            mandatory
            labelClassName="text-md  my-2"
            className="w-full border border-inherit px-2 py-1"
            type="password"
            rest={register("confpassword")}
            error={errors?.confpassword?.message}
            values={watch("confpassword")}
            onChange={(event)=>{
              setValue('confpassword',event.target.value)
            clearErrors('confpassword')}}
          />

          <div></div>
          <Button
            title="Login"
            className="my-5 w-full login-button   rounded-md border-r py-2"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
        <p className="float-right font-semibold text-sm ">
          Have an account ?{" "}
          <Link to="/" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
