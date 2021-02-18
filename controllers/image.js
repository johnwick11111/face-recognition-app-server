const Clarifai = require('clarifai');



//Clarifai API key---
const app = new Clarifai.App({
 apiKey: '2ad020a8f56c4304902a8971e428b240'
});



//Face Detection Api Call handler---
const handleApiCall = (req, res) => {
	app.models.predict("d02b4508df58432fbb84e800597b8959", req.body.input)
	.then(data => res.json(data));
}




//Entries Increment Requests Handler---

const handleImage = (req, res, db) => {

	const { id } = req.body;
	db('users').where({id:id})
	.increment('entries', 1)
	.returning('entries')
	.then(totalEntries=> res.json(totalEntries[0]))
	.catch(err=> res.status(400).json('error occured at entries'))
}


//exporting function---
module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};
