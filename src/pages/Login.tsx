import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/");
  };

  return (
    <>
      {user ? (
        <div>
          <p>already signed in as {user?.displayName}</p>
          <button onClick={signUserOut}>Log Out</button>
        </div>
      ) : (
        <div>
          <p>Sign in with Google to continue</p>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
      )}
    </>
  );
};

export default Login;
