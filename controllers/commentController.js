const Express = require('express');
const router = Express.Router();
let validateJWT = require('../middleware/validate-jwt');
const models = require('../models');



router.post('/create', validateJWT, async (req, res) => {
  const { title, date, entry } = req.body.comment;
  
	try {
  await models.CommentModel.create({
		title: title,
		date: date,
    entry: entry,
		userId: req.user.id   
  })
    .then(
			post => {
				res.status(201).json({
					post: post,
					message: 'Comment created'
				});
			}
		)
  } catch (err) {
    res.status(500).json({ 
			error: `Failed to create comment: ${err}` 
		});
	}
  })

	
	router.get("/all", async (req, res) => {
		try {
			await models.UserModel.findAll({
				include: [
					{
						model: models.CommentModel
					}
						]
					
					 })
			.then((user) => {
				res.status(200).json({
					user: user,
				});
			});
		} catch (err) {
			res.status(500).json({
				error: `Failed to retrieve users: ${err}`,
			});
		}
	});

	router.put('/update/:id', (req, res) => {
		models.CommentModel.update(req.body, {
				where: {
						id: req.params.id,
						
				}
		})
				.then(edit => res.status(200).json(edit))
				.catch(err => res.status(500).json({ error: err }))
	});
	
	router.delete('/delete/:id', async (req, res) => {
	
		try {
			const query = await models.CommentModel.destroy({
				where: {
					id: req.params.id,
					userId: req.user.id
				}
			})
			
			res.status(200).json(query)
		} catch (err) {
			res.status(500).json({error: err})
		}
	})


module.exports = router