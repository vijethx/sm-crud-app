import { Link } from "react-router-dom";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className='navbar'>
      <Link to='/'>Home</Link>
      <Link to='/login'>Login</Link>
    </div>
  );
};

export default Navbar;
