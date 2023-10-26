// src/components/FeedDetail.js
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FeedContext } from '../contexts/FeedContext';
import { fetchFeed } from '../api';

const FeedDetail = () => {
  const { id } = useParams();
  const { state, dispatch } = useContext(FeedContext);

  useEffect(() => {
    const loadFeed = async () => {
      try {
        const response = await fetchFeed(id);
        dispatch({ type: 'SET_CURRENT_FEED', payload: response.data });
      } catch (error) {
        console.error('Error loading feed', error);
      }
    };

    loadFeed();
  }, [id, dispatch]);

  const feed = state.feeds.find(f => f.id === parseInt(id));

  if (!feed) return <div>Loading...</div>;

  return (
    <div>
      <h1>{feed.name}</h1>
      <ul>
        {feed.articles.map(article => (
          <li key={article.id}>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedDetail;