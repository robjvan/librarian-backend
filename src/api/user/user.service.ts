import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repo: Repository<User>;

  getUser(id: number): Promise<User> {
    return this.repo.findOneBy({id});
  }

  getAllUsers() {
    return this.repo.find();
  }

  async deleteUser(id: number) {
    const user: User = await this.getUser(id);
    return this.repo.remove([user]);
  }
}