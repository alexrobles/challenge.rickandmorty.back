const mysql = require("mysql2");
const { messageRequest } = require("../utils/messageRequest")


const pool = mysql.createPool({
    host: `${process.env.MYSQL_HOST}`,
    user: `${process.env.MYSQL_USER}`,
    password: `${process.env.MYSQL_PASSWORD}`,
    database: `${process.env.MYSQL_DATABASE}`
}).promise();

const createConnection = async () => { 
    try {
        const connection = await pool.getConnection();
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

const getCharacterIdsAsFavorites = async (res) => {
    try {
        const poolConnection = await createConnection();
        const sql = 'SELECT character_id FROM characters WHERE favorite = true;';
        const rows = await poolConnection.query(sql);
        return messageRequest("Ejecución correcta","","",rows[0]);
    } catch (error) {
        console.error('Error searching characters:',error);
        res.status(500).send({
            message: error.sqlMessage,
            code: error.code,
            state: error.sqlState,
            data:""
        });
    }
} 

const createCharacter = async (req, res) => {
   
    try {
        const character = req.body;
        const poolConnection = await createConnection();
        const sql = `INSERT INTO characters 
        (character_id,name, status, species, type, gender, origin, image, url,favorite, created) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            character.character_id,
            character.name,
            character.status,
            character.species,
            character.type,
            character.gender,
            character.origin,
            character.image,
            character.url,
            character.favorite,
            character.created,
        ];
        const [result] = await poolConnection.query(sql,values);
        console.log(result);
        res.status(200).send({
            message: "Guardado correctamente",
            code: "",
            state: "",
            data: "",
        });

    } catch (error) {
        console.error('Error creating characters:',error);
        res.status(500).send({
            message: error.sqlMessage,
            code: error.code,
            state: error.sqlState,
            data: ""
        });
    }
}

module.exports = { 
    createCharacter,
    getCharacterIdsAsFavorites
}