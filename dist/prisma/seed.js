"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Iniciando seed de contactos generales...');
    const generalContacts = [
        { name: 'Ambulancia (SAMU)', phone: '131', category: client_1.ContactCategory.GENERAL },
        { name: 'Bomberos', phone: '132', category: client_1.ContactCategory.GENERAL },
        { name: 'Carabineros', phone: '133', category: client_1.ContactCategory.GENERAL },
        { name: 'PDI (Investigaciones)', phone: '134', category: client_1.ContactCategory.GENERAL },
    ];
    for (const contact of generalContacts) {
        await prisma.contact.upsert({
            where: { id: `general-${contact.phone}` },
            update: {},
            create: {
                name: contact.name,
                phone: contact.phone,
                category: contact.category,
            },
        });
    }
    for (const contact of generalContacts) {
        const exists = await prisma.contact.findFirst({
            where: { phone: contact.phone, category: client_1.ContactCategory.GENERAL }
        });
        if (!exists) {
            await prisma.contact.create({ data: contact });
            console.log(`Creado: ${contact.name}`);
        }
        else {
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
//# sourceMappingURL=seed.js.map