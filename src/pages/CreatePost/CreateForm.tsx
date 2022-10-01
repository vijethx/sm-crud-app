import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

interface CreateFormData {
  title: string;
  description: string;
}

const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("title cannot be empty"),
    description: yup.string().required("description cannot be empty"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const onCreatePost = async (data: any) => {
    const resp = await addDoc(postsRef, {
      // title: data.title,
      // description: data.description,
      ...data,
      userId: user?.uid,
      username: user?.displayName,
    });
    if (resp) {
      alert("Post Created");
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input placeholder='Title...' {...register("title")} />
      <p style={{ color: "red" }}> {errors.title?.message}</p>
      <textarea
        placeholder='Description...'
        {...register("description")}
        rows={15}
        cols={34}
      />
      <p style={{ color: "red" }}> {errors.description?.message}</p>
      <input type='submit' className='submitForm' />
    </form>
  );
};

export default CreateForm;
