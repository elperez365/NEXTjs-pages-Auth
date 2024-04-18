import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useSession } from "next-auth/react";

function UserProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className={classes.profile}>Loading...</p>;
  }

  async function changePasswordHandler(passwordData) {
    const { oldPassword, newPassword } = passwordData;

    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify({ oldPassword, newPassword, session }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <>
      {!session && <p className={classes.profile}>Please log in</p>}
      {session && (
        <section className={classes.profile}>
          <h1>Your User Profile</h1>
          <ProfileForm onChangePassword={changePasswordHandler} />
        </section>
      )}
    </>
  );
}

export default UserProfile;
