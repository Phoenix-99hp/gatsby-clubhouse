import React, { useEffect, useState } from "react"
import SEO from "../components/SEO/SEO"
import Layout from "../components/Layout"
import SignInForm from "../components/SignInForm"
import AlreadySignedIn from "../components/AlreadySignedIn"
import { isLoggedIn, getUser } from "../services/auth"

const IndexPage = () => {
  if (isLoggedIn()) {
    const user = getUser()
    return (
      <Layout
        header={"main"}
        heading={"The Clubhouse"}
        subHeading={
          "A place for members to talk about anything...in relative privacy"
        }
      >
        <SEO title={"Home"} />
        <AlreadySignedIn user={user} />
      </Layout>
    )
  } else {
    return (
      <Layout
        header={"main"}
        heading={"The Clubhouse"}
        subHeading={
          "A place for members to talk about anything...in relative privacy"
        }
      >
        <SEO title={"Home"} />
        <SignInForm />
      </Layout>
    )
  }
}

export default IndexPage
