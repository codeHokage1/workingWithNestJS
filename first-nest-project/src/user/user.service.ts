import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  private users = [
    { id: 1, name: "Farhan", age: 23, role: "intern" },
    { id: 2, name: "Sodiq", age: 23, role: "admin" },
    { id: 3, name: "Ayomide", age: 23, role: "lead" },
    { id: 4, name: "Olawale", age: 23, role: "student" },
  ];

  create(createUserDto: CreateUserDto) {
    // let lastId= this.users.sort((a, b) => b.id - a.id)[0].id;
    const newUser = {
      id: this.users.sort((a, b) => b.id - a.id)[0].id + 1,
      ...createUserDto
    };

    this.users.push(newUser);
    return {
      message: "User created",
      data: newUser,
    };
  }

  findAll(role?: string) {
    if (role) {
      const users = this.users.filter((user) => user.role === role);
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
      data: this.users,
    };
  }

  findOne(id: number) {
    const foundUser = this.users.find(user => user.id === id);
    if(!foundUser){
      throw new NotFoundException(`User with id ${id} not found!`);
    }

    return {
      message: "User found",
      data: foundUser
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const foundUser = this.users.find(user => user.id === id);
    if(!foundUser){
      throw new NotFoundException(`User with id ${id} not found!`);
    }

    this.users = this.users.map(user => {
      if(user.id === id){
        return {...user, ...updateUserDto}
      }
      return user
    })

       
    return {
      message: "User updated",
      data: this.users.find(user => user.id === id)
    };
  }

  remove(id: number) {
    const foundUser = this.users.find(user => user.id === id);
    if(!foundUser){
      throw new NotFoundException(`User with id ${id} not found!`);
    }

    this.users = this.users.filter(user => user.id !== id);
    return {
      message: "User deleted",
      data: null
    };
  }
}
