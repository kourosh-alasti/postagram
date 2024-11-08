import { useEffect, useState } from "react";
import Post from "../Post";
import { toast } from "sonner";

const ProfileFeedSection = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPostsForFeed = async () => {
      const response = await fetch(
        `http://localhost:8000/api/post/u/${props.username}`,
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
        setPosts([]);
        return toast.error(data.error.message);
      }

      setPosts(data.posts);
      return toast.info("Feed loaded");
    };

    getPostsForFeed();
  }, []);

  return (
    <section className="flex flex-1 flex-col rounded-md border px-4 py-3">
      <div id="feed" className="flex w-full flex-col gap-3">
        {/* TODO: Make Scrollable */}
        <h3 className="text-xl font-semibold tracking-tight">Your Posts</h3>

        <div className="flex w-full flex-col gap-2.5">
          {posts.length > 0 ? (
            posts.map((post) => {
              const date = new Date(post.createdAt);

              return (
                <Post
                  key={`${post._id}-${post.username}-${post.title}`}
                  id={post._id}
                  username={post.username}
                  tags={post.tags}
                  date={date}
                  title={post.title}
                  content={post.content}
                  likes={post.likes}
                />
              );
            })
          ) : (
            <p className="text-gray-500">No posts found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileFeedSection;
