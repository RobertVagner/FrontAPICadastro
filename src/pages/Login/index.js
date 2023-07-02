import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoImage from '../../assets/logounifield.png';
import './styleslogin.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  async function AtualizaLabel() {
    setEmail(''); // Limpa o valor da input de email
    setPassword(''); // Limpa o valor da input de senha
  }

  async function handleLogin(event) {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await api.post('api/values/loginuser', data);

      localStorage.setItem('email', email);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('expiration', response.data.expiration);

      navigate('/api/cliente');
    } catch (error) {
      alert('O login falhou ' + error);
      AtualizaLabel();
    }
  }

  async function handleCadastro(event) {
    event.preventDefault();

    const data = {
      email,
      password,
      confirmPassword: password,
    };

    try {
      const response = await api.post('api/values/createuser', data);

      localStorage.setItem('email', email);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('expiration', response.data.expiration);

      alert('Usuário cadastrado com sucesso!');
      AtualizaLabel();
    } catch (error) {
      alert('O cadastro falhou ' + error);
      AtualizaLabel();
    }
  }

  return (
    <MDBContainer fluid className="login-container background-image">
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <form>
            <MDBCard className='text-white my-5 mx-auto card-custom' style={{ borderRadius: '0.5rem', maxWidth: '400px' }}>
              <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                <img src={logoImage} alt="Login" id="img1" style={{ width: '100px' }} /> <br /> <br />
                <h2 className="fw-bold mb-3 text-uppercase">Unifield Tech</h2> <br />

                <MDBInput
                  wrapperClass='mb-4 mx-5 w-100'
                  labelClass='text-white'
                  id='email'
                  type='email'
                  size='lg'
                  labelSize='lg'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email'
                  style={{ borderColor: '#000000', borderRadius: '0.5rem' }}
                />
                <MDBInput
                  wrapperClass='mb-4 mx-5 w-100'
                  labelClass='text-white'
                  id='password'
                  type='password'
                  size='lg'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Senha'
                  style={{ borderColor: '#000000', borderRadius: '0.5rem' }}
                />
                <div className='dlogin'>
                  <MDBBtn outline className='mx-1 px-1 btn-custom' style={{ color: 'black' }} color='black' size='lg' onClick={handleLogin}>
                    Login
                  </MDBBtn>
                  <MDBBtn outline className='mx-2 px-8 btn-custom' style={{ color: 'black' }} color='black' size='lg' onClick={handleCadastro}>
                    Cadastro
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
