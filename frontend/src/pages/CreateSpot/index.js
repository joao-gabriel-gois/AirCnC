import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';
import './style.css';

export default function CreateSpot({ history }) {
  const [thumbnail, setThumnail] = useState(null);
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail])
  
  async function handleSubmit(event) {
    event.preventDefault();
    // not Json, dealing with Multipart
    const formData = new FormData();
    const user_id = localStorage.getItem('user');

    formData.append('thumbnail', thumbnail);
    formData.append('company', company);
    formData.append('techs', techs);
    formData.append('price', price);

    await api.post('/spots', formData, {
      headers: { user_id }
    })
    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ background: `url(${preview}) center`}}
        className={ thumbnail ? 'hasThumbnail' : '' }
      >
        <input type="file" onChange={event => setThumnail(event.target.files[0])}/>
        <img src={camera} alt="Upload a pic"></img>
      </label>
      <label htmlFor="company">Empresa *</label>
      <input 
        ìd="company"
        placeholder="Insira o nome de sua empresa"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />
      <label htmlFor="techs">Tecnologias * <span>(separadas por vírgula)</span></label>
      <input 
        ìd="techs"
        placeholder="Quais tecnologias usam?"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />
      <label htmlFor="price">Valor da diária <span>(em branco caso gratuito)</span></label>
      <input 
        ìd="price"
        placeholder="Quanto deseja cobrar?"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />
      <button type="submit" className="btn">Cadastrar</button>
    </form>
  );
}