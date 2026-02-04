import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import StatsCards from './components/StatsCards'
import TopCrops from './components/TopCrops'
import ZipfChart from './components/ZipfChart'
import DistributionChart from './components/DistributionChart'
import CropExplorer from './components/CropExplorer'
import cropDataJson from './data/cropData.json'

function App() {
  const [cropData, setCropData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load crop data
    setCropData(cropDataJson)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading crop data...</p>
      </div>
    )
  }

  const totalQueries = cropData.reduce((sum, crop) => sum + crop.queries, 0)
  const totalCrops = cropData.length

  return (
    <div className="app">
      <Header />

      <StatsCards
        totalQueries={totalQueries}
        totalCrops={totalCrops}
        totalThemes={60}
      />

      <div className="content">
        {/* Story Section: Zipf's Law */}
        <ZipfChart crops={cropData} />

        <TopCrops crops={cropData.slice(0, 10)} />

        <DistributionChart crops={cropData} />

        <CropExplorer crops={cropData} />
      </div>
    </div>
  )
}

export default App
