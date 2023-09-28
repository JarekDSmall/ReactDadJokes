import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Joke from './Joke';
import './JokeList.css';

function JokeList() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getJokes = async () => {
      let newJokes = [];
      while (newJokes.length < 5) {
        const response = await axios.get('https://icanhazdadjoke.com/', {
          headers: { Accept: 'application/json' },
        });
        const joke = response.data;
        if (!jokes.some(j => j.id === joke.id)) {
          newJokes.push({ id: joke.id, text: joke.joke, votes: 0 });
        }
      }
      setJokes([...jokes, ...newJokes]);
      setLoading(false);
      window.localStorage.setItem('jokes', JSON.stringify([...jokes, ...newJokes]));
    };

    const storedJokes = JSON.parse(window.localStorage.getItem('jokes'));
    if (storedJokes) {
      setJokes(storedJokes);
      setLoading(false);
    } else {
      getJokes();
    }
  }, [jokes]);

  if (loading) {
    return <div className="JokeList-spinner">Loading...</div>;
  }

  return (
    <div className="JokeList">
      <button className="JokeList-getmore" onClick={() => {
        const getJokes = async () => {
          let newJokes = [];
          while (newJokes.length < 5) {
            const response = await axios.get('https://icanhazdadjoke.com/', {
              headers: { Accept: 'application/json' },
            });
            const joke = response.data;
            if (!jokes.some(j => j.id === joke.id)) {
              newJokes.push({ id: joke.id, text: joke.joke, votes: 0 });
            }
          }
          setJokes([...jokes, ...newJokes]);
          window.localStorage.setItem('jokes', JSON.stringify([...jokes, ...newJokes]));
        };
        getJokes();
      }}>
        Get More Jokes
      </button>
      <div className="JokeList-jokes">
        {jokes.map(j => (
          <Joke key={j.id} text={j.text} votes={j.votes} />
        ))}
      </div>
    </div>
  );
}

export default JokeList;
