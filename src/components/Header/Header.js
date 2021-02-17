import PropTypes from "prop-types"
import React from "react"
import styles from "./Header.module.scss"

const Header = ({ heading, subHeading }) => (
  <header id={styles.mainHeader}>
    <h1 id={styles.heading}>
      {heading}
      {/* <span id={styles.welcome}>Welcome to</span> */}
      {/* <span id={styles.clubhouse}>{heading}</span> */}
    </h1>
    <span id={styles.subHeading}>{subHeading}</span>
  </header>
)

export default Header
