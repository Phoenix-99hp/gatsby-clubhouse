import React, { useState, useContext } from "react"
import { Link, navigate } from "gatsby"
import styles from "./SignUpForm.module.scss"
import { handleLogin } from "../../services/auth"

const SignUpForm = () => {
  const [user, setUserState] = useState({
    username: null,
    password: null,
    confirm_password: null,
    member_password: null,
    admin_password: null,
  })

  const validate = ({ username, password, confirm_password }) => {
    if (
      !username ||
      !password ||
      username.length > 30 ||
      password.length > 30 ||
      password !== confirm_password
    ) {
      return false
    }
    return true
  }

  const onSubmit = e => {
    e.preventDefault()
    // console.log(user)
    if (validate(user)) {
      fetch("/signup", {
        method: "POST",
        mode: "same-origin",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(user),
      })
        .then(res => {
          return res.json()
        })
        .then(response => {
          if (response !== null) {
            handleLogin(response)
          } else {
            navigate("/signUpError")
          }
        })
        .catch(error => {
          console.error("Error:", error)
          navigate("/signUpError")
        })
    } else {
      navigate("/signUpError")
    }
  }

  const onChange = e => {
    const userInfo = { ...user }
    const targetName = e.target.name
    userInfo[targetName] = e.target.value
    setUserState(userInfo)
  }

  return (
    <>
      <form id={styles.signUpForm}>
        <div className={styles.signUpInfo}>
          <div className={styles.formGroup}>
            <label className={styles.inputLabel}>Username:</label>
            <input
              className={styles.info}
              type="text"
              name="username"
              onChange={onChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.inputLabel}>Password:</label>
            <input
              className={styles.info}
              type="password"
              name="password"
              onChange={onChange}
            />
            <label className={`${styles.labelRight} ${styles.inputLabel}`}>
              Confirm Password:
            </label>
            <input
              className={styles.info}
              type="password"
              name="confirm_password"
              onChange={onChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.inputLabel}>
              Are you a member? If so, enter your member password:
            </label>
            <input
              className={styles.info}
              type="password"
              name="member_password"
              onChange={onChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.inputLabel}>
              Are you an admin? If so, enter your admin password:
            </label>
            <input
              className={styles.info}
              type="password"
              name="admin_password"
              onChange={onChange}
            />
          </div>
        </div>
        <button id={styles.signUpBtn} type="submit" onClick={onSubmit}>
          Sign Up
        </button>
        <p className={styles.password}>***Member Password: welcometotheclub</p>
        <p className={styles.password}>***Admin Password: alwaystrust</p>
      </form>
      <p id={styles.homeLink}>
        <Link className={styles.link} to="/">
          Back to Home
        </Link>
      </p>
    </>
  )
}

export default SignUpForm
