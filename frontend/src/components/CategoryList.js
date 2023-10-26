// src/components/CategoryList.js
import React, { useContext } from 'react';
import { FeedContext } from '../contexts/FeedContext';

const CategoryList = () => {
  const { state, dispatch } = useContext(FeedContext);

  const handleCategoryClick = (categoryId) => {
    dispatch({ type: 'FILTER_FEEDS_BY_CATEGORY', payload: categoryId });
  };

  return (
    <ul>
      {state.categories.map(category => (
        <li key={category.id} onClick={() => handleCategoryClick(category.id)}>
          {category.name}
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
