/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

const beersPerUserChartConfig = {
  total_amount: {
    label: "Total Beers",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export const ChartPerPersonBar = ({ data }: { data: any }) => {
  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Beers per Person</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 items-center">
        <ChartContainer
          config={beersPerUserChartConfig}
          className="h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="total_amount" />
            <YAxis
              dataKey="username"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar
              dataKey="total_amount"
              fill="var(--color-total_amount)"
              radius={5}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
