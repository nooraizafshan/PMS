import { ID, Query } from 'node-appwrite';
import { users } from '../appwrite.config';

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create
    (ID.unique(),
     user.email,
     user.phone,
     undefined,
     user.name)
    // Add logic for creating a user if needed
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([
        Query.equal('email', user.email)
      ]);
      return documents.users[0]; // Assuming 'users' is the array of user documents
    }
  }
};
