// src/contexts/FeedContext.js
import React, { createContext, useReducer, useEffect } from 'react';
import { fetchFeeds } from '../api';

const FeedContext = createContext();

const initialState = {
    feeds: [],
    categories: [],
    articles: [],
    // ... more if I need I guess idk
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_FEEDS':
            return { ...state, feeds: action.payload };
        //more if I need to (if I do that other thing but probs not idk)
        default:
            return state;
    }
};

const FeedProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const initializeData = async () => {
            try {
                const feeds = await fetchFeeds();
                dispatch({ type: 'SET_FEEDS', payload: feeds });
            } catch (error) {
                console.error('Error fetching feeds', error);
                // Handle the error appropriately
            }
        };

        initializeData();
    }, []); // Empty dependency array to run only once on component mount

    return (
        <FeedContext.Provider value = {{ state, dispatch }}>
            {children}
        </FeedContext.Provider>
    );
};

export { FeedContext, FeedProvider}