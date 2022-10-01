import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./Post";

export interface IPost {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

const Main = () => {
  const [postsList, setPostsList] = useState<IPost[] | null>(null);
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IPost[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {/* Main */}
      {postsList?.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};

export default Main;
