// src/App.js
import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import ResultItem from "./components/ResultItems";

const App = () => {
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(""); // Total results count
  const [processTime, setProcessTime] = useState(""); // Time taken to process the request
  const [loading, setLoading] = useState(false); // Loading state
  const [query, setQuery] = useState(""); // Search query state
  const [page, setPage] = useState(0); // Current page state

  const searchHackerNews = async (query, page) => {
    setLoading(true);
    const response = await fetch(
      `https://hn.algolia.com/api/v1/search?query=${query}&page=${page}&hitsPerPage=20`
    );
    const data = await response.json();
    console.log("this is the data", data);
    console.log("this is the data.hits", data.hits);
    setResults(data.hits); 
    setTotalResults(data.nbHits.toLocaleString()); 
    setProcessTime((data.processingTimeMS / 1000).toFixed(2)); 
    setLoading(false);
  };


  useEffect(() => {
    searchHackerNews(query, page);
  }, [query, page]);

  // Search handler from the Search component
  const handleSearch = (query) => {
    setQuery(query);
    setPage(0); 
  };

  return (
    <div className="w-full lg:w-4/5 mx-auto bg-white">
      <Search onSearch={handleSearch} />

      {/* Loading or Results info */}
      {loading && <p className="text-center">Loading...</p>}
      <div className="my-2 flex justify-between">
        <div></div>
        <p className="text-sm">
          {totalResults} results ({processTime} seconds)
        </p>
      </div>

      {/* Results list */}
      <div className="mt-6 space-y-4">
        {results.length === 0 && !loading && (
          <p className="text-center text-gray-500">No results found.</p>
        )}
        {results.map((result) =>
          result.title == undefined ? (
            <div key={result.objectID}></div>
          ) : (
            <ResultItem
              key={result.objectID}
              title={result.title}
              url={result.url}
              author={result.author}
              created_at_i={result.created_at_i}
              points={result.points}
              num_comments={result.num_comments}
              story_text={result.story_text}
            />
          )
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 pb-4">
        <button
          className="px-4 bg-blue-500 text-white"
          onClick={() => setPage(page - 1)}
          disabled={page === 0} 
        >
          Previous
        </button>
        <span className="mx-4">{`Page ${page + 1}`}</span>
        <button
          className="px-4 bg-blue-500 text-white"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
