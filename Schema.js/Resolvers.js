import Post from "../Model/Post.js";
import User from "../Model/User.js";
import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";

const resolvers = {
  Query: {
    async getPost() {
      try {
        const post = await Post.find();
        return post;
      } catch (err) {
        throw new Error(err);
      }
    },
    user:  async (_,args) => {
        const {id} =args;
     
    const user=  await User.findById(id);
      return user;
    },
  },
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // See if an old user exist with email attempting to register
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        // Throw error if that user exists
        throw new GraphQLError(
          " A user is already register with the email" + email,
          {
            extensions: {
              code: "USER_ALREADY_EXITS",
            },
          }
        );
      }

      // Encrypt password

      var encryptedPassword = await bcrypt.hash(password, 12);
      //Build out mongoose model

      const newUser = new User({
        email: email.toLowerCase(),
        username: username,
        password: encryptedPassword,
        confirmPassword: encryptedPassword,
        createAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      // Create our JWT (attach to our user model)

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      // Save our user in Mongodb

      newUser.token = token;

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },

    async login(_, { loginInput: { email, password } }) {
      // See if a user exits with the email
      const user = await User.findOne({ email });

      //check if the entered password equals the encrypted password

      if (user) {
        // Create a New token

        const token = jwt.sign(
          {
            id: user.id,
            email,
          },
          SECRET_KEY,
          { expiresIn: "1h" }
        );
        // Attach token to User model that we found above
        user.token = token;

        return {
          id: user.id,
          ...user._doc,
        };
      } else {
          // if user doesn't exist , return error
          throw new GraphQLError(
            " Incorrect Password " + password,
            {
              extensions: {
                code: "PASSWORD_INCORRECT",
              },
            }
          );

      }
    },
  },
};

export default resolvers;
