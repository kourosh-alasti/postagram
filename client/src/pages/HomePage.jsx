import FeedWrapper from "../components/wrappers/FeedWrapper";
import StickyWrapper from "../components/wrappers/StickyWrapper";
import FollowingSection from "../components/home/FollowingSection";
import CreatePostSection from "../components/home/CreatePostSection";
import FeedSection from "../components/home/FeedSection";

const Home = () => {
  return (
    <main className="container flex flex-row gap-4">
      <StickyWrapper>
        <aside className="hidden min-w-36 flex-col gap-4 md:flex">
          <CreatePostSection />
          <FollowingSection />
        </aside>
      </StickyWrapper>
      <FeedWrapper>
        <FeedSection />
      </FeedWrapper>
    </main>
  );
};

export default Home;
