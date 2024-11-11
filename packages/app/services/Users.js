const UserRepository = require('../repositories/Users')

class UsersService{

    /**
    * Checks if provided email exists in the user collections
    * @param {string} email
    * @returns {Promise<boolean>} true if email already exists and else false
    **/
    async emailRecordExits(email){
        try{
            const userRef = await UserRepository.findOne({email}).exec();
            return !!userRef
        }catch(err){
            throw err;
        }
    };


    /**
    * Fetches all the users
    **/
    async fetchUsers(){
        try{
            const users = await UserRepository.find().exec();
            return {data : users}
        }catch (err) {
            throw err;
        }
    };

    async createUser(user) {
        try {
        const { email, firstName, lastName, password } = user;
        const newUser = await UserRepository.NewUser({ email, firstName, lastName, password });
        if (!newUser) return null;
        const createdUser = new UserRepository(newUser);
        const result = await createdUser.save();
        return result;
        } catch (err) {
        throw err;
        }
    };

    /**
    * Fetches user by user id
    * @param {string} userId - User Id of user
    **/
    async fetchUserFromId(userId) {
        try {
        const user = await UserRepository.findById(userId).exec();
        return user || null;
        } catch (err) {
        throw err;
        }
    };


    async updatePasswordbyUser(user, hashNewPassword) {
        try {
          user.password = hashNewPassword;
          user.updatedAt = Date.now();
          await user.save();
          return true;
        } catch (err) {
          throw err;
        }
      };


      async verifyUser(user) {
        try {
          user.isVerified = true;
          await user.save();
          return true;
        } catch (err) {
          throw err;
        }
      };


      async updateUser(updateProfile, user) {
        try {
          const { firstName, lastName } = updateProfile;
          user.firstName = firstName;
          user.lastName = lastName;
          user.updatedAt = Date.now();
          await user.save();
          return true;
        } catch (err) {
          throw err;
        }
      };


      async deleteUserAccount(userId) {
        const session = await mongoose.startSession();
        
        const isReplicaSet = (await mongoose.connection.db.admin().serverStatus()).repl?.setName;
      
        if (isReplicaSet) {
          session.startTransaction();
        }
      
        try {
          const user = await UserRepository.findByIdAndDelete(userId).session(isReplicaSet ? session : null).exec();
          if (!user) return null;
      
          await Subscriptions.deleteMany({ user: user._id }).session(isReplicaSet ? session : null).exec();
          await Keys.deleteMany({ user: user._id }).session(isReplicaSet ? session : null).exec();
      
          if (isReplicaSet) {
            await session.commitTransaction();
          }
        } catch (err) {
          if (isReplicaSet) {
            await session.abortTransaction();
          }
          throw err;
        } finally {
          session.endSession();
        }
      };
}

module.exports = UsersService;