// src/components/FeedList.js
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Corrected the typo here from 'react-reouter-dom' to 'react-router-dom'
import { FeedContext } from '../contexts/FeedContext';
import { fetchFeeds } from '../api'; // Ensure that you have this function implemented in your api.js or wherever you handle API calls

const FeedList = () => {
    const { state, dispatch } = useContext(FeedContext); // Corrected 'userContect' and 'userEffect' to 'useContext' and 'useEffect'

    useEffect(() => {
        const loadFeeds = async () => {
            try {
                const response = await fetchFeeds(); // Ensure fetchFeeds returns the expected data structure
                dispatch({ type: 'SET_FEEDS', payload: response.data }); // Adjust according to your data structure
            } catch (error) {
                console.error('Error loading feeds', error);
            }
        };

        if (state.feeds.length === 0) {
            loadFeeds(); // Only load feeds if they are not already in the state
        }
    }, [dispatch, state.feeds]);

    return (
        <div>
            <h1>Feed List</h1>
            <ul>
                {state.feeds.map(feed => (
                    <li key={feed.id}>
                        <Link to={`/feed/${feed.id}`}>{feed.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeedList;
