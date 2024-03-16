import bcrypt from 'bcrypt';

export const createHash = async (password) => {
    return await bcrypt.hash(password, bcrypt.genSaltSync(10));
}

export const compareHashAndPass = (passwordInsert, user) => {
    return bcrypt.compareSync(passwordInsert, user.password);
}