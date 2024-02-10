import userRepository from "../repositories/userRepository";
import User from "../entities/userEntity";
import CustomError from "../utils/customError";
import bcrypt from "bcrypt";

class UserService {
  async getUserById(id: number): Promise<User | null> {
    return userRepository.getUserById(id);
  }

  async createUser(user: Partial<User>): Promise<User> {
    const existingUser = await userRepository.getUserByEmail(user.email as string);
    if (existingUser) {
      throw new CustomError("User already exists", 400);
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password as string, salt);


    return userRepository.createUser({
      name: user.name as string,
      email: user.email as string,
      password: user.password as string,
    });
    
  }

    // login
  async login(email:string, password:string): Promise<User | null> {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      throw new CustomError("Invalid credentials", 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new CustomError("Invalid credentials", 400);
    }
    return user;

  }

  async deleteUser(id: number): Promise<number> {
    return userRepository.deleteUser(id);
  }

  async updateUser(id: number, user: Partial<User>): Promise<User | null> {
    const existingUser = await userRepository.getUserById(id);
    if (!existingUser) {
      throw new CustomError("User not found", 404);
    }
    return userRepository.updateUser(id, user);
  }
}

export default new UserService();