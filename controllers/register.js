
//Register Requests Handler---

const handleRegister = (req, res, db, bcrypt) => {
	//shortening (req.body.name etc)--- 
	const { name, email, password } = req.body;
	
	//hashing the password---
	const hash = bcrypt.hashSync(password, 10);


	//Checking if input is in correct format---
	if (password.length>0 && name.length>0 && email.includes("@")){
		//inserting email & password hash into login tables---
		db.transaction(trx => {
			trx.insert({
				email: email,
				hash: hash
			})
			.into('login')
			.returning('email')
			.then(loginEmail=> {
				//inserting new user into database( using (trx) instead of (db) )---
				return trx('users').returning('*')
				.insert({
					email: loginEmail[0],
					name: name,
					joined: new Date()
				}).then(registeredUser => {
					res.json(registeredUser[0]);
				})
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
		.catch(err => res.status(400).json('unable-to-register'))
		}else{
			res.status(400).json('invalid-input')
		}
}

//exporting function---
module.exports = {
	handleRegister: handleRegister
};
