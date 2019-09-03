'use strict';

let [dbm, type, seed] = Array(3).fill(null);

function convertArrayToSql(arr) {
  return arr.map(item => `('${item.map(v => String(v).replace(/'/g, "''")).join("', '")}')`).join(', ');
}

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  const
    mobileSizes = [
      ['Desktop', 1024],
      ['Tablet', 768],
      ['Mobile', 0],
    ],
    pages = [
      [
        '/',
        JSON.stringify({
          mainBackground: '/img/main/main-background.png',
          secondaryBackground: '/img/main/secondary-background.png',
          slidePaths: [
            '/img/main/slide/slide-1.png',
            '/img/main/slide/slide-2.png',
            '/img/main/slide/slide-3.png',
            '/img/main/slide/slide-4.png',
            '/img/main/slide/slide-5.png',
          ],
        }),
      ],
      [
        '/about',
        JSON.stringify({
          mainBackground: '/img/services/main/main-background.png',
          secondaryBackground: '/img/services/main/secondary-background.png',
          description: `
            Tandem Studio was founded by a group of enthusiasts working together to convey to all our theories and approaches to graphics and the human world any understanding of color, form, material and aesthetics in general. We tried to create a new domain in Armenian reality, which would allow us to get an open platform for all those who want to study, improve or work with us. Taking this ideology to heart, we began to look for practical solutions, 
            and by 2017 TANDEM ART STUDIO was launched. Tandem Art Studio is a graphic design firm. We turn insights, strategies, and great design into creative solutions that consumers engage with. Our process focuses on visually defining your message to connect your customer to your product or service.
            Our working team was formed quickly, uniting over the years with clear and recognizable ideas about the future and the future. Our team grows by attracting  people with new ideas and professional qualities, we are always ready for cooperation and open to any format.
            Our experience in a wide variety of design disciplines means your image will be consistent and professionally produced across all media types. So whether it’s a website, package, promotion, ad or trade show booth, they will all work together to help build a memorable and cohesive brand experience.  We're passionate about design and enjoy being part of a process that sees the relationship between our clients and their customers 
            strengthened
          `.trim().replace(/\n/g, ' ').replace(/ {2,}/g, ' '),
        }),
      ],
      [
        '/gallery',
        JSON.stringify({
          items: [
            {
              type: 'video',
              content: '',
            },
            {
              type: 'picture',
              content: '',
            },
            {
              type: 'picture',
              content: '',
            }
          ]
        }),
      ],
      [
        '/team',
        JSON.stringify({
          mainBackground: '/img/services/main/main-background.png',
          secondaryBackground: '/img/services/main/secondary-background.png',
          title: 'DESIGN. IT’S IN OUR BLOOD.. IT’S EVERYTHING.',
          description: `
            Design is different here. We come to work each day inspired by the future and eager to be a part of it.
            When people use our designs, we want them to wonder how they ever lived without them. We try hard to simplify 
            and improve our customers’ lives. Our design team is a mix of experience and drive, engineering and art. This
            young, talented team rejuvenates our product every year. They never settle for anything less than 
            unique collections of the highest quality. Tandem Art studio team of industrial and graphic 
            designers collaborate with your firm to create uniquely engaging experiences. 
            First, we get to know you and how you want to interact with your customers. Then we use 
            that knowledge to help co-create brands that will resonate in a crowded marketplace and tailor 
            innovative product solutions that work for your development, marketing and business operations.
          `.trim().replace(/\n/g, ' ').replace(/ {2,}/g, ' '),
          members: [{
            name: 'Hayk Hovhannisyan',
            avatar: '/img/team/member-1.png',
            position: 'Founder and CEO director of advertising',
          }, {
            name: 'Ani Asatryan',
            avatar: '/img/team/member-2.png',
            position: 'Art manager',
          }, {
            name: 'Babken Hovhannisyan',
            avatar: '/img/team/member-3.png',
            position: 'Founder and Product director',
          }, {
            name: 'Mishel Yeghiazaryan',
            avatar: '/img/team/member-4.png',
            position: 'Software Engineer',
          }, {
            name: 'Hayk Arshakyan',
            avatar: '/img/team/member-5.png',
            position: 'Architect Designer',
          }, {
            name: 'Jora Vardanyan',
            avatar: '/img/team/member-6.png',
            position: 'Motion Graphics Developer',
          }, {
            name: 'Paruyr Kirakosyan',
            avatar: '/img/team/member-7.png',
            position: 'Software Engineer',
          }, {
            name: 'Anna Ghazaryan',
            avatar: '/img/team/member-8.png',
            position: 'Writing and content developer',
          }, {
            name: 'Artur Hovhannisyan',
            avatar: '/img/team/member-9.png',
            position: 'Front-end developer',
          }],
        }),
      ],
      [
        '/services',
        JSON.stringify({
          mainBackground: '/img/services/main/main-background.png',
          secondaryBackground: '/img/services/main/secondary-background.png',
          description: `
            We're game changers, inspired by our clients’ businesses and our community. We believe in standing up 
            for what we believe. So our work always stands out because it always stands for something.
            Everything we do is driven by this principle to create more powerful, memorable connections 
            between your brand and your customers and fans.
          `.trim().replace(/\n/g, ' ').replace(/ {2,}/g, ' '),
          services: [{
            title: 'Strategy Planning',
            icon: '/img/services/service-1.svg',
            description: `
              Analytics & Research
              Business Strategy 
              Information Architecture
              Naming & Tagline
            `.trim().replace(/\n( *)/g, '\n'),
          }, {
            title: 'Brand Identities',
            icon: '/img/services/service-2.svg',
            description: `
              Identity Design
              Logo Creation
              Art Direction
              Photography
            `.trim().replace(/\n( *)/g, '\n'),
          }, {
            title: 'Digital Design',
            icon: '/img/services/service-3.svg',
            description: `
              Web, Mobile & App Design
              UI & UX Design
              Responsive Design
              Content Strategy
            `.trim().replace(/\n( *)/g, '\n'),
          }, {
            title: 'Graphic Design',
            icon: '/img/services/service-4.svg',
            description: `
              Multimedia Design
              Print Design
              Packaging Design
              Design
            `.trim().replace(/\n( *)/g, '\n'),
          }, {
            title: 'Advertising',
            icon: '/img/services/service-5.svg',
            description: `
              Campaign Creation
              Concept Creation
              Copywriting
              Art Direction
            `.trim().replace(/\n( *)/g, '\n'),
          }, {
            title: 'Illustration',
            icon: '/img/services/service-6.svg',
            description: `
              Advertising
              Editorial
              Publishing
              Print
            `.trim().replace(/\n( *)/g, '\n'),
          }, {
            title: 'Development',
            icon: '/img/services/service-7.svg',
            description: `
              Frontend Development
              Backend Development
              Quality Assurance
              Maintenance
            `.trim().replace(/\n( *)/g, '\n'),
          }],
        }),
      ],
      [
        '/clients',
        JSON.stringify({
          mainBackground: '/img/services/main/main-background.png',
          secondaryBackground: '/img/services/main/secondary-background.png',
          title: 'Our Clients are our priority',
          description: `
            Innovation is born from collaboration and diverse perspectives.
            We exist to serve organizations that are making a positive social impact. 
            We bring teams of creative and technical talent together to help our clients 
            achieve their mission. We work to ensure that every project reflects our client’s 
            individual needs, vision, and unique identity combined with our marketing and 
            creative guidance.Every project begins with understanding the goal. We guide 
            you through each step of our process while meeting deadlines and challenges 
            set forth to accomplish these goals. Ultimately your success is our success.
            We believe that great design and effective communication are key ingredients for 
            improving our lives and the world around us.
          `.trim().replace(/\n/g, ' ').replace(/ {2,}/g, ' '),
          clients: [{
            icon: '/img/clients/client-1.png'
          }, {
            icon: '/img/clients/client-2.png'
          }, {
            icon: '/img/clients/client-3.png'
          }, {
            icon: '/img/clients/client-4.png'
          }, {
            icon: '/img/clients/client-5.png'
          }, {
            icon: '/img/clients/client-6.png'
          }, {
            icon: '/img/clients/client-7.png'
          }, {
            icon: '/img/clients/client-8.png'
          }, {
            icon: '/img/clients/client-9.png'
          }, {
            icon: '/img/clients/client-10.png'
          }, {
            icon: '/img/clients/client-11.png'
          }, {
            icon: '/img/clients/client-12.png'
          }, {
            icon: '/img/clients/client-13.png'
          }, {
            icon: '/img/clients/client-14.png'
          }, {
            icon: '/img/clients/client-15.png'
          }, {
            icon: '/img/clients/client-16.png'
          }, {
            icon: '/img/clients/client-17.png'
          }, {
            icon: '/img/clients/client-18.png'
          }, {
            icon: '/img/clients/client-19.png'
          }, {
            icon: '/img/clients/client-20.png'
          }, {
            icon: '/img/clients/client-21.png'
          }, {
            icon: '/img/clients/client-22.png'
          }, {
            icon: '/img/clients/client-23.png'
          }, {
            icon: '/img/clients/client-24.png'
          }, {
            icon: '/img/clients/client-25.png'
          }, {
            icon: '/img/clients/client-26.png'
          }, {
            icon: '/img/clients/client-27.png'
          }],
        }),
      ],
      [
        '/contact',
        '{}',
      ],
      [
        '/contacts/details',
        '{}',
      ],
      [
        '/portfolio',
        JSON.stringify({
          rows_count: 10,
          columns_count: 10,
          row_height: '50px',
        }),
      ],
    ];

  return (
    db
      .runSql(`
        CREATE TABLE sizes (
          id SERIAL PRIMARY KEY,
          name VARCHAR(10) NOT NULL,
          starts_from SMALLINT NOT NULL
        );
      `)
      .then(() => (
        db.runSql(`
          INSERT INTO "sizes" ("name", "starts_from")
          VALUES ${convertArrayToSql(mobileSizes)}
        `)
      ))
      .then(() => (
        db.runSql(`
          CREATE TABLE pages (
            id SERIAL PRIMARY KEY,
            path VARCHAR(2048) NOT NULL,
            data JSON
          );
        `)
      ))
      .then(() => (
        db.runSql(`
          INSERT INTO "pages" ("path", "data")
          VALUES ${convertArrayToSql(pages)}
        `)
      ))
      .then(() => (
        db.runSql(`
          CREATE TABLE portfolio (
            id SERIAL PRIMARY KEY,
            title VARCHAR(200) NOT NULL,
            description TEXT NOT NULL,
            presentable_picture VARCHAR(400) NOT NULL,
            main_picture VARCHAR(400) NOT NULL,
            x_coords VARCHAR(11) NOT NULL,
            y_coords VARCHAR(11) NOT NULL,
            row_height VARCHAR(25) NOT NULL DEFAULT '50px'
          )
        `)
      ))
      .then(() => (
        db.runSql(`
          CREATE TABLE portfolio_images (
            id SERIAL PRIMARY KEY ,
            portfolio_id INT NOT NULL,
            src VARCHAR(400) NOT NULL,
            x_coords VARCHAR(11) NOT NULL,
            y_coords VARCHAR(11) NOT NULL
          )
        `)
      ))
  );
};

exports.down = function(db) {
  return (
    db
      .runSql(`
        DROP TABLE sizes
      `)
      .then(() => (
        db.runSql(`
          DROP TABLE pages
        `)
      ))
      .then(() => (
        db.runSql(`
          DROP TABLE portfolio
        `)
      ))
      .then(() => (
        db.runSql(`
          DROP TABLE portfolio_images
        `)
      ))
  );
};

exports._meta = {
  "version": 1
};
