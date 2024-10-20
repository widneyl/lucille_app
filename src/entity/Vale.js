export class Vale {
    constructor(id, descricao, preco) {
        this.id = id;
        this.descricao = descricao;
        this.preco = preco;
    }

    getId(){
        return this.id;
    }
    getDescricao(){
        return this.descricao;
    }
    getPreco(){
        return this.preco;
    }

}