'use strict';
const fs = require("fs").promises;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const travelPackages = JSON.parse(await fs.readFile('./data/travelPackages.json', 'utf-8'))
                          .map((travel) => {
                            travel.categories = JSON.stringify(travel.categories);
    travel.inclusions = JSON.stringify(travel.inclusions);
    travel.itinerary = JSON.stringify(travel.itinerary);
    travel.preparation_docs = JSON.stringify(travel.preparation_docs);
    travel.preparation_clothing = JSON.stringify(travel.preparation_clothing);
    travel.preparation_essentials = JSON.stringify(travel.preparation_essentials);
    travel.preparation_electronics = JSON.stringify(travel.preparation_electronics);
    travel.createdAt = new Date();
    travel.updatedAt = new Date();
    travel.highlights = JSON.stringify(travel.highlights)
    return travel;
                          });

    await queryInterface.bulkInsert('TravelPackages', travelPackages);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
