export default function groupsApi(req, res) {
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
}
