"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("movies", {
            id: {
                type: Sequelize.INTEGER,
                field: "id",
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                field: "title",
                allowNull: false,
                type: Sequelize.STRING,
            },
            poster: {
                field: "poster",
                allowNull: false,
                type: Sequelize.STRING,
            },
            year: {
                field: "year",
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            createdAt: {
                field: "created_at",
                allowNull: false,
                type: Sequelize.NUMBER,
            },
            updatedAt: {
                field: "updated_at",
                allowNull: false,
                type: Sequelize.NUMBER,
            },
            createdById: {
                field: "created_by_id",
                type: DataType.INTEGER,
                allowNull: false,
                references: {
                    model: "users", // name of Target model
                    key: "id", // key in Target model that we're referencing
                },
                onDelete: "CASCADE",
            },
            updatedById: {
                field: "updated_by_id",
                type: DataType.INTEGER,
                allowNull: false,
                references: {
                    model: "users", // name of Target model
                    key: "id", // key in Target model that we're referencing
                },
                onDelete: "CASCADE",
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("movies");
    },
};
