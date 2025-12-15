'use client';

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface FranchiseGrowthChartProps {
  data: { year: number; stores: number }[];
  brandName: string;
}

export function FranchiseGrowthChart({ data, brandName }: FranchiseGrowthChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Number of Franchise Stores</CardTitle>
        <CardDescription>Growth trajectory from 2024 onwards</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            stores: {
              label: 'Stores',
              color: 'hsl(var(--foreground))',
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="year"
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="stores"
                stroke="var(--color-stores)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-stores)', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
