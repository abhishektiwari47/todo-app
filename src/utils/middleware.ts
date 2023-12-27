import jwt from 'jsonwebtoken';

const authMiddleware = async (token: string) => {
    const SECRET = "SECRET";

    // Check if the token starts with "Bearer "
    if (!token.startsWith("Bearer ")) {
        console.error('Invalid token format');
        return null;
    }

    // Extract the token from the "Bearer " prefix
    const jwtToken = token.split(" ")[1];

    console.log("Received token:", jwtToken);

    try {
        const decoded = await jwt.verify(jwtToken, 'SECRET');
        console.log("Decoded payload:", decoded);
        return decoded;
    } catch (error) {
        console.error('Error verifying JWT:', error);
        return null;
    }
};

export default authMiddleware;
