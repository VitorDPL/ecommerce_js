import { lerLocalStorage, desenharProdutoNoCarrinhoSimples } from "./src/utilidades";

function criarPedidoHistorico(pedidoComData) {
    const elementoPedido= `<p class='text-xl text-bold my-4'> ${new Date(pedidoComData.dataPedido).toLocaleDateString("pt-BR", {hour: '2-digit', minute: '2-digit'})} </p>
    <section id="container-pedidos-${pedidoComData.dataPedido}" class="bg-slate-300 p-3 rounded-md w-1/4">  </section>
    `

    // como a página só tem um "main", pode-se recuperar pela tag ao invés de se recuperar pelo id.
    const main= document.getElementsByTagName("main")[0];
    main.innerHTML += elementoPedido;

    for( const idProduto in pedidoComData.pedido ){
        desenharProdutoNoCarrinhoSimples(idProduto, `container-pedidos-${pedidoComData.dataPedido}`, pedidoComData.pedido[idProduto])
    }
}

function renderizarHistoricoPedido() {
    const historico= lerLocalStorage('historico');
    for (const pedidoComData of historico){
        criarPedidoHistorico(pedidoComData);
    }
}

renderizarHistoricoPedido();