class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
        if (itens.length == 0) return "Não há itens no carrinho de compra!";

        const cardapio = new Map([
            ["cafe", 3.0],
            ["chantily", 1.5],
            ["suco", 6.2],
            ["sanduiche", 6.5],
            ["queijo", 2.0],
            ["salgado", 7.25],
            ["combo1", 9.5],
            ["combo2", 7.5],
        ]);

        let itensNoCarrinho = new Array();
        let precoTotal = 0;

        for (let i = 0; i < itens.length; i++) {
            let item = itens[i].split(",");
            let quantidade = parseInt(item[1]);

            if (quantidade == 0) return "Quantidade inválida!";

            if (!cardapio.has(item[0])) return "Item inválido!";

            precoTotal += cardapio.get(item[0]) * quantidade;
            itensNoCarrinho.push(item[0]);
        }

        if (!this.valdarPagamento(metodoDePagamento))
            return "Forma de pagamento inválida!";

        if (!this.validarExtras(itensNoCarrinho))
            return "Item extra não pode ser pedido sem o principal";

        return "R$ " + this.calcularPrecoFinal(metodoDePagamento, precoTotal);
    }

    valdarPagamento(metodoDePagamento) {
        if (
            metodoDePagamento == "dinheiro" ||
            metodoDePagamento == "credito" ||
            metodoDePagamento == "debito"
        ) {
            return true;
        }
    }

    validarExtras(itens) {
        let isValid = true;

        if (itens.includes("chantily") && !itens.includes("cafe")) {
            isValid = false;
        } else if (itens.includes("queijo") && !itens.includes("sanduiche")) {
            isValid = false;
        }

        return isValid;
    }

    calcularPrecoFinal(metodoDePagamento, precoTotal) {
        if (metodoDePagamento == "dinheiro") {
            precoTotal *= 0.95;
            return precoTotal.toFixed(2).replace(".", ",");
        }
        if (metodoDePagamento == "credito") {
            precoTotal *= 1.03;
            return precoTotal.toFixed(2).replace(".", ",");
        }
        if (metodoDePagamento == "debito") {
            return precoTotal.toFixed(2).replace(".", ",");
        }
    }
}

export { CaixaDaLanchonete };