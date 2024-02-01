"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // await queryInterface.createTable("users", {
        //     id: {
        //         defaultValue: Sequelize.UUIDV4,
        //         type: Sequelize.UUID,
        //         field: "id",
        //         allowNull: false,
        //         primaryKey: true,
        //     },
        //     authId: {
        //         field: "auth_id",
        //         type: Sequelize.STRING,
        //         allowNull: false,
        //         unique: true,
        //     },
        //     firstName: {
        //         field: "first_name",
        //         type: Sequelize.STRING,
        //     },
        //     lastName: {
        //         field: "last_name",
        //         type: Sequelize.STRING,
        //     },
        //     email: {
        //         field: "email",
        //         type: Sequelize.STRING,
        //     },
        //     createdAt: {
        //         field: "created_at",
        //         allowNull: false,
        //         type: Sequelize.DataTypes.BIGINT,
        //     },
        //     updatedAt: {
        //         field: "updated_at",
        //         allowNull: false,
        //         type: Sequelize.BIGINT,
        //     },
        // });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("users");
    },
};
