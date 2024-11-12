const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const userTypeDefs = require('./typeDefs/userTypeDefs');
const userResolvers = require('./resolvers/userResolvers');
require('dotenv').config(); 

const MONGO_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 4000; 

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: userTypeDefs,
    resolvers: userResolvers,
  });

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    const { url } = await server.listen({ port: PORT });
    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error('❌ Failed to start the server:', error);
  }
};

startServer();
