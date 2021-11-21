import { useSession, signIn, signOut } from "next-auth/react";
import GroupsList from "../../components/Groups/GroupsList";
import CreateGroup from "../../components/Groups/CreateGroup";
import Collapser from "../../components/Collapser/Collapser";

const GroupsPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>loading...</div>;
  }

  if (session) {
    return (
      <>
        <Collapser triggerText="Create Group">
          <CreateGroup />
        </Collapser>
        <GroupsList />
      </>
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
