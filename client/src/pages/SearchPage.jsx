import { useEffect, useState } from "react";
import Post from "../components/Post";
import debounce from "lodash/debounce";
import { toast } from "sonner";

const SearchPage = () => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);

  const fetchResults = debounce(async (text) => {
    const response = await fetch(
      `http://localhost:8000/api/post/search?string=${text}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/headers",
        },
      },
    );

    const data = await response.json();

    if (data.error) {
      return toast.error(data.error.message);
    }

    setResults(data.results);
  });

  useEffect(() => {
    if (searchText) {
      fetchResults(searchText);
    } else {
      setResults([]);
    }
  }, [searchText]);

  return (
    <main className="container flex min-h-full flex-col items-center justify-center gap-4">
      <div className="flex h-full w-3/4 flex-row">
        <input
          type="search"
          className="rounded-r-non w-full rounded-l border border-slate-400 bg-slate-800 px-4 py-2"
          placeholder="What are you looking for"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="rounded-l-none rounded-r border-b border-l-0 border-r border-t border-slate-400 bg-indigo-600 px-2 py-2 hover:cursor-pointer">
          Search
        </button>
      </div>

      <div
        className={`w-3/4 flex-col gap-2 ${results.length === 0 ? "hidden" : "flex"}`}
      >
        {results.map((post) => {
          const date = new Date(post.createdAt);

          return (
            <Post
              key={`${post._id}-${post.username}-${post.title}`}
              id={post._id}
              username={post.username}
              date={date}
              title={post.title}
              tags={post.tags}
              content={post.content}
              likes={post.likes}
            />
          );
        })}
      </div>
    </main>
  );
};

export default SearchPage;
