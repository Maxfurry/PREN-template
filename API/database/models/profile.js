module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    'Profile',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      user_id: {
        type: DataTypes.UUID
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        }
      },
      bio: {
        type: DataTypes.TEXT
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: ['^[a-z]+$', 'i']
        }
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: ['^[a-z]+$', 'i']
        }
      },
      phonenumber: {
        type: DataTypes.STRING,
        validate: {
          is: ['^[+]*[0-9]{0,}', 'i'],
        }
      },
      address: {
        type: DataTypes.STRING,
        validate: {
          is: ['^[a-z]+$', 'i']
        }
      },
      state: {
        type: DataTypes.STRING,
        validate: {
          is: ['^[a-z]+$', 'i']
        }
      },
      country: {
        type: DataTypes.STRING,
        validate: {
          is: ['^[a-z]+$', 'i']
        }
      },
      gender: {
        type: DataTypes.STRING,
        validate: {
          is: ['^[a-z]+$', 'i']
        }
      },
      emailnotification: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate: {
          isBoolean: {
            args: [true, false],
            msg: 'email notification can only be "true" or "false"'
          }
        }
      }
    },
    {}
  );
  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'Profile',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Profile;
};
