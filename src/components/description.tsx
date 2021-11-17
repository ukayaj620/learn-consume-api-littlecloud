import axios from "axios";
import { FC, useEffect, useState } from "react";

type Props = {
  id: number;
};

const Description: FC<Props> = ({ id }) => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const getPostDescription = async () => {
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );

        setDescription(data["body"]);
      } catch (error) {
        setError(error);
      }
    };

    getPostDescription();
  }, [id]);

  if (error) {
    alert("Something wrong happen!");
    return null;
  }

  return (
    <div
      style={{
        width: "400px",
        border: "1px solid #dfdfdf",
        margin: "8px",
        padding: "8px",
        borderRadius: "16px",
      }}
    >
      <p>{description}</p>
    </div>
  );
};

export default Description;
