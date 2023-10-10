const keyMap = {
  template: ['elementType', 'css', 'name'],
  description: ['category', 'name', 'text'],
  fields: ['category', 'list', 'name']
}
const fakeResults = [
  {
    "name": "Facility Maintenance Request",
    "category": "Online Form",
    "list": [
      "Contact Information",
      "Location",
      "Description of Issue",
      "Urgency Level",
      "Preferred Date and Time",
      "Attachments",
      "Additional Comments"
    ],
    "_id": "DYGh1dkg6w2Q4oPF"
  },
  {
    "text": "Please use this form to request any maintenance services for facilities.",
    "name": "Facility Maintenance Request Form",
    "category": "Request Forms",
    "_id": "vFSpqciLj3dxvisZ"
  },
  {
    "name": "Facility Maintenance Request",
    "keywords": "facility, maintenance, request",
    "description": "This template is used for creating a facility maintenance request form. It helps users submit maintenance requests for various facilities.",
    "attributes": {
      "action": "/submit-maintenance-request",
      "method": "POST"
    },
    "css": "background-color: #f1f1f1; font-family: Arial, sans-serif; text-align: center;",
    "elementType": "div",
    "children": [
      {
        "elementType": "h1",
        "textContent": "Facility Maintenance Request"
      },
      {
        "elementType": "h2",
        "textContent": "Submit a maintenance request for a facility"
      },
      {
        "elementType": "p",
        "textContent": "Please fill out the form below to submit a maintenance request for a facility. Our team will address the issue as soon as possible."
      },
      {
        "elementType": "input",
        "attributes": {
          "type": "text",
          "name": "name",
          "required": "true",
          "placeholder": "Your Name"
        },
        "css": "width: 300px; height: 40px; margin-bottom: 20px; padding: 5px; font-size: 16px;"
      },
      {
        "elementType": "input",
        "attributes": {
          "type": "email",
          "name": "email",
          "required": "true",
          "placeholder": "Your Email"
        },
        "css": "width: 300px; height: 40px; margin-bottom: 20px; padding: 5px; font-size: 16px;"
      },
      {
        "elementType": "textarea",
        "attributes": {
          "name": "description",
          "required": "true",
          "placeholder": "Description of the maintenance request"
        },
        "css": "width: 300px; height: 120px; margin-bottom: 20px; padding: 5px; font-size: 16px;"
      },
      {
        "elementType": "button",
        "textContent": "Submit",
        "css": "background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 4px; font-size: 16px; cursor: pointer;"
      }
    ],
    "_id": "W97K6v3VjRiHZ2rc"
  }
]

async function handleTitleClick(promptValue) {
  try {
    document.querySelector('.loading').classList.toggle('hidden');
    const data = await requestChatGpt(promptValue, 'initial-prompt');
    clearAllElementsByClass('stage');
    console.log('---------------------');
    console.log(data);
    console.log('---------------------');

    const stageData = findObjectByKeys(data, keyMap.template);
    console.log(stageData);
    renderStage(stageData);

    const descriptionData = findObjectByKeys(data, keyMap.description);
    renderList([descriptionData.text], 'description');

    const fieldsData = findObjectByKeys(data, keyMap.fields);
    renderList([fieldsData.list], 'fieldsData');


    document.querySelector('.loading').classList.toggle('hidden');
    
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

function findObjectByKeys(array, keyNames) {
  return array.find(obj => {
    return keyNames.every(key => obj.hasOwnProperty(key));
  }) || false;
}