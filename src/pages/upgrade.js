import React from "react"
import SEO from "../components/SEO"
import Layout from "../components/Layout"
import { isLoggedIn, getUser } from "../services/auth"
import MemberUpgrade from "../components/MemberUpgrade"
import NonMemberUpgrade from "../components/NonMemberUpgrade"
import NotFoundPage from "./404"

const Upgrade = () => {
  if (isLoggedIn()) {
    const user = getUser()
    return (
      <Layout
        header={"main"}
        heading={"Welcome to the Clubhouse"}
        subHeading={
          "A place for members to talk about anything...in relative privacy"
        }
      >
        <SEO title={"Home"} />
        {user.isMember ? <MemberUpgrade /> : <NonMemberUpgrade />}
      </Layout>
    )
  } else {
    return NotFoundPage()
  }
}
export default Upgrade
