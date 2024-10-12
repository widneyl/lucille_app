export class Funcionario {
    constructor(id, nome, cargo, salario) {
        this.id = id;
        this.nome = nome;
        this.cargo = cargo;
        this.salario = salario;
    }

    // metodos get e set
    getId(){
        return this.id;
    }
    getNome(){
        return this.nome;
    }
    getCargo(){
        return this.cargo;
    }
    getSalario(){
        return this.salario;
    }

    setId(){
        this.id = id;
    }
    setNome(){
        this.nome = nome;
    }
    setCargo(){
        this.cargo = cargo;
    }
    setSalario(){
        this.salario = salario;
    }

    info() {
        return `[ Id:${this.getId()}     Nome: ${this.getNome()}      Cargo: ${this.getCargo()}    Salário: ${this.getSalario()} ]`;
    }
}