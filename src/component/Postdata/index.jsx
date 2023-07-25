import React from 'react'
import axios from 'axios'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import Button from '../../shared/button';

const Post = ({data}) => {

    const router = useNavigate()
    const postSchema =yup.object({
        post:yup.string().required("post is required. "),
       
    })

    const {
        register,
        handleSubmit,
        watch,
        // setValue,
       
        formState: { errors },
      } = useForm({
        mode: "onTouched",
        reValidateMode: "onChange",
         resolver:yupResolver(postSchema)
      })

// useEffect(()=>{
// if(data){
//     setValue("id",data?._id)
// }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
// },[data])

      const onPost =(value)=>{
        const payload={
            ...value
        }
        try {
            const res = axios[watch("id")? "put" : "post"](watch("id") ? `https://qurinom-task.vercel.app/${watch("id")}` :'https://qurinom-task.vercel.app/post',payload)
           if(res){
            router('/dashboard')
           }
        } catch (error) {
            console.log(error)
        }
      }
  return (
    <div className="login-header">
      <div className="login-sub_header p-5 rounded-md  border">
        <textarea {...register("post")} placeholder='Enter your post' className='border border-current w-full'/>
        <div>
        {errors && (
            <span
            className="text-rose-600 text-sm font-semibold"
            style={{ marginRight: "50%" }}
            >
            {errors?.post?.message}
          </span>
        )}
        </div>
          <Button title="Post" className="px-5 py-1 mt-2 rounded-md" onClick={handleSubmit(onPost)}/>
          </div>
    </div>
  )
}

export default Post