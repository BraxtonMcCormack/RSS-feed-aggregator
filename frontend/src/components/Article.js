// src/components/Article.js
import React from 'react';

const Article = ({ title, link }) => (
  <li>
    <a href={link} target="_blank" rel="noopener noreferrer">
      {title}
    </a>
  </li>
);

export default Article;
