import { useMatches } from "@remix-run/react";

const routes = [
  { name: "Main", path: "" },
  { name: "Metrics", path: "metrics" },
];

export const Navbar = ({ name, id }: { name: string; id: string }) => {
  const location = useMatches().pop();

  const isActive = (path: string) =>
    location?.pathname.split(`/groups/${id}/`)[1] === path;

  return (
    <nav className="flex flex-wrap items-center justify-between mx-auto p-4 w-full">
      <h1 className="text-3xl flex gap-1">
        <a href="/groups">🍺</a> <span className="hidden md:block">{name}</span>
      </h1>

      <div className="flex gap-4">
        {routes.map((r) => (
          <a
            href={`/groups/${id}/${r.path}`}
            key={r.name}
            className={`text-xl ${isActive(r.path) && "text-orange-400"}`}
          >
            {r.name}
          </a>
        ))}
      </div>

      <button
        onClick={() =>
          navigator.clipboard.writeText(
            `${window.location.host}/groups/join/${id}`
          )
        }
      >
        Invite
      </button>
    </nav>
  );
};
