import axios from "./utils/axios.customize"
import { useEffect } from "react"
import './styles/global.css';
import Header from "./components/layout/header";
import { Outlet } from "react-router-dom";


function App() {

  useEffect(() => {
    const fetchHelloWorld = async () => {
      const res = await axios.get(`/v1/api`);
      console.log(res);

    }
    fetchHelloWorld()
  }, [])

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default App
