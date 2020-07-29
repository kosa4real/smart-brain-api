const Clarifai = require ('clarifai');

const app = new Clarifai.App({
  apiKey: '9745191dfe5c4092ad941b75b904b0dc'
});


const handleApiCall = (req, res) => {
	app.models
 		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
 		.then( data =>{
 			res.json(data)
 		})
 		.catch(err => res.status(400).jso("API Unable to detect face"))
} 		
const handleImage = (req, res, db) =>{
	const {id} = req.body;
 
	db('users').where('id', '=', id)
		//increment function from knex to increment entries by 1	
	  .increment('entries',1)
	  .returning('entries')
	  .then(entries => {
	  	res.json((entries[0]))
	  })
	  .catch(err =>res.status(400).json('Unable to retrieve count'));

	
}

module.exports = {
	handleImage,
	handleApiCall
}