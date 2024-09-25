/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChartConfig } from "~/components/ui/chart";

export const toChartConfig = (data: any, label: string) =>
  data.reduce(
    (
      acc: { [x: string]: { label: any; color: string } },
      obj: { [x: string]: any; id: string | number }
    ) => {
      acc[obj.id] = {
        label: obj[label],
        color: "hsl(var(--chart-1))",
      };
      return acc;
    },
    {} as ChartConfig
  );
