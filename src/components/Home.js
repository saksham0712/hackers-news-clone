// src/App.js
import React, { useEffect, useState } from "react";
import Search from "./Search";
import ResultItem from "./ResultItems";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState("");
  const [processTime, setProcessTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [page, setPage] = useState(0);
  const [totalpage, setTotalpage] = useState(0);
  const [user, setUser] = useState();

  const getTimeFilter = (timeFilter) => {
    const now = Date.now();
    switch (timeFilter) {
      case "last24hours":
        return `created_at_i>${now - 24 * 60 * 60 * 1000}`; // 24 hours ago
      case "last7days":
        return `created_at_i>${now - 7 * 24 * 60 * 60 * 1000}`; // 7 days ago
      case "last30days":
        return `created_at_i>${now - 30 * 24 * 60 * 60 * 1000}`; // 30 days ago
      default:
        return ""; // No time filter
    }
  };
  // Check if the user is logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem("username");
    if (!loggedInUser) {
      navigate("/login"); // Redirect to login page if not logged in
    }
    setUser(loggedInUser);
  }, [navigate]);
  console.log(user);
  const searchHackerNews = async (query, page) => {
    setLoading(true);
    const categoryFilter = category ? `&tags=${category}` : "";
    const timeFilterParam = getTimeFilter(timeFilter)
      ? `&numericFilters=${getTimeFilter(timeFilter)}`
      : "";
    const response = await fetch(
      `https://hn.algolia.com/api/v1/search?query=${query}${categoryFilter}${timeFilterParam}&page=${page}&hitsPerPage=20`
    );
    const data = await response.json();
    console.log("this is the data", data);
    console.log("this is the data.hits", data.hits);
    setResults(data.hits);
    setTotalResults(data.nbHits.toLocaleString());
    setProcessTime((data.processingTimeMS / 1000).toFixed(2));
    setTotalpage(data.nbPages);
    setLoading(false);
  };

  useEffect(() => {
    searchHackerNews(query, page);
  }, [query, category, timeFilter, page]);

  // Search handler from the Search component
  const handleSearch = (query) => {
    setQuery(query);
    setPage(0);
  };

  return (
    <div className="w-full flex flex-col justify-between lg:w-4/5 mx-auto bg-white">
      <div>
        <Search user={user} onSearch={handleSearch} />

        {/* Loading or Results info */}
        <div className="my-2 flex justify-between">
          <div className="flex align-ceter items-center">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mx-2 p-2 border rounded"
            >
              <option value="">All</option>
              <option value="story">Story</option>
              <option value="comment">Comment</option>
              <option value="job">Job</option>
              <option value="ask_hn">Ask HN</option>
              <option value="show_hn">Show HN</option>
            </select>
            <p>for</p>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="mx-2 p-2 border rounded"
            >
              <option value="">All Time</option>
              <option value="last24hours">Last 24 hours</option>
              <option value="last7days">Last 7 days</option>
              <option value="last30days">Last 30 days</option>
            </select>
          </div>
          {loading && <p className="text-center">Loading...</p>}
          <p className="text-sm mx-2">
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
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 pb-4">
        <button
          className="px-4 bg-orange-500 text-white"
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          Previous
        </button>
        <span className="mx-2">{`Page ${page + 1}`}</span>
        <span className="mx-2">-</span>
        <span className="mx-2">page {totalpage}</span>
        <button
          className="px-4 bg-orange-500 text-white"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
