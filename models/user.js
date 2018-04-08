export default (sequelize, DataTypes) => {
 const User = sequelize.define("user", {
   username: {
     type: DataTypes.STRING,
     unique: {
       args: true,
       msg: "This username is taken."
     },
     validate: {
       isAlphanumeric: {
         args: true,
         msg: "Username can only contain letters and numbers."
       },
       len: {
         args: [3, 20],
         msg: "Username must be between 3 and 20 characters."
       },

     }
   },
   email: {
     type: DataTypes.STRING,
     unique: {
       args: true,
       msg: "There is already an account linked to this email."
     },
     validate: {
       isEmail: {
         args: true,
         msg: "Invalid email address."
       }
     }
   },
   password: {
     type: DataTypes.STRING,
   }
 });

 User.associate = (models) => {
   //  Belong to many is an N:M relationship ( user can belong to more than one team )
   User.belongsToMany(models.Team, {
     through:'member',
     foreignKey: {
       name: 'userId',
       field: 'user_id'
     },
   });

   User.belongsToMany(models.Channel, {
     through: 'channel-member',
     foreignKey: {
       name: 'userId',
       field: 'user_id'
     }
   });
 };

 return User;
};
