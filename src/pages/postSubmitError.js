import React from "react"
import SEO from "../components/SEO"
import Layout from "../components/Layout"
import styles from "../styles/error.module.scss"

const PostSubmitError = () => {
    return (
        <Layout header={"nav"}>
            <SEO title={"Error"} />
            <div id={styles.containerSmall}>
                <h1 id={styles.errorTitle}>Something went wrong</h1>
                <span id={styles.emoji}>😢</span>
                <p id={styles.errorP}>
                    Both a post title and message are required to submit a new post, and
                    titles must be 50 characters or less. Non-Members are not allowed to make posts.
        </p>
            </div>
        </Layout>
    )
}

export default PostSubmitError
