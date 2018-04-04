export default (sequelize, DataTypes) => {
 const User = sequelize.define("user", {
   username: {
     type: DataTypes.STRING,
     unique: true,
   },
   email: {
     type: DataTypes.STRING,
     unique: true,
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
