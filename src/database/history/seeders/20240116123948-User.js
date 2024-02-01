"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        let d = new Date();
        let seconds = Math.round(d.getTime() / 1000);
        await queryInterface.bulkInsert(
            "users",
            [
                {
                    id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
                    first_name: "User",
                    last_name: "1",
                    auth_id: "dsds",
                    email: "user1@example.com",
                    created_at: seconds,
                    updated_at: seconds,
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
        queryInterface.bulkDelete("users", null, {});
    },
};
