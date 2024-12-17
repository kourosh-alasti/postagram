import { useState } from "react";
import { toast } from "sonner";

const CreatePostSection = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postTag, setPostTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!postTitle || !postContent) {
      return toast.error(
        "Please make sure you have the title and content for your post",
      );
    }

    const createPost = async () => {
      const response = await fetch(
        `${import.meta.env.API_ENDPOINT}/api/post/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: postTitle,
            content: postContent,
            tag: postTag || "",
          }),
        },
      );

      const data = await response.json();

      if (data.error) {
        return toast.error(data.error.message);
      }

      return toast.success(data.message);
    };

    createPost();

    setPostContent("");
    setPostTag("");
    setPostTitle("");
  };

  return (
    <section className="flex flex-col rounded-md border px-4 py-3">
      <div className="flex w-full flex-col gap-3">
        {/* POST posts */}
        <h3 className="text-xl font-semibold tracking-tight">Create a post</h3>
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
  );
};

export default CreatePostSection;
