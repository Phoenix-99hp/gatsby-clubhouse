import React, { useState, useEffect } from "react"
import { navigate, Link } from "gatsby"
import styles from "./NonMemberUpgrade.module.scss"
import { getUser, handleLogin } from "../../services/auth"

const NonMemberUpgrade = () => {

    const user = getUser()

    const [userState, setUserState] = useState({
        ...user,
        member_password: null,
        admin_password: null,
    })

    const validate = ({ member_password }) => {
        if (!member_password) {
            return false
        }
        return true
    }

    const onSubmit = e => {
        e.preventDefault()
        if (validate(userState)) {
            fetch("/upgrade", {
                method: "PUT",
                mode: "same-origin",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(userState),
            })
                .then(res => {
                    if (res) {
                        return res.json()
                    }
                    else {
                        navigate("/upgradeError");
                    }
                })
                .then(response => {
                    if (response) {
                        handleLogin(response)
                    } else {
                        navigate("/upgradeError");
                    }
                })
                .catch(error => {
                    console.error("Error:", error)
                })
        } else {
            navigate("/upgradeError")
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
                <button id={styles.signUpBtn} type="submit" onClick={onSubmit}>
                    Upgrade
        </button>
            </form>
            <p id={styles.homeLink}>
                <Link className={styles.link} to="/dashboard">
                    Back to Dashboard
        </Link>
            </p>
        </>
    )
}

export default NonMemberUpgrade
