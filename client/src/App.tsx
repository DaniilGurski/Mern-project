import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <>
      <header>
        <nav className="m-4 rounded-lg p-4 outline-1 outline-gray-700">
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
          </ul>
        </nav>
      </header>

      <main className="mx-auto h-dvh w-[90%] max-w-7xl">
        <Outlet />
      </main>
    </>
  );
}
