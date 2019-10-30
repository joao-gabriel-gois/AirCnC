const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {
  async index(request, response) {
    const { userTechInterest } = request.query;
    const spots = await Spot.find({ techs: userTechInterest });
    return response.json(spots);
  },

  async store(request, response) {
    const { filename } = request.file;
    const { company, price, techs } = request.body;
    // as informações concernentes ao usuário (e ao contexto em geral)
    // geralmente vão em headers porque precisam estar em todas as 
    // requisições, portanto:
    const { user_id } = request.headers;
    
    const user = await User.findById(user_id);

    if (!user) {
      return response.status(400).json({ error: "User does not exists" });
    }

    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      company,
      techs: techs.split(',').map(tech => tech.trim()),
      price 
    }) 
    return response.json(spot);
  },
}
