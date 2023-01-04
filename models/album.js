module.exports = (sequelize, Sequelize) => {
    
    const {DataTypes} = Sequelize;

    const Album = sequelize.define(
      "album",
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
          allowNull: true,
        },
        artists: {
          type: DataTypes.ARRAY(DataTypes.JSON),
          allowNull: false,
          length: 24,
        },
        totalTracks: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        images: {
          type: DataTypes.ARRAY(DataTypes.JSON),
          allowNull: false,
          length: 8,
        },
        releaseDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        externalIds: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        albumType: {
          type: DataTypes.TEXT,
          allowNull: true,
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
  
    return Album;
  };
  