const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const models = require("../models");

router.post("/create", validateJWT, async (req, res) => {
  const { title, slip, entry, userId, movieId } = req.body.ticket;

  try {
    await models.TicketModel.create({
      title: title,
      slip: slip,
			entry: entry,
      userId: userId,
			movieId: movieId
    }).then((post) => {
      res.status(201).json({
        post: post,
        message: "post created",
      });
    });
  } catch (err) {
    res.status(500).json({
      error: `Failed to create post: ${err}`,
    });
  }
});

router.get("/mine", async (req, res) => {
  try {
    await models.UserModel.findAll({
      include: [
        {
          model: models.TicketModel
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
	models.TicketModel.update(req.body, {
			where: {
					id: req.params.id
			}
	})
			.then(edit => res.status(200).json(edit))
			.catch(err => res.status(500).json({ error: err }))
});

router.delete('/delete/:id', async (req, res) => {
	
		try {
			const query = await models.TicketModel.destroy({
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
	
module.exports = router;
