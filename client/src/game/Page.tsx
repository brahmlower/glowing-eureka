import { Navigate } from "react-router-dom";

import { useContext } from "react";
import { SessionContext } from "../AuthContext";

function GamePage() {
  const [session, ] = useContext(SessionContext)
  if (session === null) {
    return (
      <Navigate to="/login" replace={true} />
    )
  }

  return (
    <div className="GamePage">
      <h1> Welcome To Game! </h1>
    </div>
  );
}

export default GamePage;
