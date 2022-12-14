import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const signUserOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className='navbar'>
      <div className='links'>
        <Link to='/'>Home</Link>
        {user ? (
          <Link to='/createpost'>Create Post</Link>
        ) : (
          <Link to='/login'>Login</Link>
        )}
      </div>
      <div className='user'>
        {user && (
          <>
            <p> {user?.displayName} </p>
            <img src={user?.photoURL || ""} width='20' height='20' alt='pfp' />
            <button onClick={signUserOut}> Log Out</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
