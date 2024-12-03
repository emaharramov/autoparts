const db = require('../config/db')

const getAllProducts = async (req, res) => {
    try {
        const data = await db.query('select * from products')
        if(!data) {
            res.status(404).send({
                status: false,
                message: 'Data not found...'
            })
        }

        res.status(200).send({
            status: true,
            message: 'Products fetched...',
            data: data[0],
            length: data[0].length
        })

    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error occured...',
            error
        })
    }
}

const getProductById = async (req, res) => {
    const {id} = req.params
    try {
        const data = await db.query(`select * from products where id=${id}`)
        if(!data) {
            res.status(404).send({
                status: false,
                message: 'Data not found...'
            })
        }

        res.status(200).send({
            data: data[0]
        })

    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error occured...',
            error
        })
    }
}

const deleteProduct = async (req, res) => {
    const {id} = req.params
    try {
        const data = await db.query(`delete from products where id=${id}`)
            res.status(200).send({
                status: true,
                message: 'Product deleted...',
                data
            })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error occured...',
            error
        })
    }
}

module.exports = {getAllProducts, deleteProduct, getProductById}