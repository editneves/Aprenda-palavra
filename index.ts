import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function create(word: string, translation: string) {
    const createUser = await prisma.words.create({
        data: { word: word, translation: translation },
    })
}

async function main() {
    const lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('words.txt')
    });

    lineReader.on('line', (line: string) => {

        const splitted = line.split(",");
        console.log(splitted)
        create(splitted[0], splitted[1])
    });
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })