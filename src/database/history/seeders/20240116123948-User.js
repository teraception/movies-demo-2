"use strict";
const dayjs = require("dayjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.bulkInsert(
            "Users",
            [
                {
                    first_name: "User",
                    last_name: "1",
                    auth_id: "dsds",
                    email: "user1@example.com",
                    created_at: dayjs().unix(),
                    updated_at: dayjs().unix(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        queryInterface.bulkDelete("Users", null, {});
    },
};
