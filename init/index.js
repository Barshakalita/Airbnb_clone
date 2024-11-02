if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "../.env" });
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const dburl=process.env.ATLASDB_URL;


main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dburl);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data=initData.data.map((obj)=>({...obj,owner:"6725e5e8f398725fb98cd8ea"}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();