// src/App.js
import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import ResultItem from "./components/ResultItems";

const App = () => {
  const [results, setResults] = useState([]);
  const [totalresults, setTotalesults] = useState("");
  const [processtime, setProcesstime] = useState("");
  const [loading, setLoading] = useState(false);

  const searchHackerNews = async (query) => {
    setLoading(true);
    const response = await fetch(
      `https://hn.algolia.com/api/v1/search?query=${query}`
    );
    const data = await response.json();
    console.log("this is the data", data);
    console.log("this is the data.hits", data.hits);
    setResults(data.hits);
    setTotalesults(data.nbHits.toLocaleString());
    setProcesstime(data.processingTimeMS/1000);
    setLoading(false);
  };

  useEffect(() => {
    searchHackerNews("");
  }, []);

  return (
    <div className="w-full lg:w-4/5 mx-auto bg-white">
      <Search onSearch={searchHackerNews} />

      {/* {loading && <p className="text-center">Loading...</p>} */}
      <div className="my-2 flex justify-between">
        <div></div>
        <p className="text-sm">{totalresults} results ({processtime} seconds)</p>
      </div>
      <div className="mt-6 space-y-4">
        {results.length === 0 && !loading && (
          <p className="text-center text-gray-500">No results found.</p>
        )}
        {results.map((result) =>
          result.title == undefined ? (
            <div></div>
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
  );
};

export default App;
