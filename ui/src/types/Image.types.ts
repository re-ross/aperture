export type Image = {
  id: string;
  imgUrl: string;
  caption: string;
  author: string;
};

export type ImageProps = {
  image: Image;
  key: string;
};
