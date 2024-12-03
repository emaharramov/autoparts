const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllManufacturers = async (req, res) => {
    try {
        const manufacturers = await prisma.manufacturer.findMany({
            include: {
                _count: {
                    select: { products: true }
                }
            },
            orderBy: {
                name: 'asc'
            }
        });

        res.json(manufacturers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getManufacturerById = async (req, res) => {
    try {
        const manufacturer = await prisma.manufacturer.findUnique({
            where: { id: req.params.id },
            include: {
                products: true,
                _count: {
                    select: { products: true }
                }
            }
        });

        if (!manufacturer) {
            return res.status(404).json({ message: 'Manufacturer not found' });
        }

        res.json(manufacturer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const createManufacturer = async (req, res) => {
    try {
        const { name } = req.body;

        const existingManufacturer = await prisma.manufacturer.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: 'insensitive'
                }
            }
        });

        if (existingManufacturer) {
            return res.status(400).json({ message: 'Manufacturer with this name already exists' });
        }

        const manufacturer = await prisma.manufacturer.create({
            data: { name },
            include: {
                _count: {
                    select: { products: true }
                }
            }
        });

        res.status(201).json(manufacturer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateManufacturer = async (req, res) => {
    try {
        const { name } = req.body;

        const existingManufacturer = await prisma.manufacturer.findUnique({
            where: { id: req.params.id }
        });

        if (!existingManufacturer) {
            return res.status(404).json({ message: 'Manufacturer not found' });
        }

        if (name && name !== existingManufacturer.name) {
            const duplicateName = await prisma.manufacturer.findFirst({
                where: {
                    name: {
                        equals: name,
                        mode: 'insensitive'
                    },
                    id: {
                        not: req.params.id
                    }
                }
            });

            if (duplicateName) {
                return res.status(400).json({ message: 'Manufacturer with this name already exists' });
            }
        }

        const manufacturer = await prisma.manufacturer.update({
            where: { id: req.params.id },
            data: { name },
            include: {
                _count: {
                    select: { products: true }
                }
            }
        });

        res.json(manufacturer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteManufacturer = async (req, res) => {
    try {
        const manufacturer = await prisma.manufacturer.findUnique({
            where: { id: req.params.id },
            include: {
                _count: {
                    select: { products: true }
                }
            }
        });

        if (!manufacturer) {
            return res.status(404).json({ message: 'Manufacturer not found' });
        }

        if (manufacturer._count.products > 0) {
            return res.status(400).json({ 
                message: 'Cannot delete manufacturer with existing products. Please delete or reassign products first.',
                productCount: manufacturer._count.products
            });
        }

        await prisma.manufacturer.delete({
            where: { id: req.params.id }
        });

        res.json({ message: 'Manufacturer deleted successfully' });
    } catch (err) {
        console.error(err);
        if (err.code === 'P2025') {
            return res.status(404).json({ message: 'Manufacturer not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

const getManufacturerProducts = async (req, res) => {
    try {
        const manufacturer = await prisma.manufacturer.findUnique({
            where: { id: req.params.id },
            include: {
                products: {
                    orderBy: {
                        name: 'asc'
                    }
                }
            }
        });

        if (!manufacturer) {
            return res.status(404).json({ message: 'Manufacturer not found' });
        }

        res.json({
            id: manufacturer.id,
            name: manufacturer.name,
            products: manufacturer.products
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllManufacturers,
    getManufacturerById,
    createManufacturer,
    updateManufacturer,
    deleteManufacturer,
    getManufacturerProducts
};
