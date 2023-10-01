import { Formik, Field, Form } from "formik";
import { Navigate } from "react-router-dom";

import client from "../client";
import { useContext } from "react";
import { SessionContext } from "../AuthContext";

export default function LoginPage() {
  const [session, setSession] = useContext(SessionContext)
  if (session !== null) {
    return (
      <Navigate to="/" replace={true} />
    )
  }

  return (
    <div className="LoginPage">
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        onSubmit={async (values) => {
          const session = await client.authenticateEmail(
            values.email,
            values.password,
            false,
          );
          setSession(session);
        }}
      >
        <Form>
          <label htmlFor="email">Email</label>
          <Field name="email" type="text" />
          <br />

          <label htmlFor="password">Password</label>
          <Field name="password" type="password" />
          <br />

          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
}
