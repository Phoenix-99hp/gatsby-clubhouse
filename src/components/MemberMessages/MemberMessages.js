import React, { useState, useEffect } from "react"
import styles from "./MemberMessages.module.scss"
import { navigate } from "gatsby"

const MemberMessages = () => {
    const [messages, setMessages] = useState(null);
    const [lastMessage, setLastMessage] = useState(null);

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
                navigate("/404");
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
                for (let i = 0; i < response.length; i++) {
                    const msgToDel = messages.filter(message => message._id === response[i]._id);
                    if (msgToDel) {
                        messages.splice(messages.indexOf(msgToDel, 1));
                        setLastMessage(true);
                    }
                }
                const newMsgs = [...messages, ...response];
                setMessages(newMsgs);
            })
            .catch(error => {
                navigate("/404");
            })
    }

    return (
        <>
            {messages ? messages.map((message, index) => (
                <div className={styles.message} key={index}>
                    <h3>{message.title}</h3>
                    <p className={styles.messageP}>{message.text}</p>
                    <p className={styles.messageP}> {message.timestamp}</p>
                    <p
                        className={`${styles.messageP} ${
                            message.user.isAdmin
                                ? styles.admin
                                : styles.member
                            }`}
                    >
                        <span id={styles.dashSpan}>-</span> {message.user.username}
                    </p>
                </div>
            )) : <h3>There are currently no messages posted</h3>}
            <button className={styles.loadBtn} onClick={loadMore}>Load More</button>
            {lastMessage ? <div className={styles.message}>
                <h3>There are no more messages to load</h3>
            </div> : ""}
        </>
    )
}

export default MemberMessages
