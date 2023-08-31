import React, {useState} from 'react'
import './switchTabs.scss'

interface SwitchTabsProps {
    data: string[];
    onTabChange: (tab: string, index: number) => void; // Update the function signature
}

const SwitchTabs: React.FC<SwitchTabsProps> = ({
    data,
    onTabChange
}) => {
    const [selectedTab, setSelectedTab] = useState(0)
    const [left,setLeft] = useState(0)

    const activeTab = (tab: string, index: number) => {
        setLeft(index * 100)
        setTimeout(() => {
            setSelectedTab(index)
        }, 300);
        onTabChange(tab, index)
    }
  return (
    <div className="switchingTabs">
            <div className="tabItems">
                {data.map((tab, index) => (
                    <span
                        key={index}
                        className={`tabItem ${
                            selectedTab === index ? "active" : ""
                        }`}
                        onClick={() => activeTab(tab, index)}
                    >
                        {tab}
                    </span>
                ))}
                <span className="movingBg" style={{ left }} />
            </div>
        </div>
  )
}

export default SwitchTabs