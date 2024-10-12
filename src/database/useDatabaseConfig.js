import * as SQLite from 'expo-sqlite';
import { useState } from 'react';
import { Funcionario } from '../entity/Funcionario';

export default function useDatabaseConfig() {
    const [ funcionarios, setFuncionarios ] = useState([]);

    // para criar um funcionario
    async function create(name, cargo, salario) {
        const db = await SQLite.openDatabaseAsync('newtests');

        // caso for a primeira vez que o usuario entrar no aplicativo, essa query vai precisar rodar pra criar a tabela
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS funcionarios (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, cargo TEXT NOT NULL, salario INTEGER NOT NULL);
        `);

        await db.runAsync(
            'INSERT INTO funcionarios (name, cargo, salario) VALUES (?, ?, ?)',
            name,
            cargo,
            salario
        );
        
        // pra debug
        console.log(name + ' - cadastrado com sucesso');

    }

    // atualizando os campos do funcinoário, útil para quando for implementar a tela de editar um funcionário
    // testei e ta funcionando bem
    async function updateAllFields(name, cargo, salario, id) {
        const db = await SQLite.openDatabaseAsync('newtests');

        // query para fazer atualizações de um funcionário
        await db.runAsync(
            'UPDATE funcionarios SET name = ?, cargo = ?, salario = ? WHERE id = ?', 
            name,
            cargo,
            salario,
            id
        );
                
        // pra debug
        console.log(name + ' - atualizado com sucesso')
    }
    
    // atribuindo todos funcionários no array
    async function getAll() {
        const db = await SQLite.openDatabaseAsync('newtests');

        const allRows = await db.getAllAsync('SELECT * FROM funcionarios');
        setFuncionarios([]);
        let newArray = [];
        for (const row of allRows) {
            
            // objeto para guardar funcionario, agora com o salario no objeto funcionario
            // const empolyee = {
            //     id: row.id,
            //     name: row.name,
            //     cargo: row.cargo,
            //     salario: row.salario,
            // };

            // substitui o objeto literal pela classe funcionário para guardar no array
            newArray.push(new Funcionario(row.id, row.name, row.cargo, row.salario));
            // console.log(empolyee); // Debug para checar o objeto individual

        }
        setFuncionarios(newArray);
    }
    
    // metodo pra remover pelo nome
    async function removeByName(nome){
        const db = await SQLite.openDatabaseAsync('newtests');

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
        const db = await SQLite.openDatabaseAsync('newtests');

        await db.runAsync(
          'DELETE FROM funcionarios WHERE id = $id', { 
            $id: id
          }
        );

        console.log(id + ' - removido com sucesso');
    }

    // procurando pelo funcionário pelo nome e retornando um objeto com seus atributos
    function findById(id) {
        // chamando o gelAll para atualizar o array de funcionarios
        getAll();

        let objetoFuncionario;
    
        // com o array contendo todos os funcionários, agora é procurar pelo funcionário que corresponda
        funcionarios.find((f) => {
            if (f.id == id) {
                objetoFuncionario = new Funcionario(f.id, f.nome, f.cargo, f.salario);
            }
        })

        // console.log(objetoFuncionario)
        return objetoFuncionario;
    }

    return { 
        create, 
        getAll, 
        removeByName, 
        removeById, 
        updateAllFields, 
        findById, 
        funcionarios 
    }
}