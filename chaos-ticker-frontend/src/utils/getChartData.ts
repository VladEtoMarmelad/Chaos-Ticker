import { Company } from "@/types/Company";

export const getChartData = (labels: string[], prices: number[], company: Company) => {
  return {
    labels,
    datasets: [
      {
        data: prices,
        label: company.name,
        segment: {
          // This function is called for every segment of the line
          borderColor: (ctx: any) => {
            // If the price at the start of the segment is higher than the end, it's a decrease
            if (ctx.p0.parsed.y > ctx.p1.parsed.y) return "red";

            // If the price at the start is lower, it's an increase
            if (ctx.p0.parsed.y < ctx.p1.parsed.y) return "green";

            // Otherwise, no change
            return "gray";
          }
        },
        backgroundColor: "#c8c8c833",
        yAxisID: "y"
      }
    ]
  }
}