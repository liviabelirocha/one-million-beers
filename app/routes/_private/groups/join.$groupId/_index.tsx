import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { ImSpinner10 } from "react-icons/im";
import { joinGroup } from "~/.server/group";
import { authenticatedLoader } from "~/services/authenticated";

export const loader = (params: LoaderFunctionArgs) =>
  authenticatedLoader(params, async ({ user, params }) => {
    const group = await joinGroup({
      groupId: params.groupId ?? "",
      userId: user.id,
    });

    return redirect(`/groups/${group.groupId}`);
  });

export default function Index() {
  return <ImSpinner10 className="animate-spin" />;
}
