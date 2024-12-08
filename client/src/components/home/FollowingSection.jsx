import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { nanoid } from "nanoid";

const FollowingSection = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const response = await fetch("http://localhost:8000/api/user/following", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error.message);
      }

      setFriends(data.following);
    };

    getFriends();
  }, []);

  return (
    <section className="rounded-md border px-4 py-3">
      <h3 className="text-xl font-semibold tracking-tight">Following</h3>

      <hr className="mb-2" />
      {/* GET FRIENDS */}
      <div className="flex flex-col gap-1.5">
        {friends.length > 0 ? (
          friends.map((friend) => {
            const date = new Date(friend.followingSince);

            return (
              <div key={`${friend._id}-${nanoid()}`}>
                <div className="flex flex-col">
                  <div className="flex flex-row items-center justify-between">
                    <Link to={`/profile/${friend.username}`} className="group">
                      <h4 className="text-medium font-semibold text-slate-200 underline-offset-[2.5px] group-hover:underline">
                        {friend.username}
                      </h4>
                    </Link>
                    <p className="text-sm text-slate-400">
                      <span className="font-bold text-slate-300/80">
                        {friend.posts}{" "}
                      </span>
                      {friend.posts === 1 ? "post" : "posts"}
                    </p>
                  </div>
                  <p className="self-end text-sm text-slate-400">
                    Following Since:{" "}
                    <span className="font-semibold text-slate-300/80">
                      {date.toLocaleDateString()}
                    </span>
                  </p>
                </div>
                <hr className="border-slate-800" />
              </div>
            );
          })
        ) : (
          <p>You don&apos;t follow anyone :(</p>
        )}
      </div>
    </section>
  );
};

export default FollowingSection;
