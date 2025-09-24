'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TravelPackages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      destination_name: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      duration_days: {
        type: Sequelize.INTEGER
      },
      original_price: {
        type: Sequelize.INTEGER
      },
      current_price: {
        type: Sequelize.INTEGER
      },
      discount_percentage: {
        type: Sequelize.INTEGER
      },
      available_slots: {
        type: Sequelize.INTEGER
      },
      departure_date: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.TEXT
      },
      image_url: {
        type: Sequelize.STRING
      },
      categories: {
        type: Sequelize.JSON
      },
      inclusions: {
        type: Sequelize.JSON
      },
      itinerary: {
        type: Sequelize.JSON
      },
      preparation_docs: {
        type: Sequelize.JSON
      },
      preparation_clothing: {
        type: Sequelize.JSON
      },
      preparation_essentials: {
        type: Sequelize.JSON
      },
      preparation_electronics: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TravelPackages');
  }
};