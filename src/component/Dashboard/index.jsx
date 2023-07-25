import React, { useEffect, useState } from "react"
import Button from "../../shared/button"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Dashboard = () => {
  const [datas, setData] = useState([])
  const router = useNavigate()
  const Logout = () => {
    localStorage.removeItem("token")
    router("/")
  }

  const email = localStorage.getItem("email")

  const postData = async () => {
    const server = `https://qurinom-task.vercel.app/user/getPost`
    const payload = {
      email,
    }
    try {
      const resp = await axios.post(server, payload)
      if (resp) {
        setData(resp?.data?.post)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    postData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="bg-slate-300 w-full h-20 ">
        <button
          className="border border-slate-400 absolute bg-slate-200 m-5 p-1"
          onClick={() => router("/post")}
        >
          Add Post
        </button>
        <Button
          className="float-right my-6 mr-5 px-5 py-1 rounded-md"
          title="Logout"
          onClick={Logout}
        />
      </div>
      <h1 className="font-bold mx-5">Post Data</h1>
      <div className="flex">
        {datas.map((item) => {
          return (
            <div>
              <div class=" rounded overflow-hidden border border-current flex1 my-5 mx-2 w-40">
                <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2"></div>
                  <p class="text-gray-700 text-base">{item}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
