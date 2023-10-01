import { useContext } from "react";
import { SessionContext } from "../AuthContext";
import { Navigate } from "react-router-dom";
import client from "../client";

export default function LogoutPage() {
  const [session, setSession] = useContext(SessionContext)

  if (session !== null) {
    client.sessionLogout(session, session.token, session.refresh_token);
    setSession(null);
  }

  return (
    <Navigate to="/" replace={true} />
  )
}
