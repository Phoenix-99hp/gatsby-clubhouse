import React, { useState, useEffect, useReducer } from "react"
import styles from "./AdminMessages.module.scss"
import { navigate } from "gatsby"
import Loader from "../Loader"

const AdminMessages = () => {
  //   const [messages, setMessages] = useState(null)
  const [lastMessage, setLastMessage] = useState(null)

  const initialState = {
    fetching: false,
    messages: null,
    hasError: false,
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_MESSAGES":
        return {
          ...state,
          fetching: true,
          // hasError: false,
        }
      case "DONE_FETCHING":
        return {
          ...state,
          fetching: false,
          messages: action.payload,
          //   lastMessage
          // hasError: false,
        }
      case "FETCH_ERROR":
        return {
          ...state,
          hasError: true,
          fetching: false,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: "FETCH_MESSAGES" })
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
          dispatch({ type: "DONE_FETCHING", payload: response })
          //   setMessages(response)
        }
      })
      .catch(error => {
        navigate("/404")
      })
  }, [])

  const handleDeleteMsg = e => {
    e.preventDefault()
    dispatch({ type: "FETCH_MESSAGES" })
    const msgToDelete =
      state.messages[e.target.parentElement.dataset.attribute]._id
    fetch(`/api/messages/${msgToDelete}/delete`, {
      method: "POST",
      mode: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => {
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
            dispatch({ type: "DONE_FETCHING", payload: response })
            // setMessages(response)
          })
      })
      .catch(error => {
        navigate("/404")
      })
  }

  const loadMore = () => {
    dispatch({ type: "FETCH_MESSAGES" })
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
        // console.log("RES:", response)
        const idsToDel = []

        for (let i = 0; i < response.length; i++) {
          for (let j = 0; j < state.messages.length; j++) {
            if (state.messages[j]._id === response[i]._id) {
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
          const newMsgs = [...state.messages, ...filtered]
          //   setTimeout(() => {
          dispatch({ type: "DONE_FETCHING", payload: newMsgs })
          //   }, 5000)
          //   setMessages(newMsgs)
        } else {
          const newMsgs = [...state.messages, ...response]
          //   setTimeout(() => {
          dispatch({ type: "DONE_FETCHING", payload: newMsgs })
          //   }, 5000)
          //   setMessages(newMsgs)
        }
      })
      .catch(error => {
        navigate("/404")
      })
  }

  return (
    <>
      {
        //   state.fetching ? (
        //     <Loader />
        //   ) :
        state.messages ? (
          <>
            {state.messages.map((message, index) => (
              <div
                className={styles.message}
                data-attribute={index}
                key={index}
              >
                <a
                  className={styles.abs}
                  href={message.url}
                  onClick={handleDeleteMsg}
                >
                  Delete
                </a>
                <h3>{message.title}</h3>
                <p className={styles.messageP}>{message.text}</p>
                <p
                  className={`${styles.messageP} ${
                    message.user.isAdmin ? styles.admin : styles.member
                  }`}
                >
                  <span id={styles.dashSpan}>-</span>
                  {message.user.username}
                </p>
                <p className={`${styles.messageP} ${styles.timestamp}`}>
                  ({message.timestamp})
                </p>
              </div>
            ))}
            <button
              className={styles.loadBtn}
              onClick={loadMore}
              disabled={
                !state.messages ||
                state.messages.length < 11 ||
                lastMessage ||
                state.fetching
                  ? true
                  : false
              }
            >
              Load More
            </button>
            <div className={styles.last}>
              {lastMessage ? "You've reached the end of the messages" : null}
            </div>
          </>
        ) : (
          <h3>There are currently no messages posted</h3>
        )
      }
      {/* <button
        className={styles.loadBtn}
        onClick={loadMore}
        disabled={
          !state.messages ||
          state.messages.length < 10 ||
          lastMessage ||
          state.fetching
            ? true
            : false
        }
      >
        Load More
      </button>
      <div className={styles.last}>
        {lastMessage ? "You've reached the end of the messages" : null}
      </div> */}
    </>
  )
}

export default AdminMessages
