import { Request, Response } from "express";
import userService from "../services/userService";
import { tokenGenerator } from "../utils/tokenGenerator";


class UserController {
  async create(req: Request, res: Response) {
    const user = await userService.createUser(req.body);
    const token = tokenGenerator(user);
    res.json({
        message: "User created",
        data:user,
        token:token
        });
    
  }

  async login(req: Request, res: Response) {
    const user = await userService.login(req.body.email, req.body.password);
    const token = tokenGenerator(user);
    res.json({
        message: "User logged in",
        data:user,
        token:token
        });
  }
}

export default new UserController();