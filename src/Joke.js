import React, { useState } from 'react';
import './Joke.css';

function Joke({ text, votes }) {
  const [currentVotes, setVotes] = useState(votes);

  const upvote = () => {
    setVotes(currentVotes + 1);
  };

  const downvote = () => {
    setVotes(currentVotes - 1);
  };

  return (
    <div className="Joke">
      <div className="Joke-buttons">
        <button onClick={upvote}>Upvote</button>
        <button onClick={downvote}>Downvote</button>
      </div>
      <div className="Joke-text">{text}</div>
      <div className="Joke-votes">{currentVotes}</div>
    </div>
  );
}

export default Joke;
