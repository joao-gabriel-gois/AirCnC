const User = require('../models/User');

module.exports = {
  //request connection always demmands async function
  async store(request, response) {
    const { email } = request.body;
    
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email }); //destructured and equal key-value
    }

    return response.json(user);
  }
};