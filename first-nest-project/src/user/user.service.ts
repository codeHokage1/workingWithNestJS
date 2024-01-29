import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  private users = [
    { id: 1, name: "Farhan", age: 23, role: "intern" },
    { id: 2, name: "Sodiq", age: 23, role: "admin" },
    { id: 3, name: "Ayomide", age: 23, role: "lead" },
    { id: 4, name: "Olawale", age: 23, role: "student" },
  ];

  async create(createUserDto: CreateUserDto) {
    // let lastId= this.users.sort((a, b) => b.id - a.id)[0].id;
    const newUser = {
      id: this.users.sort((a, b) => b.id - a.id)[0].id + 1,
      ...createUserDto
    };

    // this.users.push(newUser);
    const createdUser = await new this.userModel(newUser);
    await createdUser.save();

    return {
      message: "User created",
      data: createdUser,
    };
  }

  async findAll(role?: string) {
    if (role) {
      // const users = this.users.filter((user) => user.role === role);
      const users: any = await this.userModel.find({role});
      if(users.length === 0){
        throw new NotFoundException(`No user with role ${role} found!`);
      }
      return {
        message: "Users found",
        data: users,
      };
    }
    return {
      message: "Users found",
      data: await this.userModel.find()
    };
  }

  async findOne(id: string) {
    // const foundUser = this.users.find(user => user.id === id);
    const foundUser = await this.userModel.findOne({id});
    if(!foundUser){
      throw new NotFoundException(`User with id ${id} not found!`);
    }

    return {
      message: "User found",
      data: foundUser
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // const foundUser = this.users.find(user => user.id === id);
    const foundUser = await this.userModel.findOne({id});
    if(!foundUser){
      throw new NotFoundException(`User with id ${id} not found!`);
    }

    // this.users = this.users.map(user => {
    //   if(user.id === id){
    //     return {...user, ...updateUserDto}
    //   }
    //   return user
    // })
    await this.userModel.updateOne({id}, updateUserDto);
           
    return {
      message: "User updated",
      data: await this.userModel.findOne({id})
    };
  }

  async remove(id: number) {
    // const foundUser = this.users.find(user => user.id === id);
    const foundUser = await this.userModel.findOne({id});
    if(!foundUser){
      throw new NotFoundException(`User with id ${id} not found!`);
    }

    // this.users = this.users.filter(user => user.id !== id);
    await this.userModel.deleteOne({id});

    return {
      message: "User deleted",
      data: null
    };
  }
}
