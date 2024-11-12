const User = require('../models/User');

const userResolvers = {
  Query: {
    users: async (_, { filter }) => {
      try {
        const query = {};

        if (filter?.name) {
          query.name = { $regex: filter.name, $options: 'i' };
        }

        if (filter?.email) {
          query.email = { $regex: filter.email, $options: 'i' };
        }

        return await User.find(query);
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch users.');
      }
    },
  },
  Mutation: {
    addUser: async (_, { name, email }) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format.');
      }

      const newUser = new User({ name, email });
      return await newUser.save();
    },

    addUsers: async (_, { users }) => {
      try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        users.forEach((user) => {
          if (!emailRegex.test(user.email)) {
            throw new Error(`Invalid email format: ${user.email}`);
          }
        });

        const addedUsers = await User.insertMany(users);
        return addedUsers;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to add users.');
      }
    },

    deleteUser: async (_, { id }) => {
      try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
          throw new Error('User not found.');
        }

        return deletedUser;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to delete user.');
      }
    },
  },
};

module.exports = userResolvers;
