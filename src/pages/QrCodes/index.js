import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
import './stylesqrcode.css';

export default function QrCodes() {

    const [showQRCode, setShowQRCode] = useState(false);
    const [qrCodeData, setQRCodeData] = useState('');

    const navigate = useNavigate();

    const redirectToClienteRoute = () => {
        navigate('/api/cliente/');
    };

    const handleLinkClick = async () => {
        // Exibir o formulário
        const resposta = window.prompt('Você deseja gerar QRCode? (sim / não)');

        if (resposta && resposta.toLowerCase() === 'sim') {
            await generateQRCode();
        } else if (resposta && (resposta.toLowerCase() === 'não' || resposta.toLowerCase() === 'nao')) {
            navigate('/api/cliente/');
        } else {
            alert('Digite algo válido!');
        }
    };

    async function generateQRCode() {
        const phoneNumber = '+14155238886';

        const formattedPhoneNumber = phoneNumber.replace(/[^\d]/g, '');

        const url = `https://api.whatsapp.com/send?phone=${formattedPhoneNumber}`;

        try {
            const qrCodeData = await QRCode.toDataURL(url);
            setQRCodeData(qrCodeData);
            setShowQRCode(true);
        } catch (error) {
            console.error('Erro ao gerar o código QR:', error);
        }
    }

    return (
        <body>
            <div>
                <h1 className='h1login'>QrCode</h1>
                <h4 className='h4login'>Após scannear o QRCode digite o comando "join outside-useful" no WhatsApp para ser cadastrado!</h4>

                {!showQRCode && (
                    <button className="centeredbutton" type="button" onClick={handleLinkClick}>
                        Gerar QRCode
                    </button>
                )}
                {showQRCode && (
                    <div className="centeredcontainer">
                        <img src={qrCodeData} alt="QR Code" className="qrcode-image" />
                    </div>
                )}

                {showQRCode && (
                    <div className="btn">
                        <button className="backbutton" type="button" onClick={redirectToClienteRoute}>
                            Voltar
                        </button>
                    </div>
                )}
            </div>
        </body>
    )
}
