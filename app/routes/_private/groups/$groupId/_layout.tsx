import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import {
  beersInGroup,
  beersInGroupPerMonth,
  beersInGroupPerPerson,
} from "~/.server/beer";
import { findUserInGroup, listUsersInGroup } from "~/.server/group";
import { authenticatedLoader } from "~/services/authenticated";
import { Navbar } from "./navbar";

export const loader = (params: LoaderFunctionArgs) =>
  authenticatedLoader(params, async ({ user, params }) => {
    const [group, beers, beersPerPerson, usersInGroup, beersPerMonth] =
      await Promise.all([
        findUserInGroup({
          groupId: params.groupId ?? "",
          userId: user.id,
        }),
        beersInGroup(params.groupId ?? ""),
        beersInGroupPerPerson(params.groupId ?? ""),
        listUsersInGroup(params.groupId ?? ""),
        beersInGroupPerMonth(params.groupId ?? ""),
      ]);

    if (!group) throw new Error("Group not found");

    return json({
      group,
      totalBeers: beers._sum.amount ?? 0,
      beersPerPerson,
      usersInGroup,
      user: {
        ...user,
        groupUserId: usersInGroup.find((u) => u.userId === user.id)?.id,
      },
      beersPerMonth,
    });
  });

export default function Layout() {
  const loaderData = useLoaderData<typeof loader>();

  const { group } = loaderData;

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <Navbar id={group.groupId} name={group.group.name} />
      <Outlet context={loaderData} />
    </div>
  );
}
