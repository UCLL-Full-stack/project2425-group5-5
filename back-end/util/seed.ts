import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

const main = async () => {
    await prisma.bugReport.deleteMany
    await prisma.user.deleteMany


    const userAdmin = await prisma.user.create({
        data: {
            username: "admin",
            password: "genericpassword",
            usertype: "admin" //admin | user
        }
    })

    const userBlahooga = await prisma.user.create({
        data:{
            username: "blahooga",
            password: "noinspirationforpasswodrs",
            usertype: "user",
            bugReport: {
                create: {
                    title: "stuff brokey ;-;",
                    description: "it no run anymore :3",
                    resolved: false
                },
            }
        }
    })
}

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();