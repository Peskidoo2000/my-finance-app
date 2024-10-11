import React from "react";
import {Link} from "react-router-dom";
import "./index.css";

import DashboardIcon from '@mui/icons-material/Dashboard';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import MoneyIcon from '@mui/icons-material/Money';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import Stack from '@mui/material/Stack';

export const Aside = (location) =>{


    const isActive = (path) =>{
        return location.location.pathname === path ? "active-link" : "nonactive-link";
    }
    return(
        <aside className="parent-aside-links">
    <Stack direction="row" spacing={0.3} className="parent-aside">
    <DashboardIcon className="iconics"/> 
    <Link to="/dashboard" className={`aside-links ${isActive('/dashboard')}`}> Dashboard</Link>
    </Stack>
    <Stack direction="row" spacing={0.3} className="parent-aside">
    <CandlestickChartIcon className="iconics"/> 
    <Link to="/income" className={`aside-links ${isActive('/income')}`}> Income Tracker</Link>
    </Stack>
    <Stack direction="row" spacing={0.3} className="parent-aside">
    <StackedLineChartIcon className="iconics"/>
    <Link to="/expenses" className={`aside-links ${isActive('/expenses')}`}> Expenses Tracker</Link>
    </Stack>
    <Stack direction="row" spacing={0.3} className="parent-aside">
    <MoneyIcon className="iconics"/>
    <Link to="/budgetsavings" className={`aside-links ${isActive('/budgetsavings')}`}> Savings & Budget</Link>
    </Stack>
    <Stack direction="row" spacing={0.3} className="parent-aside">
    <ArrowCircleDownIcon className="iconics"/> 
    <Link to="/financereport"className={`aside-links ${isActive('/financereport')}`}> Financial Report </Link>
    </Stack>       
       </aside>
    )
}
 export const Aside2 = () =>{
    return(
        <aside>
        <Link to="/getStarted" className="aside2-links"> Get Started</Link>
       </aside>
    )
}

export const Aside3 = () =>{
    return(
        <aside>
        <Link to="/dashboard" className="aside2-links"> Get Started</Link>
       </aside>
    )
}