const { Router } = require('express');
const router = Router();
const model = require("../model/lawyer")
const uploads = require('../middleware/multer'); 

router.put("/updateproduct/:updateid", uploads.single('image'), async (req, res) => {
    const { updateid } = req.params;
    const { name,phonenumber,district,password,gmail,category } = req.body;

    try {
        let image = ''; 
        if (req.file) {
            image = req.file.filename; 
        }
     
        const existingProduct = await model.findById(updateid);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (image !== '') {
            existingProduct.image = image;
        }

        existingProduct.name=name
        existingProduct.phonenumber=phonenumber
        existingProduct.district=district
        existingProduct.password=password
        existingProduct.category=category
        existingProduct.gmail=gmail


  
        const updatedProduct = await existingProduct.save();
        console.log(updatedProduct)
         res.send(updatedProduct);

    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
