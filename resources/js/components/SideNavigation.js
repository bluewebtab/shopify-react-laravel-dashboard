import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function SideNavigation() {
    return (
        <>
            <div className="scrollbar-sidebar">
                <div className="app-sidebar__inner">
                    <ul className="vertical-nav-menu">
                        <li className="app-sidebar__heading">Dashboards</li>
                        <li>
                            <Link to="/app">
                            <i className="metismenu-icon pe-7s-rocket" />
                                Dashboard Example 1
                            </Link>
                        </li>
                        <li className="app-sidebar__heading">Manage Links</li>
                        <li>
                            <a href="#">
                            <i className="metismenu-icon pe-7s-rocket" />
                                Create New Link
                            </a>
                            <ul>
                                <li>
                                    <Link to="/app/links/product/new">
                                        <i class="metismenu-icon"></i>
                                        Product
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/app/links/all">
                            <i className="metismenu-icon pe-7s-rocket" />
                                View All Links
                            </Link>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </>
    );
}
