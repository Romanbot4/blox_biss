module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;

  const Artist = sequelize.define(
    "artists",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      mmName: {
        type: DataTypes.TEXT,
        allowNull: true,
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
        allowNull: true,
      },
      followers: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      freezeTableName: true,
    }
  );

  return Artist;
};
