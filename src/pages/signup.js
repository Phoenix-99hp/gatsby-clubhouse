import React from "react"
import SEO from "../components/SEO"
import SignUpForm from "../components/SignUpForm"
import Layout from "../components/Layout"
import AlreadySignedIn from "../components/AlreadySignedIn"
import { isLoggedIn } from "../services/auth"

const SignUp = () => {
    if (isLoggedIn()) {
        return (
            <Layout header={"main"} heading={"Already Signed In"}>
                <SEO title={"Sign Up"} />
                <AlreadySignedIn />
            </Layout>
        )
    } else {
        return (
            <Layout header={"main"} heading={"Sign Up"}>
                <SEO title={"Sign Up"} />
                <SignUpForm />
            </Layout>
        )
    }
}

export default SignUp
