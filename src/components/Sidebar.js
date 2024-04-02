import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopulation } from '../redux/populationSlice';
import Card from './Card';
import Table from '@mui/joy/Table';
import DamAccordion from './DamAccordion'; // Adjust the import path as necessary;
import CreativeDamAccordion from './CreativeDamAccordion'
import LoopIcon from '@mui/icons-material/Loop';

const Sidebar = ({ isOpen, damData }) => {
    const dispatch = useDispatch();
    const totalPopulation = useSelector((state) => state.population.totalPopulation);
    const populationStatus = useSelector((state) => state.population.status);
    const error = useSelector((state) => state.population.error);

    useEffect(() => {
        if (populationStatus === 'idle') {
        dispatch(fetchPopulation());
        }
    }, [dispatch, populationStatus]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="sidebar" style={{width: '500px'}}>
            <h1 className="title">RSA Stats</h1>
            <h2 className="subtitle">Population</h2>

            <div className="cards">
                <Card title="Population Total" content={populationStatus === 'succeeded' ? `Total Population: ${totalPopulation}` : <LoopIcon className='loader' style={{transform: 'rotate(-360deg)', transition: 'transform 1s infinite linear' }}/>} />
            </div>

            <h2 className="subtitle">Dam Data</h2>

            <div className="cards">
                <CreativeDamAccordion dams={damData || []} />
            </div>
        </div>
    );
};

export default Sidebar;