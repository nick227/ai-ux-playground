


const stageData1 = {
  type: 'section',
  className: 'outer-section',
  css: 'width: 100%; background-color: #ffffff; padding: 40px; box-sizing: border-box; font-family: Arial, sans-serif;',
  children: [
    {
      type: 'h1',
      className: 'main-title',
      textContent: 'Welcome to My Professional Webpage',
      css: 'font-size: 48px; color: #2C3E50; textContent-align: center; margin-bottom: 40px;',
    },
    {
      type: 'img',
      className: 'main-image',
      props: {
        src: 'https://picsum.photos/800/400',
        alt: 'Professional Image',
      },
      css: 'width: 100%; max-width: 800px; margin: 0 auto; display: block; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);',
    },
    {
      type: 'p',
      className: 'main-paragraph',
      textContent: 'This is a sample paragraph that professionally describes the webpage.',
      css: 'font-size: 20px; color: #34495E; line-height: 1.6; margin: 40px 0; textContent-align: justify; max-width: 800px; margin: 40px auto;',
    },
    {
      type: 'div',
      className: 'input-group',
      css: 'margin: 20px auto; max-width: 800px;',
      children: [
        {
          type: 'label',
          className: 'input-label',
          textContent: 'First Name:',
          css: 'display: block; font-size: 18px; margin-bottom: 12px; color: #2C3E50;',
          props: {
            for: 'first-name',
          },
        },
        {
          type: 'input',
          className: 'textContent-input',
          css: 'width: 100%; padding: 12px; font-size: 18px; border: 1px solid #BDC3C7; border-radius: 4px;',
          props: {
            id: 'first-name',
            type: 'textContent',
            placeholder: 'Enter your first name',
          },
        },
      ],
    },
    {
      type: 'div',
      className: 'input-group',
      css: 'margin: 20px auto; max-width: 800px;',
      children: [
        {
          type: 'label',
          className: 'input-label',
          textContent: 'Last Name:',
          css: 'display: block; font-size: 18px; margin-bottom: 12px; color: #2C3E50;',
          props: {
            for: 'last-name',
          },
        },
        {
          type: 'input',
          className: 'textContent-input',
          css: 'width: 100%; padding: 12px; font-size: 18px; border: 1px solid #BDC3C7; border-radius: 4px;',
          props: {
            id: 'last-name',
            type: 'textContent',
            placeholder: 'Enter your last name',
          },
        },
      ],
    },
  ]
};