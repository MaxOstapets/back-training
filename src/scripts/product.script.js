import {dbConnect} from "../db/db.js"
import { Product } from "../models/product.model.js";
import { faker } from '@faker-js/faker';

async function seed(count){
    await Product.deleteMany()

    const products = Array.from({length: count}, () =>({
        id: faker.string.uuid(),
        title: faker.word.adjective(),
        count: faker.number.binary()
    }))

    console.log("PRODUCTS: ", products)
    
    await Product.insertMany({products})
}

async function main() {
    try {
        // dbConnect();
        seed(10)
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

main()