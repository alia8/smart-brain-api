const handleSignIn=(req,res,bcrypt,db)=>{
	const {email,password}=req.body;
	if(!email || !password)
		return res.status(400).json('incorrect form submission');
	db('login').where({
		email:req.body.email
	}).select('email','hash')
		.returning('*')
		.then(user=>{
				const isValid=bcrypt.compareSync(password, user[0].hash);
				if(isValid)
				{
					return db.select('*').from('users')
					   .where('email','=',email)
					   .then(user=>{
					   	res.json(user[0]);
					   })
						.catch(err=>res.status(400).json('unable to get user'))
				}
				else
				{
					return res.status(400).json('Wrong Credentials');
				}

		})
		.catch(err=>res.status(400).json('Wrong Credentials'))

	
}
module.exports={
	handleSignIn:handleSignIn
};