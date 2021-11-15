import { useSession, signIn, signOut } from "next-auth/react";
import GroupsList from "../../components/Groups/GroupsList";
import CreateGroup from "../../components/Groups/CreateGroup";

const GroupsPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>loading...</div>;
  }

  if (session) {
    return (
      <div>
        <CreateGroup />
        <GroupsList />
      </div>
    );
  }

  return (
    <>
      Sorry. Only signed in users can see groups. <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default GroupsPage;
