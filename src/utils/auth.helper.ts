import * as JWT from 'jsonwebtoken';

export const verifyToken = (token: string): any => {
  try {
    return JWT.verify(token, process.env.APP_JWT_SECRET as string);
  } catch (err) {
    throw err;
  }
};

export const signToken = (id: number, email: string): string => {
  try {
    const token = JWT.sign(
      { sub: { id: id, email: email } },
      process.env.APP_JWT_SECRET as string,
      { expiresIn: '1h' },
    );
    return token;
  } catch (error) {
    throw error;
  }
};
