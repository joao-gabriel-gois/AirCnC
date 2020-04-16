const Booking = require('../models/Booking');

module.exports = {
   async StorageEvent(request, response) {
      const { booking_id } = request.param;
      const booking = await Booking.findById(booking_id).populate('spot');
      
      booking.approved = true;

      await booking.save();
      const bookingUserSocket = request.connectedUsers[booking.user]; // the company user who created the spot

      if (bookingUserSocket) {
         request.io.to(bookingUserSocket).emit('booking_response', booking);
      }

      return response.json(booking);
   }
}
