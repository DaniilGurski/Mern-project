import { Outlet } from "react-router-dom";
import LogoutButton from "./components/LogoutButton";
import { useAuth } from "./hooks/useAuth";
import MyNavLink from "./components/ui/MyNavLink";

export default function App() {
  const { isAuth } = useAuth();

  return (
    <>
      <header className="m-4 flex items-center justify-end gap-x-4 rounded-lg p-4 outline-1 outline-gray-700">
        <nav>
          <ul className="flex justify-end gap-6">
            <li>
              <MyNavLink to="/"> Home </MyNavLink>
            </li>
            <li>
              <MyNavLink to="/admin"> Admin </MyNavLink>
            </li>

            {!isAuth && (
              <>
                <li>
                  <MyNavLink to="/login"> Login </MyNavLink>
                </li>
                <li>
                  <MyNavLink to="/register"> Register </MyNavLink>
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
