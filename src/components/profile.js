import React, { useState } from 'react'
import Header from './common/header'
import Footer from './common/footer'
import Otherbannner from './common/otherbannner'
import Profilesection from './common/profilesection'
import Orderhistorysection from './common/orderhistorysection'
export default function Profile() {
    const [activeTab, setActiveTab] = useState('component1');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            {/* header */}
            <Header />
            {/* Banner */}
            <Otherbannner heading={"My profile"} bread={"profile"} />
            {/* Main section */}
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'component1' ? 'active' : ''}`}
                        onClick={() => handleTabClick('component1')}
                    >
                        Profile
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'component2' ? 'active' : ''}`}
                        onClick={() => handleTabClick('component2')}
                    >
                        Order History
                    </button>
                </li>
            </ul>
            <div>
                {activeTab === 'component1' && <Profilesection />}
                {activeTab === 'component2' && <Orderhistorysection />}
            </div>
            <Footer />
        </div>
    )
}


