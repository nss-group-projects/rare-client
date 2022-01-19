import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Auth.css"
import { loginUser } from "./AuthManager"


export const Login = () => {
  const username = useRef()
  const password = useRef()
  const invalidDialog = useRef()
  const history = useHistory()

  const handleLogin = (e) => {
    e.preventDefault()
    const user = {
      username: username.current.value,
      password: password.current.value
    }
    loginUser(user)
      .then(res => {
        if ("valid" in res && res.valid) {
          localStorage.setItem("token", res.token)
          history.push("/")
        }
        else {
          invalidDialog.current.showModal()
        }
      })
  }

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={invalidDialog}>
        <div>Username or password was not valid.</div>
        <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
      </dialog>
      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <h1>Rare Publishing</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <label htmlFor="inputUsername"> Username </label>
            <input ref={username} type="text" id="username" className="form-control"  required autoFocus />
          </fieldset>
          <fieldset>
            <label htmlFor="inputPassword"> Password </label>
            <input ref={password} type="password" id="password" className="form-control" required />
          </fieldset>
          <fieldset style={{
            textAlign: "center"
          }}>
            <button className="btn btn-1 btn-sep icon-send" type="submit">Sign In</button>
          </fieldset>
        </form>
      </section>
      <section className="link--register">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  )
}
