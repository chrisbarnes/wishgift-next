import { useSession, signIn } from "next-auth/react";
import GroupsList from "../../components/Groups/GroupsList";
import CreateGroup from "../../components/Groups/CreateGroup";
import Collapser from "../../components/Collapser/Collapser";
import type { NextPage } from "next";

const GroupsPage: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="text-gray-900 dark:text-gray-100">loading...</div>;
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
    <div className="text-gray-900 dark:text-gray-100">
      Sorry. Only signed in users can see groups. <br />
      <button className="underline hover:text-blue-600 dark:hover:text-blue-400" onClick={() => signIn()}>Sign in</button>
    </div>
  );
};

export default GroupsPage;
