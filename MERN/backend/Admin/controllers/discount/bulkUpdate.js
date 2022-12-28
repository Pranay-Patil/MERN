const Product = require("../../models/Product");


module.exports.bulkUpdate = async (req, res) => {
  let myproducts = req.body;
  myproducts.map((item)=>{
    item.price = parseInt(item.price)
    item.quantity = parseInt(item.quantity)
    
  })
  await Product.insertMany(myproducts)
    .then((value) => {
      console.log("Saved data Successfully in database");
    })
    .catch((error) => {
      console.log(error);
    });
};


