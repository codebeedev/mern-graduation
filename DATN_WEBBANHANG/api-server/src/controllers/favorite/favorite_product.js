const { default: mongoose } = require("mongoose");
const favorite_productModel = require("../../models/favorite_product.model");

module.exports.getToListFavorite = async (req, res) => {
    try {
        const data = await favorite_productModel.find({ user_id: req?.params?.id });
        return res.status(200).json({ message: 'Successfully!', data })

    } catch (error) {
        return res.status(400).json({ error: error })
    }
}

module.exports.addToListFavorite = async (req, res) => {
    const product = req?.body;
    const { user_id, product_id } = product;

    const favoriteProduct = new favorite_productModel(product);
    console.log('favoriteProduct', favoriteProduct)

    try {
        // console.log('product', product);
        console.log(user_id, product_id);


        const favoriteListUserID = await favorite_productModel.findOne({ user_id, product_id })
        console.log('favoriteListUserID', typeof favoriteListUserID);
        console.log('favoriteListUserID', typeof favoriteListUserID?.length);


        if (favoriteListUserID?.length) {
            return res.status(400).json({ message: 'Đã tồn tại' })
        } else {
            await favoriteProduct.save();
            return res.status(201).json(favoriteProduct);
        }
        // const favoriteProduct = favoriteListUserID?.filter(product => String(product.product_id) === String(product_id));

        // if (Array.isArray(favoriteProduct) && favoriteProduct.length === 0) {
        //     // const productAdd = { ...product, favorite: `${user_id}-${product_id}` }
        //     // const result = await favorite_productModel.insertMany(productAdd, { forceServerObjectId: true });
        //     // await newProduct.save();
        //     const result = await favorite_productModel.create(product);
        //     // const result = await favorite_productModel.create(product);
        //     if (!result || result === 'null')
        //         return res.status(400).json({ error: error })
        //     return res.json({ data: result });
        // }

    } catch (error) {
        return res.status(400).json({ error: error })
    }
}

module.exports.deleteToListFavorite = async (req, res) => {
    try {
        await favorite_productModel.findOneAndRemove({ _id: req?.params?.id });
        return res.status(200).json({ message: 'Successfully!' })

    } catch (error) {
        return res.status(400).json({ error: error })
    }
}
