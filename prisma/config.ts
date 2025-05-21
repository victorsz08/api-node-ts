import "dotenv/config";


export const config = {
    secret: process.env.JWT_SECRET || "secret"
};