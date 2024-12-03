const { z } = require('zod');
const validate = require('../validate');

const manufacturerSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters')
        .regex(/^[a-zA-Z0-9\s-]+$/, 'Name can only contain letters, numbers, spaces, and hyphens')
        .trim()
});

const idSchema = z.object({
    id: z.string().uuid('Invalid manufacturer ID')
});

module.exports = {
    createManufacturerValidation: validate(manufacturerSchema),
    updateManufacturerValidation: validate(z.object({
        ...manufacturerSchema.shape,
        ...idSchema.shape
    })),
    manufacturerIdValidation: validate(idSchema)
};
