"use client"

import { useEffect, useRef } from "react"
import type { Translator } from "@/lib/types"
import { useTheme } from "next-themes"
import Chart from "chart.js/auto"

interface BarChartProps {
  translators: Translator[]
}

export function BarChart({ translators }: BarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const isDark = theme === "dark"
    const textColor = isDark ? "#e1e1e1" : "#333333"
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
    const backgroundColor = isDark ? "#1e293b" : "#ffffff"

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Custom colors for each translator
    const colors = [
        { bg: "rgba(79, 70, 229, 0.7)", border: "rgba(79, 70, 229, 1)" },
        { bg: "rgba(16, 185, 129, 0.7)", border: "rgba(16, 185, 129, 1)" },
        { bg: "rgba(249, 115, 22, 0.7)", border: "rgba(249, 115, 22, 1)" },
        { bg: "rgba(217, 70, 239, 0.7)", border: "rgba(217, 70, 239, 1)" },
    ]

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Num Tasks", "Quality","Similarity%", "Price (per hour)"],
        datasets: translators.slice(0, 4).map((translator, index) => ({
          label: translator.name,
          data: [
            translator.numTasks,
            translator.quality,
            translator.similarity,
            translator.ratePerHour // Multiply by 10 to make it visible on the chart
          ],
          backgroundColor: colors[index].bg,
          borderColor: colors[index].border,
          borderWidth: 2,
          borderRadius: 6,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 20,
            bottom: 20,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: gridColor,
            },
            ticks: {
              color: textColor,
              padding: 10,
              font: {
                size: 12,
              },
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: textColor,
              padding: 10,
              font: {
                size: 12,
              },
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: textColor,
              padding: 20,
              usePointStyle: true,
              pointStyle: "circle",
              font: {
                size: 12,
              },
            },
          },
          tooltip: {
            backgroundColor: backgroundColor,
            titleColor: textColor,
            bodyColor: textColor,
            borderColor: gridColor,
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            titleFont: {
              size: 14,
              weight: "bold",
            },
            bodyFont: {
              size: 13,
            },
            displayColors: true,
            boxPadding: 6,
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [translators, theme])

  return <canvas ref={chartRef} />
}

export function RadarChart({ translators }: BarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!chartRef.current) return
    console.log(Math.max(...translators.map(o=>o.languages.length)))
    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const isDark = theme === "dark"
    const textColor = isDark ? "#e1e1e1" : "#333333"
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
    const backgroundColor = isDark ? "#1e293b" : "#ffffff"

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Custom colors for each translator
    const colors = [
      { bg: "rgba(79, 70, 229, 0.2)", border: "rgba(79, 70, 229, 1)" },
      { bg: "rgba(16, 185, 129, 0.2)", border: "rgba(16, 185, 129, 1)" },
      { bg: "rgba(249, 115, 22, 0.2)", border: "rgba(249, 115, 22, 1)" },
      { bg: "rgba(217, 70, 239, 0.2)", border: "rgba(217, 70, 239, 1)" },
    ]


    chartInstance.current = new Chart(ctx, {
      type: "radar",
      data: {
        labels: [
          "Quality",
          "Nº Languages",
          "Speed",
          "Sector Experience"
        ],
        datasets: translators.slice(0, 4).map((translator, index) => ({
          label: translator.name,
          data: [
            translator.quality *2,
            translator.languages.length,
            translator.specialties.length,
            translator.sectorExperience
          ],
          rAxisID: "r",
          backgroundColor: colors[index].bg,
          borderColor: colors[index].border,
          borderWidth: 2,
          pointBackgroundColor: colors[index].border,
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: colors[index].border,
          pointRadius: 4,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            suggestedMax: 10,
            ticks: {
              display: false,
              stepSize: 20,
            },
            grid: {
              color: gridColor,
            },
            angleLines: {
              color: gridColor,
            },
            pointLabels: {
              color: textColor,
              font: {
                size: 12,
                weight: "bold",
              },
              padding: 10,
            },
          },

        },
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: textColor,
              padding: 20,
              usePointStyle: true,
              pointStyle: "circle",
              font: {
                size: 12,
              },
            },
          },
          tooltip: {
            backgroundColor: backgroundColor,
            titleColor: textColor,
            bodyColor: textColor,
            borderColor: gridColor,
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [translators, theme])

  return <canvas ref={chartRef} />
}

