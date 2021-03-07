const mongoose = require("mongoose");

const countrySchema = mongoose.Schema({
  conutry: {
    type: Object,
  },
  //   capital: {
  //     type: Object,
  //   },
  //   iso: {
  //     type: String,
  //   },
  //   cover: {
  //     type: String,
  //   },
  //   description: {
  //     type: Object,
  //   },
  //   sight_1: {
  //     type: Object,
  //   },
  //   sight_2: {
  //     type: Object,
  //   },
  //   sight_3: {
  //     type: Object,
  //   },
  //   sight_4: {
  //     type: Object,
  //   },
  //   sight_5: {
  //     type: Object,
  //   },
  //   sight_6: {
  //     type: Object,
  //   },
});

module.exports = mongoose.model("Country", countrySchema);
