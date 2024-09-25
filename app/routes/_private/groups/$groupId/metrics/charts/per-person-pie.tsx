/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cell, Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { randomColor } from "~/utils/random-color";
import { toChartConfig } from "~/utils/to-chart-config";

export const ChartPerPersonPie = ({
  data,
  totalBeers,
}: {
  data: any;
  totalBeers: number;
}) => {
  const pieChartConfig = toChartConfig(data, "username");

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Beers per Person</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 items-center">
        <ChartContainer config={pieChartConfig} className="h-[250px] w-full">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="total_amount"
              nameKey="username"
              innerRadius={60}
              strokeWidth={5}
            >
              {data.map((_: any, index: number) => (
                <Cell key={index} fill={randomColor()} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold "
                        >
                          {totalBeers}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Beers
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
