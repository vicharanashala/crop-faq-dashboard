import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export default function ParetoChart({ crops }) {
    // Select top 10 crops for this visualization
    const topCrops = crops.slice(0, 10)

    // For each crop, calculate queries from Top 5 questions vs Rest
    const labels = topCrops.map(c => c.name)

    const topQuestionsData = []
    const otherQuestionsData = []
    const percentages = []

    topCrops.forEach(crop => {
        // Top 5 questions count
        const top5Count = crop.faqs.slice(0, 5).reduce((sum, faq) => sum + faq.count, 0)
        // Total queries for this crop
        const total = crop.queries

        topQuestionsData.push(top5Count)
        otherQuestionsData.push(total - top5Count)
        percentages.push((top5Count / total * 100).toFixed(1))
    })

    const data = {
        labels,
        datasets: [
            {
                label: 'Top 5 Recurring Questions',
                data: topQuestionsData,
                backgroundColor: '#10b981', // Emerald 500
                stack: 'Stack 0',
            },
            {
                label: 'All Other Questions',
                data: otherQuestionsData,
                backgroundColor: '#374151', // Gray 700
                stack: 'Stack 0',
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#e5e7eb', // Light gray text
                    font: { size: 12 }
                }
            },
            title: {
                display: true,
                text: 'The "Vital Few": Top 5 Questions Dominate Query Volume',
                color: '#f3f4f6', // White text
                font: { size: 16, weight: 'bold' }
            },
            tooltip: {
                callbacks: {
                    afterAbstract: (context) => {
                        // Custom tooltips could act here, but default is fine
                    },
                    label: (context) => {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(context.parsed.y);
                        }
                        return label;
                    },
                    footer: (tooltipItems) => {
                        const index = tooltipItems[0].dataIndex
                        return `Top 5 Questions cover ${percentages[index]}% of all queries`
                    }
                },
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                titleColor: '#fff',
                bodyColor: '#e5e7eb',
                footerColor: '#10b981',
                padding: 12,
                cornerRadius: 8,
            }
        },
        scales: {
            x: {
                ticks: { color: '#9ca3af' },
                grid: { color: '#374151' }
            },
            y: {
                ticks: { color: '#9ca3af' },
                grid: { color: '#374151' },
                title: {
                    display: true,
                    text: 'Number of Queries',
                    color: '#9ca3af'
                }
            }
        }
    }

    return (
        <div className="section">
            <h2 className="section-title">📉 The "Vital Few" Analysis</h2>
            <p className="section-description">
                For most major crops, a very small number of unique questions (Top 5) account for the vast majority of farmer queries.
                Addressing these few key issues solves 60-80% of all problems.
            </p>
            <div className="chart-container pareto-container">
                <Bar data={data} options={options} />
            </div>
        </div>
    )
}
