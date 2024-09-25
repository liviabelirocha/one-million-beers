import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useSearchParams } from "@remix-run/react";
import { Input } from "~/components/input";
import { SubmitButton } from "~/components/submit-button";
import { authenticator } from "~/services/auth.server";

export const action = async (params: ActionFunctionArgs) => {
  const { searchParams } = new URL(params.request.url);

  try {
    return await authenticator.authenticate("user-sign-in", params.request, {
      successRedirect: searchParams.get("redirect") ?? "/groups",
      throwOnError: true,
    });
  } catch (error) {
    if (error instanceof Response) throw error;

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
  const actionData = useActionData<typeof action>();
  const [searchParams] = useSearchParams();

  return (
    <div className="flex flex-col items-center justify-center gap-8 h-screen">
      <h1 className="text-3xl">One Million Beers 🍺</h1>
      <h2 className="text-2xl text-orange-400">Sign In</h2>
      <Form
        className="flex flex-col gap-4"
        method="POST"
        action={`/?index&${searchParams.toString()}`}
      >
        <Input
          type="text"
          name="username"
          label="Username"
          errors={actionData?.errors?.username}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          errors={actionData?.errors?.password}
        />
        <SubmitButton>Sign in</SubmitButton>
      </Form>

      <p>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Don't have an account?{" "}
        <a
          href={`/register?${searchParams.toString()}`}
          className="text-orange-400"
        >
          Register here
        </a>
      </p>
    </div>
  );
}
