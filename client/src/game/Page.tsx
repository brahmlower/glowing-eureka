import { Navigate } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../AuthContext";
import client from "../client";

enum Activity {
  Mining = 1,
}

interface CurrentActivity {
  activity: Activity | null,
}


function GamePage() {
  const [activity, setActivity] = useState<Activity | null>(null)
  const [session, ] = useContext(SessionContext)

  useEffect(() => {
    const getCurrentActivity = async () => {
      if (session === null) {
        return
      }

      const resp = await client.rpc(session, "CurrentActivity", {})
      console.log(resp)
      // const x = resp.payload !== undefined ? JSON.parse(resp.payload) : null
      const { activity } = (resp.payload as CurrentActivity)
      setActivity(activity)
    }
    getCurrentActivity()
  }, [session])


  const onClickToggleActivity = async (selected_activity: Activity) => {
    // If we're already doing the activity, then we're toggling the activity off
    const target_activity = activity === selected_activity
      ? null
      : selected_activity;

    if (session === null) {
      return
    }

    const resp = await client.rpc(session, "ChangeActivity", { activity: target_activity })
    console.log(resp)
  }

  if (session === null) {
    return (
      <Navigate to="/login" replace={true} />
    )
  }

  return (
    <div className="GamePage">
      <h1> Welcome To Game! </h1>

      <p>Current Activity: {activity}</p>

      <button onClick={() => onClickToggleActivity(Activity.Mining)}>Mine Asteroid</button>
    </div>
  );
}

export default GamePage;
