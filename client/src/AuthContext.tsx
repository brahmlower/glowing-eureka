import { Session } from '@heroiclabs/nakama-js';
import { PropsWithChildren, createContext, useState } from 'react';

const LOCAL_STORE_SESSION = "session"

interface SessionParts {
  token: string,
  refresh_token: string,
}

type NullableSession = Session | null;

type SetSessionCallable = (session: NullableSession) => void

export const SessionContext = createContext<[NullableSession, SetSessionCallable]>([null, () => {}]);

function restoreSession(session_str: string | null): NullableSession {
  if (session_str === null) {
    return null;
  }

  const session_parts: SessionParts = JSON.parse(session_str);

  return Session.restore(session_parts.token, session_parts.refresh_token)
}

function useSession(): [NullableSession, SetSessionCallable] {
  const local_store_session = restoreSession(localStorage.getItem(LOCAL_STORE_SESSION));

  const [inner_state, setInnerState] = useState(local_store_session)

  const setSession = (session: NullableSession): void => {
    if (session !== null) {
      const parts: SessionParts = {
        token: session.token,
        refresh_token: session.refresh_token
      };
      localStorage.setItem(LOCAL_STORE_SESSION, JSON.stringify(parts));
      setInnerState(session);
    } else {
      localStorage.removeItem(LOCAL_STORE_SESSION);
      setInnerState(null);
    }
  }

  // (window as any).session = inner_state;

  return [inner_state, setSession]
}

export function SessionProvider(props: PropsWithChildren) {
  return (
    <SessionContext.Provider value={useSession()}>
      {props.children}
    </SessionContext.Provider>
  )
}
