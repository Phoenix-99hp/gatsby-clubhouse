import React from "react"
import SEO from "../components/SEO"
import Layout from "../components/Layout"
import NotFound from "../components/NotFound"

const NotFoundPage = () => (
  <Layout header={"main"}>
    <SEO title={"404: Not found"} />
    <NotFound />
  </Layout>
)

export default NotFoundPage
