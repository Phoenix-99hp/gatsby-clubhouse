import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styles from "./Header.module.scss"

const Header = ({ heading, subHeading }) => (
  <header id={styles.mainHeader}>
    <h1 id={styles.heading}>{heading}</h1>
    <span id={styles.subHeading}>{subHeading}</span>
  </header>
)

// Header.propTypes = {
//   heading: PropTypes.string,
// }

// Header.defaultProps = {
//   heading: ``,
// }

export default Header
