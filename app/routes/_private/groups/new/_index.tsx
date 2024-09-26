import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, useActionData } from "@remix-run/react";
import { redirectWithSuccess } from "remix-toast";
import { z } from "zod";
import { createGroup } from "~/.server/group";
import { Input } from "~/components/input";
import { SubmitButton } from "~/components/submit-button";
import { authenticatedAction } from "~/services/authenticated";
import { parseZod } from "~/utils";

const newGroupValidation = z.object({
  name: z.string().min(3),
});

export const action = (params: ActionFunctionArgs) =>
  authenticatedAction(params, async ({ user, request }) => {
    const formData = await request.formData();

    const { data, errors } = parseZod(newGroupValidation, formData);

    if (errors) return json({ errors }, { status: 400 });

    const group = await createGroup({ name: data.name, userId: user.id });

    return redirectWithSuccess(`/groups/${group.id}`, {
      message: "Group created successfully!",
    });
  });

export default function Index() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <h1 className="text-3xl">Create new Group 🍺</h1>
      <Form className="flex flex-col gap-4" method="POST">
        <Input
          type="text"
          name="name"
          label="Name"
          errors={actionData?.errors?.name}
        />
        <SubmitButton>Create</SubmitButton>
      </Form>
    </div>
  );
}
