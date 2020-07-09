import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import NewPostForm from "../components/NewPostForm"
import NotFoundPage from "./404"
import { isLoggedIn, getUser } from "../services/auth"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

const NewPost = () => {

    if (isLoggedIn()) {

        const user = getUser()

        const [post, setPost] = useState({
            title: "",
            message: "",
            user: user,
        })

        const validate = ({ title, message, user }) => {
            if (title.length > 50 || !title || !message || (!user.isAdmin && !user.isMember)) {
                return false
            }
            return true
        }

        const onSubmit = e => {
            e.preventDefault()
            if (validate(post)) {
                fetch("/api/messages", {
                    method: "POST",
                    mode: "same-origin",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify(post),
                })
                    .then(res => {
                        navigate("/messages")
                    })
                    .catch(error => {
                        console.error("Error:", error)
                    })
            } else {
                navigate("/postSubmitError")
            }
        }

        const onChange = e => {
            setPost({ ...post, [e.target.name]: e.target.value })
        }
        return (
            <Layout header={"nav"} heading={"New Post"}>
                <SEO title={"New Post"} />
                <NewPostForm onSubmit={onSubmit} onChange={onChange} />
            </Layout>
        )
    } else {
        return NotFoundPage()
    }
}

export default NewPost
