export interface PropsItem {
  post: {
    id: string;
    bytes: Uint8Array;
    imgUrl: string;
    caption: string;
    author: string;
  };
}
