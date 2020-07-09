import React from "react"
import SEO from "../components/SEO"
import Layout from "../components/Layout"
import styles from "../styles/error.module.scss"
import { Link } from "gatsby"

const SignInError = () => {
  return (
    <Layout header={"main"}>
      <SEO title={"Error"} />
      <div id={styles.containerSmall}>
        <h1 id={styles.errorTitle}>Something went wrong</h1>
        <span id={styles.emoji}>😢</span>
        <p id={styles.errorP}>
          The username and/or password you entered are probably incorrect.
        </p>
        <Link className={styles.link} to="/">
          Try again
        </Link>
      </div>
    </Layout>
  )
}

export default SignInError
