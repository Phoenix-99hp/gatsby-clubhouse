import React from "react"
import styles from "./NewPostForm.module.scss"

const NewPostForm = ({ onSubmit, onChange }) => {
  return (
    <div id={styles.container}>
      <form action="" method="POST" id={styles.newPostForm}>
        <div className={styles.formGroup}>
          <label className={styles.postLabel}>Title:</label>
          <input
            className={styles.info}
            name="title"
            type="text"
            onChange={onChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.msgLabel}>Message</label>
          <textarea className={styles.ta} name="message" onChange={onChange} />
        </div>
        <button id={styles.postButton} type="submit" onClick={onSubmit}>
          Post Message
        </button>
      </form>
    </div>
  )
}

export default NewPostForm
