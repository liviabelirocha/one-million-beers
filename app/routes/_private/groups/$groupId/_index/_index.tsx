import { ActionFunctionArgs, json, SerializeFrom } from "@remix-run/node";
import {
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import { z } from "zod";
import { addBeer } from "~/.server/beer";
import { Input } from "~/components/input";
import { Select } from "~/components/select";
import { SubmitButton } from "~/components/submit-button";
import { authenticatedAction } from "~/services/authenticated";
import { ONE_MILLION_BEERS, parseZod } from "~/utils";
import { loader } from "../_layout";

const addBeerValidation = z.object({
  groupUserId: z.string(),
  beers: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    })
    .refine((val) => parseInt(val, 10) > 0, {
      message: "Expected a number greater than 0",
    })
    .transform((val) => parseInt(val, 10)),
});

export const action = (params: ActionFunctionArgs) =>
  authenticatedAction(params, async ({ request }) => {
    const formData = await request.formData();

    const { data, errors } = parseZod(addBeerValidation, formData);

    if (errors) return json({ errors }, { status: 400 });

    await addBeer({ amount: data.beers, groupUserId: data.groupUserId });

    return json({ ok: true });
  });

export default function Index() {
  const { totalBeers, usersInGroup, user } =
    useOutletContext<SerializeFrom<typeof loader>>();

  const actionData = useActionData<typeof action>();

  const form = useRef<HTMLFormElement>(null);
  const navigation = useNavigation();

  useEffect(
    function resetFormOnSuccess() {
      // @ts-expect-error typescript pls
      if (navigation.state === "idle" && actionData?.ok) form.current?.reset();
    },
    [navigation.state, actionData]
  );

  return (
    <>
      <h1 className="text-2xl text-center">
        {totalBeers
          ? totalBeers < ONE_MILLION_BEERS
            ? `Your group consumed ${totalBeers} beers! Still ${new Intl.NumberFormat().format(
                ONE_MILLION_BEERS - totalBeers
              )} to go!`
            : "YOU HAVE REACHED THE MILLION BEERS! 🎉"
          : "Your group hasn't consumed any beers yet. Start adding some!"}
      </h1>

      <Form
        className="flex flex-col gap-4 bg-slate-400 p-4 rounded"
        method="POST"
        ref={form}
      >
        <h2 className="text-xl text-black">Add a beer 🍺</h2>

        <Input
          type="number"
          name="beers"
          label="How many beers were drank?"
          required
          labelClassName="text-black"
          // @ts-expect-error typescript pls
          errors={actionData?.errors?.beers}
        />

        <Select
          label="Who drank the beers?"
          defaultValue={user.groupUserId}
          name="groupUserId"
          labelClassName="text-black"
          // @ts-expect-error typescript pls
          errors={actionData?.errors?.groupUserId}
        >
          {usersInGroup.map((gu) => (
            <option key={gu.id} value={gu.id}>
              {gu.user?.username}
            </option>
          ))}
        </Select>

        <SubmitButton>Add beers</SubmitButton>
      </Form>
    </>
  );
}
