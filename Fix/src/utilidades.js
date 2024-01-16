import { atualizarPrecoCarrinho } from "./menuCarrinho";

export const catalogo = [
    { 
        id: "1", marca: 'Zara', nome: 'Camisa Larga com Bolsos', preco: 70, imagem: 'product-1.jpg', feminino: false, 
        }, 
    {
         id: "2", marca: 'Zara', nome: 'Casaco Reto com Lã', preco: 85, imagem: 'product-2.jpg', feminino: true, 
        }, 
    {
         id: "3", marca: 'Zara', nome: 'Jaqueta com Efeito Camurça', preco: 60, imagem: 'product-3.jpg', feminino: false, 
        }, 
    { 
        id: "4", marca: 'Zara', nome: 'Sobretudo em Mescla de Lã', preco: 160, imagem: 'product-4.jpg', feminino: false, 
        }, 
    { 
        id: "5", marca: 'Zara', nome: 'Camisa Larga Acolchoada de Veludo Cotelê', preco: 110, imagem: 'product-5.jpg', feminino: false, 
        }, 
    { 
        id: "6", marca: 'Zara', nome: 'Casaco de Lã com Botões', preco: 170, imagem: 'product-6.jpg', feminino: true, 
        }, 
    { 
        id: "7", marca: 'Zara', nome: 'Casaco com Botões', preco: 75, imagem: 'product-7.jpg', feminino: true, 
        }, 
    { 
        id: "8", marca: 'Zara', nome: 'Colete Comprido com Cinto', preco: 88, imagem: 'product-8.jpg', feminino: true, 
        }
    
]

// transforma um objeto em JSON para que ele possa ser salvo na forma de dicionário ( é obrigatório, pois o navegador só lê strings.)
export function salvarLocalStorage(chave, informacao) {
    // JSON = Java Script Object Notation
    localStorage.setItem(chave, JSON.stringify(informacao));
}

// transforma o dicionário em objeto novamente.
export function lerLocalStorage(chave) {
    // JSON = Java Script Object Notation
    return JSON.parse(localStorage.getItem(chave));
}

export function apagarDoLocalStorage(chave) {
    localStorage.removeItem(chave);
}

export function desenharProdutoNoCarrinhoSimples(idProduto, idContainerHtml, quantidadeProduto) {
    // ache um produto (p) tal que esse produto tenha o id igual ao idProduto informado dentro da função.
    const produto= catalogo.find( (p) => p.id === idProduto );
    // containerProdutoCarrinho recupera o elemento html produtos-carrinho e la embaixo adiciona o card.
    const containerProdutoCarrinho= document.getElementById(idContainerHtml);
    // em relação(relative) a esse retângulo(do artigo[article]), o ícone da lixeira estará em uma posição definida
    // pai: triângulo que ocupa todo o article. Portanto, todos serão relativos/dependentes dele.
    // filho: ícone que será colocado DENTRO do pai. Absolute.
    // lembrando que os ícones são tratados como textos.
    //   text-alguma coisa ( classe que mexe no tamanho dos textos )
  
    // Criando o ELEMENTO, para o navegador ler um ELEMENTO e identifica-lo como ELEMENTO HTML, não como texto.
    const elementoArticle= document.createElement("article");
    const articleClasses= [
     "flex",
     "bg-stone-200",
     "rounded-lg",
     "relative",
     "mt-3",

    ]
  
    for (const articleClass of articleClasses) {
      // para cada elemento dentro da lista de classes, adicione ele ao elementoArticle. Basicamente essa linha adiciona as classes ao elementoArticle.
      elementoArticle.classList.add(articleClass);
    }
  
    // items-end(propriedade align-itens) do css.
    // essa função foi desenhada primeiramente no HTML.
    const cartaoProdutoCarrinho= `
    <img src="./assets/img/${produto.imagem}" alt="${produto.nome}" class="h-24 p-1">
    
    <div class="p-2">
  
      <p class="text-base">${produto.nome}</p>
      <p class="text-base">Tamanho: M</p>
      <p class="text-green-300 text-lg">R$${produto.preco}</p>
  
    </div>
  
    
    <div class="flex items-end absolute bottom-0 right-2 text-lg"> 
  
      <p id="quantidade-${produto.id}" class="ml-2"> ${quantidadeProduto} </p>
  
    </div>`;
  
    elementoArticle.innerHTML = cartaoProdutoCarrinho;
  
    // colocando o card do produto dentro do HTML
    containerProdutoCarrinho.appendChild(elementoArticle);

  }