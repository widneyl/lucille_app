import * as SQLite from 'expo-sqlite';
import { useState } from 'react';
import { Funcionario } from '../entity/Funcionario';
import { allProdutosOnInsertLine } from './productsInsert';

export default function useDatabaseConfig() {
    const [ funcionarios, setFuncionarios ] = useState([]);

    // variável com nome do banco de dados em uso, também coloquei ela pra exportar, vai ficar mais prático pra abrir o banco
    const databaseOnUse = 'opentests';

    // para criar um funcionario
    async function create(nome, cargo, salario, cpf, telefone) {
        const db = await SQLite.openDatabaseAsync(databaseOnUse);

        // caso for a primeira vez que o usuario entrar no aplicativo, essa query vai precisar rodar pra criar a tabela
        // atualização: adição do campo vales na tabela de funcionários
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS funcionarios 
            (
                id INTEGER PRIMARY KEY NOT NULL, 
                nome VARCHAR(30) NOT NULL, 
                cargo VARCHAR(30) NOT NULL, 
                salario REAL NOT NULL,
                cpf INTEGER,
                telefone INTEGER,
                vales TEXT,
                dataDeAdmissao DATE,
                dataDeDemissao DATE,
                fotoDePerfil TEXT
            );
        `);

        // por enquanto vou colocar só esses campos na hora do cadastro, ainda to vendo a melhor forma de inserir datas e a foto de perfil
        await db.runAsync(
            'INSERT INTO funcionarios (nome, cargo, salario, cpf, telefone) VALUES (?, ?, ?, ?, ?)',
            nome,
            cargo,
            salario,
            cpf,
            telefone,
        );
        
        // pra debug
        console.log(nome + ' - cadastrado com sucesso');

    }

    // atualizando os campos do funcinoário, útil para quando for implementar a tela de editar um funcionário
    // testei e ta funcionando bem
    // -> a execução do método antigo tava entrando em conflito com o updateVale devido a falta de preparo do statement e finalização do mesmo, agora tá funcionando bem ... possivelmente vou ter que fazer uma atualização dos demais métodos e usar o prepareAsync com o finalizeAsync para evitar possíveis erros
    async function updateAllFields(id, nome, cargo, salario, cpf, telefone, dataDeAdmissao) {
        const db = await SQLite.openDatabaseAsync(databaseOnUse);

        console.log('entrou no update allfields')

        // criando o statement
        const statement = await db.prepareAsync(
            'UPDATE funcionarios SET nome = $nome, cargo = $cargo, salario = $salario, cpf = $cpf, telefone = $telefone, dataDeAdmissao = $dataDeAdmissao WHERE id = $id'
        );

        try {
            let result = await statement.executeAsync(
                { 
                    $nome: nome, 
                    $cargo: cargo, 
                    $salario: salario, 
                    $cpf: cpf, 
                    $telefone: telefone, 
                    $dataDeAdmissao: dataDeAdmissao, 
                    $id: id 
                }
            );
            console.log('nova atualização:', result, result.changes);
            
        } finally {
            await statement.finalizeAsync();
        }
    }

    // atualizando os vales do funcionário a partir do id
    async function updateVale(id, vales) {
        console.log('entrou no update vale')
        const db = await SQLite.openDatabaseAsync(databaseOnUse);

        // criando o statement
        const statement = await db.prepareAsync(
            'UPDATE funcionarios SET vales = $vales WHERE id = $id'
        );

        try {
            let result = await statement.executeAsync(
                { $vales: vales, $id: id }
            );
            console.log('nova atualização:', result, result.changes);
            
        } finally {
            await statement.finalizeAsync();
        }
    }
    
    // atribuindo todos funcionários no array
    async function getAll() {
        const db = await SQLite.openDatabaseAsync(databaseOnUse);

        const allRows = await db.getAllAsync('SELECT * FROM funcionarios');
        setFuncionarios([]);
        let newArray = [];
        for (const row of allRows) {
            // substitui o objeto literal pela classe funcionário para guardar no array
            newArray.push(new Funcionario(row.id, row.nome, row.cargo, row.salario, row.vales));
        }
        setFuncionarios(newArray);
    }
    
    // metodo pra remover pelo nome
    // atualizei a forma que estava executando a query para prevenir erros de async nos metodos abaixo
    async function removeByNome(nome){
        const db = await SQLite.openDatabaseAsync(databaseOnUse);

        const statement = await db.prepareAsync(
            'DELETE FROM funcionarios WHERE nome = $nome'
        );
        
        try {
            let result = await statement.executeAsync(
                { $nome: nome }
            );
            console.log('nova atualização:', result, result.changes);
            
        } finally {
            await statement.finalizeAsync();
            console.log(nome + ' - removido com sucesso');
        }
    }

    // metodo pra remover pelo nome
    async function removeById(id){
        const db = await SQLite.openDatabaseAsync(databaseOnUse);

        const statement = await db.prepareAsync(
            'DELETE FROM funcionarios WHERE id = $id'
        );
        
        try {
            let result = await statement.executeAsync(
                { $id: id }
            );
            console.log('nova atualização:', result, result.changes);
            
        } finally {
            await statement.finalizeAsync();
            console.log(id + ' - removido com sucesso');
        }
    }

    // procurando pelo funcionário pelo nome e retornando um objeto com seus atributos
    // às vezes funciona bem, às vezes não
    //  o método tem um delay de funcionomento, às vezes quando chama a primeira vez o objeto pode retornar undefined devido o delay do banco de dados, ou as vezes nao reconhece os gets e sets
    function findById(id) {
        // chamando o gelAll para atualizar o array de funcionarios
        getAll();

        let objetoFuncionario;
    
        // com o array contendo todos os funcionários, agora é procurar pelo funcionário que corresponda
        funcionarios.forEach((f) => {
            if (f.id == id) {
                objetoFuncionario = new Funcionario(f.id, f.nome, f.cargo, f.salario, f.vales);
            }
        })

        // console.log(objetoFuncionario)
        return objetoFuncionario;
    }

    // procurando e retornando o funcionário diretamento do banco de dados
    async function findById_WithDB(id) {
        const db = await SQLite.openDatabaseAsync(databaseOnUse);
        let result;
        
        return new Promise(async function (resolve, reject) {
            result = await db.getFirstAsync(`SELECT * FROM funcionarios WHERE id = ${id}`);
            console.log('resultado: ' + result);
            
            resolve(result)
        })
    }

    async function drop(tabela) {
        const db = await SQLite.openDatabaseAsync(databaseOnUse);

        await db.execAsync(`
            DROP TABLE ${tabela}
        `);
        
        // pra debug
        console.log('tabela apagada com sucesso');

    }

    async function viewAll() {
        const db = await SQLite.openDatabaseAsync(databaseOnUse);

        const allRows = await db.getAllAsync('SELECT * FROM funcionarios');
        for (const row of allRows) {
            // substitui o objeto literal pela classe funcionário para guardar no array
            console.log(row.id, row.nome, row.cargo, row.salario, row.cpf, row.telefone, row.vales, row.dataDeAdmissao, row.dataDeDemissao, row.fotoDePerfil);
        }
    }

    // essa função cria a tabela e já insere os produtos nela, deve ser chamada pela primeira vez que o aplicativo for instalado pelo usuário
    async function productTable() {
        const db = await SQLite.openDatabaseAsync(databaseOnUse);

        // criando tabela de produtos
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS produtos 
            (
                id INTEGER PRIMARY KEY NOT NULL, 
                descricao TEXT NOT NULL, 
                preco REAL NOT NULL,
                fotoDoProduto TEXT
            );
        `);
        console.log('tabela criada com sucesso')

        // verificando se os produtos já estão ou não inseridos
        const result = await db.getFirstAsync('SELECT COUNT(*) FROM produtos');

        // se a quantidade de linhas for 0 significa que os produtos precisam ser inseridos 
        (result['COUNT(*)'] == 0) ? await db.runAsync( allProdutosOnInsertLine) : console.log('os produtos já estão cadastrados')
       
    }

    // visualizar todos produtos para testes
    async function viewAllProducts() {
        const db = await SQLite.openDatabaseAsync(databaseOnUse);

        const allRows = await db.getAllAsync('SELECT * FROM produtos');
        for (const row of allRows) {
            console.log(row.id, row.descricao, row.preco);
        }
    }

    return { 
        databaseOnUse, 
        create, 
        getAll, 
        removeByNome, 
        removeById, 
        updateAllFields, 
        updateVale, 
        findById,
        findById_WithDB,
        drop,
        viewAll,
        funcionarios,
        productTable,
        viewAllProducts 
    }
}