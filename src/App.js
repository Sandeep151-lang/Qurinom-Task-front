import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./component/Login"
import Register from "./component/Register"
import PrivateRoute from "./privateRoute"
import Dashboard from "./component/Dashboard"
import Post from "./component/Postdata"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="post" element={<Post />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
