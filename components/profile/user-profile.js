import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useSession } from "next-auth/react";

function UserProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className={classes.profile}>Loading...</p>;
  }
  console.log(session);

  return (
    <>
      {!session && <p className={classes.profile}>Please log in</p>}
      {session && (
        <section className={classes.profile}>
          <h1>Your User Profile</h1>
          <ProfileForm />
        </section>
      )}
    </>
  );
}

export default UserProfile;
