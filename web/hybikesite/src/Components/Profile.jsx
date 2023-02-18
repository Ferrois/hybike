import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { BiLogOut } from "react-icons/bi";
import { GiTwoCoins } from "react-icons/gi";

function AuthActions() {
  return (
    <div className="flex gap-2">
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}

function LogoutButton({ username, points }) {
  const { logout } = useAuth();
  return (
    <div className="flex items-center">
      <div className="flex items-center gap-1">
        {points}
        <div>
          <GiTwoCoins />
        </div>
      </div>
      <div className="mx-2">{username}</div>
      <button onClick={() => logout()}>
        <BiLogOut className="hover:text-gray-200" size={25} />
      </button>
    </div>
  );
}

export default function Profile() {
  const {
    user: [userData, loading],
  } = useAuth();
  return (
    <div className="text-white font-bold">
      {loading ? (
        "Loading"
      ) : userData ? (
        <LogoutButton username={userData.username} points={userData.points} />
      ) : (
        <AuthActions />
      )}
    </div>
  );
}
