
//SignIn Requests Handler---

const handleSignin = (req, res, db, bcrypt) =>{
	//shortening (req.body.email etc)---
	const { email, password } = req.body;

	//getting user from login table through given email---
	db.select('email', 'hash')
	.from('login')
	.where({email: email})
	.then(data => {
		//checking if password is correct or not---
		const passwordMatched = bcrypt.compareSync(password, data[0].hash);

		//if password is correct then the (if) block will execute--- 
		if (passwordMatched){
			return db.select('*')
			.from('users')
			.where({email: data[0].email})
			.then(response=> res.json(response[0]))
			.catch(err=> res.status(400).json('unable to get user'))
		}
		else {
			res.status(400).json('incorrect')
		}
	})
	.catch(err=> res.status(400).json('wrong-input'))
}


//exporting function---
module.exports = {
	handleSignin: handleSignin
};