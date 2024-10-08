import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: `/?redirect=${new URL(request.url).pathname}`,
  });
};

export default function Layout() {
  return <Outlet />;
}
