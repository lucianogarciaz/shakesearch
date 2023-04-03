import React, { useState } from 'react';
import Form from './Form';
import Responses from './Responses';

export default function ChatSection() {
  const [conversations, setConversations] = useState([]);

  const addConversation = (question, answer) => {
    const timestamp = Date.now();
    setConversations([{ timestamp, question, answer }, ...conversations]);
  };

  return (
    <div className="right">
      <Form addConversation={addConversation} showPills={conversations.length < 3} />
      {conversations.map((conv, index) => (
        <Responses conversation={conv} isFirstElement={index === 0} />
      ))}
    </div>
  );
}
