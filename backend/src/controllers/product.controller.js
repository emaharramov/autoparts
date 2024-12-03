const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllProducts = async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            search = '',
            manufacturerId,
            inStock
        } = req.query;

        const skip = (page - 1) * Number(limit);
        
        const where = {
            AND: [
                {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { OemNo: { contains: search, mode: 'insensitive' } },
                        { codeOfProduct: { contains: search, mode: 'insensitive' } }
                    ]
                }
            ]
        };

        if (manufacturerId) {
            where.AND.push({ manufacturerId });
        }

        if (inStock !== undefined) {
            where.AND.push({ stock: inStock === 'true' });
        }

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                skip,
                take: Number(limit),
                where,
                include: {
                    manufacturer: {
                        select: {
                            name: true
                        }
                    }
                },
                orderBy: {
                    name: 'asc'
                }
            }),
            prisma.product.count({ where })
        ]);

        res.json({
            products,
            totalPages: Math.ceil(total / Number(limit)),
            currentPage: Number(page),
            total
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: req.params.id },
            include: {
                manufacturer: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const createProduct = async (req, res) => {
    try {
        const {
            OemNo,
            codeOfProduct,
            image,
            name,
            price,
            priceWithKDV,
            discount,
            iskonto,
            manufacturerId,
            stock
        } = req.body;

        const existingProduct = await prisma.product.findUnique({
            where: { OemNo }
        });

        if (existingProduct) {
            return res.status(400).json({ message: 'Product with this OEM number already exists' });
        }

        const product = await prisma.product.create({
            data: {
                OemNo,
                codeOfProduct,
                image,
                name,
                price,
                priceWithKDV,
                discount,
                iskonto,
                manufacturerId,
                stock: stock ?? true
            },
            include: {
                manufacturer: {
                    select: {
                        name: true
                    }
                }
            }
        });

        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const {
            OemNo,
            codeOfProduct,
            image,
            name,
            price,
            priceWithKDV,
            discount,
            iskonto,
            manufacturerId,
            stock
        } = req.body;

        const existingProduct = await prisma.product.findUnique({
            where: { id: req.params.id }
        });

        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (OemNo && OemNo !== existingProduct.OemNo) {
            const duplicateOem = await prisma.product.findUnique({
                where: { OemNo }
            });

            if (duplicateOem) {
                return res.status(400).json({ message: 'Product with this OEM number already exists' });
            }
        }

        const product = await prisma.product.update({
            where: { id: req.params.id },
            data: {
                OemNo,
                codeOfProduct,
                image,
                name,
                price,
                priceWithKDV,
                discount,
                iskonto,
                manufacturerId,
                stock
            },
            include: {
                manufacturer: {
                    select: {
                        name: true
                    }
                }
            }
        });

        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        await prisma.product.delete({
            where: { id: req.params.id }
        });

        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        if (err.code === 'P2025') {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
