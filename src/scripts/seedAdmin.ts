import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";
import { auth } from "../lib/auth";

async function seedAdmin() {
    try {
        console.log("***** Admin Seeding Started....")

        const adminData = {
            name: process.env.ADMIN_NAME!,
            email: process.env.ADMIN_EMAIL!,
            password: process.env.ADMIN_PASSWORD!
        }

        if (!adminData.name || !adminData.email || !adminData.password) {
            throw new Error("Admin credentials missing in .env file");
        }

        console.log("***** Checking Admin Exist or not")
        const existingUser = await prisma.user.findUnique({
            where: { email: adminData.email }
        });

        if (existingUser) {
            throw new Error("User already exists!!");
        }

        await auth.api.signUpEmail({
            body: {
                name: adminData.name,
                email: adminData.email,
                password: adminData.password,
            }
        })

        console.log("**** Admin created")
        await prisma.user.update({
            where: { email: adminData.email },
            data: {
                emailVerified: true,
                role: UserRole.ADMIN
            }
        })
        console.log("**** Email verification status updated!")
        console.log("******* SUCCESS ******")

    } catch (error) {
        console.error(error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

seedAdmin()