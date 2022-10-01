import { IPost } from "./index";

interface Props {
  post: IPost;
}

export const Post = (props: Props) => {
  const { post } = props;
  return (
    <div className='' key={post.id}>
      <div className='title'>
        <h1>{post.title}</h1>
      </div>
      <div className='body'>
        <p>{post.description}</p>
      </div>
      <div className='footer'>
        <p>@{post.username}</p>
      </div>
    </div>
  );
};
