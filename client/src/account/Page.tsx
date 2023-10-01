import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SessionContext } from "../AuthContext";

export default function AccountPage() {
  const [session, ] = useContext(SessionContext)
  if (session === null) {
    return (
      <Navigate to="/login" replace={true} />
    )
  }

  return (
    <h1>Account Details</h1>
  )
}
