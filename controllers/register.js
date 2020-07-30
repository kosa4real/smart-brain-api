const handleRegister = (req, res, db, bcrypt) =>{
	const {email, name, password} = req.body;
	if(!email || !name || !password){
		return res.status(400).json("Provide details please"); 
	}
	var hash = bcrypt.hashSync(password);
	db.transaction(trx =>{
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail =>{
			return trx('users')
				.returning('*')
				.insert({
					email:loginEmail[0],
					name: name,
					joined: new Date()
			})
			.then( user =>{
				//because when we register user, there is only one user object, hence "user[0]"
			   	res.json(user[0]);
			})

		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	
	.catch(err=> res.status(400).json("Unable to register"))
	//.catch(err => console.log(err)) 
}

module.exports = {
	handleRegister: handleRegister
}