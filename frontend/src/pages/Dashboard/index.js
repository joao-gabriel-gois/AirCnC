import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './style.css';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  
  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');
      const response = await api.get('/dashboard', {
        headers: { user_id }
      });
      setSpots(response.data);
    }
    loadSpots();
  }, []);//Every time any array(argv2) element change occurs, lauch the function(argv1)
  return (<>
    <ul className="spotList">
      {spots.map(spot => (
        <li key={spot._id}>
          <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}/>
          <strong>{spot.company}</strong>
          <span>{spot.price ? `R$${spot.price}/dia` : 'Gratuito'}</span>
        </li>
      ))}
    </ul>

    <Link to="/create-spot">
      <button className="btn">Cadastrar novo spot </button>
    </Link>
  </>);
}