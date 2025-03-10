import mysql from 'mysql';

const connDB = async (): Promise<mysql.Connection> => {
    try {
        const con = await mysql.createConnection({
            host: process.env.MYSQL_ROOT_PASSWORD,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            port: Number(process.env.PORTDATABASE),
            database : process.env.MYSQL_DATABASE
        });
        return con;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
    
connDB()

export { connDB };