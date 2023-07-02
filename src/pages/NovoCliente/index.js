import React, { useEffect, useState } from 'react';
import './styles.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FiCornerDownLeft, FiUserPlus } from 'react-icons/fi';
import api from '../../services/api';

export default function NovoCliente() {
    const [id, setId] = useState(null);
    const [nomeCliente, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [CelularN, setTelefone] = useState('');
    const [e_Mail, setEmail] = useState('');
    const [dataNasc, setDataNascString] = useState('');
    const [password, setSenha] = useState('');
    const [editingMode, setEditingMode] = useState(false); // Variável de estado para controlar o modo de edição

    const { clienteID } = useParams();
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const handleClick = () => {
        navigate('/api/cliente');
    };

    useEffect(() => {
        if (clienteID === '0') {
            return;
        } else {
            loadCliente();
        }
    }, clienteID);

    function convertDataNasc() {
        if (dataNasc) {
            const partesData = dataNasc.split('/');
            if (partesData.length === 3) {
                const dataFormatoSQL = `${partesData[2]}-${partesData[1]}-${partesData[0]}`;
                setDataNascString(dataFormatoSQL);
            }
        }
    }

    async function loadCliente() {
        try {
            const response = await api.get(`/api/cliente/{id}?clienteid=${clienteID}`, authorization);
            setId(response.data.clienteID);
            setNome(response.data.nomeCliente);
            setCpf(response.data.cpf);
            setTelefone(response.data.celularN);
            setEmail(response.data.e_Mail);
            setDataNascString(response.data.dataNacs);
            setSenha(response.data.password);
            setEditingMode(true); // Atualiza o modo de edição para true quando carrega o cliente existente
        } catch (error) {
            alert('Erro ao recuperar o cliente ' + error);
            navigate('/api/cliente');
        }
    }

    async function saveOrUpdate(event) {
        event.preventDefault();

        const data = {
            nomeCliente,
            e_Mail,
            cpf,
            CelularN: CelularN,
            dataNacs: dataNasc,
            password,
        };

        try {
            if (clienteID === '0') {
                await api.post('api/cliente', data, authorization);
            } else {
                data.clienteid = id;
                await api.put(`/api/cliente/{id}?clienteid=${clienteID}`, data, authorization);
            }
        } catch (error) {
            console.error('Erro ao gravar cliente', error);
            alert('Ocorreu um erro ao gravar o cliente. Por favor, tente novamente mais tarde.');
        }
        navigate('/api/cliente');
    }

    return (
        <div className="novo-cliente-container">
            <div className="content">
                <section className="form">
                    <FiUserPlus size="105" color="#17202a" />
                    <h1 className="h1Cliente">
                        {clienteID === '0' ? 'Incluir Novo Cliente' : 'Atualizar Cliente'}
                    </h1>
                    <button className="back-button" onClick={handleClick}>
                        <FiCornerDownLeft size={25} color="#17202a" />
                    </button>
                </section>

                <form onSubmit={saveOrUpdate}>
                    <input
                        placeholder="Nome"
                        value={nomeCliente}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    {!editingMode ? (
                        <input
                            placeholder="CPF"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                    ) : null}
                    <input
                        placeholder="Telefone"
                        value={CelularN}
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                    <input
                        placeholder="Email"
                        value={e_Mail}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Data Nascimento"
                        value={dataNasc}
                        onChange={(e) => setDataNascString(e.target.value)}
                        onBlur={convertDataNasc}
                    />
                    <input
                        placeholder="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <button className="button" type="submit">
                        {clienteID === '0' ? 'Incluir' : 'Atualizar'}
                    </button>
                </form>
            </div>
        </div>
    );
}
        