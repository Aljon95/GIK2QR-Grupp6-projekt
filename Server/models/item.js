module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'item',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
                validate : {
                    len:[2, 100]
                }
            },
            description: DataTypes.TEXT,
            startingPrice: DataTypes.DOUBLE,
            endDate: DataTypes.DATE,
        },
        {underscored: true}
    );
};