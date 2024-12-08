import { useEffect, useState } from "react";
import StickyWrapper from "../components/wrappers/StickyWrapper";
import FeedWrapper from "../components/wrappers/FeedWrapper";
import ProfileFeedSection from "../components/profile/ProfileFeedSection";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import Cookies from "js-cookie";

const UserPage = () => {
  const cookieUsername = Cookies.get("username");
  const { username } = useParams();

  const isSelf = username === cookieUsername;

  const [user, setUser] = useState();
  const [date, setDate] = useState();
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch(
        `http://localhost:8000/api/user/u/${username}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (data.error) {
        return toast.error(data.error.message);
      }

      setUser(data.user._doc);

      const date = new Date(data.user._doc.createdAt);
      setDate(date.toLocaleDateString());
    };

    const getMyFollowingInfo = async () => {
      const response = await fetch(`http://localhost:8000/api/user/following`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      if (data.error) {
        return toast.error(data.error.message);
      }

      setFollowing(data.following.some((el) => el.username === username));
    };

    getUserInfo();

    if (!isSelf) {
      getMyFollowingInfo();
    }
  }, [username, isSelf]);

  const handleFollowUnfollow = async () => {
    const shouldUnfollow = following; // If True user Should Unfollow

    try {
      await fetch(
        `http://localhost:8000/api/user/${shouldUnfollow ? "unfollow" : "follow"}/${username}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      toast.success(
        `Successfully ${shouldUnfollow ? "unfollowed" : "followed"} ${username}`,
      );
    } catch (error) {
      toast.error(
        `Error Occured trying to ${shouldUnfollow ? "unfollow" : "follow"} ${username}`,
        {
          description: error,
        },
      );
    }

    setFollowing((prev) => !prev);
  };

  return (
    <>
      {!user ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <main className="container flex flex-row gap-4">
          <StickyWrapper>
            <aside className="hidden min-w-36 flex-col gap-4 md:flex">
              <div className="flex flex-col gap-2 rounded-md border px-4 py-3">
                <div className="flex flex-row items-center justify-between">
                  <h1 className="text-xl font-semibold md:text-2xl md:font-bold lg:text-3xl">
                    {user.username}
                  </h1>
                  <p className="text-center text-slate-400">Since: {date}</p>
                </div>
                <hr className="border-slate-400" />

                <h4 className="text-base md:text-lg lg:text-xl">User Stats</h4>
                <div className="flex flex-col gap-2">
                  <p className="text-slate-500">
                    Following{" "}
                    <span className="font-semibold text-slate-400">
                      {user.following.length}
                    </span>{" "}
                    user
                  </p>

                  <div className="flex flex-row items-center gap-1">
                    <p className="text-slate-500">
                      <span className="font-semibold text-slate-400">
                        {user.posts}
                      </span>{" "}
                      posts
                    </p>
                    {!isSelf && (
                      <button
                        onClick={handleFollowUnfollow}
                        className={
                          following
                            ? "rounded bg-red-500 px-2 py-1 text-white hover:cursor-pointer"
                            : "rounded bg-indigo-600 px-2 py-1 text-white hover:cursor-pointer"
                        }
                      >
                        {following ? "Unfollow" : "Follow"}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <button
                className="flex w-full flex-row items-center justify-center gap-1 rounded border border-slate-600 bg-indigo-500 px-3 py-2 hover:cursor-pointer hover:bg-indigo-600"
                onClick={() => {
                  document.body.scrollTop = 0;
                  document.documentElement.scrollTop = 0;
                }}
              >
                <ArrowUpIcon />
                Go Back to Top
              </button>
            </aside>
          </StickyWrapper>
          <FeedWrapper>
            <ProfileFeedSection username={username} />
          </FeedWrapper>
        </main>
      )}
    </>
  );
};

export default UserPage;
