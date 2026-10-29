import { useEffect, useMemo, useState } from "react";
import {
Search,
Menu,
X,
Globe,
Clock,
ArrowUpRight,
Play,
RefreshCw,
ChevronRight,
TrendingUp,
Newspaper,
Home,
Compass,
Bookmark,
UserRound,
MapPin,
Sparkles,
} from "lucide-react";


import "./App.css";

const categories = [
  "Top News",
  "Rajasthan",
  "India",
  "World",
  "Sports",
  "Technology",
  "Entertainment",
];

const demoNews = [
  {
    id: 1,
    category: "India",
    title: "India's changing landscape: The stories shaping tomorrow",
    summary:
      "Explore the latest developments, important announcements and stories influencing everyday life across India.",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1400&q=85",
    author: "NEW WORLD DESK",
    time: "5 min read",
    featured: true,
  },
  {
    id: 2,
    category: "Rajasthan",
    title: "Rajasthan: Key developments and updates from across the state",
    summary:
      "A closer look at important local developments, public initiatives and stories from Rajasthan.",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80",
    author: "Regional Desk",
    time: "3 min read",
  },
  {
    id: 3,
    category: "Technology",
    title: "Artificial intelligence is changing the way we work",
    summary:
      "Discover emerging technologies, digital tools and innovations transforming businesses and daily life.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
    author: "Technology Desk",
    time: "4 min read",
  },
  {
    id: 4,
    category: "World",
    title: "Around the world: Understanding the stories behind the headlines",
    summary:
      "A look at international developments and the events making headlines around the globe.",
    image:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=900&q=80",
    author: "World Desk",
    time: "4 min read",
  },
  {
    id: 5,
    category: "Sports",
    title: "Sports update: The performances everyone is talking about",
    summary:
      "Follow sporting highlights, match reports and noteworthy performances from the world of sports.",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80",
    author: "Sports Desk",
    time: "3 min read",
  },
  {
    id: 6,
    category: "Entertainment",
    title: "Entertainment: What's new in films, music and popular culture",
    summary:
      "Catch up on entertainment stories, creative releases and noteworthy moments from popular culture.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
    author: "Entertainment Desk",
    time: "3 min read",
  },
];

const demoVideos = [
  {
    id: 1,
    title: "Watch the latest news and important developments",
    category: "Top News",
    videoId: "",
    thumbnail:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Technology stories you should know about",
    category: "Technology",
    videoId: "",
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Sports highlights and updates",
    category: "Sports",
    videoId: "",
    thumbnail:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80",
  },
];

function formatDate() {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date());
}

function getYouTubeId(video) {
  if (!video) return "";

  if (/^[a-zA-Z0-9_-]{11}$/.test(video)) {
    return video;
  }

  try {
    const url = new URL(video);

    if (url.hostname.includes("youtu.be")) {
      return url.pathname.slice(1);
    }

    if (url.searchParams.get("v")) {
      return url.searchParams.get("v");
    }

    const parts = url.pathname.split("/");

    if (["embed", "shorts", "live"].includes(parts[1])) {
      return parts[2] || "";
    }
  } catch {
    return "";
  }

  return "";
}

