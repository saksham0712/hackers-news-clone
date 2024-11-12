// src/ResultItem.js
import React from "react";

const ResultItem = ({
  title,
  url,
  author,
  created_at_i,
  points,
  num_comments,
  story_text,
}) => {
  const date = new Date(created_at_i * 1000);

  const now = new Date();

  const diffTime = now - date;

  // Calculate days, months, and years
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const months = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));

  let originalDate;

// console.log(title)
  if (years == 0) {
    if (months == 0) {
      originalDate = `${days} days ago`;
    }
    originalDate = `${months} months ago`;
  } else {
    originalDate = `${years} years ago`;
  }

  return (

      <div className="flex flex-col px-4 overflowx-hidden">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold hover:underline"
        >
          {title} <span className="text-xs text-gray-500">({url})</span>
        </a>
        <div className="flex flex-wrap gap-1">
          <p className="text-xs text-gray-500">{points} Points</p>
          <p className="text-xs text-gray-500"> | </p>
          <p className="text-xs text-gray-500">{author}</p>
          <p className="text-xs text-gray-500"> | </p>
          <p className="text-xs text-gray-500">{originalDate}</p>
          <p className="text-xs text-gray-500"> | </p>
          <p className="text-xs text-gray-500"> {num_comments} comments</p>
        </div>
        <p className="px-6 py-1 text-xs"> {story_text}</p>
      </div>
  
  );
};

export default ResultItem;
