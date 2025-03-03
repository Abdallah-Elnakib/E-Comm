import mysql from 'mysql';

const connDB = async (): Promise<void> => {
    try {
        const con = mysql.createConnection({
            host: process.env.HOSTDATABASE,
            user: process.env.USERNAMEDATABASE,
            password: process.env.PASSWORSDATABASE,
            port: Number(process.env.PORTDATABASE),
        });
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!.......");
        });
    } catch (error) {
        console.log(error);
        }
};
    
    

export { connDB };