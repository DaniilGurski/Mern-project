import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import LogoutButton from "./components/LogoutButton";
import { useAuth } from "./components/AuthContextProvider";

export default function App() {
  // TODO: Conditionally render links
  const { isAuth } = useAuth();

  console.log("logged in: ", isAuth);

  return (
    <>
      <header className="m-4 flex items-center justify-end gap-x-4 rounded-lg p-4 outline-1 outline-gray-700">
        <nav>
          <ul className="flex justify-end gap-6">
            <li>
              <Link
                className="text-gray-700 hover:text-gray-950 focus:text-gray-950"
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-700 hover:text-gray-950 focus:text-gray-950"
                to="/admin"
              >
                Admin
              </Link>
            </li>
            {!isAuth && (
              <>
                <li>
                  <Link
                    className="text-gray-700 hover:text-gray-950 focus:text-gray-950"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-700 hover:text-gray-950 focus:text-gray-950"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {isAuth && <LogoutButton />}
      </header>

      <main className="mx-auto h-dvh w-[90%] max-w-7xl">
        <Outlet />
      </main>
    </>
  );
}
