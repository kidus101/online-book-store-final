import jwt from 'jsonwebtoken';

export const tokenGenerator = (payload: any) => {
    const Payload = JSON.parse(JSON.stringify(payload));
    return jwt.sign(Payload, process.env.JWT_SECRET!, {
        expiresIn: '7d',
    });
    }