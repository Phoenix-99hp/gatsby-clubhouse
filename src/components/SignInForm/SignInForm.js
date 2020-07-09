import React, { useState } from "react"
import { Link, navigate } from "gatsby"
import styles from "./SignInForm.module.scss"
import { handleLogin } from "../../services/auth"

const SignInForm = () => {
    const [userLogin, setUserLogin] = useState({
        username: null,
        password: null,
    })

    const onChange = e => {
        const userInfo = { ...userLogin }
        const targetName = e.target.name
        userInfo[targetName] = e.target.value
        setUserLogin(userInfo)
    }

    const validate = ({ username, password }) => {
        if (!username || !password) {
            return false
        }
        return true
    }

    const onSubmit = e => {
        e.preventDefault()
        if (validate(userLogin)) {
            fetch("/", {
                method: "POST",
                mode: "same-origin",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(userLogin),
            })
                .then(res => {
                    return res.json()
                })
                .then(response => {
                    if (response) {
                        handleLogin(response)
                    }
                })
                .catch(error => {
                    navigate("/signInError")
                })
        } else {
            navigate("/signInError")
        }
    }

    return (
        <>
            <form id={styles.signInForm}>
                <label className={styles.info}>Username:</label>
                <input type="text" name="username" onChange={onChange} />
                <label className={styles.info} id={styles.passwordLabel}>
                    Password:
        </label>
                <input type="password" name="password" onChange={onChange} />
                <button id={styles.signInBtn} type="submit" onClick={onSubmit}>
                    Sign In
        </button>
            </form>
            <p id={styles.signUpLink}>
                Don't have an account?{" "}
                <Link className={styles.link} to="/signup">
                    {" "}
          Sign Up
        </Link>
            </p>
        </>
    )
}

export default SignInForm
