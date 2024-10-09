import * as SQLite from 'expo-sqlite';
import { useState } from 'react';

export default function useDatabaseConfig() {
    const [ funcionarios, setFuncionarios ] = useState([]);

    // para criar um funcionario
    async function create(name, cargo) {
        const db = await SQLite.openDatabaseAsync('testdb');

        // caso for a primeira vez que o usuario entrar no aplicativo, essa query vai precisar rodar pra criar a tabela
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS funcionarios (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, cargo TEXT NOT NULL);
        `);

        await db.runAsync(
            'INSERT INTO funcionarios (name, cargo) VALUES (?, ?)',
            name,
            cargo
        );
        
        // pra debug
        console.log(name + ' - cadastrado com sucesso');

    }
    
    // atribuindo todos funcionários no array
    async function getAll() {
        const db = await SQLite.openDatabaseAsync('testdb');

        const allRows = await db.getAllAsync('SELECT * FROM funcionarios');
        setFuncionarios([]);
        let newArray = [];
        for (const row of allRows) {
            
            // objeto para guardar funcionario
            const empolyee = {
                id: row.id,
                name: row.name,
                cargo: row.cargo
            };

            newArray.push(empolyee);
            // console.log(empolyee); // Debug para checar o objeto individual

        }
        setFuncionarios(newArray);
    }
    
    // metodo pra remover pelo nome
    async function removeByName(nome){
        const db = await SQLite.openDatabaseAsync('testdb');

        await db.runAsync(
          'DELETE FROM funcionarios WHERE name = $name', { 
            $name: nome
          }
        );

        console.log(nome + ' - removido com sucesso');
    
        // const allRows = await db.getAllAsync('SELECT * FROM funcionarios');
        // setFuncionarios([]);
        // let newArray = [];
        // for (const row of allRows) {
        //   console.log(row.id, row.value, row.intValue);
        //   newArray.push(row.value);
        // }

    }

    // metodo pra remover pelo nome
    async function removeById(id){
        const db = await SQLite.openDatabaseAsync('testdb');

        await db.runAsync(
          'DELETE FROM funcionarios WHERE id = $id', { 
            $id: id
          }
        );

        console.log(id + ' - removido com sucesso');
    }

    return { create, getAll, removeByName, removeById, funcionarios }
}