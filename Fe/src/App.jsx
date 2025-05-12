
// import './App.css'
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import AppRoutes from './routes/AppRoutes';

function App() {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 1000,
      easing: "ease-in-out",
      delay: 300,
    });
    AOS.refresh();
  }, []);
  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
