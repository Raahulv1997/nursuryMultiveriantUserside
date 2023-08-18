import React, { useState } from "react";
import Header from "./common/header";
import Footer from "./common/footer";
import Otherbannner from "./common/otherbannner";
import Profilesection from "./common/profilesection";
import Orderhistorysection from "./common/orderhistorysection";
import Complainthistorysection from "./common/cmplainthistorysection";
import { ToastContainer } from "react-toastify";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("component2");
  const [getname, setGetName] = useState("");
  const [apicall, setApicall] = useState(false);
  const [loading, setLoading] = useState(true);

  /* Function to open diffrent tabs */
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {/* header */}
      <Header
        getname={getname}
        setGetName={setGetName}
        cartcall={apicall}
        setcartcall={setApicall}
        setproductcall={setApicall}
        loading={loading}
        setLoading={setLoading}
      />
      <ToastContainer />
      {/* Banner */}
      <Otherbannner heading={"My profile"} bread={"profile"} />
      {/* Main section */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "component1" ? "active" : ""}`}
            onClick={() => handleTabClick("component1")}
          >
            Profile
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "component2" ? "active" : ""}`}
            onClick={() => handleTabClick("component2")}
          >
            Order History
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "component3" ? "active" : ""}`}
            onClick={() => handleTabClick("component3")}
          >
            Ticket History
          </button>
        </li>
      </ul>
      <div>
        {activeTab === "component1" && (
          <Profilesection setGetName={setGetName} setLoading={setLoading} />
        )}
        {activeTab === "component2" && (
          <Orderhistorysection setLoading={setLoading} />
        )}
        {activeTab === "component3" && (
          <Complainthistorysection setLoading={setLoading} />
        )}
      </div>
      <Footer />
    </div>
  );
}
