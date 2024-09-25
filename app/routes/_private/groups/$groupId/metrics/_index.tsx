import { SerializeFrom } from "@remix-run/node";
import { useOutletContext } from "@remix-run/react";
import { loader } from "../_layout";

import { ChartPerMonthBar } from "./charts/per-month-bar";
import { ChartPerPersonBar } from "./charts/per-person-bar";
import { ChartPerPersonPie } from "./charts/per-person-pie";

export default function Index() {
  const { totalBeers, beersPerPerson, beersPerMonth } =
    useOutletContext<SerializeFrom<typeof loader>>();

  return (
    <div className="flex flex-col mx-4 gap-4 max-w-full">
      <ChartPerMonthBar data={beersPerMonth} />
      <ChartPerPersonPie data={beersPerPerson} totalBeers={totalBeers} />
      <ChartPerPersonBar data={beersPerPerson} />
    </div>
  );
}
