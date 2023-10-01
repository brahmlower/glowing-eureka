import { useContext } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../AuthContext";

export default function LandingPage() {
  const [session, ] = useContext(SessionContext)

  return (
    <div>
      <h1>Welcome to the Idle Game landing page</h1>
      <ul>
      { session === null
        ? (
          <>
            <li>
              <Link to="/login" replace={false}>Login</Link>
            </li>
            <li>
              <Link to="/registration" replace={false}>Register</Link>
            </li>
          </>
        )
        : (
          <>
            <li>
              <Link to="/game" replace={false}>Play Game!</Link>
            </li>
            <li>
              <Link to="/account" replace={false}>Account Details</Link>
            </li>
            <li>
              <Link to="/logout" replace={false}>Logout</Link>
            </li>
          </>
        )
      }
      </ul>
    </div>
  )
}
