import { useSession, signIn, signOut } from "next-auth/react";
import GroupsList from "../../components/Groups/GroupsList";

const GroupsPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>loading...</div>;
  }

  if (session) {
    return (
      <div>
        Signed in as {session.user.email} <br />
        <GroupsList />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default GroupsPage;
