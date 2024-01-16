import { catalogo, salvarLocalStorage, lerLocalStorage } from "./utilidades";

// Esse "??" no código significa: se tiver algo armazenado no localstorage, leia esse algo. Se não tiver, siga a sua vida tranquilamente meu parceiro.
const idsProdutoCarrinhoQuantidade = lerLocalStorage('carrinho') ?? {
};

// abrir carrinho
function abrirCarrinho(){
    document.getElementById("carrinho").classList.remove("right-[-360px]");
    document.getElementById("carrinho").classList.add("right-[0px]");
}

// fechar carrinho
function fecharCarrinho(){
    document.getElementById("carrinho").classList.remove("right-[0px]");
    document.getElementById("carrinho").classList.add("right-[-360px]");
}

function irParaCheckout() {
  // se o tamanho do objeto for vazio...
  if (Object.keys(idsProdutoCarrinhoQuantidade).length === 0){
    return;
  }
  // window = objeto do navegador que conhece as informações sobre a página
  // href é o endereço.
  window.location.href ="./checkout.html";
}

export function inicializarCarrinho(){
    const botaoFecharCarrinho= document.getElementById("fechar-carrinho");
    const botaoAbrirCarrinho= document.getElementById("abrir-carrinho")
    const botaoIrParaCheckout= document.getElementById("finalizar-compra");

    // addEventListener "escuta" um evento. Ele vê o que está acontecendo na página.
    // Nesse caso, ele escuta o clique.
    botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
    botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
    botaoIrParaCheckout.addEventListener("click", irParaCheckout);
    
}

function removerDoCarrinho(idProduto) {
  delete idsProdutoCarrinhoQuantidade[idProduto];
  salvarLocalStorage('carrinho', idsProdutoCarrinhoQuantidade);
  atualizarPrecoCarrinho();
  renderizarProdutoCarrinho();
}

function incrementarQuantidadeProduto(idProduto){
  idsProdutoCarrinhoQuantidade[idProduto]++;
  salvarLocalStorage('carrinho', idsProdutoCarrinhoQuantidade);
  atualizarPrecoCarrinho();
  atualizarInformacoesQuantidade(idProduto);
}

function decrementarQuantidadeProduto(idProduto){
  // se a quantidade no carrinho for 1 e alguém tentar REMOVER UMA UNIDADE, essa unidade será zero, logo, o produto sairá do carrinho.
  if (idsProdutoCarrinhoQuantidade[idProduto] === 1) {
    removerDoCarrinho(idProduto);
    salvarLocalStorage('carrinho', idsProdutoCarrinhoQuantidade);
    return;
  }
  idsProdutoCarrinhoQuantidade[idProduto]--;
  salvarLocalStorage('carrinho', idsProdutoCarrinhoQuantidade);
  atualizarPrecoCarrinho();
  atualizarInformacoesQuantidade(idProduto);
}

function atualizarInformacoesQuantidade (idProduto) {
  document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoCarrinhoQuantidade[idProduto];
}


function desenharProdutoNoCarrinho(idProduto) {
  // ache um produto (p) tal que esse produto tenha o id igual ao idProduto informado dentro da função.
  const produto= catalogo.find( (p) => p.id === idProduto );
  // containerProdutoCarrinho recupera o elemento html produtos-carrinho e la embaixo adiciona o card.
  const containerProdutoCarrinho= document.getElementById('produtos-carrinho');
  // em relação(relative) a esse retângulo(do artigo[article]), o ícone da lixeira estará em uma posição definida
  // pai: triângulo que ocupa todo o article. Portanto, todos serão relativos/dependentes dele.
  // filho: ícone que será colocado DENTRO do pai. Absolute.
  // lembrando que os ícones são tratados como textos.
  //   text-alguma coisa ( classe que mexe no tamanho dos textos )

  // Criando o ELEMENTO, para o navegador ler um ELEMENTO e identifica-lo como ELEMENTO HTML, não como texto.
  const elementoArticle= document.createElement("article");
  const articleClasses= [
   "flex",
   "bg-neutral-700",
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

  <button id="remover-item-${produto.id}" class="absolute top-2 right-3 text-lg hover:text-red-500"><i class="fa-solid fa-trash"></i></button>

  <img src="./assets/img/${produto.imagem}" alt="${produto.nome}" class="h-24 p-1">
  
  <div class="p-2 flex flex-col justify-between">

    <p class="text-base">${produto.nome}</p>
    <p class="text-base">Tamanho: M</p>
    <p class="text-green-300 text-lg">R$${produto.preco}</p>

  </div>

  
  <div class="flex items-end absolute bottom-0 right-2 text-lg"> 

    <button id='decrementar-produto-${produto.id}'> - </button>
    <p id="quantidade-${produto.id}" class="ml-2"> ${idsProdutoCarrinhoQuantidade[idProduto]} </p>
    <button id='incrementar-produto-${produto.id}'class="ml-2"> + </button>

  </div>`;

  elementoArticle.innerHTML = cartaoProdutoCarrinho;

  // colocando o card do produto dentro do HTML
  containerProdutoCarrinho.appendChild(elementoArticle);

  document.getElementById(`decrementar-produto-${produto.id}`).addEventListener("click", () => decrementarQuantidadeProduto(idProduto));

  document.getElementById(`incrementar-produto-${produto.id}`).addEventListener("click", () => incrementarQuantidadeProduto(idProduto));

  document.getElementById(`remover-item-${produto.id}`).addEventListener("click", () => removerDoCarrinho(idProduto));

  abrirCarrinho();
}

export function renderizarProdutoCarrinho(idProduto) {
  const containerProdutoCarrinho= document.getElementById('produtos-carrinho');
  containerProdutoCarrinho.innerHTML = ""

  for (idProduto in idsProdutoCarrinhoQuantidade){
    desenharProdutoNoCarrinho(idProduto)
  }
}

// adicionar ao carrinho
export function adicionarAoCarrinho(idProduto){

  if (idProduto in idsProdutoCarrinhoQuantidade) {
    incrementarQuantidadeProduto(idProduto);
    atualizarInformacoesQuantidade(idProduto);
    return;
  }

  idsProdutoCarrinhoQuantidade[idProduto] = 1;
  salvarLocalStorage('carrinho', idsProdutoCarrinhoQuantidade);
  atualizarPrecoCarrinho();
  desenharProdutoNoCarrinho(idProduto);
  

}

export function atualizarPrecoCarrinho () {
  const precoCarrinho= document.getElementById("preco-total");
  let precoTotalCarrinho= 0;
  for(const idProdutoNoCarrinho in idsProdutoCarrinhoQuantidade) {
    // ache no catalogo um produto P, tal que seu ID seja igual ao idProdutoNoCarrinho
    precoTotalCarrinho += catalogo.find (p => p.id === idProdutoNoCarrinho).preco * idsProdutoCarrinhoQuantidade[idProdutoNoCarrinho]
  }
  precoCarrinho.innerText = `Total: R$${precoTotalCarrinho}`
}