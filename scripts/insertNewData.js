require('module-alias/register');
const DB = require('@helpers/DB');
const db = new DB('styles.db');

const h1Objects = [
  {
    name: 'NeonGlow',
    description: 'Neon glow effect with a futuristic theme.',
    theme: 'Futuristic',
    element: 'h1',
    category: 'Typography',
    css: `font-family: 'Orbitron', sans-serif; font-size: 200px; color: #fff; text-shadow: 0 0 20px #00ff00, 0 0 30px #00ff00, 0 0 40px #00ff00;`
  },
  {
    name: 'ElegantScript',
    description: 'Elegant script for a luxurious feel.',
    theme: 'Luxury',
    element: 'h1',
    category: 'Typography',
    css: `font-family: 'Dancing Script', cursive; font-size: 150px; color: #ffcc00; text-shadow: 2px 2px 4px #000;`
  },
  {
    name: 'RockSolid',
    description: 'Solid and bold for a rockstar vibe.',
    theme: 'Rockstar',
    element: 'h1',
    category: 'Typography',
    css: `font-family: 'Rock Salt', cursive; font-size: 100px; color: #ff4500; text-transform: uppercase; letter-spacing: 5px;`
  },
  {
    name: 'PacificWave',
    description: 'Relaxed and flowing like the Pacific.',
    theme: 'Beach',
    element: 'h1',
    category: 'Typography',
    css: `font-family: 'Pacifico', cursive; font-size: 250px; color: #1e90ff; text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);`
  },
  {
    name: 'PressStart',
    description: 'Retro gaming style.',
    theme: 'Retro',
    element: 'h1',
    category: 'Typography',
    css: `font-family: 'Press Start 2P', cursive; font-size: 300px; color: #ff0000; -webkit-background-clip: text; background-clip: text; color: transparent; background-image: linear-gradient(90deg, #ff0000, #ffff00);`
  }
];



(async () => {
  try {
/*
    const newRow = await db.insert(h1Objects);
    console.log('Inserted:', newRow);

db.remove({ type: 'section' }, { multi: true }, function (err, numRemoved) {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Number of documents removed:', numRemoved);
  }
  console.log("huh");
});
*/
    const foundRows = await db.find({});
    console.log('Found:', foundRows.length);
    console.log(foundRows);


  } catch (err) {
    console.error(err);
  }
})();
