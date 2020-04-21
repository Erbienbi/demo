'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Buildings', [
        {
          name: 'KOI Residence',
          area: 'Jakarta Selatan',
          address: 'Jl. Gunadarma Raya no 15',
          coordinate: 'https://www.google.com/maps',
          image: 'https://cdn1-production-images-kly.akamaized.net/-R-MC5UiFfF97UD8h0BCAk27E0w=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/861628/original/073424800_1429960385-3.JPG',
          OwnerId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Gandaria Residence',
          area: 'Jakarta Selatan',
          address: 'Jl. Gandaria Raya no 10',
          coordinate: 'https://www.google.com/maps/',
          image: 'https://static-id.lamudi.com/static/media/bm9uZS9ub25l/2x2x5x774x491/85e63871610b4d.jpg',
          OwnerId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Fatmawati Residence',
          area: 'Jakarta Selatan',
          address: 'Jl. Fatmawati Raya no 10',
          coordinate: 'https://www.google.com/maps/',
          image: 'https://img-ap-1.trovit.com/img1id/1i1Y1GQf1d1AT/1i1Y1GQf1d1AT.1_11.jpg',
          OwnerId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Lebak Bulus Residence',
          area: 'Jakarta Selatan',
          address: 'Jl. Lebak Bulus Raya no 10',
          coordinate: 'https://www.google.com/maps/',
          image: 'https://rumahdijual.com/attachments/depok/45375143d1576478889-kos-kos2an-di-margonda-depok-dekat-universitas-gunadarma-ui-img-20191216-wa0021.jpg',
          OwnerId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Cipete Residence',
          area: 'Jakarta Selatan',
          address: 'Jl. Cipete Raya no 10',
          coordinate: 'https://www.google.com/maps/place/North+Cipete,+Kebayoran+Baru,+South+Jakarta+City,+Jakarta/@-6.2610801,106.7961853,15z/data=!3m1!4b1!4m5!3m4!1s0x2e69f19d26b49151:0x9410fdaecca57215!8m2!3d-6.2596634!4d106.8080833',
          image: 'https://id1-cdn.pgimgs.com/listing/16298206/UPHO.89336498.V800/Rumah-Kos2an-Jakarta-Selatan-Indonesia.jpg',
          OwnerId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Menteng Rent House',
          area: 'Jakarta Pusat',
          address: 'Jl. Menteng Raya no 10',
          coordinate: 'https://www.google.com/maps/',
          image: 'https://img-ap-1.trovit.com/img1id/R1O1a1P1r15F1V/R1O1a1P1r15F1V.1_11.jpg',
          OwnerId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Kuningan Rent House',
          area: 'Jakarta Pusat',
          address: 'Jl. Kuningan Raya no 10',
          coordinate: 'https://www.google.com/maps/',
          image: 'https://ik.imagekit.io/carro/jualo/original/10281021/rumah-baru-dan-kos2an-properti-rumah-10281021.jpg?v=1492760600',
          OwnerId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Kebon Jeruk Rent House',
          area: 'Jakarta Timur',
          address: 'Jl. Kebon Jeruk Raya no 10',
          coordinate: 'https://www.google.com/maps/',
          image: 'https://static-id.lamudi.com/static/media/bm9uZS9ub25l/2x2x5x880x396/871419080455bc.jpg',
          OwnerId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Tanah Kusir Rent House',
          area: 'Jakarta Selatan',
          address: 'Jl. Tanah Kusir Raya no 10',
          coordinate: 'https://www.google.com/maps/',
          image: 'https://img.rea-asia.com/rumah123/750x1334-fit/house/ho37/3759759/original/hos3759759-rumah-di-jual-di-cipadu-tangerang-15366817611345.jpg',
          OwnerId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Cinere Rent House',
          area: 'Jakarta Selatan',
          address: 'Jl. Cinere Raya no 10',
          coordinate: 'https://www.google.com/maps/',
          image: 'https://apollo-singapore.akamaized.net/v1/files/8p32lbt3gt7c1-ID/image;s=850x0',
          OwnerId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Buildings', null, {});
  }
};
