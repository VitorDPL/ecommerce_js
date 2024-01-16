import { data } from "autoprefixer";
import { desenharProdutoNoCarrinhoSimples, lerLocalStorage, apagarDoLocalStorage, salvarLocalStorage } from "./src/utilidades";
import { atualizarPrecoCarrinho } from "./src/menuCarrinho";

function desenharProdutosCheckout() {
    const idsProdutoCarrinhoQuantidade = lerLocalStorage("carrinho") ?? {};
    for (const idProduto in idsProdutoCarrinhoQuantidade) {
      desenharProdutoNoCarrinhoSimples(
        idProduto,
        "container-produtos-checkout",
        idsProdutoCarrinhoQuantidade[idProduto]
      );
    }
  }

// preventDefault -> ação que interrompe a execução do comportamento padrão. Como o ppadrão do formulário é enviar dados, e não redirecioanr para outra página, o código fica meio confuso quando nós associamos o formulário ao redirecionamento de página. Com o (preventDefault) esse problema é resolivdo.
function finalizarCompra(evento) {
  evento.preventDefault();
  const idsProdutoCarrinhoQuantidade = lerLocalStorage("carrinho") ?? {};
  if (Object.keys(idsProdutoCarrinhoQuantidade).length === 0) {
    return ;
  }

  const dataAtual= new Date();

  const pedidoFeito= {
    dataPedido: dataAtual,
    pedido: idsProdutoCarrinhoQuantidade, 
  }

  // sempre recuperará uma lista de pedidos. Seja ela vazia ou não.
  const historicoDePedidos= lerLocalStorage('historico') ?? [];
  // os três pontos (...) se chama espalhamento. Ele pega o conteúdo da lista.
  const historicoDePedidosAtualizados= [pedidoFeito, ...historicoDePedidos];
  salvarLocalStorage('historico', historicoDePedidosAtualizados);
  apagarDoLocalStorage('carrinho');
  window.location.href= "./pedidos.html";

}

desenharProdutosCheckout();

// o formulário já espera o clique, por isso associa-se ao evento submit ao invés do click.
// como só há um formulário na página, ele vai funcionar.
// o evento pega as informações e passa para a função.
document.addEventListener("submit", (evento) => finalizarCompra (evento));
