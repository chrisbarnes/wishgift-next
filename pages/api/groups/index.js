import { getSession } from "next-auth/react";

export default async function groupsApi(req, res) {
  const session = await getSession({ req });

  if (session) {
    const groups = [
      {
        id: "group1",
        name: "Group 1",
        description: "Group description goes here.",
      },
      {
        id: "group2",
        name: "Group 2",
        description: "Group description goes here.",
      },
      {
        id: "group3",
        name: "Group 3",
        description: "Group description goes here.",
      },
    ];

    res.status(200).json(groups);
  } else {
    res.status(401);
  }

  res.end();
}
