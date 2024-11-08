import { useEffect, useState } from "react";
import { HeartIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { nanoid } from "nanoid";
import Cookies from "js-cookie";

const Post = ({ id, username, title, date, content, likes, tags }) => {
  const [totalLikes, setTotalLikes] = useState(likes.length);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const myUsername = Cookies.get("username");

    const hasLiked = likes.some((like) => like.username === myUsername);

    setLiked(hasLiked);
  }, [likes]);

  const handleLike = () => {
    setLiked((prev) => {
      const newState = !prev;

      const update = updateLike({ id, increment: newState });

      setTotalLikes((old) => {
        if (newState) {
          return old + 1;
        } else {
          return old - 1;
        }
      });

      if (update) {
        return newState;
      }

      return prev;
    });
  };

  const updateLike = async ({ id, increment }) => {
    const response = await fetch("http://localhost:8000/api/post/", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        increment,
      }),
    });

    const data = await response.json();

    if (data.error) {
      toast.error(data.error.message);
      return false;
    }

    return true;
  };

  return (
    <div className="flex flex-row rounded-md border border-slate-400 bg-slate-800 px-4 py-2">
      <div className="mb-2 flex flex-1 flex-col">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
          <h4 className="text-[15px] font-light tracking-tighter text-slate-400/60">
            by{" "}
            <Link to={`/profile/${username}`} className="group">
              <span className="underline-offset-2 group-hover:cursor-pointer group-hover:underline">
                {username}
              </span>
            </Link>
          </h4>
        </div>

        <p className="mb-2 flex-wrap text-white">{content}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center">
            <button
              onClick={() => handleLike()}
              className={`mr-2 flex flex-row items-center justify-center gap-2 rounded border border-slate-700 px-3 py-1 font-bold ${liked ? "bg-rose-500 text-white" : "bg-transparent text-blue-500"}`}
            >
              {!liked ? (
                <>
                  <HeartIcon size="16" />
                </>
              ) : (
                <HeartIcon size={16} fill="#fff" />
              )}
            </button>
            <p className="text-sm text-gray-600">
              <span className="font-bold tracking-wide text-slate-400">
                {totalLikes}
              </span>{" "}
              {totalLikes === 1 ? "like" : "likes"}
            </p>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-row flex-wrap gap-1 text-xs md:text-sm">
              <p>Tags: </p>
              {tags.map((tag) => {
                const key = nanoid();

                return (
                  <div
                    className="rounded bg-indigo-400/70 px-1 py-0.5"
                    key={key}
                  >
                    {tag}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <span className="justify-self-end text-sm text-slate-400">
        {date.toLocaleDateString()}
      </span>
    </div>
  );
};

export default Post;
