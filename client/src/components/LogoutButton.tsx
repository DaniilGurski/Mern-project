import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import { useAuth } from "./AuthContextProvider";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { setIsAuth } = useAuth();

  const handleClick = () => {
    fetch("http://localhost:8000/logout", {
      credentials: "include",
    }).then(() => {
      setIsAuth(false);
      navigate("/login");
    });
  };

  return <Button onClick={handleClick}>Logout</Button>;
}
