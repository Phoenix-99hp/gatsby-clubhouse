import React, { useEffect, useState } from "react"
import AdminDashboard from "../components/AdminDashboard/AdminDashboard"
import MemberDashboard from "../components/MemberDashboard/MemberDashboard"
import NonMemberDashboard from "../components/NonMemberDashboard/NonMemberDashboard"
import Layout from "../components/Layout/Layout"
import SEO from "../components/SEO/SEO"
import styles from "../styles/dashboard.module.scss"
import NotFoundPage from "./404"
import { logout, isLoggedIn, getUser } from "../services/auth"

const Dashboard = () => {

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
                heading={"Welcome to your dashboard, "}
                status={userStatus}
                username={user.username}
                exclamation={true}
            >
                <SEO title="Dashboard" />
                <div id={styles.containerSmall}>
                    {user.isAdmin ? (
                        <AdminDashboard status={"Admin"} handleSessionLogout={logout} />
                    ) : user.isMember ? (
                        <MemberDashboard status={"Member"} handleSessionLogout={logout} />
                    ) : (
                                <NonMemberDashboard
                                    status={"Non-Member"}
                                    handleSessionLogout={logout}
                                />
                            )}
                </div>
            </Layout>
        )
    } else {
        return NotFoundPage()
    }
}

export default Dashboard
