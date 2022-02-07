const { green, red } = require("chalk");
const { db } = require("./server/db");

const Student = require('./server/db/models/student')
const Campus = require('./server/db/models/campus')

const campuses = [{
  name: 'Hogwarts School of Witchcraft and Wizardry',
  address: 'Highlands of Scotland',
  description: 'Hogwarts School is located in the Highlands of Scotland is home to 4 different houses, Gryffindor, Rawenclaw, Hufflepuff and Slytherin. Established around the 10th century, Hogwarts is considered to be one of the finest magical institutions in the wizarding world. The school\'s motto is Draco Dormiens Nunquam Titillandus, which, translated from Latin, means "Never tickle a sleeping dragon',
  imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWkjaCBEWYnzTjKDIJTZgQH3JAkjgnfkZYOdLHyoD-iEXxPxqUz-SrdMT8g8QNb5O4i0o&usqp=CAU'
}, {
  name: 'Durmstrang Institute',
  address: 'Northern Europe',
  description: 'Notorious for prominently featuring the Dark Arts in its curriculum. It accepts international students but no muggle borns. Durmstrang was founded during the Middle Ages by the great Bulgarian witch Nerida Vulchanova, who served as the first head of the school.',
  imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/hostedimages/1379784546i/458927._SX540_.jpg'
}, {
  name: 'Ilvermorny School of Witchcraft and Wizardry',
  address: 'Massachusetts',
  description: 'The American wizarding school, located on Mount Greylock in Massachusetts. It accepts students from all over North America. Students of this school, as at Hogwarts in Scotland, are sorted into four houses. Founded in the 17th century by a runaway Irish witch named Isolt Sayre and her No-Maj husband James Steward'
},
{
  name: 'Beauxbatons Academy of Magic',
  address: 'Pyrenees mountains',
  description: 'A french magical school for wizards and witches. Most famous student is Nicholas Flamel who discovered the Philosophers stone. The school takes many of its wizarding students from France, as well as large numbers from Spain, Portugal, the Netherlands, Luxembourg, and Belgium.The school\'s coat of arms consisted of two golden wands crossed over one another, each shooting three stars.',
  imageUrl: 'https://64.media.tumblr.com/5f6c98a599c8916fd32e8f257ed42fe6/tumblr_n842hvlZBs1tfzbwfo1_500.png'
}];

const students = [{
  firstName: 'Harry',
  lastName: 'Potter',
  email: 'harrypotter@gmail.com',
  gpa: 3.5,
  imageUrl: 'https://www.irishtimes.com/polopoly_fs/1.3170107.1501253408!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg',
  campusId: 1
}, {
  firstName: 'Sandra',
  lastName: 'Magnusdottir',
  email: 'sandra@gmail.com',
  gpa: 2.1,
  campusId: 1
}, {
  firstName: 'Ron',
  lastName: 'Weasley',
  email: 'ronweasley@gmail.com',
  gpa: 4.0,
  imageUrl: 'https://media.harrypotterfanzone.com/ron-weasley-chamber-of-secrets-portrait-2.jpg',
  campusId: 1
},{
  firstName: 'Hermione',
  lastName: 'Granger',
  email: 'hermionegranger@gmail.com',
  gpa: 4.0,
  imageUrl: 'https://i.insider.com/60772a1742061500181757bc?width=700',
  campusId: 1
},
{
  firstName: 'Viktor',
  lastName: 'Krum',
  email: 'krumster@gmail.com',
  gpa: 4.0,
  imageUrl: 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/17/1493291731-viktor-krum.jpg',
  campusId: 2
},
{
  firstName: 'Lord',
  lastName: 'Voldemort',
  email: 'badVoldie@gmail.com',
  gpa: 4.0,
  imageUrl: 'https://media.wired.co.uk/photos/606dabdf73af541e6269532b/16:9/w_2560%2Cc_limit/Voldemort1.jpg'
},
{
  firstName: 'Fleur',
  lastName: 'Delacour',
  email: 'fdelacour@gmail.com',
  gpa: 3.0,
  imageUrl: 'https://images.ctfassets.net/usf1vwtuqyxm/1FGP9adjbqe4Q8AgGaIQIC/1de41e9d4dd4eb2de0a63fe369989fe5/FleurDelacour_WB_F4_FleurDelacourCloseup_Still_080615_Land.jpg',
  campusId: 4
},
{
  firstName: 'Neville',
  lastName: 'Longbottom',
  email: 'nelly@gmail.com',
  gpa: 3.0,
  imageUrl: 'https://www.thelist.com/img/gallery/the-actor-who-played-neville-longbottom-grew-up-to-be-gorgeous/leeding-the-pack-1543958372.jpg',
  campusId: 1
},
{
  firstName: 'Draco',
  lastName: 'Malfoy',
  email: 'deedeemalfoy@gmail.com',
  gpa: 2.0,
  imageUrl: 'https://pbs.twimg.com/media/Du26jEmW0AE1Yzc.jpg',
  campusId: 1
},
{
  firstName: 'Gellert',
  lastName: 'Grindelwald',
  email: 'gelly@gmail.com',
  gpa: 4.0,
  imageUrl: 'https://i.insider.com/5a0db8fc91533200018b48e4?width=1000&format=jpeg&auto=webp]',
  campusId: 2
}]

const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(campuses.map(campus => {
      return Campus.create(campus);
    }));
    await Promise.all(students.map(student => {
      return Student.create(student);
    }));
    const dummyCampuses = [...Array(100)].map((campus) => (
      {
        name: 'Magical School',
        address: 'Fairyland',
        email: 'dummy@gmail.com',
        description: 'Secret school'
      }
    ))
    await Campus.bulkCreate(dummyCampuses, {updateOnDuplicate: ['id'] });
    const dummyStudents = [...Array(100)].map((student) => (
      {
        firstName: 'Witch',
        lastName: 'Dragonlady',
        email: 'dragonlady@gmail.com',
        gpa: 2.0
      }
    ))
    await Student.bulkCreate(dummyStudents, {updateOnDuplicate: ['id'] });
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch(err => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
