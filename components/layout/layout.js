import { Fragment } from "react";

import MainNavigation from "./main-navigation";
import { SessionProvider } from "next-auth/react";
function Layout({ session, ...props }) {
  return (
    <Fragment>
      <SessionProvider session={session}>
        <MainNavigation />
        <main>{props.children}</main>
      </SessionProvider>
    </Fragment>
  );
}

export default Layout;
