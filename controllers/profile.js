
//Profile Requests Handler---

const handleProfile = (req, res, db) => {
	//shortening ('req.params.id' to 'id')---
	const { id } = req.params;

	//Finding user in database---
	db.select('*').from('users').where({id:id})
	.then(user=>{
		//checking if the user exist or not---
		if (user.length > 0){
			res.json(user[0])
		} 
		else {
			res.status(404).json('user not found')
		}})
	.catch(err=>console.log('error finding the user'))
}


//exporting function---
module.exports = {
	handleProfile: handleProfile
};
