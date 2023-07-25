import React from "react"
import Button from "../../shared/button"
import {useNavigate } from "react-router-dom"
import EditIcon from "../../icon/EditIcon"

const Dashboard = () => {
  const router = useNavigate()
  const Logout = ()=>{
    localStorage.removeItem('token')
    
      router('/')
    
  }

  

 const data = []
  return (
    
      <div>
      <div className="bg-slate-300 w-full h-20 ">
      <Button className="float-right my-6 mr-5 px-5 py-1 rounded-md" title="Logout" onClick={Logout}/>
      </div>
      {data.length>0 ? <div className="p-5">
      <div className="w-52  border border-current h-5 ">
      <EditIcon className="cursor-pointer"/>
      <div className="w-52 border border-current h-40">
      <p>dddddddd</p>
      </div>
      </div>
      </div> : 
      <div className="relative w-full">
        <button className="border border-current absolute bg-slate-200 m-5 p-3" onClick={()=>router('/post')}>
        Add Post
        </button>
        </div>
      }
      
    </div>
  )
}

export default Dashboard
