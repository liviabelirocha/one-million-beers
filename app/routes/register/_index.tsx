import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "services/auth.server";
import { Input } from "~/components/input";
import { SubmitButton } from "~/components/submit-button";

export const action = async (params: ActionFunctionArgs) => {
  try {
    return await authenticator.authenticate("user-sign-up", params.request, {
      successRedirect: "/groups",
      throwOnError: true,
    });
  } catch (error) {
    if (error instanceof Response) return error;

    // @ts-expect-error error handling sucks
    if (error?.cause?.data)
      // @ts-expect-error error handling sucks
      return json({ errors: error.cause.data }, { status: 400 });

    return json({ errors: { toast: ["An error occurred"] } }, { status: 400 });
  }
};
export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/groups",
  });
};

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 h-screen">
      <h1 className="text-3xl">One Million Beers 🍺</h1>
      <h2 className="text-2xl text-orange-400">Sign Up</h2>
      <form className="flex flex-col gap-4" method="POST">
        <Input type="text" name="username" label="Username" />
        <Input type="password" name="password" label="Password" />
        <SubmitButton>Sign up</SubmitButton>
      </form>

      <p>
        Already have an account?{" "}
        <a href="/" className="text-orange-400">
          Sign in here
        </a>
      </p>
    </div>
  );
}
