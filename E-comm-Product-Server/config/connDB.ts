import mysql from 'mysql';

const connDB = async (): Promise<mysql.Connection> => {
    try {
        const con = await mysql.createConnection({
            host: process.env.HOSTDATABASE,
            user: process.env.USERNAMEDATABASE,
            password: process.env.PASSWORSDATABASE,
            port: Number(process.env.PORTDATABASE),
            database : process.env.DATABASENAME
        });
        return con;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
    
    

export { connDB };