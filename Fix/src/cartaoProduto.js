import { adicionarAoCarrinho } from "./menuCarrinho"
import { catalogo } from "./utilidades"

export function renderizarCatalogo(){
    
    for (const produtoCatalogo of catalogo ) {
        // Essa função "group" na classe abaixo diz para AGRUPAR toda a div(que nesse caso corresponde ao produto do catálogo).
        // Ao agrupá-los, é ncessário adicionar a classe group-hover:scale-110 lá na imagem para que ela fique maior qd passe o mouse por cima.
        // o "group" serve para AGRUPAR toda a div e a imagem ficar maior quando o mouse for passado em cima DA DIV, não somente da imagem.
        // A "?" indica um operador ternário. Se for verdadeiro, utilizará o primeiro(feminino). Caso contrário, será o segundo(masculino)
        const cartaoProduto= `<div id="card-produto${produtoCatalogo.id}" class='border-solid shadow-xl shadow-slate-400 w-48 m-2 relative flex flex-col p-2 justify-between group ${produtoCatalogo.feminino ? 'feminino' : 'masculino' } rounded-lg'>
        <img src="./assets/img/${produtoCatalogo.imagem}" alt="produto fix" class="group-hover:scale-110 duration-300 my-2 rounded-lg" />
        <p class='text-sm'>${produtoCatalogo.marca}</p>
        <p class='text-sm'>${produtoCatalogo.nome}</p>
        <p>R$${produtoCatalogo.preco}</p>
        <button id='adicionar-${produtoCatalogo.id}' class="bg-white p-0.8 hover:bg-neutral-200 duration-500 border-solid border-2 border-neutral-800 rounded-lg"> Adicionar ao carrinho<i class="fa-solid fa-cart-plus"></i></button>
        </div>`

// Pegue a página, use os documentos que estão ali dentro e acrescente o cartaoProduto
document.getElementById("container-produto").innerHTML += cartaoProduto


}

// Se eu não me engano, o ID do produto é passado nessa linha.
// Pode ver que ao adicionar a função -> adicionarAoCarrinho, passmaos o (produtoCatalogo.id).
// Lá no menuCarrinho.js, a linha [const produto= catalogo.find( (p) => p.id === idProduto );] ENCONTRA esse id que foi passado.
// Ao clicar em adicionar, o js reage ao click, pegando o id dele através dessa função e esse id é passado para essa linha acima.
// A função está na página menuCarrinho.js, ao ser executada essa linha abaixo(chamando a função), o id é passado através do clique.

// para cada produto do catalogo, pegue o ID dele e REAJA AO CLIQUE, executando a funcção adicionarAoCarrinho e passe como parâmetro o seu id.
for (const produtoCatalogo of catalogo){
    document.getElementById(`adicionar-${produtoCatalogo.id}`).addEventListener("click", () => 
    adicionarAoCarrinho(produtoCatalogo.id));
 }

}
