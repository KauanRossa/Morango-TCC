document.addEventListener('DOMContentLoaded', function() {
  const formularioLogin = document.querySelector("form");
  const inputEmail = document.querySelector("#email");
  const inputSenha = document.querySelector("#senha");

  function limparCampos() {
    inputEmail.value = '';
    inputSenha.value = '';
  }

  async function realizarLogin() {
    const dadosLogin = {
      email: inputEmail.value,
      senha: inputSenha.value
    };

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosLogin)
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas. Verifique seu email e senha.');
      }

      const data = await response.json();

      localStorage.setItem('token', data.token);
      console.log('Login realizado:', data);

      const tipo = await obterTipoUsuario();
      
      if (tipo === 'ADMINISTRADOR') {
        window.location.href = './index_admin.html';
      } else if (tipo === 'CLIENTE') {
        window.location.href = './index.html';
      }

    } catch (error) {
      console.error('Erro ao realizar login:', error);
      alert(error.message);
      limparCampos();
    }
  }

  async function obterTipoUsuario() {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:8080/api/usuarios/buscar-por-token', {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao obter as informações do usuário');
      }

      const usuarioLogado = await response.json();
      return usuarioLogado.tipo;

    } catch (error) {
      console.error('Erro ao obter as informações do usuário:', error);
      throw error;
    }
  }

  formularioLogin.addEventListener('submit', function(event){
    event.preventDefault();
    realizarLogin();
  });
});
