import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import AdminMessages from "../components/AdminMessages"
import MemberMessages from "../components/MemberMessages"
import NonMemberMessages from "../components/NonMemberMessages"
import SEO from "../components/SEO"
import NotFoundPage from "./404"
import styles from "../styles/messages.module.scss"
import { isLoggedIn, getUser } from "../services/auth"

const Messages = () => {

    if (isLoggedIn()) {
        const user = getUser();
        const userStatus = user.isAdmin
            ? "Admin"
            : user.isMember
                ? "Member"
                : "Non-Member"

        return (
            <Layout
                header={"nav"}
                heading={"Check out these cool messages, "}
                username={user.username}
                status={userStatus}
            >
                <SEO title="Dashboard" />
                <div id={styles.containerSmall}>
                    {user.isAdmin ? (
                        <AdminMessages />
                    ) : user.isMember ? (
                        <MemberMessages />
                    ) : (
                                <NonMemberMessages />
                            )}
                </div>
            </Layout>
        )
    } else {
        return NotFoundPage()
    }
}

export default Messages
