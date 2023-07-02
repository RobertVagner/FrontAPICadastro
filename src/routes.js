import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Clientes from './pages/Clientes';
import NovoCliente from './pages/NovoCliente';
import Fazendas from './pages/Fazendas';
import NovoFazenda from './pages/NovaFazenda';
import QRCodes from './pages/QrCodes';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/api/cliente" element={<Clientes />} />
                <Route path="/api/cliente/:clienteID" element={<NovoCliente />} />
                <Route path="/api/fazenda" element={<Fazendas />} />
                <Route path="/api/fazenda/:fazendaID" element={<NovoFazenda />} />
                <Route path="/qrcode" element={<QRCodes />} />
            </Routes>
        </BrowserRouter>
    );
}
