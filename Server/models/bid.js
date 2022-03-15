module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'bid',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            amount: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            }
        },
        {underscored: true}
    );
};