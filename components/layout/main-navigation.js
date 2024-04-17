import Link from "next/link";

import classes from "./main-navigation.module.css";

import { useSession, signOut } from "next-auth/react";

function MainNavigation() {
  const { data: session, status } = useSession();

  const logOutHandler = async () => {
    await signOut();
  };

  console.log(session);

  console.log("status" + " " + status);

  return (
    <header className={classes.header}>
      {status === "loading" && <p>Loading...</p>}
      {status === "authenticated" && (
        <p>Authenticated as {session.user.email}</p>
      )}
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}

          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}

          {session && (
            <li>
              <button onClick={() => logOutHandler()}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
