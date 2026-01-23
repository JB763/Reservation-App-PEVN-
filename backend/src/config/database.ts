import 'dotenv/config';
import {PrismaPg} from '@prisma/adapter-pg'
import {PrismaClient} from '../generated/client'
import colors from 'colors';

const connectionString = `${process.env.DATABASE_URL as String}`

try {
    const url = new URL(connectionString);
    console.log(colors.blue.italic( `Conectando a la base de datos en: http://${url.hostname}:${url.port}`));
} catch (error) {
    console.error(colors.red.underline('Error al parsear DATABASE_URL:'), error);
}

const adapter = new PrismaPg({connectionString})
const prisma = new PrismaClient({adapter})

export {prisma}