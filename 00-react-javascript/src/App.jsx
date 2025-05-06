import axios from "./utils/axios.customize"
import { useContext, useEffect } from "react"
import './styles/global.css';
import Header from "./components/layout/header";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";

function App() {
  const { setAuth, apploading, setAppLoading } = useContext(AuthContext);

  useEffect(() => {
    const fetchCount = async () => {
      setAppLoading(true);

      const res = await axios.get(`/v1/api/account`);
      if (res && !res.message) {
        setAuth({
          isAuthenticated: true,
          user: {
            email: res.email,
            name: res.name,
          }
        })
      }
      setAppLoading(false)
    }
    fetchCount()
  }, [setAuth, setAppLoading])

  return (
    <div>
      {apploading === true ?
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50 %, -50 %)"
        }}>
          <Spin />
        </div>
        :
        <>
          <Header />
          <Outlet />
        </>}
    </div>
  )
}

export default App
