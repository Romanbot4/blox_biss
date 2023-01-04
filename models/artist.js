module.exports = (sequelize, Sequelize) => {

    const {DataTypes} = Sequelize;
    const artist = sequelize.define(
      "artist",
      {
        id: {
          type: DataTypes.TEXT,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        mmName: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        images: {
          type: DataTypes.ARRAY(DataTypes.JSON),
          allowNull: false,
          length: 8,
        },
        genres: {
          type: DataTypes.ARRAY(DataTypes.TEXT),
          allowNull: false,
        },
        gender: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        followers: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        externalIds: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        addedOn: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: DataTypes.NOW,
        },
        modifiedOn: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        timestamps: false,
      },
  );

  return artist;
};
