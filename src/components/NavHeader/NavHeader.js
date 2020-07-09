import React from "react"
import { Link } from "gatsby"
import styles from "./NavHeader.module.scss"

function NavHeader({ heading, status, username }) {
    return (
        <>
            <header id={styles.navHeader}>
                <h1 id={styles.title}>
                    {heading}
                    {username ? <span id={styles.usernameSpan}>
                        <span
                            id={`${
                                status === "Admin"
                                    ? styles.admin
                                    : status === "Member"
                                        ? styles.member
                                        : styles.nonMember
                                }`}
                        >
                            {username}
                        </span>
                        <span id={styles.exclamation}>!</span>
                    </span>
                        : ""}
                </h1>
                <nav className={`${styles.noMargin} ${styles.navbar}`}>
                    <Link
                        id={styles.firstLink}
                        className={styles.navLink}
                        to="/dashboard"
                    >
                        Dashboard
          </Link>
                    <Link className={styles.navLink} to="/newPost">
                        New Post
          </Link>
                </nav>
            </header>
        </>
    )
}

export default NavHeader
