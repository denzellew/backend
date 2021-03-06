// import bcrypt from 'bcrypt';
// import mongoose from 'mongoose';
// import request from 'supertest';
// import App from '@/app';
// import { PokemonDto } from '@dtos/pokemon.dto';
// import PokemonRoute from '@routes/pokemon.route';

// afterAll(async () => {
//   await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
// });

// describe('Testing Users', () => {
//   describe('[GET] /pokemon', () => {
//     it('response findAll Pokemon', async () => {
//       const pokemonRoute = new PokemonRoute();
//       const pokemon = pokemonRoute.pokemonController.pokemonService.pokemonModel;

//       pokemon.find = jest.fn().mockReturnValue([
//         {
//           _id: 1,
//           name: 'bulbasaur',
//         },
//         {
//           _id: 2,
//           name: 'charmander',
//         },
//         {
//           _id: 3,
//           name: 'squirtle',
//         },
//       ]);

//       (mongoose as any).connect = jest.fn();
//       const app = new App([pokemonRoute]);
//       return request(app.getServer()).get(`${pokemonRoute.path}`).expect(200);
//     });
//   });

//   describe('[GET] /users/:id', () => {
//     it('response findOne User', async () => {
//       const userId = 'qpwoeiruty';

//       const usersRoute = new UsersRoute();
//       const users = usersRoute.usersController.userService.users;

//       users.findOne = jest.fn().mockReturnValue({
//         _id: 'qpwoeiruty',
//         email: 'a@email.com',
//         password: await bcrypt.hash('q1w2e3r4!', 10),
//       });

//       (mongoose as any).connect = jest.fn();
//       const app = new App([usersRoute]);
//       return request(app.getServer()).get(`${usersRoute.path}/${userId}`).expect(200);
//     });
//   });

//   describe('[POST] /users', () => {
//     it('response Create User', async () => {
//       const userData: CreateUserDto = {
//         email: 'test@email.com',
//         password: 'q1w2e3r4',
//       };

//       const usersRoute = new UsersRoute();
//       const users = usersRoute.usersController.userService.users;

//       users.findOne = jest.fn().mockReturnValue(null);
//       users.create = jest.fn().mockReturnValue({
//         _id: '60706478aad6c9ad19a31c84',
//         email: userData.email,
//         password: await bcrypt.hash(userData.password, 10),
//       });

//       (mongoose as any).connect = jest.fn();
//       const app = new App([usersRoute]);
//       return request(app.getServer()).post(`${usersRoute.path}`).send(userData).expect(201);
//     });
//   });

//   describe('[PUT] /users/:id', () => {
//     it('response Update User', async () => {
//       const userId = '60706478aad6c9ad19a31c84';
//       const userData: CreateUserDto = {
//         email: 'test@email.com',
//         password: 'q1w2e3r4',
//       };

//       const usersRoute = new UsersRoute();
//       const users = usersRoute.usersController.userService.users;

//       if (userData.email) {
//         users.findOne = jest.fn().mockReturnValue({
//           _id: userId,
//           email: userData.email,
//           password: await bcrypt.hash(userData.password, 10),
//         });
//       }

//       users.findByIdAndUpdate = jest.fn().mockReturnValue({
//         _id: userId,
//         email: userData.email,
//         password: await bcrypt.hash(userData.password, 10),
//       });

//       (mongoose as any).connect = jest.fn();
//       const app = new App([usersRoute]);
//       return request(app.getServer()).put(`${usersRoute.path}/${userId}`).send(userData);
//     });
//   });

//   describe('[DELETE] /users/:id', () => {
//     it('response Delete User', async () => {
//       const userId = '60706478aad6c9ad19a31c84';

//       const usersRoute = new UsersRoute();
//       const users = usersRoute.usersController.userService.users;

//       users.findByIdAndDelete = jest.fn().mockReturnValue({
//         _id: '60706478aad6c9ad19a31c84',
//         email: 'test@email.com',
//         password: await bcrypt.hash('q1w2e3r4!', 10),
//       });

//       (mongoose as any).connect = jest.fn();
//       const app = new App([usersRoute]);
//       return request(app.getServer()).delete(`${usersRoute.path}/${userId}`).expect(200);
//     });
//   });
// });
