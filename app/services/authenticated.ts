import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { authenticator, User } from "./auth.server";

type ExtendedLoaderFunctionArgs = LoaderFunctionArgs & {
  user: User;
};

type ExtendedActionFunctionArgs = ActionFunctionArgs & {
  user: User;
};

export async function authenticatedLoader<T>(
  args: LoaderFunctionArgs,
  loader: (params: ExtendedLoaderFunctionArgs) => Promise<T>
) {
  const user = await authenticator.isAuthenticated(args.request);

  if (!user) throw new Error("Unauthorized");

  return loader({ ...args, user });
}

export async function authenticatedAction<T>(
  args: ActionFunctionArgs,
  action: (params: ExtendedActionFunctionArgs) => Promise<T>
) {
  const user = await authenticator.isAuthenticated(args.request);

  if (!user) throw new Error("Unauthorized");

  return action({ ...args, user });
}
