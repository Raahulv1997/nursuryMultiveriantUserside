import React from 'react';
import { Link } from 'react-router-dom';

export default function Pagination({ nPages, currentPage, setCurrentPage, total, count }) {
    // Function to get dynamic page number of the pagination:
    const pageNumbers = [];
    for (let i = 0; i < nPages; i++) {
        pageNumbers.push(i);
    }

    // Function to go to next page with pagination:
    const nextPage = () => {
        if (currentPage < nPages - 1) setCurrentPage(currentPage + 1);
    };

    // Function to go to previous page with pagination:
    const prevPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    return (
        <div>
            {pageNumbers.length > 1 ? (
                <div className="col-lg-12">
                    <div className="bottom-paginate">
                        <p className="page-info">Showing {count} of {total} Results</p>
                        <ul className="pagination">
                            {/* To change to the previous page: */}
                            <li className="page-item">
                                <Link
                                    className={currentPage === 0 ? "" :"page-link"}
                                    onClick={prevPage}
                                    disabled={currentPage === 0}
                                >
                                    <i className="fas fa-long-arrow-alt-left"></i>
                                </Link>
                            </li>
                            {/* Number of paginations: */}
                            {pageNumbers.map((pgNumber) => (
                                <li className="page-item px-1" key={pgNumber}>
                                    <Link
                                        onClick={() => setCurrentPage(pgNumber)}
                                        className={`page-link ${currentPage === pgNumber ? "active " : ""}`}
                                    >
                                        {pgNumber + 1}
                                    </Link>
                                </li>
                            ))}
                            <li className="page-item">
                                <Link
                                    className={currentPage === nPages - 1 ? "" :"page-link"}
                                    onClick={nextPage}
                                    disabled={currentPage === nPages - 1}
                                >
                                    <i className="fas fa-long-arrow-alt-right"></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
