module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;

  const AlbumArtist = sequelize.define(
    "albumartists",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        albumId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "albums",
                key: "id",
            },
        },
        artistId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "artists",
                key: "id",
            }
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
  );

  return AlbumArtist;
};
