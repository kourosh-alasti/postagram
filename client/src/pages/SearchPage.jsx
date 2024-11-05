import { useState } from "react";
import Post from "../components/Post";

const SearchPage = () => {
  const [searchText, setSearchText] = useState("");

  const [results, setResults] = useState([
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      username: "sarah_j",
      date: "1698742506",
      title: "My Travel Adventures",
      content:
        "Built Wicket longer admire do barton vanity itself do in it. Preferred to sportsmen it engrossed listening. Park gate sell they west hard for the. A team of experienced tourism professionals will provide you with the best advice and tips for your desired place.",
    },
    {
      id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      username: "mike_dev",
      date: "1698829906",
      title: "Tech Insights 2024",
      content:
        "Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no rejoiced. End friendship sufficient assistance can prosperous met. As game he show it park do.",
    },
    {
      id: "7ba7b810-9dad-11d1-80b4-00c04fd430c8",
      username: "travel_emma",
      date: "1698916306",
      title: "Hidden Gems in Europe",
      content:
        "Choose your favourite place. No matter where you travel inside the World. Our team ensures every journey becomes unforgettable. From pristine beaches to mountain peaks, we've got your perfect destination covered.",
    },
    {
      id: "8ba7b810-9dad-11d1-80b4-00c04fd430c8",
      username: "alex_writer",
      date: "1699002706",
      title: "Digital Nomad Life",
      content:
        "Park gate sell they west hard for the. Built Wicket longer admire do barton vanity itself do in it. Preferred to sportsmen it engrossed listening. Making memories across continents while working remotely.",
    },
    {
      id: "9ba7b810-9dad-11d1-80b4-00c04fd430c8",
      username: "lisa_walker",
      date: "1699089106",
      title: "Photography Tips",
      content:
        "Capturing moments that last forever. Sure last upon he same as knew next. Of believed or diverted no rejoiced. End friendship sufficient assistance can prosperous met. The art of visual storytelling through the lens.",
    },
    {
      id: "aba7b810-9dad-11d1-80b4-00c04fd430c8",
      username: "david_smith",
      date: "1699175506",
      title: "Cooking Adventures",
      content:
        "As game he show it park do. Was has unknown few certain ten promise. No finished my an likewise cheerful packages we. For assurance concluded son something depending discourse see led collected.",
    },
    {
      id: "bba7b810-9dad-11d1-80b4-00c04fd430c8",
      username: "fitness_guru",
      date: "1699261906",
      title: "Healthy Living",
      content:
        "Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no rejoiced. Transform your life with simple daily habits. Health is wealth.",
    },
    {
      id: "cba7b810-9dad-11d1-80b4-00c04fd430c8",
      username: "book_lover",
      date: "1699348306",
      title: "Monthly Book Review",
      content:
        "End friendship sufficient assistance can prosperous met. As game he show it park do. Was has unknown few certain ten promise. Diving into the world of literature, one page at a time.",
    },
    {
      id: "dba7b810-9dad-11d1-80b4-00c04fd430c8",
      username: "tech_savvy",
      date: "1699434706",
      title: "Future of AI",
      content:
        "Built Wicket longer admire do barton vanity itself do in it. Preferred to sportsmen it engrossed listening. The rapid advancement of artificial intelligence is reshaping our world.",
    },
  ]);

  const filtered = results.filter((result) =>
    result.title.toLowerCase().includes(searchText.toLowerCase()),
  );

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
        className={`w-3/4 flex-col gap-2 ${filtered.length === 0 ? "hidden" : "flex"}`}
      >
        {filtered.map((res) => (
          <Post
            key={res.id}
            title={res.title}
            date={res.date}
            username={res.username}
            content={res.content}
          />
        ))}
      </div>
    </main>
  );
};

export default SearchPage;
