import * as SQLite from 'expo-sqlite';
import { useState } from 'react';
import { Funcionario } from '../entity/Funcionario';

export default function useDatabaseConfig() {
    const [ funcionarios, setFuncionarios ] = useState([]);

    // para criar um funcionario
    async function create(name, cargo, salario) {
        const db = await SQLite.openDatabaseAsync('opentests');

        // caso for a primeira vez que o usuario entrar no aplicativo, essa query vai precisar rodar pra criar a tabela
        // atualização: adição do campo vales na tabela de funcionários
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS funcionarios (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, cargo TEXT NOT NULL, salario INTEGER NOT NULL, vales TEXT);
        `);

        await db.runAsync(
            'INSERT INTO funcionarios (name, cargo, salario) VALUES (?, ?, ?)',
            name,
            cargo,
            salario,
        );
        
        // pra debug
        console.log(name + ' - cadastrado com sucesso');

    }

    // atualizando os campos do funcinoário, útil para quando for implementar a tela de editar um funcionário
    // testei e ta funcionando bem
    // -> a execução do método antigo tava entrando em conflito com o updateVale devido a falta de preparo do statement e finalização do mesmo, agora tá funcionando bem ... possivelmente vou ter que fazer uma atualização dos demais métodos e usar o prepareAsync com o finalizeAsync para evitar possíveis erros
    async function updateAllFields(name, cargo, salario, id) {
        const db = await SQLite.openDatabaseAsync('opentests');

        console.log('entrou no update allfields')

        // criando o statement
        const statement = await db.prepareAsync(
            'UPDATE funcionarios SET name = $name, cargo = $cargo, salario = $salario WHERE id = $id'
        );

        try {
            let result = await statement.executeAsync(
                { $name: name, $cargo: cargo, $salario: salario, $id: id }
            );
            console.log('nova atualização:', result, result.changes);
            
        } finally {
            await statement.finalizeAsync();
        }
    }

    // atualizando os vales do funcionário a partir do id
    async function updateVale(id, vales) {
        console.log('entrou no update vale')
        const db = await SQLite.openDatabaseAsync('opentests');

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
        const db = await SQLite.openDatabaseAsync('opentests');

        const allRows = await db.getAllAsync('SELECT * FROM funcionarios');
        setFuncionarios([]);
        let newArray = [];
        for (const row of allRows) {
            // substitui o objeto literal pela classe funcionário para guardar no array
            newArray.push(new Funcionario(row.id, row.name, row.cargo, row.salario, row.vales));
        }
        setFuncionarios(newArray);
    }
    
    // metodo pra remover pelo nome
    // atualizei a forma que estava executando a query para prevenir erros de async nos metodos abaixo
    async function removeByName(nome){
        const db = await SQLite.openDatabaseAsync('opentests');

        const statement = await db.prepareAsync(
            'DELETE FROM funcionarios WHERE name = $name'
        );
        
        try {
            let result = await statement.executeAsync(
                { $name: nome }
            );
            console.log('nova atualização:', result, result.changes);
            
        } finally {
            await statement.finalizeAsync();
            console.log(nome + ' - removido com sucesso');
        }
    }

    // metodo pra remover pelo nome
    async function removeById(id){
        const db = await SQLite.openDatabaseAsync('opentests');

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
    //  o método tem um delay de funcionamento, às vezes quando chama a primeira vez o objeto pode retornar undefined devido o delay do banco de dados, ou as vezes nao reconhece os gets e sets
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
        const db = await SQLite.openDatabaseAsync('opentests');
        let result;
        
        return new Promise(async function (resolve, reject) {
            result = await db.getFirstAsync(`SELECT * FROM funcionarios WHERE id = ${id}`);
            console.log('resultado: ' + result);
            
            resolve(result)
        })
    }

    return { 
        create, 
        getAll, 
        removeByName, 
        removeById, 
        updateAllFields, 
        updateVale, 
        findById,
        findById_WithDB,
        funcionarios 
    }
}