function Header({ onSearch, onCategoryChange }) {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function submitSearch(event) {
    event.preventDefault();
    onSearch(query.trim());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function chooseCategory(category) {
    onCategoryChange(category);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <header className="site-header">
      <div className="top-strip">
        <div className="container top-strip-inner">
          <span className="top-tag">
            <Globe size={14} />
            Independent digital news portal
          </span>

          <span className="top-date">
            <Clock size={14} />
            {formatDate()}
          </span>
        </div>
      </div>

      <div className="container masthead">
        <a
          className="brand"
          href="#home"
          onClick={() => chooseCategory("Top News")}
          aria-label="NEW WORLD home"
        >
          <span className="brand-mark">
            <Newspaper size={28} strokeWidth={2.2} />
          </span>

          <span className="brand-copy">
            <span className="brand-name">
              NEW <span>WORLD</span>
            </span>
            <span className="brand-tagline">NEWS THAT MATTERS</span>
          </span>
        </a>

        <form className="search-form" onSubmit={submitSearch}>
          <Search size={19} className="search-icon" />

          <input
            type="search"
            placeholder="Search news and headlines..."
            aria-label="Search news"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          <button type="submit">Search</button>
        </form>
      </div>

      <div className="navigation-wrap">
        <div className="container navigation-inner">
          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <nav className={`main-navigation ${menuOpen ? "nav-open" : ""}`}>
            {categories.map((category) => (
              <button
                key={category}
                className="nav-link"
                onClick={() => chooseCategory(category)}
              >
                {category}
              </button>
            ))}

            <button
              className="nav-link video-nav-link"
              onClick={() => {
                setMenuOpen(false);
                document
                  .getElementById("video-feed")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Play size={15} fill="currentColor" />
              Video Feed
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

function BreakingNews({ stories }) {
  const headlines = stories.length
    ? stories.map((story) => story.title)
    : ["Welcome to NEW WORLD — News that matters."];

  return (
    <div className="breaking-bar">
      <div className="breaking-label">
        <span className="breaking-dot" />
        BREAKING NEWS
      </div>

      <div className="breaking-window">
        <div className="breaking-track">
          {[...headlines, ...headlines].map((headline, index) => (
            <span key={`${headline}-${index}`} className="breaking-item">
              {headline}
              <span className="breaking-separator">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
}

function NewsCard({ story, onRead }) {
  return (
    <article className="news-card">
      <button
        className="news-image-button"
        onClick={() => onRead(story)}
        aria-label={`Read ${story.title}`}
      >
        <img
          className="news-card-image"
          src={story.image}
          alt=""
          loading="lazy"
        />

        <span className="image-category">{story.category}</span>
      </button>

      <div className="news-card-content">
        <div className="card-meta">
          <span>{story.author || "NEW WORLD DESK"}</span>
          <span>{story.time || "3 min read"}</span>
        </div>

        <button className="story-title-button" onClick={() => onRead(story)}>
          <h3>{story.title}</h3>
        </button>

        <p className="news-summary">
          {story.summary || story.description || ""}
        </p>

        <button className="read-more" onClick={() => onRead(story)}>
          Read story <ArrowUpRight size={16} />
        </button>
      </div>
    </article>
  );
}

function FeaturedStory({ story, onRead }) {
  if (!story) return null;

  return (
    <section className="featured-section">
      <div className="featured-copy">
        <div className="featured-label">
          <span className="live-dot" />
          YOUR DAILY BRIEFING
        </div>

        <span className="featured-category">{story.category}</span>

        <h1>{story.title}</h1>

        <p>{story.summary || story.description || ""}</p>

        <div className="featured-meta">
          <span>{story.author || "NEW WORLD DESK"}</span>
          <span className="meta-divider">/</span>
          <span>{story.time || "5 min read"}</span>
        </div>

        <button className="primary-button" onClick={() => onRead(story)}>
          Read full story <ArrowUpRight size={18} />
        </button>
      </div>

      <button
        className="featured-image-wrap"
        onClick={() => onRead(story)}
        aria-label={`Read ${story.title}`}
      >
        <img src={story.image} alt="" className="featured-image" />
        <span className="featured-image-caption">
          <span className="caption-line" />
          THE BIG STORY
        </span>
      </button>
    </section>
  );
}

function VideoCard({ video }) {
  const [active, setActive] = useState(false);
  const videoId = getYouTubeId(video.videoId);

  useEffect(() => {
    const element = document.getElementById(`video-${video.id}`);

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.65) {
            setActive(true);
          } else {
            setActive(false);
          }
        });
      },
      { threshold: [0, 0.65, 1] }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [video.id]);

  return (
    <article className="video-card" id={`video-${video.id}`}>
      <div className="video-player">
        {videoId && active ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            className="video-thumbnail-button"
            onClick={() => {
              if (videoId) {
                setActive(true);
              } else {
                window.open(
                  `https://www.youtube.com/results?search_query=${encodeURIComponent(
                    video.title
                  )}`,
                  "_blank",
                  "noopener,noreferrer"
                );
              }
            }}
            aria-label={`Play ${video.title}`}
          >
            <img src={video.thumbnail} alt="" loading="lazy" />
            <span className="video-play-button">
              <Play size={23} fill="currentColor" />
            </span>
            <span className="video-badge">VIDEO</span>
          </button>
        )}
      </div>

      <div className="video-card-content">
        <span className="video-category">{video.category}</span>
        <h3>{video.title}</h3>
        <span className="video-hint">
          {videoId
            ? "Muted autoplay when visible"
            : "Open video search"}
        </span>
      </div>
    </article>
  );
}

function StoryModal({ story, onClose }) {
  useEffect(() => {
    if (!story) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [story, onClose]);

  if (!story) return null;

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <article className="story-modal">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close story"
        >
          <X size={22} />
        </button>

        <img src={story.image} alt="" className="modal-image" />

        <div className="modal-body">
          <span className="featured-category">{story.category}</span>

          <h2>{story.title}</h2>

          <div className="card-meta modal-meta">
            <span>{story.author || "NEW WORLD DESK"}</span>
            <span>{story.time || "3 min read"}</span>
          </div>

          <p>
            {story.summary ||
              story.description ||
              "More details about this story will be available soon."}
          </p>

          <p className="demo-disclaimer">
            This is a demonstration story. Connect a verified news API to
            display complete, current reporting.
          </p>
        </div>
      </article>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <a href="#home" className="footer-brand">
          <Newspaper size={25} />
          <span>
            NEW <b>WORLD</b>
          </span>
        </a>

        <p>Independent digital news. Stories that matter.</p>

        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to top ↑
        </button>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {new Date().getFullYear()} NEW WORLD</span>
          <span>Stay informed. Stay curious.</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [news, setNews] = useState(demoNews);
  const [videos, setVideos] = useState(demoVideos);
  const [category, setCategory] = useState("Top News");
    const [userLocation, setUserLocation] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);

  const [interests, setInterests] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("newworld-interests")
      ) || ["India", "Technology", "Sports"];
    } catch {
      return ["India", "Technology", "Sports"];
    }
  });
  const [search, setSearch] = useState("");
  const [selectedStory, setSelectedStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState(
    "You're viewing sample stories. Live headlines require a news API."
  );

  async function loadNews(selectedCategory = category, query = search) {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      if (selectedCategory !== "Top News") {
        params.set("category", selectedCategory);
      }

      if (query) {
        params.set("q", query);
      }

      const response = await fetch(`/api/news?${params.toString()}`);

      if (!response.ok) {
        throw new Error("News API is not connected");
      }

      const data = await response.json();

      const incomingNews = Array.isArray(data)
        ? data
        : data.articles || data.news || [];

      if (incomingNews.length) {
        const normalizedNews = incomingNews.map((item, index) => ({
          id: item.id || item.url || index,
          category: item.category || selectedCategory,
          title: item.title || "News update",
          summary:
            item.summary ||
            item.description ||
            item.content ||
            "Read the latest update.",
          image:
            item.image ||
            item.urlToImage ||
            item.imageUrl ||
            demoNews[index % demoNews.length].image,
          author: item.author || "NEW WORLD DESK",
          time: item.time || "Latest update",
          url: item.url || "",
        }));

        setNews(normalizedNews);
        setNotice("News loaded from your configured API.");
      } else {
        throw new Error("No news returned");
      }
    } catch {
      setNews(demoNews);
      setNotice(
        "Demo stories are shown. Connect the news API to load current headlines."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNews("Top News", "");
    // Initial page load only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function loadLocationNews() {
    if (!navigator.geolocation) {
      alert("Your browser does not support location detection.");
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const locationResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );

          if (!locationResponse.ok) {
            throw new Error("Could not detect your city.");
          }

          const locationData = await locationResponse.json();
          const address = locationData.address || {};

          const city =
            address.city ||
            address.town ||
            address.village ||
            address.county ||
            address.state ||
            "Your location";

          setUserLocation(city);

          const response = await fetch(
            `/api/news?q=${encodeURIComponent(city)}`
          );

          if (!response.ok) {
            throw new Error("Could not load local news.");
          }

          const data = await response.json();

          const articles = Array.isArray(data)
            ? data
            : data.articles || data.news || [];

          if (!articles.length) {
            throw new Error("No local news articles were found.");
          }

          const normalizedNews = articles.map((item, index) => ({
            id: item.id || item.url || `local-${index}`,
            category: item.category || "Local News",
            title: item.title || "News update",
            summary:
              item.summary ||
              item.description ||
              item.content ||
              "Read the latest news.",
            image:
              item.image ||
              item.urlToImage ||
              item.imageUrl ||
              demoNews[index % demoNews.length].image,
            author: item.author || "NEW WORLD LOCAL DESK",
            time: item.time || "Latest update",
            url: item.url || "",
          }));

          setNews(normalizedNews);
          setCategory("Top News");
          setSearch("");
          setNotice(`Showing news searched for ${city}.`);

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } catch (error) {
          alert(
            error.message ||
              "Unable to load location-based news. Please try again."
          );
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        setLocationLoading(false);

        if (error.code === error.PERMISSION_DENIED) {
          alert(
            "Location permission was denied. You can still use NEW WORLD without location access."
          );
        } else {
          alert(
            "Unable to detect your location. Please try again."
          );
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }
  const filteredNews = useMemo(() => {
    let result = news;

    if (category !== "Top News") {
      result = result.filter(
        (story) =>
          (story.category || "").toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const term = search.toLowerCase();

      result = result.filter((story) =>
        `${story.title} ${story.summary} ${story.category}`
          .toLowerCase()
          .includes(term)
      );
    }

    return result;
  }, [news, category, search]);
  const recommendedNews = useMemo(() => {
    if (!news.length) return [];

    const savedInterests = interests.map((item) =>
      item.toLowerCase()
    );

    return [...news].sort((a, b) => {
      const aText =
        `${a.category} ${a.title} ${a.summary}`.toLowerCase();

      const bText =
        `${b.category} ${b.title} ${b.summary}`.toLowerCase();

      const aScore = savedInterests.reduce(
        (score, interest) =>
          score + (aText.includes(interest) ? 1 : 0),
        0
      );

      const bScore = savedInterests.reduce(
        (score, interest) =>
          score + (bText.includes(interest) ? 1 : 0),
        0
      );

      return bScore - aScore;
    });
  }, [news, interests]);
  const featuredStory = filteredNews[0] || null;

  const latestStories = filteredNews.filter(
    (story) => story.id !== featuredStory?.id
  );

  function changeCategory(nextCategory) {
    setCategory(nextCategory);
    setSearch("");
    loadNews(nextCategory, "");
  }

  function searchNews(query) {
    setSearch(query);
    loadNews(category, query);
  }

  function refreshNews() {
    loadNews(category, search);
  }

  return (
    <div className="app-shell" id="home">
      <Header
        onSearch={searchNews}
        onCategoryChange={changeCategory}
      />

      <main>
        <div className="container">
  <section className="personalize-panel">
    <div className="personalize-heading">
      <div>
        <span className="section-eyebrow">
          YOUR NEWS, YOUR WORLD
        </span>

```
    <h2>
      <Sparkles size={22} />
      For You
    </h2>

    <p>
      Discover news based on your interests and location.
    </p>
  </div>

  <button
    className="location-button"
    onClick={loadLocationNews}
    disabled={locationLoading}
  >
    <MapPin size={17} />

    {locationLoading
      ? "Finding location..."
      : userLocation || "Use my location"}
  </button>
</div>

<div className="interest-label">
  Choose your interests:
</div>

<div className="interest-chips">
  {categories
    .filter((item) => item !== "Top News")
    .map((item) => {
      const active = interests.includes(item);

      return (
        <button
          key={item}
          className={`interest-chip ${
            active ? "interest-chip-active" : ""
          }`}
          onClick={() => {
            const updated = active
              ? interests.filter(
                  (interest) => interest !== item
                )
              : [...interests, item];

            setInterests(updated);

            localStorage.setItem(
              "newworld-interests",
              JSON.stringify(updated)
            );
          }}
        >
          {item}
        </button>
      );
    })}
</div>

<p className="interest-note">
  Your interests are saved in this browser.
</p>
```

  </section>

<BreakingNews stories={news.slice(0, 5)} />


          <div className="intro-row">
            <div>
              <span className="intro-eyebrow">
                INDEPENDENT JOURNALISM · GLOBAL PERSPECTIVES
              </span>

              <h2>
                Stories shaping <em>our world.</em>
              </h2>

              <p>
                The latest headlines, perspectives and developments — all in
                one place.
              </p>
            </div>

            <button
              className="refresh-button"
              onClick={refreshNews}
              disabled={loading}
            >
              <RefreshCw
                size={16}
                className={loading ? "spin-icon" : ""}
              />
              {loading ? "Loading..." : "Refresh news"}
            </button>
          </div>

          <div className="news-notice">
            <span className="notice-dot" />
            {notice}
          </div>

          {featuredStory ? (
            <FeaturedStory
              story={featuredStory}
              onRead={setSelectedStory}
            />
          ) : (
            <div className="empty-state">
              <Search size={30} />
              <h2>No stories found</h2>
              <p>Try another search term or choose a different category.</p>
              <button
                className="primary-button"
                onClick={() => {
                  setSearch("");
                  setCategory("Top News");
                  loadNews("Top News", "");
                }}
              >
                Show top news
              </button>
            </div>
          )}

          {latestStories.length > 0 && (
            <section className="latest-section" id="latest">
              <SectionHeading
                eyebrow="THE LATEST"
                title="Latest headlines"
                subtitle="Stories and updates selected for you."
              />

              <div className="news-grid">
                {latestStories.map((story) => (
                  <NewsCard
                    key={story.id}
                    story={story}
                    onRead={setSelectedStory}
                  />
                ))}
              </div>
            </section>
          )}

          <section className="video-section" id="video-feed">
            <div className="video-section-top">
              <SectionHeading
                eyebrow="WATCH & DISCOVER"
                title="The video feed"
                subtitle="Watch news clips and explore video stories."
              />

              <span className="video-section-icon">
                <Play size={19} fill="currentColor" />
                VIDEO
              </span>
            </div>

            <div className="video-grid">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>

            <p className="video-note">
              Videos with a valid YouTube video ID can autoplay while visible.
              Autoplay is muted to comply with browser restrictions.
            </p>
          </section>

          <section className="explore-section">
            <SectionHeading
              eyebrow="EXPLORE THE WORLD"
              title="News by category"
              subtitle="Choose a section to explore its stories."
            />

            <div className="category-grid">
              {categories.map((item, index) => (
                <button
                  key={item}
                  className={`category-tile ${
                    category === item ? "category-tile-active" : ""
                  }`}
                  onClick={() => changeCategory(item)}
                >
                  <span className="category-number">
                    0{index + 1}
                  </span>
                  <span className="category-name">{item}</span>
                  <ChevronRight size={19} />
                </button>
              ))}
            </div>
          </section>

          <section className="newsletter-strip">
            <div className="newsletter-icon">
              <TrendingUp size={25} />
            </div>

            <div>
              <span className="section-eyebrow">STAY INFORMED</span>
              <h2>Make sense of what matters.</h2>
              <p>
                Explore the latest stories from India and around the world.
              </p>
            </div>

            <button
              className="newsletter-button"
              onClick={() =>
                document
                  .getElementById("latest")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore stories <ArrowUpRight size={17} />
            </button>
          </section>
        </div>
      </main>

      ```
  <Footer />

  <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
    <button
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    >
      <Home size={21} />
      <span>Home</span>
    </button>

    <button
      onClick={() =>
        document
          .querySelector(".explore-section")
          ?.scrollIntoView({ behavior: "smooth" })
      }
    >
      <Compass size={21} />
      <span>Explore</span>
    </button>

    <button
      onClick={() =>
        document
          .getElementById("video-feed")
          ?.scrollIntoView({ behavior: "smooth" })
      }
    >
      <Play size={21} />
      <span>Videos</span>
    </button>

    <button
      onClick={() =>
        document
          .getElementById("latest")
          ?.scrollIntoView({ behavior: "smooth" })
      }
    >
      <Bookmark size={21} />
      <span>Latest</span>
    </button>

    <button
      onClick={() =>
        document
          .querySelector(".personalize-panel")
          ?.scrollIntoView({ behavior: "smooth" })
      }
    >
      <UserRound size={21} />
      <span>For You</span>
    </button>
  </nav>

  <StoryModal
    story={selectedStory}
    onClose={() => setSelectedStory(null)}
  />


    </div>
  );
}