async function carregarProdutos() {
    try {
        const response = await fetch('https://bfc2-2804-520-c3-8300-f5ff-da2a-d7b6-2e25.ngrok.io/api/produtos/buscar-todos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar os produtos');
        }

        const produtos = await response.json();
        const produtosContainer = document.getElementById('produtos-container');

        produtosContainer.innerHTML = '';

        const produtosFlexContainer = document.createElement('div');
        produtosFlexContainer.classList.add('produtos-flex');
        produtosContainer.appendChild(produtosFlexContainer);

        produtos.forEach(produto => {
            const produtoElement = document.createElement('div');
            produtoElement.classList.add('produto');

            const imagemProduto = document.createElement('img');
            imagemProduto.src = "https://images.unsplash.com/photo-1637916997616-c7002699b86a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1vcmFuZ28lMjBjYWl4YXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60";
            produtoElement.appendChild(imagemProduto);

            const nomeElement = document.createElement('h2');
            nomeElement.textContent = produto.nome;
            produtoElement.appendChild(nomeElement);

            const precoElement = document.createElement('h3');
            precoElement.innerHTML = `<strong>R$</strong>${produto.preco.toFixed(2)}`;
            produtoElement.appendChild(precoElement);

            const descricaoElement = document.createElement('p');
            descricaoElement.textContent = produto.descricao;
            produtoElement.appendChild(descricaoElement);

            const botaoComprar = document.createElement('button');
            botaoComprar.textContent = 'Comprar';
            produtoElement.appendChild(botaoComprar);
            const produtoId = produto.idProduto;
            botaoComprar.addEventListener('click', function() {
                if (estaLogado()) {
                    adicionarProdutoAoCarrinho(produtoId);
                } else {
                    window.location.href = 'login.html';
                    alert('Faça o cadastro para efetuar a compra');
                }
            });

            function estaLogado() {
                const token = localStorage.getItem('token');
                return !!token;
            }

            produtosFlexContainer.appendChild(produtoElement);
        });
    } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    carregarProdutos();
});