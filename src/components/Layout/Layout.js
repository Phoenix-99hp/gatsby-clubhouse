import React from "react"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import styles from "./Layout.module.scss"
import NavHeader from "../NavHeader"

const Layout = ({
  header,
  heading,
  status,
  subHeading,
  username,
  children,
}) => {
  return (
    <div id={styles.PageContainer}>
      {header === "main" ? (
        <Header heading={heading} subHeading={subHeading} />
      ) : (
          <NavHeader username={username} status={status} heading={heading} />
        )}
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
