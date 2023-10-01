import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{margin: "20px"}}>
      <Outlet />
    </div>
  )
};
