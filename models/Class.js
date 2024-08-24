const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    subjects: { type: [String], required: true },
    contact_info: { type: String },
    youtube: { type: String },
    userRatings: {type : [Number],default: [] },
    averageRating: {type : Number}
  });

  module.exports = mongoose.model('Class', ClassSchema);

  ClassSchema.methods.calculateAverageRating = function (){
    if(this.userRatings.length ===0 )return 0;
  return this.userRatings.reduce((sum, rating) => sum + rating, 0 )/ this.userRatings.length;
  };

  module.exports = mongoose.model('Class', ClassSchema);