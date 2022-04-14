import React from "react";

interface PropsItem {
  post: {
    id: string;
    imgUrl: string;
    caption: string;
    author: string;
  };
}

const ImageCard = (props: PropsItem) => {
  return (
    <div key={props.post.id}>
      <h1>{props.post.author}</h1>
    </div>
  );
};

export default ImageCard;
