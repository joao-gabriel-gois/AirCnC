const Booking = require('../models/Booking');

module.exports = {
  async store(request, response) {
    const { user_id } = request.headers;
    const { spot_id } = request.params;
    const { date } = request.body;

    const booking = await Booking.create({
      user: user_id,
      spot: spot_id,
      date,
    });

    await booking.populate('spot').populate('user').execPopulate();
    //populating mongo db
    
    const spotOwnerSocket = request.connectedUsers[booking.spot.user];// checking if user_id is among the connection pool obj

    if (spotOwnerSocket) {
      request.io.to(spotOwnerSocket).emit('booking_request', booking);
    }

    return response.json(booking);
  }
}