const sql = require('mssql');

const config = {
    server: 'AZIEL\\SQLEXPRESS', // tu instancia de SQL Server
    database: 'ModAleDB',        // tu base de datos
    options: {
        trustServerCertificate: true // necesario si no tienes certificado SSL
    },
    authentication: {
        type: 'ntlm',
        options: {
            domain: '',             // normalmente vacío si es local
            userName: '',           // deja vacío para Windows Authentication
            password: ''            // deja vacío para Windows Authentication
        }
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Conectado a SQL Server ✅');
        return pool;
    })
    .catch(err => console.log('Error al conectar a SQL Server ❌', err));

module.exports = {
    sql, poolPromise
};
