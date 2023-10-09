const styleObjects = [
  {
    name: 'Header1',
    description: 'Bold, large title',
    theme: 'High Contrast',
    element: 'h1',
    category: 'text',
    css: 'font-size: 48px; font-weight: 700; line-height: 1.2; color: #1a1a1a; letter-spacing: -0.5px;'
  },
  {
    name: 'Header2',
    description: 'Secondary title',
    theme: 'Moderate Contrast',
    element: 'h2',
    category: 'text',
    css: 'font-size: 36px; font-weight: 600; line-height: 1.3; color: #333; letter-spacing: -0.3px;'
  },
  {
    name: 'Header3',
    description: 'Tertiary title',
    theme: 'Subdued Contrast',
    element: 'h3',
    category: 'text',
    css: 'font-size: 28px; font-weight: 500; line-height: 1.4; color: #444; letter-spacing: -0.2px;'
  },
  {
    name: 'Header4',
    description: 'Quaternary title',
    theme: 'Soft Contrast',
    element: 'h4',
    category: 'text',
    css: 'font-size: 24px; font-weight: 400; line-height: 1.5; color: #555; letter-spacing: 0;'
  },
  {
    name: 'Header5',
    description: 'Informative text',
    theme: 'Muted Contrast',
    element: 'h5',
    category: 'text',
    css: 'font-size: 20px; font-weight: 300; line-height: 1.6; color: #666; letter-spacing: 0.2px;'
  },
  {
    name: 'Header6',
    description: 'Smallest detail',
    theme: 'Low Contrast',
    element: 'h6',
    category: 'text',
    css: 'font-size: 18px; font-weight: 200; line-height: 1.7; color: #777; letter-spacing: 0.3px;'
  }, 
  {
    name: 'Header1',
    description: 'Impactful lead',
    theme: 'Bold & Dark',
    element: 'h1',
    category: 'text',
    css: 'font-size: 50px; font-weight: 800; line-height: 1.1; color: #0D0D0D; text-transform: uppercase;'
  },
  {
    name: 'Header2',
    description: 'Subtle emphasis',
    theme: 'Elegant & Light',
    element: 'h2',
    category: 'text',
    css: 'font-size: 40px; font-weight: 500; line-height: 1.25; color: #4A4A4A; text-transform: capitalize;'
  },
  {
    name: 'Header3',
    description: 'Section lead',
    theme: 'Neutral & Balanced',
    element: 'h3',
    category: 'text',
    css: 'font-size: 32px; font-weight: 400; line-height: 1.3; color: #7D7D7D; text-decoration: underline;'
  },
  {
    name: 'Header4',
    description: 'Sub-sections',
    theme: 'Soft & Warm',
    element: 'h4',
    category: 'text',
    css: 'font-size: 28px; font-weight: 300; line-height: 1.4; color: #9C9C9C; font-style: italic;'
  },
  {
    name: 'Header5',
    description: 'Auxiliary info',
    theme: 'Cool & Calm',
    element: 'h5',
    category: 'text',
    css: 'font-size: 24px; font-weight: 200; line-height: 1.5; color: #BEBEBE; text-decoration: overline;'
  },
  {
    name: 'Header6',
    description: 'Fine print',
    theme: 'Minimal & Subtle',
    element: 'h6',
    category: 'text',
    css: 'font-size: 20px; font-weight: 100; line-height: 1.6; color: #E0E0E0; text-decoration: line-through;'
  },
  {
    name: 'Header1',
    description: 'Dominant lead',
    theme: 'Vivid & Striking',
    element: 'h1',
    category: 'text',
    css: 'font-size: 52px; font-weight: 900; line-height: 1.05; color: #212121; text-shadow: 2px 2px 4px #000;'
  },
  {
    name: 'Header2',
    description: 'Strong subhead',
    theme: 'Sharp & Clear',
    element: 'h2',
    category: 'text',
    css: 'font-size: 42px; font-weight: 700; line-height: 1.2; color: #424242; border-bottom: 2px solid #333;'
  },
  {
    name: 'Header3',
    description: 'Clear section',
    theme: 'Balanced & Neutral',
    element: 'h3',
    category: 'text',
    css: 'font-size: 34px; font-weight: 600; line-height: 1.25; color: #616161; letter-spacing: 1px;'
  },
  {
    name: 'Header4',
    description: 'Subtle topic',
    theme: 'Soft & Gentle',
    element: 'h4',
    category: 'text',
    css: 'font-size: 30px; font-weight: 500; line-height: 1.3; color: #757575; text-transform: lowercase;'
  },
  {
    name: 'Header5',
    description: 'Detail info',
    theme: 'Muted & Faded',
    element: 'h5',
    category: 'text',
    css: 'font-size: 26px; font-weight: 400; line-height: 1.35; color: #9E9E9E; font-style: oblique;'
  },
  {
    name: 'Header6',
    description: 'Fine notes',
    theme: 'Subdued & Light',
    element: 'h6',
    category: 'text',
    css: 'font-size: 22px; font-weight: 300; line-height: 1.4; color: #BDBDBD; text-decoration: underline dotted;'
  }, 
  {
    name: 'Section',
    description: 'Main container',
    theme: 'Neutral & Flexible',
    element: 'section',
    category: 'display',
    css: 'padding: 24px; background-color: #f2f2f2; border-radius: 8px;'
  },
  {
    name: 'Paragraph',
    description: 'Text block',
    theme: 'Readable & Fluid',
    element: 'p',
    category: 'text',
    css: 'font-size: 18px; line-height: 1.6; color: #4a4a4a; margin: 16px 0;'
  },
  {
    name: 'UnorderedList',
    description: 'List items',
    theme: 'Structured & Clear',
    element: 'ul',
    category: 'text',
    css: 'list-style: disc; margin-left: 40px; line-height: 1.5;'
  },
  {
    name: 'Form',
    description: 'Input area',
    theme: 'Interactive & Clean',
    element: 'form',
    category: 'input',
    css: 'padding: 16px; background: #fff; border: 1px solid #ccc; border-radius: 4px;'
  },
  {
    name: 'Table',
    description: 'Data grid',
    theme: 'Organized & Sharp',
    element: 'table',
    category: 'display',
    css: 'width: 100%; border-collapse: collapse; border: 1px solid #ddd;'
  },
  {
    name: 'Article',
    description: 'Content body',
    theme: 'Focused & Engaging',
    element: 'article',
    category: 'display',
    css: 'padding: 20px; background: #fff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);'
  },
  {
    name: 'Aside',
    description: 'Sidebar',
    theme: 'Complementary & Subtle',
    element: 'aside',
    category: 'display',
    css: 'width: 300px; padding: 16px; background: #f9f9f9; float: right;'
  },
  {
    name: 'Footer',
    description: 'Page end',
    theme: 'Subdued & Informative',
    element: 'footer',
    category: 'display',
    css: 'background: #333; color: #fff; padding: 20px; text-align: center;'
  },
  {
    name: 'Header',
    description: 'Page start',
    theme: 'Prominent & Inviting',
    element: 'header',
    category: 'display',
    css: 'background: #007bff; color: #fff; padding: 20px; text-align: center;'
  },
  {
    name: 'Nav',
    description: 'Navigation',
    theme: 'Accessible & Intuitive',
    element: 'nav',
    category: 'display',
    css: 'background: #f8f8f8; padding: 10px; border-bottom: 1px solid #ccc;'
  }, 
  {
    name: 'Section',
    description: 'Content holder',
    theme: 'Minimal & Airy',
    element: 'section',
    category: 'display',
    css: 'margin: 20px; padding: 20px; background-color: #fafafa; border: 1px solid #e0e0e0;'
  },
  {
    name: 'Paragraph',
    description: 'Text flow',
    theme: 'Crisp & Neutral',
    element: 'p',
    category: 'text',
    css: 'font-size: 17px; line-height: 1.7; color: #3c3c3c; margin: 0 0 18px 0;'
  },
  {
    name: 'UnorderedList',
    description: 'Itemized list',
    theme: 'Clean & Ordered',
    element: 'ul',
    category: 'text',
    css: 'list-style: circle; margin-left: 45px; line-height: 1.4;'
  },
  {
    name: 'Form',
    description: 'User inputs',
    theme: 'Sleek & Functional',
    element: 'form',
    category: 'input',
    css: 'margin: 15px; padding: 15px; background: #ffffff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);'
  },
  {
    name: 'Table',
    description: 'Tabular data',
    theme: 'Grid & Defined',
    element: 'table',
    category: 'display',
    css: 'width: 100%; border-spacing: 0; border: 2px solid #f1f1f1;'
  },
  {
    name: 'Article',
    description: 'Main content',
    theme: 'Engaging & Deep',
    element: 'article',
    category: 'display',
    css: 'margin: 20px; padding: 20px; background: #fff; border: 1px solid #ddd;'
  },
  {
    name: 'Aside',
    description: 'Side content',
    theme: 'Accent & Light',
    element: 'aside',
    category: 'display',
    css: 'width: 250px; padding: 10px; background: #f4f4f4; float: left;'
  },
  {
    name: 'Footer',
    description: 'Bottom info',
    theme: 'Solid & Grounded',
    element: 'footer',
    category: 'display',
    css: 'background: #222; color: #ccc; padding: 15px; text-align: center;'
  },
  {
    name: 'Header',
    description: 'Top banner',
    theme: 'Bold & Dynamic',
    element: 'header',
    category: 'display',
    css: 'background: #444; color: #eee; padding: 15px; text-align: left;'
  },
  {
    name: 'Nav',
    description: 'Menu bar',
    theme: 'Streamlined & Easy',
    element: 'nav',
    category: 'display',
    css: 'background: #eee; padding: 8px; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc;'
  }, 
  {
    name: 'Section',
    description: 'Layout block',
    theme: 'Isolated & Framed',
    element: 'section',
    category: 'display',
    css: 'padding: 30px; background-color: #eaeaea; border: 2px dashed #ccc;'
  },
  {
    name: 'Paragraph',
    description: 'Copy text',
    theme: 'Smooth & Balanced',
    element: 'p',
    category: 'text',
    css: 'font-size: 16px; line-height: 1.8; color: #2c2c2c; text-align: justify;'
  },
  {
    name: 'UnorderedList',
    description: 'Bullet list',
    theme: 'Indented & Clear',
    element: 'ul',
    category: 'text',
    css: 'list-style: square; margin-left: 50px; line-height: 1.6;'
  },
  {
    name: 'Form',
    description: 'Data entry',
    theme: 'Boxed & Centered',
    element: 'form',
    category: 'input',
    css: 'margin: 20px auto; padding: 20px; background: #fff; border: 1px solid #d1d1d1; width: 80%;'
  },
  {
    name: 'Table',
    description: 'Data matrix',
    theme: 'Zebra & Bordered',
    element: 'table',
    category: 'display',
    css: 'width: 100%; border-collapse: separate; border-spacing: 0; border: 1px solid #b1b1b1;'
  },
  {
    name: 'Article',
    description: 'Story area',
    theme: 'Focused & White',
    element: 'article',
    category: 'display',
    css: 'margin: 25px; padding: 25px; background: #ffffff; border-radius: 5px;'
  },
  {
    name: 'Aside',
    description: 'Side info',
    theme: 'Complementary & Gray',
    element: 'aside',
    category: 'display',
    css: 'width: 280px; padding: 15px; background: #f3f3f3; float: left;'
  },
  {
    name: 'Footer',
    description: 'End notes',
    theme: 'Dark & Fixed',
    element: 'footer',
    category: 'display',
    css: 'background: #1a1a1a; color: #a9a9a9; padding: 18px; text-align: center; position: fixed; bottom: 0; width: 100%;'
  },
  {
    name: 'Header',
    description: 'Intro area',
    theme: 'Bright & Sticky',
    element: 'header',
    category: 'display',
    css: 'background: #f1f1f1; color: #333; padding: 18px; text-align: center; position: sticky; top: 0; z-index: 1000;'
  },
  {
    name: 'Nav',
    description: 'Link bar',
    theme: 'Horizontal & Clean',
    element: 'nav',
    category: 'display',
    css: 'background: #dfdfdf; padding: 10px; border-top: 2px solid #ccc; border-bottom: 2px solid #ccc;'
  },
  {
    name: 'Button_Glow',
    description: 'Glow effect',
    theme: 'Luminous & Radiant',
    element: 'button',
    category: 'input',
    css: 'background-color: #ff4500; color: #fff; border: none; padding: 10px 20px; box-shadow: 0 0 10px #ff4500;',
    states: {
      hover: 'box-shadow: 0 0 20px #ff4500;',
      active: 'box-shadow: inset 0 0 10px #ff4500;',
      visited: 'box-shadow: 0 0 10px #ff4500;'
    }
  },
  {
    name: 'Button_Outline',
    description: 'Outlined',
    theme: 'Minimal & Clean',
    element: 'button',
    category: 'input',
    css: 'background: transparent; color: #007bff; border: 2px solid #007bff; padding: 10px 20px;',
    states: {
      hover: 'background: #007bff; color: #fff;',
      active: 'background: #0056b3; color: #fff;',
      visited: 'border-color: #5a75cc;'
    }
  },
  {
    name: 'Button_Rounded',
    description: 'Rounded corners',
    theme: 'Soft & Friendly',
    element: 'button',
    category: 'input',
    css: 'background-color: #28a745; color: #fff; border: none; padding: 10px 20px; border-radius: 50px;',
    states: {
      hover: 'background-color: #218838;',
      active: 'background-color: #1e7e34;',
      visited: 'background-color: #28a745;'
    }
  },
  {
    name: 'Button_Shadow',
    description: 'Drop shadow',
    theme: 'Elevated & Modern',
    element: 'button',
    category: 'input',
    css: 'background-color: #17a2b8; color: #fff; border: none; padding: 10px 20px; box-shadow: 2px 2px 4px #000;',
    states: {
      hover: 'box-shadow: 4px 4px 8px #000;',
      active: 'box-shadow: inset 1px 1px 2px #000;',
      visited: 'box-shadow: 2px 2px 4px #000;'
    }
  },
  {
    name: 'Button_Gradient',
    description: 'Gradient fill',
    theme: 'Vibrant & Colorful',
    element: 'button',
    category: 'input',
    css: 'background: linear-gradient(45deg, #ff4500, #007bff); color: #fff; border: none; padding: 10px 20px;',
    states: {
      hover: 'background: linear-gradient(45deg, #ff4500, #0056b3);',
      active: 'background: linear-gradient(45deg, #ff4500, #004999);',
      visited: 'background: linear-gradient(45deg, #ff4500, #007bff);'
    }
  },
  {
    name: 'Button_Textured',
    description: 'Textured',
    theme: 'Tactile & Engaging',
    element: 'button',
    category: 'input',
    css: 'background: url(texture.png); color: #fff; border: none; padding: 10px 20px;',
    states: {
      hover: 'background: url(texture-hover.png);',
      active: 'background: url(texture-active.png);',
      visited: 'background: url(texture.png);'
    }
  },
  {
    name: 'Anchor_Underline',
    description: 'Underlined',
    theme: 'Classic & Direct',
    element: 'a',
    category: 'text',
    css: 'color: #000; text-decoration: underline;',
    states: {
      hover: 'text-decoration: none;',
      active: 'color: #555;',
      visited: 'color: #777;'
    }
  },
  {
    name: 'Anchor_Bold',
    description: 'Bold text',
    theme: 'Strong & Assertive',
    element: 'a',
    category: 'text',
    css: 'color: #007bff; font-weight: bold;',
    states: {
      hover: 'color: #0056b3;',
      active: 'color: #004999;',
      visited: 'color: #5a75cc;'
    }
  },
  {
    name: 'Anchor_Italic',
    description: 'Italicized',
    theme: 'Elegant & Stylish',
    element: 'a',
    category: 'text',
    css: 'color: #007bff; font-style: italic;',
    states: {
      hover: 'color: #0056b3;',
      active: 'color: #004999;',
      visited: 'color: #5a75cc;'
    }
  },
  {
    name: 'Anchor_Shadow',
    description: 'Text shadow',
    theme: 'Dynamic & Layered',
    element: 'a',
    category: 'text',
    css: 'color: #007bff; text-shadow: 1px 1px 2px #000;',
    states: {
      hover: 'text-shadow: 2px 2px 4px #000;',
      active: 'text-shadow: none;',
      visited: 'text-shadow: 1px 1px 2px #000;'
    }
  },
  {
    name: 'Anchor_Glow',
    description: 'Glowing',
    theme: 'Luminous & Eye-catching',
    element: 'a',
    category: 'text',
    css: 'color: #ff4500; text-shadow: 0 0 5px #ff4500;',
    states: {
      hover: 'text-shadow: 0 0 10px #ff4500;',
      active: 'text-shadow: 0 0 3px #ff4500;',
      visited: 'text-shadow: 0 0 5px #ff4500;'
    }
  },
  {
    name: 'Anchor_Strikethrough',
    description: 'Strikethrough',
    theme: 'Unique & Unconventional',
    element: 'a',
    category: 'text',
    css: 'color: #007bff; text-decoration: line-through;',
    states: {
      hover: 'color: #0056b3; text-decoration: none;',
      active: 'color: #004999; text-decoration: line-through;',
      visited: 'color: #5a75cc; text-decoration: line-through;'
    }
  },

  {
    name: 'Button_Flat',
    description: 'Flat design',
    theme: 'Modern & Simple',
    element: 'button',
    category: 'input',
    css: 'background-color: #f1f1f1; color: #333; border: none; padding: 10px 20px;',
    states: {
      hover: 'background-color: #ddd;',
      active: 'background-color: #ccc;',
      visited: 'background-color: #f1f1f1;'
    }
  },
  {
    name: 'Button_Inverted',
    description: 'Inverted colors',
    theme: 'Contrast & Bold',
    element: 'button',
    category: 'input',
    css: 'background-color: #000; color: #fff; border: none; padding: 10px 20px;',
    states: {
      hover: 'background-color: #333;',
      active: 'background-color: #111;',
      visited: 'background-color: #000;'
    }
  },
  {
    name: 'Button_Transparent',
    description: 'See-through',
    theme: 'Subtle & Clean',
    element: 'button',
    category: 'input',
    css: 'background: transparent; color: #007bff; border: 2px solid #007bff; padding: 10px 20px;',
    states: {
      hover: 'background: #007bff; color: #fff;',
      active: 'background: #0056b3; color: #fff;',
      visited: 'border-color: #5a75cc;'
    }
  },
  {
    name: 'Button_Icon',
    description: 'Iconic',
    theme: 'Functional & Compact',
    element: 'button',
    category: 'input',
    css: 'background-color: #007bff; color: #fff; border: none; padding: 10px; width: 40px; height: 40px;',
    states: {
      hover: 'background-color: #0056b3;',
      active: 'background-color: #004999;',
      visited: 'background-color: #007bff;'
    }
  },
  {
    name: 'Button_Square',
    description: 'Squared',
    theme: 'Geometric & Sharp',
    element: 'button',
    category: 'input',
    css: 'background-color: #dc3545; color: #fff; border: none; padding: 10px 10px;',
    states: {
      hover: 'background-color: #c82333;',
      active: 'background-color: #bd2130;',
      visited: 'background-color: #dc3545;'
    }
  },
  {
    name: 'Button_Edged',
    description: 'Edged corners',
    theme: 'Angular & Defined',
    element: 'button',
    category: 'input',
    css: 'background-color: #ffc107; color: #333; border: none; padding: 10px 20px; border-radius: 0;',
    states: {
      hover: 'background-color: #e0a800;',
      active: 'background-color: #c69500;',
      visited: 'background-color: #ffc107;'
    }
  },
  {
    name: 'Button_Pill',
    description: 'Pill-shaped',
    theme: 'Smooth & Rounded',
    element: 'button',
    category: 'input',
    css: 'background-color: #17a2b8; color: #fff; border: none; padding: 10px 30px; border-radius: 50px;',
    states: {
      hover: 'background-color: #138496;',
      active: 'background-color: #117a8b;',
      visited: 'background-color: #17a2b8;'
    }
  },
  {
    name: 'Button_Dashed',
    description: 'Dashed border',
    theme: 'Quirky & Fun',
    element: 'button',
    category: 'input',
    css: 'background-color: #fff; color: #007bff; border: 2px dashed #007bff; padding: 10px 20px;',
    states: {
      hover: 'background-color: #007bff; color: #fff;',
      active: 'background-color: #0056b3; color: #fff;',
      visited: 'border-color: #5a75cc;'
    }
  },
  {
    name: 'Button_Striped',
    description: 'Striped',
    theme: 'Patterned & Engaging',
    element: 'button',
    category: 'input',
    css: 'background: repeating-linear-gradient(45deg, #007bff, #007bff 10px, #0056b3 10px, #0056b3 20px); color: #fff; border: none; padding: 10px 20px;',
    states: {
      hover: 'background: repeating-linear-gradient(45deg, #0056b3, #0056b3 10px, #004999 10px, #004999 20px);',
      active: 'background: repeating-linear-gradient(45deg, #004999, #004999 10px, #003366 10px, #003366 20px);',
      visited: 'background: repeating-linear-gradient(45deg, #007bff, #007bff 10px, #0056b3 10px, #0056b3 20px);'
    }
  },
  {
    name: 'Button_Toggle',
    description: 'Toggle state',
    theme: 'Interactive & Stateful',
    element: 'button',
    category: 'input',
    css: 'background-color: #6c757d; color: #fff; border: none; padding: 10px 20px;',
    states: {
      hover: 'background-color: #5a6268;',
      active: 'background-color: #495057;',
      visited: 'background-color: #6c757d;'
    }
  },
  {
    name: 'Button_Material',
    description: 'Material UI',
    theme: 'Google Material Design',
    element: 'button',
    category: 'input',
    css: 'background-color: #6200ea; color: #fff; border: none; padding: 10px 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);',
    states: {
      hover: 'background-color: #3700b3;',
      active: 'background-color: #3700b3; box-shadow: none;',
      visited: 'background-color: #6200ea;'
    }
  },
  {
    name: 'Button_Bootstrap',
    description: 'Bootstrap',
    theme: 'Bootstrap Default',
    element: 'button',
    category: 'input',
    css: 'background-color: #007bff; color: #fff; border: none; padding: 10px 20px; border-radius: 4px;',
    states: {
      hover: 'background-color: #0056b3;',
      active: 'background-color: #004999;',
      visited: 'background-color: #007bff;'
    }
  },
  {
    name: 'Button_Tailwind',
    description: 'Tailwind',
    theme: 'Tailwind Minimal',
    element: 'button',
    category: 'input',
    css: 'background-color: #3b82f6; color: #fff; border: none; padding: 10px 20px; rounded-md;',
    states: {
      hover: 'background-color: #2563eb;',
      active: 'background-color: #1d4ed8;',
      visited: 'background-color: #3b82f6;'
    }
  },
  {
    name: 'Button_Flatly',
    description: 'Flatly',
    theme: 'Flat Design',
    element: 'button',
    category: 'input',
    css: 'background-color: #18bc9c; color: #fff; border: none; padding: 10px 20px;',
    states: {
      hover: 'background-color: #15a589;',
      active: 'background-color: #128270;',
      visited: 'background-color: #18bc9c;'
    }
  },
  {
    name: 'Button_Apple',
    description: 'Apple',
    theme: 'Apple Design',
    element: 'button',
    category: 'input',
    css: 'background-color: #000; color: #fff; border: none; padding: 10px 20px; border-radius: 12px;',
    states: {
      hover: 'background-color: #333;',
      active: 'background-color: #111;',
      visited: 'background-color: #000;'
    }
  },
  {
    name: 'Button_Amazon',
    description: 'Amazon',
    theme: 'Amazon Orange',
    element: 'button',
    category: 'input',
    css: 'background-color: #ff9900; color: #fff; border: none; padding: 10px 20px;',
    states: {
      hover: 'background-color: #e68a00;',
      active: 'background-color: #cc7a00;',
      visited: 'background-color: #ff9900;'
    }
  },
  {
    name: 'Button_Facebook',
    description: 'Facebook',
    theme: 'Facebook Blue',
    element: 'button',
    category: 'input',
    css: 'background-color: #1877f2; color: #fff; border: none; padding: 10px 20px;',
    states: {
      hover: 'background-color: #165ba1;',
      active: 'background-color: #134c8e;',
      visited: 'background-color: #1877f2;'
    }
  },
  {
    name: 'Button_Twitter',
    description: 'Twitter',
    theme: 'Twitter Light Blue',
    element: 'button',
    category: 'input',
    css: 'background-color: #1da1f2; color: #fff; border: none; padding: 10px 20px;',
    states: {
      hover: 'background-color: #0c84d2;',
      active: 'background-color: #0a6fab;',
      visited: 'background-color: #1da1f2;'
    }
  },
  {
    name: 'Button_Linkedin',
    description: 'LinkedIn',
    theme: 'LinkedIn Blue',
    element: 'button',
    category: 'input',
    css: 'background-color: #0077b5; color: #fff; border: none; padding: 10px 20px;',
    states: {
            hover: 'background-color: #005a8e;',
      active: 'background-color: #00405d;',
      visited: 'background-color: #0077b5;'
    }
  },
  {
    name: 'Button_Instagram',
    description: 'Instagram',
    theme: 'Instagram Gradient',
    element: 'button',
    category: 'input',
    css: 'background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); color: #fff; border: none; padding: 10px 20px;',
    states: {
      hover: 'background: linear-gradient(45deg, #e08330, #d46038, #ca253f, #bb2161, #ab177f);',
      active: 'background: linear-gradient(45deg, #d5722d, #c25835, #b8263b, #aa1f5c, #9a1576);',
      visited: 'background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);'
    }
  },
  {
    name: 'Button_Glassmorphism',
    description: 'Glass Effect',
    theme: 'Glassmorphism UI',
    element: 'button',
    category: 'input',
    css: 'background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); color: #fff; border: 1px solid rgba(255, 255, 255, 0.3); padding: 10px 20px;',
    states: {
      hover: 'background: rgba(255, 255, 255, 0.2);',
      active: 'background: rgba(255, 255, 255, 0.3);',
      visited: 'background: rgba(255, 255, 255, 0.1);'
    }
  },
  {
    name: 'Button_Neon',
    description: 'Neon Glow',
    theme: 'Cyberpunk',
    element: 'button',
    category: 'input',
    css: 'background-color: #000; color: #0ff; border: none; padding: 10px 20px; text-shadow: 0 0 5px #0ff, 0 0 10px #0ff;',
    states: {
      hover: 'color: #4cffdb;',
      active: 'color: #00a6a6;',
      visited: 'color: #0ff;'
    }
  },
  {
    name: 'Button_Elegant',
    description: 'Elegant',
    theme: 'High-End & Luxury',
    element: 'button',
    category: 'input',
    css: 'background-color: #333; color: #f1c40f; border: 2px solid #f1c40f; padding: 10px 20px;',
    states: {
      hover: 'background-color: #555; border-color: #f39c12;',
      active: 'background-color: #222; border-color: #e67e22;',
      visited: 'background-color: #333; border-color: #f1c40f;'
    }
  },
  {
    name: 'Button_Retro',
    description: 'Retro Style',
    theme: 'Vintage',
    element: 'button',
    category: 'input',
    css: 'background-color: #e74c3c; color: #ecf0f1; border: none; padding: 10px 20px; font-family: "Courier New", monospace;',
    states: {
      hover: 'background-color: #c0392b;',
      active: 'background-color: #e74c3c;',
      visited: 'background-color: #e74c3c;'
    }
  },
  {
    name: 'Button_Minimal',
    description: 'Minimalist',
    theme: 'Minimal & Clean',
    element: 'button',
    category: 'input',
    css: 'background-color: #fff; color: #333; border: 1px solid #ccc; padding: 10px 20px;',
    states: {
      hover: 'background-color: #f9f9f9;',
      active: 'background-color: #f1f1f1;',
      visited: 'background-color: #fff;'
    }
  },
  {
    name: 'Button_Wave',
    description: 'Wave Effect',
    theme: 'Interactive & Dynamic',
    element: 'button',
    category: 'input',
    css: 'background-color: #3498db; color: #fff; border: none; padding: 10px 20px; position: relative; overflow: hidden;',
    states: {
      hover: 'background-color: #2980b9;',
      active: 'background-color: #2c3e50;',
      visited: 'background-color: #3498db;'
    }
  },
  {
    name: 'Button_Gradient',
    description: 'Gradient',
    theme: 'Modern & Trendy',
    element: 'button',
    category: 'input',
    css: 'background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%); color: #fff; border: none; padding: 10px 20px;',
    states: {
      hover: 'background: linear-gradient(90deg, rgba(111,48,160,1) 0%, rgba(233,19,19,1) 50%, rgba(252,156,49,1) 100%);',
      active: 'background: linear-gradient(90deg, rgba(91,38,140,1) 0%, rgba(213,9,9,1) 50%, rgba(252,136,29,1) 100%);',
      visited: 'background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);'
    }
  },
  {
    name: 'Button_Outline',
    description: 'Outline',
    theme: 'Sleek & Professional',
    element: 'button',
    category: 'input',
    css: 'background-color: transparent; color: #2c3e50; border: 2px solid #2c3e50; padding: 10px 20px;',
    states: {
      hover: 'background-color: #2c3e50; color: #fff;',
      active: 'background-color: #1a242f; color: #fff;',
      visited: 'background-color: transparent; color: #2c3e50;'
    }
  },
  {
    name: 'Button_Shadow',
    description: 'Shadow',
    theme: 'Depth & Dimension',
    element: 'button',
    category: 'input',
    css: 'background-color: #9b59b6; color: #fff; border: none; padding: 10px 20px; box-shadow: 0px 8px 15px rgba(0,0,0,0.1);',
    states: {
      hover: 'background-color: #8e44ad;',
      active: 'background-color: #7d3f98;',
      visited: 'background-color: #9b59b6;'
    }
  },
  {
    name: 'Button_Rounded',
    description: 'Rounded',
    theme: 'Soft & Friendly',
    element: 'button',
    category: 'input',
    css: 'background-color: #e67e22; color: #fff; border: none; padding: 10px 20px; border-radius: 12px;',
    states: {
      hover: 'background-color: #d35400;',
      active: 'background-color: #ba4a00;',
      visited: 'background-color: #e67e22;'
    }
  },
  {
    name: 'Button_Sketch',
    description: 'Hand-drawn',
    theme: 'Sketchy & Artistic',
    element: 'button',
    category: 'input',
    css: 'border: 2px dashed #333; background: none; color: #333; font-family: "Comic Sans MS", cursive;',
    states: {
      hover: 'border-color: #666;',
      active: 'border-color: #000;',
      visited: 'border-color: #333;'
    }
  },
  {
    name: 'Button_Rainbow',
    description: 'Rainbow',
    theme: 'Colorful & Vibrant',
    element: 'button',
    category: 'input',
    css: 'background: linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet); color: #fff;',
    states: {
      hover: 'filter: brightness(0.9);',
      active: 'filter: brightness(0.8);',
      visited: 'filter: brightness(1);'
    }
  },
  {
    name: 'Button_Hologram',
    description: 'Holographic',
    theme: 'Futuristic & Sci-fi',
    element: 'button',
    category: 'input',
    css: 'background: linear-gradient(45deg, #ff0000, #00ff00, #0000ff); color: #fff; mix-blend-mode: difference;',
    states: {
      hover: 'mix-blend-mode: normal;',
      active: 'mix-blend-mode: multiply;',
      visited: 'mix-blend-mode: difference;'
    }
  },
  {
    name: 'Button_Glitch',
    description: 'Glitch',
    theme: 'Distorted & Edgy',
    element: 'button',
    category: 'input',
    css: 'background: #000; color: #0f0; font-family: monospace; animation: glitch 1s infinite;',
    states: {
      hover: 'color: #f00;',
      active: 'color: #00f;',
      visited: 'color: #0f0;'
    }
  },
  {
    name: 'Button_Invisible',
    description: 'Invisible',
    theme: 'Hidden & Mysterious',
    element: 'button',
    category: 'input',
    css: 'background: transparent; color: transparent; border: none;',
    states: {
      hover: 'color: #fff; background: #000;',
      active: 'color: #000; background: #fff;',
      visited: 'color: transparent; background: transparent;'
    }
  },
  {
    name: 'Button_Pixel',
    description: 'Pixel Art',
    theme: 'Retro & Pixelated',
    element: 'button',
    category: 'input',
    css: 'background: #000; color: #fff; font-family: "Press Start 2P", cursive; border: 2px solid #fff;',
    states: {
      hover: 'background: #fff; color: #000;',
      active: 'background: #333; color: #ccc;',
      visited: 'background: #000; color: #fff;'
    }
  },
  {
    name: 'Button_Water',
    description: 'Water Ripple',
    theme: 'Natural & Fluid',
    element: 'button',
    category: 'input',
    css: 'background: #00f; color: #fff; border-radius: 50%;',
    states: {
      hover: 'background: #009;',
      active: 'background: #006;',
      visited: 'background: #00f;'
    }
  },
  {
    name: 'Button_Fire',
    description: 'Fire',
    theme: 'Hot & Fiery',
    element: 'button',
    category: 'input',
    css: 'background: #f00; color: #ff0; text-shadow: 0 0 10px #ff0, 0 0 20px #ff0, 0 0 30px #ff0;',
    states: {
      hover: 'background: #c00;',
      active: 'background: #900;',
      visited: 'background: #f00;'
    }
  },
  {
    name: 'Button_Emoji',
    description: 'Emoji',
    theme: 'Fun & Playful',
    element: 'button',
    category: 'input',
    css: 'background: #ffcc00; color: #333; font-size: 24px;',
    states: {
      hover: 'background: #ffaa00;',
      active: 'background: #ff8800;',
      visited: 'background: #ffcc00;'
    }
  },
  {
    name: 'Button_Graffiti',
    description: 'Graffiti',
    theme: 'Urban & Street Art',
    element: 'button',
    category: 'input',
    css: 'background: #555; color: #fff; font-family: "Chalkduster", fantasy; border: 3px solid #f00;',
    states: {
      hover: 'background: #777; border-color: #0f0;',
      active: 'background: #999; border-color: #00f;',
      visited: 'background: #555; border-color: #f00;'
    }
  },
  {
    name: 'Button_Zebra',
    description: 'Zebra Stripes',
    theme: 'Animal Print',
    element: 'button',
    category: 'input',
    css: 'background: repeating-linear-gradient(45deg, #fff, #fff 10px, #000 10px, #000 20px); color: #f00;',
    states: {
      hover: 'color: #0f0;',
      active: 'color: #00f;',
      visited: 'color: #f00;'
    }
  },
  {
    name: 'Button_Marquee',
    description: 'Marquee',
    theme: 'Scrolling Text',
    element: 'button',
    category: 'input',
    css: 'background: #000; color: #fff; overflow: hidden;',
    states: {
      hover: 'animation: marquee 10s linear infinite;',
      active: 'animation: none;',
      visited: 'animation: marquee 10s linear infinite;'
    }
  },
  {
    name: 'Button_3D',
    description: '3D Button',
    theme: 'Three-Dimensional',
    element: 'button',
    category: 'input',
    css: 'background: #f00; color: #fff; box-shadow: 0 4px 8px rgba(0,0,0,0.1); transform: perspective(600px) rotateX(30deg);',
    states: {
      hover: 'box-shadow: 0 8px 16px rgba(0,0,0,0.2);',
      active: 'box-shadow: 0 2px 4px rgba(0,0,0,0.1);',
      visited: 'box-shadow: 0 4px 8px rgba(0,0,0,0.1);'
    }
  },
  {
    name: 'Button_Mirror',
    description: 'Mirror Effect',
    theme: 'Reflective & Shiny',
    element: 'button',
    category: 'input',
    css: 'background: #000; color: #fff; text-shadow: 0 1px 1px rgba(255,255,255,0.5);',
    states: {
      hover: 'filter: invert(1);',
      active: 'filter: grayscale(1);',
      visited: 'filter: none;'
    }
  },
  {
    name: 'Button_Xray',
    description: 'X-ray',
    theme: 'Transparent & Ghostly',
    element: 'button',
    category: 'input',
    css: 'background: rgba(0, 0, 0, 0.1); color: rgba(0, 0, 0, 0.5); border: 1px solid rgba(0, 0, 0, 0.2);',
    states: {
      hover: 'background: rgba(0, 0, 0, 0.2);',
      active: 'background: rgba(0, 0, 0, 0.3);',
      visited: 'background: rgba(0, 0, 0, 0.1);'
    }
  },
  {
    name: 'Button_Glow',
    description: 'Glowing',
    theme: 'Radiant & Luminous',
    element: 'button',
    category: 'input',
    css: 'background: #000; color: #fff; text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de, 0 0 60px #ff00de, 0 0 70px #ff00de;',
    states: {
      hover: 'text-shadow: 0 0 40px #ff00de, 0 0 10px #ff00de, 0 0 60px #ff00de, 0 0 20px #ff00de, 0 0 70px #ff00de, 0 0 30px #ff00de, 0 0 80px #ff00de;',
      active: 'text-shadow: none;',
      visited: 'text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de, 0 0 60px #ff00de, 0 0 70px #ff00de;'
    }
  },
  {
    name: 'Button_Liquid',
    description: 'Liquid',
    theme: 'Fluid & Wavy',
    element: 'button',
    category: 'input',
    css: 'background: #3498db; color: #fff; overflow: hidden; position: relative;',
    states: {
      hover: 'animation: liquid 3s ease infinite;',
      active: 'animation: none;',
      visited: 'animation: liquid 3s ease infinite;'
    }
  },
  {
    name: 'Button_Fuzzy',
    description: 'Fuzzy',
    theme: 'Soft & Furry',
    element: 'button',
    category: 'input',
    css: 'background: #f39c12; color: #fff; filter: blur(4px);',
    states: {
      hover: 'filter: blur(2px);',
      active: 'filter: blur(6px);',
      visited: 'filter: blur(4px);'
    }
  },
  {
    name: 'Button_Sparkle',
    description: 'Sparkle',
    theme: 'Glitter & Shine',
    element: 'button',
    category: 'input',
    css: 'background: #e74c3c; color: #fff; background-image: url("sparkle.png"); background-repeat: no-repeat; background-position: center;',
    states: {
      hover: 'background-image: url("sparkle-hover.png");',
      active: 'background-image: url("sparkle-active.png");',
      visited: 'background-image: url("sparkle.png");'
    }
  },
  {
    name: 'Button_Ripple',
    description: 'Ripple',
    theme: 'Ripple Effect',
    element: 'button',
    category: 'input',
    css: 'background: #2ecc71; color: #fff; position: relative; overflow: hidden;',
    states: {
      hover: 'animation: ripple 3s linear infinite;',
      active: 'animation: none;',
      visited: 'animation: ripple 3s linear infinite;'
    }
  },
  {
    name: 'H1_Spray',
    description: 'Spray Paint',
    theme: 'Urban & Street',
    element: 'h1',
    category: 'text',
    css: 'font-family: "Chalkduster", fantasy; color: #ff0000; text-shadow: 2px 2px 0 #000, 4px 4px 0 #000;'
  },
  {
    name: 'H1_Tag',
    description: 'Tag Style',
    theme: 'Tagging & Signature',
    element: 'h1',
    category: 'text',
    css: 'font-family: "Permanent Marker", cursive; color: #00ff00; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;'
  },
  {
    name: 'H1_Wild',
    description: 'Wild Style',
    theme: 'Complex & Intricate',
    element: 'h1',
    category: 'text',
    css: 'font-family: "Fredericka the Great", cursive; color: #0000ff; text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #ff00ff, 0 0 20px #ff00ff, 0 0 25px #ff00ff, 0 0 30px #ff00ff, 0 0 35px #ff00ff;'
  },
  {
    name: 'H1_Bubble',
    description: 'Bubble Letters',
    theme: 'Bold & Rounded',
    element: 'h1',
    category: 'text',
    css: 'font-family: "Bangers", cursive; color: #ffff00; text-shadow: 3px 3px 0 #000;'
  },
  {
    name: 'H1_Stencil',
    description: 'Stencil',
    theme: 'Cut-out & Military',
    element: 'h1',
    category: 'text',
    css: 'font-family: "Stardos Stencil", cursive; color: #ff00ff; text-shadow: 0 0 5px #000;'
  },
  {
    name: 'H1_ThrowUp',
    description: 'Throw-up',
    theme: 'Quick & Fluid',
    element: 'h1',
    category: 'text',
    css: 'font-family: "Satisfy", cursive; color: #00ffff; text-shadow: 0 0 10px #000;'
  },
  {
    name: 'H1_Piece',
    description: 'Masterpiece',
    theme: 'Artistic & Detailed',
    element: 'h1',
    category: 'text',
    css: 'font-family: "Pacifico", cursive; color: #ff7700; text-shadow: 0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1);'
  },
  {
    name: 'H1_Scratch',
    description: 'Scratch',
    theme: 'Rough & Jagged',
    element: 'h1',
    category: 'text',
    css: 'font-family: "Rock Salt", cursive; color: #77ff00; text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;'
  },
  {
    name: 'H1_Drip',
    description: 'Dripping Paint',
    theme: 'Messy & Liquid',
    element: 'h1',
    category: 'text',
    css: 'font-family: "Creepster", cursive; color: #7700ff; text-shadow: 0 0 10px #fff;'
  },
  {
    name: 'H1_Fade',
    description: 'Fade Effect',
    theme: 'Gradient & Smooth',
    element: 'h1',
    category: 'text',
    css: 'font-family: "Lobster", cursive; color: linear-gradient(to bottom, #ff0000 0%, #ff7700 50%, #ff00ff 100%); -webkit-background-clip: text; color: transparent;'
  },

  {
    name: 'H1_Serif',
    description: 'Classic Serif',
    theme: 'Traditional & Elegant',
    element: 'h1',
    category: 'text',
    css: 'font-family: "Times New Roman", serif; color: #000; font-weight: bold;'
  },
  {
    name: 'H1_SansSerif',
    description: 'Modern Sans',
    theme: 'Modern & Clean',
    element: 'h1',
    category: 'text',
    css: 'font-family: "Helvetica", sans-serif; color: #333; letter-spacing: 2px;'
  },
  {
    name: 'H1_Slab',
    description: 'Slab Serif',
    theme: 'Bold & Impactful',
    element: 'h1',
    category: 'text',
    css: 'font-family: "Roboto Slab", serif; color: #444; text-transform: uppercase;'
  },
  {
    name: 'H1_Mono',
    description: 'Monospace',
    theme: 'Technical & Precise',
    element: 'h1',
    category: 'text',
    css: 'font-family: "Courier New", monospace; color: #555; font-size: 2em;'
  },
  {
    name: 'H1_Script',
    description: 'Cursive Script',
    theme: 'Flowing & Elegant',
    element: 'h1',
    category: 'text',
    css: 'font-family: "Brush Script MT", cursive; color: #666; font-style: italic;'
  },
  {
    name: 'H1_Fantasy',
    description: 'Fantasy Style',
    theme: 'Imaginative & Whimsical',
    element: 'h1',
    category: 'text',
    css: 'font-family: "Papyrus", fantasy; color: #777; text-shadow: 2px 2px 2px #aaa;'
  },
  {
    name: 'H1_Blackletter',
    description: 'Blackletter',
    theme: 'Gothic & Medieval',
    element: 'h1',
    category: 'text',
    css: 'font-family: "Old English Text MT", blackletter; color: #888; letter-spacing: 1px;'
  },
  {
    name: 'H1_Neue',
    description: 'Neue Style',
    theme: 'Minimalist & Futuristic',
    element: 'h1',
    category: 'text',
    css: 'font-family: "Futura", sans-serif; color: #999; line-height: 1.2;'
  },
  {
    name: 'H1_Retro',
    description: 'Retro Style',
    theme: 'Vintage & Nostalgic',
    element: 'h1',
    category: 'text',
    css: 'font-family: "Cooper Black", serif; color: #aaa; text-decoration: underline;'
  },
  {
    name: 'H1_AvantGarde',
    description: 'Avant-Garde',
    theme: 'Experimental & Artistic',
    element: 'h1',
    category: 'text',
    css: 'font-family: "Century Gothic", sans-serif; color: #bbb; text-transform: lowercase; letter-spacing: 4px;'
  },
  {
    name: 'Input_Basic',
    description: 'Basic Style',
    theme: 'Simple & Clean',
    element: 'input',
    category: 'input',
    css: 'border: 1px solid #ccc; padding: 10px;',
    states: {
      hover: 'border-color: #999;',
      focus: 'border-color: #007bff; outline: none;',
      valid: 'border-color: #28a745;',
      invalid: 'border-color: #dc3545;',
      required: 'box-shadow: 0 0 5px #f00;'
    }
  },
  {
    name: 'Input_Rounded',
    description: 'Rounded Corners',
    theme: 'Soft & Friendly',
    element: 'input',
    category: 'input',
    css: 'border: 1px solid #ccc; padding: 10px; border-radius: 20px;',
    states: {
      hover: 'border-color: #999;',
      focus: 'border-color: #007bff; outline: none;',
      valid: 'border-color: #28a745;',
      invalid: 'border-color: #dc3545;',
      required: 'box-shadow: 0 0 5px #f00;'
    }
  },
  {
    name: 'Input_Outline',
    description: 'Outline Style',
    theme: 'Modern & Minimal',
    element: 'input',
    category: 'input',
    css: 'border: none; border-bottom: 2px solid #ccc; padding: 10px;',
    states: {
      hover: 'border-color: #999;',
      focus: 'border-color: #007bff; outline: none;',
      valid: 'border-color: #28a745;',
      invalid: 'border-color: #dc3545;',
      required: 'box-shadow: 0 0 5px #f00;'
    }
  },
  {
    name: 'Textarea_Basic',
    description: 'Basic Style',
    theme: 'Simple & Clean',
    element: 'textarea',
    category: 'input',
    css: 'border: 1px solid #ccc; padding: 10px;',
    states: {
      hover: 'border-color: #999;',
      focus: 'border-color: #007bff; outline: none;',
      valid: 'border-color: #28a745;',
      invalid: 'border-color: #dc3545;',
      required: 'box-shadow: 0 0 5px #f00;'
    }
  },
  {
    name: 'Textarea_Rounded',
    description: 'Rounded Corners',
    theme: 'Soft & Friendly',
    element: 'textarea',
    category: 'input',
    css: 'border: 1px solid #ccc; padding: 10px; border-radius: 20px;',
    states: {
      hover: 'border-color: #999;',
      focus: 'border-color: #007bff; outline: none;',
      valid: 'border-color: #28a745;',
      invalid: 'border-color: #dc3545;',
      required: 'box-shadow: 0 0 5px #f00;'
    }
  },
  {
    name: 'Textarea_Outline',
    description: 'Outline Style',
    theme: 'Modern & Minimal',
    element: 'textarea',
    category: 'input',
    css: 'border: none; border-bottom: 2px solid #ccc; padding: 10px;',
    states: {
      hover: 'border-color: #999;',
      focus: 'border-color: #007bff; outline: none;',
      valid: 'border-color: #28a745;',
      invalid: 'border-color: #dc3545;',
      required: 'box-shadow: 0 0 5px #f00;'
    }
  },
  {
    name: 'Select_Basic',
    description: 'Basic Style',
    theme: 'Simple & Clean',
    element: 'select',
    category: 'input',
    css: 'border: 1px solid #ccc; padding: 10px;',
    states: {
      hover: 'border-color: #999;',
      focus: 'border-color: #007bff; outline: none;',
      valid: 'border-color: #28a745;',
      invalid: 'border-color: #dc3545;',
      required: 'box-shadow: 0 0 5px #f00;'
    }
  },
  {
    name: 'Select_Rounded',
    description: 'Rounded Corners',
    theme: 'Soft & Friendly',
    element: 'select',
    category: 'input',
    css: 'border: 1px solid #ccc; padding: 10px; border-radius: 20px;',
    states: {
      hover: 'border-color: #999;',
      focus: 'border-color: #007bff; outline: none;',
      valid: 'border-color: #28a745;',
      invalid: 'border-color: #dc3545;',
      required: 'box-shadow: 0 0 5px #f00;'
    }
  },
  {
    name: 'Select_Outline',
    description: 'Outline Style',
    theme: 'Modern & Minimal',
    element: 'select',
    category: 'input',
    css: 'border: none; border-bottom: 2px solid #ccc; padding: 10px;',
    states: {
      hover: 'border-color: #999;',
      focus: 'border-color: #007bff; outline: none;',
      valid: 'border-color: #28a745;',
      invalid: 'border-color: #dc3545;',
      required: 'box-shadow: 0 0 5px #f00;'
    }
  },
  {
    name: 'Input_Flat',
    description: 'Flat Design',
    theme: 'Modern & Functional',
    element: 'input',
    category: 'input',
    css: 'border: none; border-bottom: 1px solid #ccc; padding: 10px;',
    states: {
      hover: 'border-color: #999;',
      focus: 'border-color: #007bff; outline: none;',
      valid: 'border-color: #28a745;',
      invalid: 'border-color: #dc3545;',
      required: 'border-color: #f00;'
    }
  },
  {
    name: 'Input_Material',
    description: 'Material Design',
    theme: 'Modern & Functional',
    element: 'input',
    category: 'input',
    css: 'border: none; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 10px;',
    states: {
      hover: 'box-shadow: 0 2px 4px rgba(0,0,0,0.2);',
      focus: 'box-shadow: 0 4px 8px rgba(0,0,0,0.3); outline: none;',
      valid: 'box-shadow: 0 2px 4px rgba(40, 167, 69, 0.2);',
      invalid: 'box-shadow: 0 2px 4px rgba(220, 53, 69, 0.2);',
      required: 'box-shadow: 0 2px 4px rgba(255, 0, 0, 0.2);'
    }
  },
  {
    name: 'Input_Neumorphic',
    description: 'Neumorphism',
    theme: 'Modern & Functional',
    element: 'input',
    category: 'input',
    css: 'border: none; border-radius: 10px; background: #e0e0e0; box-shadow: 4px 4px 8px #aaa, -4px -4px 8px #fff; padding: 10px;',
    states: {
      hover: 'box-shadow: 2px 2px 4px #aaa, -2px -2px 4px #fff;',
      focus: 'box-shadow: inset 2px 2px 4px #aaa, inset -2px -2px 4px #fff; outline: none;',
      valid: 'box-shadow: 4px 4px 8px rgba(40, 167, 69, 0.2), -4px -4px 8px rgba(40, 167, 69, 0.2);',
      invalid: 'box-shadow: 4px 4px 8px rgba(220, 53, 69, 0.2), -4px -4px 8px rgba(220, 53, 69, 0.2);',
      required: 'box-shadow: 4px 4px 8px rgba(255, 0, 0, 0.2), -4px -4px 8px rgba(255, 0, 0, 0.2);'
    }
  },
  {
    name: 'Textarea_Flat',
    description: 'Flat Design',
    theme: 'Modern & Functional',
    element: 'textarea',
    category: 'input',
    css: 'border: none; border-bottom: 1px solid #ccc; padding: 10px;',
    states: {
      hover: 'border-color: #999;',
      focus: 'border-color: #007bff; outline: none;',
      valid: 'border-color: #28a745;',
      invalid: 'border-color: #dc3545;',
      required: 'border-color: #f00;'
    }
  },
  {
    name: 'Textarea_Material',
    description: 'Material Design',
    theme: 'Modern & Functional',
    element: 'textarea',
    category: 'input',
    css: 'border: none; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 10px;',
    states: {
      hover: 'box-shadow: 0 2px 4px rgba(0,0,0,0.2);',
      focus: 'box-shadow: 0 4px 8px rgba(0,0,0,0.3); outline: none;',
      valid: 'box-shadow: 0 2px 4px rgba(40, 167, 69, 0.2);',
      invalid: 'box-shadow: 0 2px 4px rgba(220, 53, 69, 0.2);',
      required: 'box-shadow: 0 2px 4px rgba(255, 0, 0, 0.2);'
    }
  },
  {
    name: 'Textarea_Neumorphic',
    description: 'Neumorphism',
    theme: 'Modern & Functional',
    element: 'textarea',
    category: 'input',
    css: 'border: none; border-radius: 10px; background: #e0e0e0; box-shadow: 4px 4px 8px #aaa, -4px -4px 8px #fff; padding: 10px;',
    states: {
      hover: 'box-shadow: 2px 2px 4px #aaa, -2px -2px 4px #fff;',
      focus: 'box-shadow: inset 2px 2px 4px #aaa, inset -2px -2px 4px #fff; outline: none;',
      valid: 'box-shadow: 4px 4px 8px rgba(40, 167, 69, 0.2), -4px -4px 8px rgba(40, 167, 69, 0.2);',
      invalid: 'box-shadow: 4px 4px 8px rgba(220, 53, 69, 0.2), -4px -4px 8px rgba(220, 53, 69, 0.2);',
      required: 'box-shadow: 4px 4px 8px rgba(255, 0, 0, 0.2), -4px -4px 8px rgba(255, 0, 0, 0.2);'
    }
  },
  {
    name: 'Input_DarkGlow',
    description: 'Glowing Edges',
    theme: 'Dark & Fun',
    element: 'input',
    category: 'input',
    css: 'border: none; background: #333; color: #fff; padding: 10px;',
    states: {
      hover: 'box-shadow: 0 0 10px #00ff00;',
      focus: 'box-shadow: 0 0 15px #00ff00; outline: none;',
      valid: 'box-shadow: 0 0 10px #28a745;',
      invalid: 'box-shadow: 0 0 10px #dc3545;',
      required: 'box-shadow: 0 0 10px #f00;'
    }
  },
  {
    name: 'Input_DarkRainbow',
    description: 'Rainbow Border',
    theme: 'Dark & Fun',
    element: 'input',
    category: 'input',
    css: 'border: 2px solid #ff0000; background: #333; color: #fff; padding: 10px;',
    states: {
      hover: 'border-color: #ff00ff;',
      focus: 'border-color: #00ff00; outline: none;',
      valid: 'border-color: #28a745;',
      invalid: 'border-color: #dc3545;',
      required: 'border-color: #f00;'
    }
  },
  {
    name: 'Input_DarkNeon',
    description: 'Neon Style',
    theme: 'Dark & Fun',
    element: 'input',
    category: 'input',
    css: 'border: none; background: #333; color: #0ff; padding: 10px;',
    states: {
      hover: 'box-shadow: 0 0 10px #0ff;',
      focus: 'box-shadow: 0 0 15px #0ff; outline: none;',
      valid: 'box-shadow: 0 0 10px #28a745;',
      invalid: 'box-shadow: 0 0 10px #dc3545;',
      required: 'box-shadow: 0 0 10px #f00;'
    }
  },
  {
    name: 'Textarea_DarkGlow',
    description: 'Glowing Edges',
    theme: 'Dark & Fun',
    element: 'textarea',
    category: 'input',
    css: 'border: none; background: #333; color: #fff; padding: 10px;',
    states: {
      hover: 'box-shadow: 0 0 10px #00ff00;',
      focus: 'box-shadow: 0 0 15px #00ff00; outline: none;',
      valid: 'box-shadow: 0 0 10px #28a745;',
      invalid: 'box-shadow: 0 0 10px #dc3545;',
      required: 'box-shadow: 0 0 10px #f00;'
    }
  },
  {
    name: 'Textarea_DarkRainbow',
    description: 'Rainbow Border',
    theme: 'Dark & Fun',
    element: 'textarea',
    category: 'input',
    css: 'border: 2px solid #ff0000; background: #333; color: #fff; padding: 10px;',
    states: {
      hover: 'border-color: #ff00ff;',
      focus: 'border-color: #00ff00; outline: none;',
      valid: 'border-color: #28a745;',
      invalid: 'border-color: #dc3545;',
      required: 'border-color: #f00;'
    }
  },
  {
    name: 'Textarea_DarkNeon',
    description: 'Neon Style',
    theme: 'Dark & Fun',
    element: 'textarea',
    category: 'input',
    css: 'border: none; background: #333; color: #0ff; padding: 10px;',
    states: {
      hover: 'box-shadow: 0 0 10px #0ff;',
      focus: 'box-shadow: 0 0 15px #0ff; outline: none;',
      valid: 'box-shadow: 0 0 10px #28a745;',
      invalid: 'box-shadow: 0 0 10px #dc3545;',
      required: 'box-shadow: 0 0 10px #f00;'
    }
  },
  {
    name: 'Img_Rounded',
    description: 'Rounded Corners',
    theme: 'Modern Media',
    element: 'img',
    category: 'media',
    css: 'border-radius: 10px;'
  },
  {
    name: 'Img_Shadow',
    description: 'Drop Shadow',
    theme: 'Modern Media',
    element: 'img',
    category: 'media',
    css: 'box-shadow: 0 4px 8px rgba(0,0,0,0.1);'
  },
  {
    name: 'Img_Grayscale',
    description: 'Grayscale',
    theme: 'Modern Media',
    element: 'img',
    category: 'media',
    css: 'filter: grayscale(100%);'
  },
  {
    name: 'Video_Border',
    description: 'Solid Border',
    theme: 'Modern Media',
    element: 'video',
    category: 'media',
    css: 'border: 2px solid #ccc;'
  },
  {
    name: 'Video_Rounded',
    description: 'Rounded Corners',
    theme: 'Modern Media',
    element: 'video',
    category: 'media',
    css: 'border-radius: 10px;'
  },
  {
    name: 'Video_Shadow',
    description: 'Drop Shadow',
    theme: 'Modern Media',
    element: 'video',
    category: 'media',
    css: 'box-shadow: 0 4px 8px rgba(0,0,0,0.1);'
  },
  {
    name: 'Audio_Border',
    description: 'Solid Border',
    theme: 'Modern Media',
    element: 'audio',
    category: 'media',
    css: 'border: 2px solid #ccc;'
  },
  {
    name: 'Audio_Rounded',
    description: 'Rounded Corners',
    theme: 'Modern Media',
    element: 'audio',
    category: 'media',
    css: 'border-radius: 10px;'
  },
  {
    name: 'Audio_Shadow',
    description: 'Drop Shadow',
    theme: 'Modern Media',
    element: 'audio',
    category: 'media',
    css: 'box-shadow: 0 4px 8px rgba(0,0,0,0.1);'
  },
  {
    name: 'Capture_Border',
    description: 'Solid Border',
    theme: 'Modern Media',
    element: 'capture',
    category: 'media',
    css: 'border: 2px solid #ccc;'
  },
  {
    name: 'Capture_Rounded',
    description: 'Rounded Corners',
    theme: 'Modern Media',
    element: 'capture',
    category: 'media',
    css: 'border-radius: 10px;'
  },
  {
    name: 'Capture_Shadow',
    description: 'Drop Shadow',
    theme: 'Modern Media',
    element: 'capture',
    category: 'media',
    css: 'box-shadow: 0 4px 8px rgba(0,0,0,0.1);'
  },
  {
    name: 'Img_Polaroid',
    description: 'Polaroid Effect',
    theme: 'Creative Media',
    element: 'img',
    category: 'media',
    css: 'border: 10px solid #fff; box-shadow: 0 4px 8px rgba(0,0,0,0.2);'
  },
  {
    name: 'Img_Inverted',
    description: 'Inverted Colors',
    theme: 'Creative Media',
    element: 'img',
    category: 'media',
    css: 'filter: invert(100%);'
  },
  {
    name: 'Img_Rotate',
    description: 'Rotated',
    theme: 'Creative Media',
    element: 'img',
    category: 'media',
    css: 'transform: rotate(15deg);'
  },
  {
    name: 'Video_Vignette',
    description: 'Vignette Effect',
    theme: 'Creative Media',
    element: 'video',
    category: 'media',
    css: 'box-shadow: inset 0 0 100px #000;'
  },
  {
    name: 'Video_Skew',
    description: 'Skewed',
    theme: 'Creative Media',
    element: 'video',
    category: 'media',
    css: 'transform: skew(10deg, 10deg);'
  },
  {
    name: 'Video_Zoom',
    description: 'Zoomed In',
    theme: 'Creative Media',
    element: 'video',
    category: 'media',
    css: 'transform: scale(1.1);'
  },
  {
    name: 'Audio_Glow',
    description: 'Glowing',
    theme: 'Creative Media',
    element: 'audio',
    category: 'media',
    css: 'box-shadow: 0 0 10px #00ff00;'
  },
  {
    name: 'Audio_Flip',
    description: 'Flipped',
    theme: 'Creative Media',
    element: 'audio',
    category: 'media',
    css: 'transform: scaleX(-1);'
  },
  {
    name: 'Audio_Bounce',
    description: 'Bouncing',
    theme: 'Creative Media',
    element: 'audio',
    category: 'media',
    css: 'animation: bounce 2s infinite;'
  },
  {
    name: 'Capture_Outline',
    description: 'Outlined',
    theme: 'Creative Media',
    element: 'capture',
    category: 'media',
    css: 'outline: 2px dashed #ccc;'
  },
  {
    name: 'Capture_Fade',
    description: 'Faded',
    theme: 'Creative Media',
    element: 'capture',
    category: 'media',
    css: 'opacity: 0.5;'
  },
  {
    name: 'Capture_Blur',
    description: 'Blurred',
    theme: 'Creative Media',
    element: 'capture',
    category: 'media',
    css: 'filter: blur(5px);'
  }
];
