import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import './stylesfazenda.css';
import api from '../../services/api';

import logoUnifield from '../../assets/logounifield.png'
import { FiEdit, FiUserX } from 'react-icons/fi'

export default function Fazendas() {
    const [searchInput, setSearchInput] = useState('');
    const [filtro, setFiltro] = useState([]);
    const [fazendas, setFazendas] = useState([]);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const searchFazendas = (searchValue) => {
        setSearchInput(searchValue);
        if (searchInput !== '') {
            const dadosFiltrados = fazendas.filter((item) => {
                return Object.values(item).join('').toLowerCase()
                    .includes(searchInput.toLowerCase())
            });
            setFiltro(dadosFiltrados);
        } else {
            setFiltro(fazendas);
        }
    }

    useEffect(() => {
        api.get('api/fazenda', authorization).then(
            response => {
                setFazendas(response.data);
            }, token)
    }, [])

    async function logout() {
        try {
            localStorage.clear();
            localStorage.setItem('token', '');
            authorization.headers = '';
            navigate('/');
        } catch (err) {
            alert('Não foi possível fazer o logout' + err);
        }
    }

    async function editFazenda(fazendaID) {
        try {
            navigate(`/api/fazenda/${fazendaID}`);
        } catch (error) {
            alert('Não foi possível editar a fazenda')
        }
    }

    async function deleteFazenda(fazendaID) {
        try {
            if (window.confirm('Deseja deletar a fazenda de id = ' + fazendaID + ' ?')) {
                await api.delete(`/api/fazenda/{id}?fazendaid=${fazendaID}`, authorization);
                setFazendas(fazendas.filter(fazenda => fazenda.fazendaID !== fazendaID));
            }
        } catch (error) {
            alert('Não foi possível excluir a fazenda')
        }
    }

    return (
        <body>
            <Navbar expand="lg" className="custom-navbar">
                <img src={logoUnifield} alt="Cadastro" className="brand-logo" />
                <span className='m-span'>
                    <span className='cor1'>Bem-</span>
                    <span className='cor2'>Vindo, </span>
                    <span className='cor3'><strong>{email}</strong></span>
                    <span className='cor4'>!</span>
                </span>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-navbar-toggler" />
                <Navbar.Collapse id="basic-navbar-nav" className='ml-configg'>
                    <Nav className="ml-auto">
                        <Nav.Link onClick={logout}>Logout</Nav.Link>

                        <Nav.Link as={Link} to="/api/cliente">Cliente</Nav.Link>

                        <Nav.Link as={Link} to="/api/fazenda/0">Nova Fazenda</Nav.Link>
                    </Nav>
                    <Form inline className="ml-auto d-flex justify-content-end">
                        <FormControl
                            type="text"
                            placeholder="Pesquisar por nome..."
                            className="search-input"
                            onChange={(e) => searchFazendas(e.target.value)}
                        />
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <div className="fazenda-container">
                <h1 className='h1fazenda'>Fazendas</h1>
                {searchInput.length > 1 ? (
                    <ul>
                        {filtro.map(fazenda => (
                            <li key={fazenda.fazendaID}>
                                <b>Nome Fazenda:</b>{fazenda.nomeFazenda}<br /><br />
                                <b>Hectar:</b>{fazenda.hectar}<br /><br />
                                <b>Cultivar:</b>{fazenda.cultivar}<br /><br />
                                <b>Rua:</b>{fazenda.rua}<br /><br />
                                <b>Número:</b>{fazenda.num}<br /><br />
                                <b>Cidade:</b>{fazenda.cidade}<br /><br />
                                <b>Estado:</b>{fazenda.estado}<br /><br />
                                <b>Latitude:</b>{fazenda.latitude}<br /><br />
                                <b>Longitude:</b>{fazenda.longitude}<br /><br />
                                <b>Tipo Plantio:</b>{fazenda.tipoPlantio ? 'Sim' : 'Não'}<br /><br />
                                <b>Área Mecanizada:</b>{fazenda.areaMecanizada ? 'Sim' : 'Não'}<br /><br />
                                <b>Cliente ID:</b>{fazenda.clienteID}<br /><br />
                                <button onClick={() => editFazenda(fazenda.fazendaID)} type="button">
                                    <FiEdit size="25" color="#17202a" />
                                </button>
                                <button type="button" onClick={() => deleteFazenda(fazenda.fazendaID)}>
                                    <FiUserX size="25" color="#17202a" />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ul>
                        {fazendas.map(fazenda => (
                            <li key={fazenda.fazendaID}>
                                <b>Nome Fazenda:</b>{fazenda.nomeFazenda}<br /><br />
                                <b>Hectar:</b>{fazenda.hectar}<br /><br />
                                <b>Cultivar:</b>{fazenda.cultivar}<br /><br />
                                <b>Rua:</b>{fazenda.rua}<br /><br />
                                <b>Número:</b>{fazenda.num}<br /><br />
                                <b>Cidade:</b>{fazenda.cidade}<br /><br />
                                <b>Estado:</b>{fazenda.estado}<br /><br />
                                <b>Latitude:</b>{fazenda.latitude}<br /><br />
                                <b>Longitude:</b>{fazenda.longitude}<br /><br />
                                <b>Tipo Plantio:</b>{fazenda.tipoPlantio}<br /><br />
                                <b>Área Mecanizada:</b>{fazenda.areaMecanizada ? 'Sim' : 'Não'}<br /><br />
                                <b>Cliente ID:</b>{fazenda.clienteID}<br /><br />
                                <button onClick={() => editFazenda(fazenda.fazendaID)} type="button">
                                    <FiEdit size="25" color="#17202a" />
                                </button>

                                <button type="button" onClick={() => deleteFazenda(fazenda.fazendaID)}>
                                    <FiUserX size="25" color="#17202a" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </body>
    )
}
