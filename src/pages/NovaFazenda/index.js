import React, { useEffect, useState, useRef } from 'react';
import './styles.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FiCornerDownLeft, FiUserPlus } from 'react-icons/fi';
import api from '../../services/api';

export default function NovoFazenda() {
    const [id, setId] = useState(null);
    const [nomeFazenda, setNome] = useState('');
    const [hectar, setHectar] = useState('');
    const [cultivar, setCultivar] = useState('');
    const [rua, setRua] = useState('');
    const [num, setNum] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [tipoPlantio, setPlatio] = useState('');
    const [areaMecanizada, setMecanizada] = useState(false);
    const [cpfCliente, setCPFCliente] = useState('');
    const [clienteID, setClienteID] = useState(0);
    const cpfRef = useRef('');
    const { fazendaID } = useParams();
    const navigate = useNavigate();


    const token = localStorage.getItem('token');
    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        if (fazendaID === '0') {
            return;
        } else {
            loadFazenda();
        }
    }, [fazendaID]);

    const handleClick = () => {
        navigate('/api/fazenda');
    };

    const buscarIDCliente = async (cpf) => {
        if (cpf !== '' && cpf !== cpfRef.current) {
            try {
                const response = await api.get(`/api/fazenda/buscar/cliente/cpf/${cpf}`, authorization);
                if (response.data) {
                    setClienteID(response.data);
                } else {
                    setClienteID('Cliente não encontrado');
                }
            } catch (error) {
                console.error('Erro ao buscar o ID do cliente:', error);
                setClienteID('Erro ao buscar o ID do cliente');
            }
        }
        cpfRef.current = cpf;
    };

    async function loadFazenda() {
        try {
            const response = await api.get(`/api/fazenda/{id}?fazendaid=${fazendaID}`, authorization);
            setId(response.data.fazendaID);
            setNome(response.data.nomeFazenda);
            setHectar(response.data.hectar);
            setCultivar(response.data.cultivar);
            setRua(response.data.rua);
            setNum(response.data.num);
            setCidade(response.data.cidade);
            setEstado(response.data.estado);
            setLatitude(response.data.latitude);
            setLongitude(response.data.longitude);
            setPlatio(response.data.tipoPlantio);
            setMecanizada(response.data.areaMecanizada);
            setClienteID(response.data.clienteID);
        } catch (error) {
            alert('Erro ao recuperar a fazenda ' + error);
            navigate('/api/fazenda');
        }
    }

    const saveOrUpdate = async (e) => {
        e.preventDefault(); // Evita o comportamento padrão de recarregar a página ao enviar o formulário

        const payload = {
            nomeFazenda,
            hectar,
            cultivar,
            rua,
            num,
            cidade,
            estado,
            latitude,
            longitude,
            tipoPlantio,
            areaMecanizada,
            clienteID,
        };

        try {
            if (fazendaID === '0') {
                await api.post('api/fazenda', payload, authorization);
            } else {
                payload.fazendaid = id;
                await api.put(`/api/fazenda/${id}?fazendaid=${fazendaID}`, payload, authorization);
            }

            navigate('/api/fazenda');
        } catch (error) {
            alert('Erro ao gravar a fazenda ' + error);
        }
    };

    return (
        <div className="novo-cliente-container">
            <div className="content">
                <section className="form">
                    <FiUserPlus size="105" color="#17202a" />
                    <h1 className="colorh1">{fazendaID === '0' ? 'Incluir Nova Fazenda' : 'Atualizar Fazenda'}</h1>
                    <button className="back-button" onClick={handleClick}>
                        <FiCornerDownLeft size={25} color="#17202a" />
                    </button>
                </section>

                <form onSubmit={saveOrUpdate}>
                    <input placeholder="Nome Fazenda" value={nomeFazenda} onChange={(e) => setNome(e.target.value)} />
                    <input placeholder="Heactar" value={hectar} onChange={(e) => setHectar(e.target.value)} />
                    <input placeholder="Cultivar" value={cultivar} onChange={(e) => setCultivar(e.target.value)} />
                    <input placeholder="Rua" value={rua} onChange={(e) => setRua(e.target.value)} />
                    <input placeholder="Número" value={num} onChange={(e) => setNum(e.target.value)} />
                    <input placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                    <input placeholder="Estado" value={estado} onChange={(e) => setEstado(e.target.value)} />
                    <input placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                    <input placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                    <input placeholder="Tipo Plantio" value={tipoPlantio} onChange={(e) => setPlatio(e.target.value)} />
                    <div className="check-label">
                        <label htmlFor="areaMecanizada">Área Mecanizada:</label>
                        <input
                            type="checkbox"
                            id="areaMecanizada"
                            checked={areaMecanizada}
                            onChange={(e) => setMecanizada(e.target.checked)}
                        />
                    </div>
                    {fazendaID === '0' && (
                        <input
                            placeholder="CPF do Cliente"
                            value={cpfCliente}
                            onChange={(e) => setCPFCliente(e.target.value)}
                            onBlur={() => buscarIDCliente(cpfCliente)}
                        />
                    )}

                    <button className="button" type="submit">
                        {fazendaID === '0' ? 'Incluir' : 'Atualizar'}
                    </button>
                </form>
            </div>
        </div>
    );
}
