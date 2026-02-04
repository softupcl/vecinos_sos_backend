import { PrismaClient, ContactCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Iniciando seed de contactos generales...');

    const generalContacts = [
        { name: 'Ambulancia (SAMU)', phone: '131', category: ContactCategory.GENERAL },
        { name: 'Bomberos', phone: '132', category: ContactCategory.GENERAL },
        { name: 'Carabineros', phone: '133', category: ContactCategory.GENERAL },
        { name: 'PDI (Investigaciones)', phone: '134', category: ContactCategory.GENERAL },
    ];

    for (const contact of generalContacts) {
        await prisma.contact.upsert({
            where: { id: `general-${contact.phone}` }, // Usar un ID predecible para evitar duplicados en re-seeds si cambiamos a string custom, pero aquí id es uuid, así que buscaremos por nombre/teléfono
            update: {},
            create: {
                name: contact.name,
                phone: contact.phone,
                category: contact.category,
            },
        });
    }

    // Como upsert requiere un ID único y use uuid, mejor usamos un findFirst o simplemente creamos si no existen
    for (const contact of generalContacts) {
        const exists = await prisma.contact.findFirst({
            where: { phone: contact.phone, category: ContactCategory.GENERAL }
        });

        if (!exists) {
            await prisma.contact.create({ data: contact });
            console.log(`Creado: ${contact.name}`);
        } else {
            console.log(`Ya existe: ${contact.name}`);
        }
    }

    console.log('Seed completado.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
