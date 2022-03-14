module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'items',
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
            price: DataTypes.DOUBLE
        },
        {underscored: true}
    );
};