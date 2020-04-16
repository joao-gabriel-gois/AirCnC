import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  
  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post('/sessions', { email });
    const { _id } = response.data;
    localStorage.setItem('user', _id);
    history.push('/dashboard');
  }

  return (<>
    <p>Ofereça <strong>spots</strong> para os devs e encontre <strong>talentos</strong> para sua empresa</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input 
            id="email"
            name="email"
            type="email"
            placeholder="Insira seu email para se cadastrar"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <button className="btn">Entrar</button>
        </form>
  </>);
}
