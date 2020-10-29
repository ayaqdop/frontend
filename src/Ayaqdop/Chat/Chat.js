import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { db, auth } from '../../firebase'
import { useMatchState } from '../../utils/useMatchState'

import './Chat.css'

const Chat = () => {
  const [messageText, setMessageText] = useState('')
  const [messages, setMessages] = useState([])
  const { matchState } = useMatchState()
  const { matchId } = useParams()
  const currentUserId = auth().currentUser.uid

  useEffect(() => {
    try {
      db.ref(`chat/${matchId}`).on('value', snapshot => {
        setMessages(snapshot.val() || [])
      })
    } catch (error) {
      console.log('error: ', error)
    }

    return () => {
      db.ref(`chat/${matchId}`).off()
    }
  }, [])

  const handleChange = e => {
    setMessageText(e.target.value)
  }

  const handleSubmit = e => {
    if (!messageText.trim() || e.key !== 'Enter') return
    const authorTeam = matchState.teams.find(team => team.uid === currentUserId)
    let side = 'right'
    if (currentUserId === matchId) side = 'left'
    const payload = {
      author: authorTeam.name,
      text: messageText.trim(),
      date: Date.now(),
      side
    }
    const newMessages = [...messages, payload]
    db.ref(`chat/${matchId}`).update(newMessages)
    setMessageText('')
  }

  const dateOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }

  return (
    <aside className='chat'>
      <h1>Chat</h1>
      <ul>
        {messages.map(message => (
          <li key={message.date} className={message.side || 'left'}>
            <b>{message.text}</b>
            <br />
            <small>
              {message.author} -
              <em>
                {new Intl.DateTimeFormat('en-US', dateOptions).format(
                  message.date
                )}
              </em>
            </small>
          </li>
        ))}
      </ul>
      <input
        type='text'
        value={messageText}
        onChange={handleChange}
        onKeyPress={handleSubmit}
        placeholder='Message'
      />
    </aside>
  )
}

export default Chat
