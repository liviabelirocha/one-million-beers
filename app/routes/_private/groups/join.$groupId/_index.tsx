import { LoaderFunctionArgs } from "@remix-run/node";
import { ImSpinner10 } from "react-icons/im";
import { redirectWithSuccess } from "remix-toast";
import { joinGroup } from "~/.server/group";
import { authenticatedLoader } from "~/services/authenticated";

export const loader = (params: LoaderFunctionArgs) =>
  authenticatedLoader(params, async ({ user, params }) => {
    const group = await joinGroup({
      groupId: params.groupId ?? "",
      userId: user.id,
    });

    return redirectWithSuccess(`/groups/${group.groupId}`, {
      message: "Joined group successfully!",
    });
  });

export default function Index() {
  return <ImSpinner10 className="animate-spin" />;
}
