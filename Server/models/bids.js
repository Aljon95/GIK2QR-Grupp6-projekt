module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'bids',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            amount: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            timeStamp: DataTypes.DATE,
        },
        {underscored: true}
    );
};