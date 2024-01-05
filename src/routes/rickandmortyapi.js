const axios = require('axios');
const router = require('express').Router();
const {messageRequest } = require('../utils/messageRequest');
const { getCharacterIdsAsFavorites, createCharacter }  = require('../database/characters');

const apiURL = process.env.RICK_AND_MORTY_URL

router.get("/getFavoritesCharactersIds", async (req, res) => {
 const result = await getCharacterIdsAsFavorites(res);
  res.json(result);
});

router.post("/createCharacter", async (req, res) => {
    const result = await createCharacter(req,res);
    res.json(result);
   });

router.get("/getCharacters", async (req, res) => {
  try {
    const page = req.query.page;
    const gender= req.query.gender;
    const species= req.query.species;
  
    const result = await axios.get(`${apiURL}/character/?page=${page}&gender=${gender}&species=${species}`);
    return  res.status(200).send(messageRequest("Ejecución correcta","","",result.data));
     
  } catch (error) {
    res.status(error.response.status).send({
      message: error.response.data.error,
      code: error.code,
      state: error.response.status,
      data: []
  });
  }
  });


module.exports = router;