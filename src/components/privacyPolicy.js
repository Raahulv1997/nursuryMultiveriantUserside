import React, { useState } from 'react'
import Footer from './common/footer'
import { Link } from 'react-router-dom';
import Otherbannner from "./common/otherbannner";
import Header from "./common/header";
function PrivacyPolicy() {
    const [activeTab, setActiveTab] = useState('');

    /*Function to scrool by click on the content */
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        const element = document.getElementById(tabId);
        element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            {/* Header */}
            <Header />
            {/* Banner */}
            <Otherbannner heading={"Checkout"} bread={"checkout"} />

            {/* Main Content */}
            <section className="inner-section privacy-part">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <nav className="nav nav-pills flex-column" id="scrollspy">
                                <Link className={`nav-link ${activeTab === 'item-1' ? 'active' : ''}`}
                                    to=""
                                    onClick={() => handleTabClick('item-1')}>How to contact with Customer Service?</Link>
                                <Link className={`nav-link ${activeTab === 'item-2' ? 'active' : ''}`}
                                    to=""
                                    onClick={() => handleTabClick('item-2')}>App installation failed, how to update system information?</Link>
                                <Link className={`nav-link ${activeTab === 'item-3' ? 'active' : ''}`}
                                    to=""
                                    onClick={() => handleTabClick('item-3')}>Website reponse taking time, how to improve?</Link>
                                <Link className={`nav-link ${activeTab === 'item-4' ? 'active' : ''}`}
                                    to=""
                                    onClick={() => handleTabClick('item-4')}>How do I create a account?</Link>
                                <Link className={`nav-link ${activeTab === 'item-5' ? 'active' : ''}`}
                                    to=""
                                    onClick={() => handleTabClick('item-5')}>I cannot find an answer to my question!</Link>
                            </nav>
                        </div>
                        <div className="col-lg-9">
                            <div data-bs-spy="scroll" data-bs-target="#scrollspy" data-bs-offset="0" tabindex="0">
                                <div className="scrollspy-content" id="item-1">
                                    <h3>How to contact with Customer Service?</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam officia expedita beatae tempore facilis ex maiores, assumenda nostrum minus. Autem nemo corrupti consequuntur incidunt quibusdam dicta. Quasi atque deserunt totam hic voluptatibus veritatis. Ducimus dicta esse praesentium tenetur obcaecati reprehenderit, recusandae ab explicabo maxime deserunt mollitia. Aliquid distinctio tenetur dolore!</p>
                                </div>
                                <div className="scrollspy-content" id="item-2">
                                    <h3>App installation failed, how to update system information?</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam officia expedita beatae tempore facilis ex maiores, assumenda nostrum minus. Autem nemo corrupti consequuntur incidunt quibusdam dicta. Quasi atque deserunt totam hic voluptatibus veritatis. Ducimus dicta esse praesentium tenetur obcaecati reprehenderit, recusandae ab explicabo maxime deserunt mollitia. Aliquid distinctio tenetur dolore!</p>
                                </div>
                                <div className="scrollspy-content" id="item-3">
                                    <h3>Website reponse taking time, how to improve?</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam officia expedita beatae tempore facilis ex maiores, assumenda nostrum minus. Autem nemo corrupti consequuntur incidunt quibusdam dicta. Quasi atque deserunt totam hic voluptatibus veritatis. Ducimus dicta esse praesentium tenetur obcaecati reprehenderit, recusandae ab explicabo maxime deserunt mollitia. Aliquid distinctio tenetur dolore!</p>
                                </div>
                                <div className="scrollspy-content" id="item-4">
                                    <h3>How do I create a account?</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam officia expedita beatae tempore facilis ex maiores, assumenda nostrum minus. Autem nemo corrupti consequuntur incidunt quibusdam dicta. Quasi atque deserunt totam hic voluptatibus veritatis. Ducimus dicta esse praesentium tenetur obcaecati reprehenderit, recusandae ab explicabo maxime deserunt mollitia. Aliquid distinctio tenetur dolore!</p>
                                </div>
                                <div className="scrollspy-content" id="item-5">
                                    <h3>I cannot find an answer to my question!</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam officia expedita beatae tempore facilis ex maiores, assumenda nostrum minus. Autem nemo corrupti consequuntur incidunt quibusdam dicta. Quasi atque deserunt totam hic voluptatibus veritatis. Ducimus dicta esse praesentium tenetur obcaecati reprehenderit, recusandae ab explicabo maxime deserunt mollitia. Aliquid distinctio tenetur dolore!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <Footer />
        </div>
    )
}

export default PrivacyPolicy
