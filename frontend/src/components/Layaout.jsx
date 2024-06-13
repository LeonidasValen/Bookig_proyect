import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./navbar/Navbar";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";

export  function Layaout() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      {location.pathname !== "/" ? <Header types="list" /> : <Header/>}
      <Outlet/>
      <Footer />
    </>
  )
}
