const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');

// Configuração do banco de dados
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

// Conexão com o banco de dados
const connection = mysql.createConnection(config);

// Middleware para tratar formulários
app.use(express.urlencoded({ extended: true }));

// Verifica se a conexão com o banco de dados foi bem-sucedida
connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    }
});

// Rota principal
app.get('/app', (req, res) => {

    let html = '<h1>FullCycle nginx nodejs</h1>';

        // Consulta para obter os registros do banco de dados
        const select = `SELECT * FROM people`;
        connection.query(select, (err, rows) => {
            if (err) {
                console.error('Erro ao executar a consulta SELECT:', err);
                return res.status(500).send('Erro ao obter registros do banco de dados.');
            }

            // Formulário para inserção de novos registros
            html += `
                <form action="/add" method="post">
                    <input type="text" name="name" placeholder="Digite um nome" required>
                    <button type="submit">Adicionar</button>
                </form>
                <br>
            `;

            // Tabela para exibir os registros existentes
            html += '<table border="1">';
            html += '<tr><th>ID</th><th>Name</th></tr>';
            rows.forEach(row => {
                html += `<tr><td>${row.id}</td><td>${row.name}</td></tr>`;
            });
            html += '</table>';

            res.send(html);
        });
});

// Rota para adicionar um novo registro
app.post('/add', (req, res) => {
    const name = req.body.name;
    const insert = `INSERT INTO people(name) values('${name}')`;

    connection.query(insert, (err, result) => {
        if (err) {
            console.error('Erro ao executar a consulta INSERT:', err);
            return res.status(500).send('Erro ao adicionar registro ao banco de dados.');
        }
        console.log(`Novo registro adicionado: ${name}`);

        // Redireciona de volta para a página principal após adicionar o registro
        res.redirect('/app');
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log('Rodando na porta ' + port);
});
