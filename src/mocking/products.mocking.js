import { faker } from '@faker-js/faker/locale/es';

export const generateProducts = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric(8),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(1),
        stock: faker.number.int({min: 0, max: 20}),
        departament: faker.commerce.department,
        thumbnails: faker.image.avatarLegacy()
    }
}