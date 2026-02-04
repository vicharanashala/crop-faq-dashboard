export default function StatsCards({ totalQueries, totalCrops, totalThemes }) {
    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
        if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
        return num.toString()
    }

    return (
        <div className="stats">
            <div className="stat-card">
                <div className="number">{formatNumber(totalQueries)}</div>
                <div className="label">Total Queries</div>
            </div>
            <div className="stat-card">
                <div className="number">{totalCrops}</div>
                <div className="label">Crops Analyzed</div>
            </div>
            <div className="stat-card">
                <div className="number">{totalThemes}</div>
                <div className="label">Query Categories</div>
            </div>
            <div className="stat-card">
                <div className="number">85%</div>
                <div className="label">Solved by Top 15% Questions</div>
            </div>
        </div>
    )
}
