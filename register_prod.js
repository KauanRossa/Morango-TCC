document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastroProduto');
  
    function limparCampos() {
      document.getElementById('nome').value = '';
      document.getElementById('valor').value = '';
      document.getElementById('descricao').value = '';
      document.getElementById('quantidade').value = '';
    }
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const novoProduto = {
        nome: document.getElementById('nome').value,
        preco: parseFloat(document.getElementById('valor').value),
        descricao: document.getElementById('descricao').value,
        quant: parseInt(document.getElementById('quantidade').value)
      };
  
      fetch('https://bfc2-2804-520-c3-8300-f5ff-da2a-d7b6-2e25.ngrok.io/api/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoProduto),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Produto cadastrado:', data);
          limparCampos();
          alert('Cadastrado com sucesso.')
        })
        .catch(error => {
          console.error('Erro ao cadastrar o produto:', error);
        });
    });
  });
  