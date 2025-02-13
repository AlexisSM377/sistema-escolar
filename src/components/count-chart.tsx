"use client"
import { RadialBar, RadialBarChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { user: "hombres", visitors: 275, fill: "#FAE27C" },
    { user: "mujeres", visitors: 250, fill: "#C3EBFA" },

]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    hombres: {
        label: "Hombres",
        color: "hsl(var(--chart-1))",
    },
    mujeres: {
        label: "Mujeres",
        color: "hsl(var(--chart-2))",
    }
} satisfies ChartConfig

export function CountChart() {
    return (
        <Card className="flex flex-col mt-2">
            <CardHeader className="items-center pb-0">
                <CardTitle>Estudiantes</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel nameKey="user" />}
                        />
                        <RadialBar dataKey="visitors" background />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex justify-center gap-16 items-center">
                <div className="flex flex-col gap-1 items-center">
                    <div className="w-5 h-5 bg-blue-300 rounded-full" />
                    <h1 className="text-xl">1,234</h1>
                    <h2 className="text-xs text-gray-300">Hombres (55%)</h2>
                </div>
                <div className="flex flex-col gap-1 items-center">
                    <div className="w-5 h-5 bg-yellow-300 rounded-full" />
                    <h1 className="text-xl">1,234</h1>
                    <h2 className="text-xs text-gray-300">Mujeres (55%)</h2>
                </div>
            </CardFooter>
        </Card>
    )
}
