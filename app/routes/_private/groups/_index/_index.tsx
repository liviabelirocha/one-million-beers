import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { listGroups } from "~/.server/group";
import { authenticatedLoader } from "~/services/authenticated";

export const loader = (params: LoaderFunctionArgs) =>
  authenticatedLoader(params, async ({ user }) => {
    const groups = await listGroups(user.id);

    return json({ groups });
  });

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <h1 className="text-3xl">Welcome! Select or create a group 🍺</h1>

      {data.groups.length ? (
        <ul className="list-disc">
          {data.groups.map((group) => (
            <li key={group.id} className="text-orange-400">
              <a href={`/groups/${group.id}`}>{group.name}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No groups found</p>
      )}

      <a href="groups/new" className="bg-orange-400 p-4 rounded-md">
        Create new group
      </a>
    </div>
  );
}
