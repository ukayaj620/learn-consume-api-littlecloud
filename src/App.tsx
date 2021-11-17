import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Post } from "./types";
import Description from "./components/description";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<unknown>();

  const [clickedPostId, setClickedPostId] = useState<number>();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(data as Post[]);
      } catch (error) {
        setError(error);
      }
    };

    getPosts();
  }, []);

  if (error) {
    alert("Something wrong happened when fetching the data.");
    return null;
  }

  const renderPosts = () => {
    return posts.map(({ userId, id, title }) => {
      const handleClick = () => {
        setClickedPostId((prevState) => (prevState === id ? 0 : id));
      };

      return (
        <div>
          <div
            style={{
              width: "400px",
              border: "1px solid #dfdfdf",
              margin: "8px",
              padding: "8px",
              borderRadius: "16px",
            }}
            key={`#post-${id}`}
            onClick={handleClick}
          >
            <h3>{title}</h3>
            <p>Posted by: {userId}</p>
          </div>
          {clickedPostId === id && <Description id={id} />}
        </div>
      );
    });
  };

  return <div className="App">{renderPosts()}</div>;
}

export default App;
