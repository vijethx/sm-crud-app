import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface CreateFormData {
  title: string;
  description: string;
}

const CreateForm = () => {
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

  const onCreatePost = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onCreatePost)}>
        <input placeholder='Title' {...register("title")} />
        <p style={{ color: "red" }}>{errors.title?.message}</p>
        <textarea placeholder='Description' {...register("description")} />
        <p style={{ color: "red" }}>{errors.description?.message}</p>
        <input type='submit' />
      </form>
    </div>
  );
};

export default CreateForm;
