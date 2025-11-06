import { useSession, signIn } from "next-auth/react";
import GroupsList from "../../components/Groups/GroupsList";
import CreateGroup from "../../components/Groups/CreateGroup";
import Collapser from "../../components/Collapser/Collapser";
import type { NextPage } from "next";

const GroupsPage: NextPage = () => {
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
