const layoutStyles = [
  {
    name: 'Flex_Centered',
    description: 'Centered Flex Layout',
    theme: 'Basic Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: flex; justify-content: center; align-items: center; border: 1px solid #ccc; background: #f9f9f9;'
  },
  {
    name: 'Flex_RowSpace',
    description: 'Row Space Between',
    theme: 'Basic Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: flex; justify-content: space-between; align-items: center; border: 2px solid #ddd; background: #eee;'
  },
  {
    name: 'Grid_2Cols',
    description: '2 Columns Grid',
    theme: 'Basic Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: grid; grid-template-columns: 1fr 1fr; border: 1px solid #aaa; background: #fafafa;'
  },
  {
    name: 'Grid_3Rows',
    description: '3 Rows Grid',
    theme: 'Basic Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: grid; grid-template-rows: 1fr 1fr 1fr; border: 2px dashed #bbb; background: #ddd;'
  },
  {
    name: 'Flex_Column',
    description: 'Column Flex Layout',
    theme: 'Basic Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: flex; flex-direction: column; justify-content: center; align-items: center; border: 3px solid #999; background: #ccc;'
  },
  {
    name: 'Grid_AutoFlow',
    description: 'Auto-flow Grid',
    theme: 'Basic Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: grid; grid-auto-flow: row; border: 1px solid #888; background: #e0e0e0;'
  },
  {
    name: 'Flex_Wrap',
    description: 'Flex Wrap Layout',
    theme: 'Basic Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: flex; flex-wrap: wrap; justify-content: space-around; border: 2px dotted #777; background: #f0f0f0;'
  },
  {
    name: 'Grid_Dense',
    description: 'Dense Grid Layout',
    theme: 'Basic Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: minmax(100px, auto); grid-auto-flow: dense; border: 3px double #666; background: #b0b0b0;'
  },
  {
    name: 'Flex_Gradient',
    description: 'Gradient Flex',
    theme: 'Advanced Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: flex; justify-content: center; align-items: center; background: linear-gradient(to right, #ff0000, #ffff00);'
  },
  {
    name: 'Grid_Picsum',
    description: 'Picsum Grid',
    theme: 'Advanced Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: grid; grid-template-columns: 1fr 1fr; background-image: url("https://picsum.photos/200");'
  },
  {
    name: 'Flex_Radial',
    description: 'Radial Flex',
    theme: 'Advanced Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: flex; justify-content: space-around; background: radial-gradient(circle, #4caf50, #81c784);'
  },
  {
    name: 'Grid_Diagonal',
    description: 'Diagonal Grid',
    theme: 'Advanced Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: grid; grid-template-rows: 1fr 1fr; background: linear-gradient(45deg, #2196f3, #90caf9);'
  },
  {
    name: 'Flex_Waves',
    description: 'Waves Flex',
    theme: 'Advanced Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: flex; flex-direction: column; background: linear-gradient(to right, #673ab7, #d1c4e9);'
  },
  {
    name: 'Grid_Sunset',
    description: 'Sunset Grid',
    theme: 'Advanced Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: grid; grid-template-columns: repeat(3, 1fr); background: linear-gradient(to bottom, #ff5722, #ffccbc);'
  },
  {
    name: 'Flex_NightSky',
    description: 'Night Sky Flex',
    theme: 'Advanced Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: flex; justify-content: space-between; background: linear-gradient(to top, #263238, #cfd8dc);'
  },
  {
    name: 'Grid_Mosaic',
    description: 'Mosaic Grid',
    theme: 'Advanced Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: grid; grid-template-rows: repeat(4, 1fr); background-image: url("https://picsum.photos/300"); background-size: cover;'
  },
  {
    name: 'Flex_Dawn',
    description: 'Dawn Flex',
    theme: 'Advanced Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: flex; flex-direction: row-reverse; background: linear-gradient(to left, #ff9800, #ffb74d);'
  },
  {
    name: 'Flex_Galaxy',
    description: 'Galactic Flex',
    theme: 'Cosmic Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: flex; justify-content: center; align-items: center; background: radial-gradient(circle, #000, #000, #000, #000, #fff);'
  },
  {
    name: 'Grid_Fireworks',
    description: 'Fireworks Grid',
    theme: 'Festive Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: grid; grid-template-columns: 1fr 1fr; background: linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #7fff00, #00ff00, #00ff7f, #00ffff, #007fff, #0000ff, #7f00ff, #ff00ff, #ff007f);'
  },
  {
    name: 'Flex_Ocean',
    description: 'Oceanic Flex',
    theme: 'Nature Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: flex; justify-content: space-around; background: linear-gradient(to bottom, #0077be, #00aaff);'
  },
  {
    name: 'Grid_Safari',
    description: 'Safari Grid',
    theme: 'Adventure Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: grid; grid-template-rows: 1fr 1fr; background-image: url("https://picsum.photos/400/300?image=1043"); background-size: cover;'
  },
  {
    name: 'Flex_Retro',
    description: 'Retro Flex',
    theme: 'Nostalgic Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: flex; flex-direction: column; background: repeating-linear-gradient(45deg, #ff00ff, #ff00ff 10px, #ffff00 10px, #ffff00 20px);'
  },
  {
    name: 'Grid_Cityscape',
    description: 'City Grid',
    theme: 'Urban Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: grid; grid-template-columns: repeat(3, 1fr); background-image: url("https://picsum.photos/400/300?image=1076"); background-size: cover;'
  },
  {
    name: 'Flex_Silhouette',
    description: 'Silhouette Flex',
    theme: 'Artistic Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: flex; justify-content: space-between; background: linear-gradient(to top, #000000, #ffffff);'
  },
  {
    name: 'Grid_Mystic',
    description: 'Mystic Grid',
    theme: 'Fantasy Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: grid; grid-template-rows: repeat(4, 1fr); background: radial-gradient(circle, #4a90e2, #8e44ad);'
  },
  {
    name: 'Flex_Sunset',
    description: 'Sunset Flex',
    theme: 'Scenic Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: flex; flex-direction: row-reverse; background: linear-gradient(to left, #ff6b6b, #f4e2d8);'
  },
  {
    name: 'Grid_Forest',
    description: 'Forest Grid',
    theme: 'Nature Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: grid; grid-template-columns: 1fr 2fr; background-image: url("https://picsum.photos/400/300?image=1025"); background-size: cover;'
  },
  {
    name: 'Flex_Disco',
    description: 'Disco Flex',
    theme: 'Party Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: flex; justify-content: center; align-items: center; background: radial-gradient(circle, #e040fb, #ff4081);'
  },
  {
    name: 'Flex_Clean',
    description: 'Clean Flex',
    theme: 'Professional Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: flex; justify-content: center; align-items: center; background: #f5f5f5; padding: 1rem;'
  },
  {
    name: 'Grid_Minimal',
    description: 'Minimal Grid',
    theme: 'Professional Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: grid; grid-template-columns: 1fr 1fr; background: #ffffff; padding: 1rem;'
  },
  {
    name: 'Flex_Efficient',
    description: 'Efficient Flex',
    theme: 'Professional Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: flex; flex-direction: column; background: #fafafa; padding: 1rem;'
  },
  {
    name: 'Grid_Responsive',
    description: 'Responsive Grid',
    theme: 'Professional Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: grid; grid-template-rows: auto auto; background: #f0f0f0; padding: 1rem;'
  },
  {
    name: 'Flex_Readable',
    description: 'Readable Flex',
    theme: 'Professional Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: flex; flex-direction: column; background: #e0e0e0; font-size: 18px; padding: 1rem;'
  },
  {
    name: 'Grid_MobileFriendly',
    description: 'Mobile Grid',
    theme: 'Professional Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: grid; grid-template-columns: 1fr; background: #d0d0d0; padding: 1rem;'
  },
  {
    name: 'Flex_Serene',
    description: 'Serene Flex',
    theme: 'Professional Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: flex; justify-content: space-between; background: #c0c0c0; padding: 1rem;'
  },
  {
    name: 'Grid_Balanced',
    description: 'Balanced Grid',
    theme: 'Professional Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: grid; grid-template-rows: repeat(2, 1fr); background: #b0b0b0; padding: 1rem;'
  },
  {
    name: 'Flex_Sophisticated',
    description: 'Sophisticated Flex',
    theme: 'Professional Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: flex; flex-direction: row-reverse; background: #a0a0a0; padding: 1rem;'
  },
  {
    name: 'Grid_Elegant',
    description: 'Elegant Grid',
    theme: 'Professional Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: grid; grid-template-columns: 2fr 1fr; background: #909090; padding: 1rem;'
  },
  {
    name: 'Flex_Smooth',
    description: 'Smooth Flex',
    theme: 'Professional Layouts',
    element: 'div',
    category: 'layout',
    css: 'display: flex; justify-content: center; align-items: center; background: #808080; padding: 1rem;'
  }
];
