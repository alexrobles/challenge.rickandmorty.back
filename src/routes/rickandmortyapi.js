const axios = require('axios');
const router = require('express').Router();

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
    const result = await axios.get(`${apiURL}/`);
    res.json(result.data);
   }
);


module.exports = router;