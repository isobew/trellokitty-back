import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import User from './User.js'; 

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    status: {
        type: DataTypes.ENUM('pendente', 'em andamento', 'concluída'),
        defaultValue: 'pendente',
    }
});

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = Task;
