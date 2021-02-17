import React, { useState, useEffect } from "react"
import styles from "./NonMemberMessages.module.scss"
import { navigate } from "gatsby"

const NonMemberMessages = () => {
  const [messages, setMessages] = useState(null)
  const [lastMessage, setLastMessage] = useState(null)

  useEffect(() => {
    fetch("/api/messages", {
      method: "GET",
      mode: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        return res.json()
      })
      .then(response => {
        if (response[0]) {
          setMessages(response)
        }
      })
      .catch(error => {
        navigate("/404")
      })
  }, [])

  const loadMore = () => {
    fetch("/api/messages/more", {
      method: "GET",
      mode: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        return res.json()
      })
      .then(response => {
        const idsToDel = []

        for (let i = 0; i < response.length; i++) {
          for (let j = 0; j < messages.length; j++) {
            if (messages[j]._id === response[i]._id) {
              idsToDel.push(response[i]._id)
            }
          }
        }
        const filtered = []

        if (idsToDel[0]) {
          for (let i = 0; i < response.length; i++) {
            if (idsToDel.includes(response[i]._id)) {
              continue
            } else {
              filtered.push(response[i])
            }
          }
          setLastMessage(true)
          const newMsgs = [...messages, ...filtered]
          setMessages(newMsgs)
        } else {
          const newMsgs = [...messages, ...response]
          setMessages(newMsgs)
        }
      })
      .catch(error => {
        navigate("/404")
      })
  }

  return (
    <>
      <h3 id={styles.nonMember}>
        As a non-member you may only see the time of the post and the username
        of the user who posted
      </h3>
      {messages ? (
        messages.map((message, index) => (
          <div className={styles.message} key={index}>
            <p
              className={`${styles.messageP} ${
                message.user.isAdmin ? styles.admin : styles.member
              }`}
            >
              <span id={styles.dashSpan}>-</span> {message.user.username}
            </p>
            <p className={`${styles.messageP} ${styles.timestamp}`}>
              ({message.timestamp})
            </p>
          </div>
        ))
      ) : (
        <h3>There are currently no messages posted</h3>
      )}
      <button
        className={styles.loadBtn}
        onClick={loadMore}
        disabled={
          !messages || messages.length < 10 || lastMessage ? true : false
        }
      >
        Load More
      </button>
      <div className={styles.last}>
        {lastMessage ? "You've reached the end of the messages" : null}
      </div>
    </>
  )
}

export default NonMemberMessages
