// src/Search.js
import React, { useEffect, useState } from "react";

const Search = ({ user ,onSearch }) => {
  const [query, setQuery] = useState("");
  

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (query.trim()) {
  //     onSearch(query);
  //   }
  // };
  useEffect(() => {
    if (query != "") {
      if (query.trim()) {
        onSearch(query);
      }
    } else {
      onSearch("");
    }
  }, [query]);

  return (
    <div className="flex w-full justify-between items-center bg-orange-500">
      <div className="w-1/5 flex items-center">
        <img
          src="https://hn.algolia.com/public/899d76bbc312122ee66aaaff7f933d13.png"
          className="sm:w-1/4"
        />
        <h1 className="hidden sm:block text-xl capitalize m-2 text-white">
          {user !== undefined ? `${user}` : 'Search Hacker News'}
          </h1>
      </div>
      <div className="m-2 w-full md:w-4/5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Hacker News"
          className="p-2 border-none w-full"
        />
      </div>
    </div>
  );
};

export default Search;
