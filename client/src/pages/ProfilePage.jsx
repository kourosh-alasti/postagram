import React, { useEffect, useState } from "react";
import StickyWrapper from "../components/wrappers/StickyWrapper";
import FeedWrapper from "../components/wrappers/FeedWrapper";
import ProfileFeedSection from "../components/profile/ProfileFeedSection";
import { toast } from "sonner";
import { Link, Navigate } from "react-router-dom";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";

const ProfilePage = () => {
  const [user, setUser] = useState();
  const [date, setDate] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch("http://localhost:8000/api/user/self", {
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

      setUser(data.user);

      const date = new Date(data.user.createdAt);
      setDate(date.toLocaleDateString());
    };

    const getUserPosts = async () => {
      const response = await fetch("http://localhost:8000/api/post/self", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.error) {
        return toast.error(data.error.message);
      }

      setPosts(data.posts);
    };

    const preparePage = async () => {
      await getUserInfo();
      await getUserPosts();
    };

    preparePage();
  }, []);

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
                  <p className="text-slate-500">
                    <span className="font-semibold text-slate-400">
                      {user.posts}
                    </span>{" "}
                    posts
                  </p>
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
            <ProfileFeedSection />
          </FeedWrapper>
        </main>
      )}
    </>
  );
};

export default ProfilePage;
