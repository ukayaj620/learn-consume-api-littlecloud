import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Post } from "./types";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<unknown>();

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
      return (
        <div style={{ border: "1px solid #dfdfdf" }} key={`#post-${id}`}>
          <h3>{title}</h3>
          <p>Posted by: {userId}</p>
        </div>
      );
    });
  };

  return <div className="App">{renderPosts()}</div>;
}

export default App;
