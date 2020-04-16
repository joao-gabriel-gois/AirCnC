import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';

import calendar from '../../assets/calendar.svg';

import api from '../../services/api';
import './style.css';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  const user_id = localStorage.getItem('user');
  const socket = useMemo(() => socketio('http://localhost:3333', {
    query: { user_id },
  }), [user_id]);

  useEffect(() => {
    socket.on('booking_request', data => {
      setRequests([...requests, data])
      console.log(data);
    })
  }, [requests, socket]); //any time a new request occurs or a user start a new connection, this logic should be reapplied

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

  async function handleAccept(id) {
    await api.post(`/bookings/${id}/approvals`);
    setRequests(requests.filter(request => request._id !== id));
  }

  async function handleReject(id) {
    await api.post(`/bookings/${id}/rejections`);
    setRequests(requests.filter(request => request._id !== id));
  }

  return (<>
    <ul className="notifications">
      {requests.map(request => (
        <li key={request._id}>
          <p>
          <img src={calendar} className="schedule-logo"/>
            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> no dia <strong>{request.date}</strong>
          </p>
          <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
          <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>
        </li>
      ))}
    </ul>

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