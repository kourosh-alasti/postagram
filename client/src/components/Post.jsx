import { useState } from "react";
import { HeartIcon } from "lucide-react";

const Post = ({ username, title, date, content }) => {
  const postDate = new Date(date);

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex flex-row rounded-md border border-slate-400 bg-slate-800 px-4 py-2">
      <div className="mb-2 flex flex-1 flex-col">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
          <h4 className="text-[15px] font-light tracking-tighter text-slate-400/60">
            by{" "}
            <span className="underline-offset-2 hover:cursor-pointer hover:underline">
              {username}
            </span>
          </h4>
        </div>

        <p className="mb-2 flex-wrap text-white">{content}</p>
        <div className="flex items-center">
          <button
            onClick={() =>
              setLiked((prev) => {
                if (prev === true) {
                  setLikes((old) => old - 1);
                } else {
                  setLikes((old) => old + 1);
                }
                return !prev;
              })
            }
            className={`mr-2 flex flex-row items-center justify-center gap-2 rounded border border-slate-700 px-3 py-1 font-bold ${liked ? "bg-blue-500 text-white" : "bg-transparent text-blue-500"}`}
          >
            {!liked ? (
              <>
                <HeartIcon size="16" />
              </>
            ) : (
              <HeartIcon
                size={16}
                strokeWidth={1}
                fill="#fff"
                className="text-slate-400"
              />
            )}
          </button>
          <p className="text-sm text-gray-600">
            <span className="font-bold tracking-wide text-slate-400">
              {likes}
            </span>{" "}
            {likes === 1 ? "like" : "likes"}
          </p>
        </div>
      </div>
      <span className="justify-self-end text-sm text-slate-400">
        {"some date"}
      </span>
    </div>
  );
};

export default Post;
