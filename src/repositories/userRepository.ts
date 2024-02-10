import User from "../entities/userEntity";

class UserRepository {
    async getUserById(id: number): Promise<User | null> {
        return User.findByPk(id);
    }

    async createUser(user: Partial<User>): Promise<User> {
        console.log(user)
        const newUser = await User.create(user);
        console.log(newUser)
        return newUser;
    }

    // login
    async getUserByEmail(email: string): Promise<User | null> {
        return User.findOne({
            where: {
                email: email
            }
        });
    }

    async deleteUser(id: number): Promise<number> {
        return User.destroy({
            where: {
                id: id
            }
        });
    }

    // update user return user info
    async updateUser(id: number, user: Partial<User>): Promise<User | null> {
        await User.update(user, {
            where: {
                id: id
            }
        });
        return User.findByPk(id);
    }
}

export default new UserRepository();