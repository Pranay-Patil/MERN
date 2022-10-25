const productModel = require("../model/products");




// exports.bulkUpdate = async (req, res) => {
//   const myproducts = req.body;

//   await productModel.insertMany(myproducts)
//     .then((value) => {
//       console.log("Saved data Successfully in database");
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

exports.bulkUpdate = async (req, res) => {
  let myproducts = req.body;
  myproducts.map((item)=>{
    item.price = parseInt(item.price)
    item.quantity = parseInt(item.quantity)
    
  })
  await productModel.insertMany(myproducts)
    .then((value) => {
      console.log("Saved data Successfully in database");
    })
    .catch((error) => {
      console.log(error);
    });
};


