import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessed, setAccessed] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const onChangeForm = (e) => {
    console.log(e.target.name);
    if (e.target.name == 'email') {
      setEmail(e.target.value)
    } else {
      setPassword(e.target.value)
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    // Perform login logic here
    console.log('Logging in...');
    console.log(formData)
    axios.post('http://localhost:5000/api/postAuthorization', formData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhbGF2ZW5rYXRha3Jpc2huYW5tYkBnbWFpbC5jb20iLCJpYXQiOjE2ODY2MzYyMjl9.f915c3GZxaDS2Ngbg2JHzRf93NnOUHEtYvuFbpHvSUk'
      }
    })
      .then(response => {
        console.log('response',response.data);
        if (response.data.result == 'Processed') {
          navigate('/home')
          // localStorage.setItem('userAvailable', true);
        } else {
          setAccessed(false)
        }
      })
      .catch(error => {
        console.error(error);
        setAccessed(false)
      });
  };

  return (
    <div className="login-container">
      <div className="login-form">

        <h1>Login</h1>
        {!accessed ? <h6 className='colour-red'>invalid credentials</h6> : null}
        <form>
          <div className="form-group">
            <label>Email:</label>
            <input name='email'
              type="email"
              value={email}
              onChange={onChangeForm}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input name='password'
              type="password"
              value={password}
              onChange={onChangeForm}
            />
          </div>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}



export default Login;