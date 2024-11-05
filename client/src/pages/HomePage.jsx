import { useState } from "react";
import { nanoid } from "nanoid";
import Post from "../components/Post";
import FeedWrapper from "../components/wrappers/FeedWrapper";
import StickyWrapper from "../components/wrappers/StickyWrapper";

const Home = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postTag, setPostTag] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 10,
      username: "testuser",
      date: "1382419706",
      title: "Mock post",
      content:
        "Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no rejoiced. End friendship sufficient assistance can prosperous met. As game he show it park do. Was has unknown few certain ten promise. No finished my an likewise cheerful packages we. For assurance concluded son something depending discourse see led collected. Packages oh no denoting my advanced humoured. Pressed be so thought natural.",
    },
    {
      id: 11,
      username: "user_42",
      date: "1225175359",
      title: "Hello to the feed",
      content:
        "Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no rejoiced. End friendship sufficient assistance can prosperous met. As game he show it park do. Was has unknown few certain ten promise. No finished my an likewise cheerful packages we. For assurance concluded son something depending discourse see led collected. Packages oh no denoting my advanced humoured. Pressed be so thought natural.",
    },
    {
      id: 1,
      username: "anon_fish",
      date: "1017002143",
      title: "Twitter?",
      content:
        "Kindness to he horrible reserved ye. Effect twenty indeed beyond for not had county. The use him without greatly can private. Increasing it unpleasant no of contrasted no continuing. Nothing colonel my no removed in weather. It dissimilar in up devonshire inhabiting.",
    },
    {
      id: 2,
      username: "mike_dev",
      date: "1698829906",
      title: "Tech Insights 2024",
      content:
        "Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no rejoiced. End friendship sufficient assistance can prosperous met. As game he show it park do. Was has unknown few certain ten promise.",
    },
    {
      id: 3,
      username: "travel_emma",
      date: "1698916306",
      title: "Hidden Gems in Europe",
      content:
        "Choose your favourite place. No matter where you travel inside the World. Our team ensures every journey becomes unforgettable. From pristine beaches to mountain peaks, we've got your perfect destination covered. Experience luxury travel at affordable prices.",
    },
    {
      id: 4,
      username: "alex_writer",
      date: "1699002706",
      title: "Digital Nomad Life",
      content:
        "Park gate sell they west hard for the. Built Wicket longer admire do barton vanity itself do in it. Preferred to sportsmen it engrossed listening. Making memories across continents while working remotely. The future of work is here.",
    },
    {
      id: 5,
      username: "lisa_walker",
      date: "1699089106",
      title: "Photography Tips",
      content:
        "Capturing moments that last forever. Sure last upon he same as knew next. Of believed or diverted no rejoiced. End friendship sufficient assistance can prosperous met. The art of visual storytelling through the lens.",
    },
    {
      id: 6,
      username: "david_smith",
      date: "1699175506",
      title: "Cooking Adventures",
      content:
        "As game he show it park do. Was has unknown few certain ten promise. No finished my an likewise cheerful packages we. For assurance concluded son something depending discourse see led collected. The joy of culinary exploration.",
    },
    {
      id: 7,
      username: "fitness_guru",
      date: "1699261906",
      title: "Healthy Living",
      content:
        "Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no rejoiced. Transform your life with simple daily habits. Health is wealth.",
    },
    {
      id: 8,
      username: "book_lover",
      date: "1699348306",
      title: "Monthly Book Review",
      content:
        "End friendship sufficient assistance can prosperous met. As game he show it park do. Was has unknown few certain ten promise. Diving into the world of literature, one page at a time. Share your favorite reads below.",
    },
    {
      id: 9,
      username: "tech_savvy",
      date: "1699434706",
      title: "Future of AI",
      content:
        "Built Wicket longer admire do barton vanity itself do in it. Preferred to sportsmen it engrossed listening. The rapid advancement of artificial intelligence is reshaping our world. Let's explore the possibilities together.",
    },
  ]);
  const [friends, setFriends] = useState([
    {
      id: 1,
      username: "alex",
      postCount: 12,
      followingSince: "8 October 2024",
    },
    {
      id: 2,
      username: "sarah_j",
      postCount: 45,
      followingSince: "15 March 2024",
    },
    {
      id: 3,
      username: "mike_dev",
      postCount: 28,
      followingSince: "21 July 2024",
    },
    {
      id: 4,
      username: "emma123",
      postCount: 67,
      followingSince: "3 January 2024",
    },
    {
      id: 5,
      username: "david_smith",
      postCount: 19,
      followingSince: "30 April 2024",
    },
    {
      id: 6,
      username: "lisa_walker",
      postCount: 89,
      followingSince: "12 June 2024",
    },
    {
      id: 7,
      username: "tom_wilson",
      postCount: 34,
      followingSince: "9 August 2024",
    },
    {
      id: 8,
      username: "jessica92",
      postCount: 56,
      followingSince: "17 February 2024",
    },
    {
      id: 9,
      username: "ryan_cool",
      postCount: 23,
      followingSince: "25 September 2024",
    },
    {
      id: 10,
      username: "amy_writes",
      postCount: 78,
      followingSince: "11 May 2024",
    },
    {
      id: 11,
      username: "chris_p",
      postCount: 41,
      followingSince: "28 March 2024",
    },
    {
      id: 12,
      username: "rachel_r",
      postCount: 92,
      followingSince: "14 April 2024",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (postContent.trim()) {
      const newPost = {
        id: nanoid(),
        username: "test",
        date: new Date().toLocaleDateString(),
        text: postContent,
      };

      setPosts((prev) => [newPost, ...prev]);
      setPostContent("");
    }
  };

  return (
    <main className="container flex flex-row gap-4">
      <StickyWrapper>
        <aside className="hidden min-w-36 flex-col gap-4 md:flex">
          <section className="flex flex-col rounded-md border px-4 py-3">
            <div className="flex w-full flex-col gap-3">
              {/* POST posts */}
              <h3 className="text-xl font-semibold tracking-tight">
                Create a post
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                  id="post_title"
                  name="title"
                  placeholder="Post Title"
                  value={postTitle}
                  className="rounded border-b bg-slate-800 px-2 py-1"
                  onChange={(e) => setPostTitle(e.target.value)}
                />
                <input
                  id="post_tag"
                  name="tag"
                  placeholder="#supercalifragilisticexpialidocious"
                  value={postTag}
                  className="flex-1 rounded border-b bg-slate-800 px-2 py-1"
                  onChange={(e) => setPostTag(e.target.value)}
                />

                <textarea
                  id="post_content"
                  name="content"
                  value={postContent}
                  placeholder="What's on your mind?"
                  onChange={(e) => setPostContent(e.target.value)}
                  className="rounded border-b bg-slate-800 px-2 py-1"
                />
                <button
                  type="submit"
                  className="w-full rounded border border-slate-500 bg-indigo-700 px-4 py-2 hover:cursor-pointer"
                >
                  Post
                </button>
              </form>
            </div>
          </section>

          <section className="rounded-md border px-4 py-3">
            <h3 className="text-xl font-semibold tracking-tight">You Follow</h3>

            <hr className="mb-2" />
            {/* GET FRIENDS */}
            <div className="flex flex-col gap-1.5">
              {friends.length > 0 ? (
                friends.map((friend) => {
                  const date = new Date(friend.followingSince);

                  return (
                    <>
                      <div
                        key={`${friend.id}-${friend.username}`}
                        className="flex flex-col"
                      >
                        <div className="flex flex-row items-center justify-between">
                          <h4 className="text-medium text-slate-200">
                            {friend.username}
                          </h4>
                          <p className="text-sm text-slate-400">
                            <span className="font-bold text-slate-300/80">
                              {friend.postCount}{" "}
                            </span>
                            {friend.postCount === 1 ? "post" : "posts"}
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
                    </>
                  );
                })
              ) : (
                <p>No have no friend :(</p>
              )}
            </div>
          </section>
        </aside>
      </StickyWrapper>
      <FeedWrapper>
        <section className="flex flex-1 flex-col rounded-md border px-4 py-3">
          <div id="feed" className="flex w-full flex-col gap-3">
            {/* TODO: Make Scrollable */}
            <h3 className="text-xl font-semibold tracking-tight">Your Feed</h3>

            <div className="flex w-full flex-col gap-2.5">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <Post
                    key={`${post.id}-${post.username}-${post.title}`}
                    username={post.username}
                    date={post.date}
                    title={post.title}
                    content={post.content}
                  />
                ))
              ) : (
                <p className="text-gray-500">No posts found.</p>
              )}
            </div>
            {/* GET Posts */}
          </div>
        </section>
      </FeedWrapper>
    </main>
  );
};

export default Home;
