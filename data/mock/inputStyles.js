const inputStyles = [{
        base: { backgroundColor: '#F1F8E9', borderColor: '#C5E1A5', borderRadius: '10px', padding: '12px 18px', fontSize: '16px', fontFamily: "'Gill Sans, sans-serif'", color: '#558B2F', margin: '8px', outline: 'none' },
        mouseover: { backgroundColor: '#DCEDC8' },
        focus: { borderColor: '#9CCC65' }
    },
    {
        base: { backgroundColor: '#FFF3E0', borderColor: '#FFCCBC', borderRadius: '28px', padding: '12px 16px', fontSize: '16px', fontFamily: "'Futura, sans-serif'", color: '#E65100', margin: '8px', outline: 'none' },
        mouseover: { backgroundColor: '#FFB74D' },
        focus: { borderColor: '#FF9800' }
    },
    {
        base: { backgroundColor: '#EDE7F6', borderColor: '#D1C4E9', borderRadius: '8px', padding: '12px 16px', fontSize: '16px', fontFamily: "'Georgia, serif'", color: '#512DA8', margin: '8px', outline: 'none' },
        mouseover: { backgroundColor: '#D1C4E9' },
        focus: { borderColor: '#673AB7' }
    },
    {
        base: { backgroundColor: '#E1F5FE', borderColor: '#B3E5FC', borderRadius: '10px', padding: '12px 18px', fontSize: '16px', fontFamily: "'Arial, sans-serif'", color: '#0277BD', margin: '8px', outline: 'none' },
        mouseover: { backgroundColor: '#B3E5FC' },
        focus: { borderColor: '#039BE5' }
    },
    {
        base: { backgroundColor: '#F0F0F0', borderColor: '#D1D1D1', borderRadius: '0px', padding: '12px 16px', fontSize: '16px', fontFamily: "'Helvetica, Arial, sans-serif'", color: '#333', margin: '8px', outline: 'none', transition: 'all 0.3s ease' },
        mouseover: { backgroundColor: '#E5E5E5', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' },
        focus: { borderColor: '#007BFF', boxShadow: '0px 0px 5px rgba(0, 123, 255, 0.5)' }
    },
    {
        base: { backgroundColor: '#FFFFFF', borderColor: '#CCCCCC', borderRadius: '34px', padding: '10px', fontSize: '14px', fontFamily: "'Courier New, monospace'", color: '#666', margin: '8px', outline: 'none' },
        mouseover: { borderColor: '#BBBBBB' },
        focus: { borderColor: '#888888' }
    },
  {
    base: { backgroundColor: '#F0F0F0', borderColor: '#CCCCCC', borderRadius: '5px', padding: '10px' },
    mouseover: { borderColor: '#999999' },
    focus: { borderColor: '#666666' },
    valid: { borderColor: '#28a745' },
    invalid: { borderColor: '#dc3545' }
  },
  {
    base: { backgroundColor: '#EDEDED', borderColor: '#BDBDBD', borderRadius: '10px', padding: '12px' },
    mouseover: { borderColor: '#9E9E9E' },
    focus: { borderColor: '#757575' },
    valid: { borderColor: '#388E3C' },
    invalid: { borderColor: '#D32F2F' }
  },
  {
    base: { backgroundColor: '#FAFAFA', borderColor: '#CFD8DC', borderRadius: '8px', padding: '10px' },
    mouseover: { borderColor: '#90A4AE' },
    focus: { borderColor: '#546E7A' },
    valid: { borderColor: '#2E7D32' },
    invalid: { borderColor: '#C62828' }
  },{
  base: { backgroundColor: '#FFF3E0', borderColor: '#FFCC80', borderRadius: '5px', padding: '10px' },
  mouseover: { borderColor: '#FFA726' },
  focus: { borderColor: '#FF9800' },
  valid: { borderColor: '#689F38' },
  invalid: { borderColor: '#D32F2F' }
},
{
  base: { backgroundColor: '#E0F7FA', borderColor: '#4DD0E1', borderRadius: '8px', padding: '10px' },
  mouseover: { borderColor: '#00ACC1' },
  focus: { borderColor: '#0097A7' },
  valid: { borderColor: '#2E7D32' },
  invalid: { borderColor: '#C62828' }
},
{
  base: { backgroundColor: '#F1F8E9', borderColor: '#C5E1A5', borderRadius: '5px', padding: '10px' },
  mouseover: { borderColor: '#9CCC65' },
  focus: { borderColor: '#7CB342' },
  valid: { borderColor: '#33691E' },
  invalid: { borderColor: '#BF360C' }
},
{
  base: { backgroundColor: '#FCE4EC', borderColor: '#F8BBD0', borderRadius: '10px', padding: '12px' },
  mouseover: { borderColor: '#F48FB1' },
  focus: { borderColor: '#F06292' },
  valid: { borderColor: '#AD1457' },
  invalid: { borderColor: '#880E4F' }
},
{
  base: { backgroundColor: '#E8EAF6', borderColor: '#9FA8DA', borderRadius: '5px', padding: '10px' },
  mouseover: { borderColor: '#7986CB' },
  focus: { borderColor: '#5C6BC0' },
  valid: { borderColor: '#283593' },
  invalid: { borderColor: '#1A237E' }
},{
  base: { backgroundColor: '#E3F2FD', borderColor: '#BBDEFB', borderRadius: '5px', padding: '10px', fontSize: '16px', fontFamily: 'Arial, sans-serif' },
  mouseover: { borderColor: '#90CAF9', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
  focus: { borderColor: '#64B5F6', outline: 'none' },
  valid: { borderColor: '#1E88E5', boxShadow: '0 0 5px green' },
  invalid: { borderColor: '#0D47A1', boxShadow: '0 0 5px red' }
},
{
  base: { backgroundColor: '#F3E5F5', borderColor: '#CE93D8', borderRadius: '8px', padding: '12px', fontSize: '18px', fontFamily: 'Verdana, sans-serif' },
  mouseover: { borderColor: '#BA68C8', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
  focus: { borderColor: '#AB47BC', outline: 'none' },
  valid: { borderColor: '#8E24AA', boxShadow: '0 0 5px green' },
  invalid: { borderColor: '#4A148C', boxShadow: '0 0 5px red' }
},
{
  base: { backgroundColor: '#FFF8E1', borderColor: '#FFECB3', borderRadius: '5px', padding: '10px', fontSize: '16px', fontFamily: 'Tahoma, sans-serif' },
  mouseover: { borderColor: '#FFE082', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
  focus: { borderColor: '#FFD54F', outline: 'none' },
  valid: { borderColor: '#FBC02D', boxShadow: '0 0 5px green' },
  invalid: { borderColor: '#F57F17', boxShadow: '0 0 5px red' }
},
{
  base: { backgroundColor: '#ECEFF1', borderColor: '#B0BEC5', borderRadius: '10px', padding: '12px', fontSize: '18px', fontFamily: 'Courier New, monospace' },
  mouseover: { borderColor: '#90A4AE', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
  focus: { borderColor: '#78909C', outline: 'none' },
  valid: { borderColor: '#546E7A', boxShadow: '0 0 5px green' },
  invalid: { borderColor: '#37474F', boxShadow: '0 0 5px red' }
},
{
  base: { backgroundColor: '#FBE9E7', borderColor: '#FFAB91', borderRadius: '5px', padding: '10px', fontSize: '16px', fontFamily: 'Georgia, serif' },
  mouseover: { borderColor: '#FF8A65', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
  focus: { borderColor: '#FF7043', outline: 'none' },
  valid: { borderColor: '#F4511E', boxShadow: '0 0 5px green' },
  invalid: { borderColor: '#D84315', boxShadow: '0 0 5px red' }
},{
  base: { backgroundColor: '#E0F7FA', borderColor: '#B2EBF2', borderRadius: '50%', width: '50px', height: '50px', padding: '10px', fontSize: '16px', fontFamily: 'Arial, sans-serif' },
  mouseover: { borderColor: '#80DEEA', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
  focus: { borderColor: '#4DD0E1', outline: 'none' },
  valid: { borderColor: '#26C6DA', boxShadow: '0 0 5px green' },
  invalid: { borderColor: '#00ACC1', boxShadow: '0 0 5px red' }
},
{
  base: { backgroundColor: '#FFF3E0', borderColor: '#FFE0B2', clipPath: 'polygon(0 0, 100% 0, 75% 100%, 0% 100%)', padding: '12px', fontSize: '18px', fontFamily: 'Verdana, sans-serif' },
  mouseover: { borderColor: '#FFCC80', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
  focus: { borderColor: '#FFB74D', outline: 'none' },
  valid: { borderColor: '#FFA726', boxShadow: '0 0 5px green' },
  invalid: { borderColor: '#FF9800', boxShadow: '0 0 5px red' }
},
{
  base: { backgroundColor: '#F1F8E9', borderColor: '#DCEDC8', borderRadius: '0', borderBottom: '2px solid', padding: '10px', fontSize: '16px', fontFamily: 'Tahoma, sans-serif' },
  mouseover: { borderColor: '#C5E1A5', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
  focus: { borderColor: '#AED581', outline: 'none' },
  valid: { borderColor: '#9CCC65', boxShadow: '0 0 5px green' },
  invalid: { borderColor: '#8BC34A', boxShadow: '0 0 5px red' }
},
{
  base: { backgroundColor: '#E8EAF6', borderColor: '#C5CAE9', borderRadius: '10px 0 10px 0', padding: '12px', fontSize: '18px', fontFamily: 'Courier New, monospace' },
  mouseover: { borderColor: '#9FA8DA', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
  focus: { borderColor: '#7986CB', outline: 'none' },
  valid: { borderColor: '#5C6BC0', boxShadow: '0 0 5px green' },
  invalid: { borderColor: '#3F51B5', boxShadow: '0 0 5px red' }
},
{
  base: { backgroundColor: '#FCE4EC', borderColor: '#F8BBD0', clipPath: 'circle(50%)', width: '60px', height: '60px', padding: '10px', fontSize: '16px', fontFamily: 'Georgia, serif' },
  mouseover: { borderColor: '#F48FB1', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
  focus: { borderColor: '#F06292', outline: 'none' },
  valid: { borderColor: '#EC407A', boxShadow: '0 0 5px green' },
  invalid: { borderColor: '#E91E63', boxShadow: '0 0 5px red' }
},
{
  base: { backgroundColor: '#FAF3E0', borderColor: '#E6DCCA', borderWidth: '1px', padding: '10px', fontSize: '16px', fontFamily: 'Times New Roman, serif', color: '#333' },
  mouseover: { borderColor: '#D4C3A5' },
  focus: { borderColor: '#C2B092', outline: 'none' },
  valid: { borderColor: '#B0A084' },
  invalid: { borderColor: '#9E8E76' }
},
{
  base: { backgroundColor: '#F5F5F5', borderColor: '#D2D2D2', borderWidth: '2px', padding: '12px', fontSize: '18px', fontFamily: 'Courier New, monospace', color: '#444' },
  mouseover: { borderColor: '#B8B8B8' },
  focus: { borderColor: '#9E9E9E', outline: 'none' },
  valid: { borderColor: '#848484' },
  invalid: { borderColor: '#6A6A6A' }
},
{
  base: { backgroundColor: '#FFFDFD', borderColor: '#E0E0E0', borderWidth: '1px', padding: '10px', fontSize: '16px', fontFamily: 'Arial, sans-serif', color: '#333' },
  mouseover: { borderColor: '#C7C7C7' },
  focus: { borderColor: '#AFAFAF', outline: 'none' },
  valid: { borderColor: '#979797' },
  invalid: { borderColor: '#7F7F7F' }
},
{
  base: { backgroundColor: '#F9F9F9', borderColor: '#D9D9D9', borderWidth: '1px', padding: '12px', fontSize: '18px', fontFamily: 'Verdana, sans-serif', color: '#444' },
  mouseover: { borderColor: '#B9B9B9' },
  focus: { borderColor: '#999999', outline: 'none' },
  valid: { borderColor: '#797979' },
  invalid: { borderColor: '#595959' }
},
{
  base: { backgroundColor: '#FEFEFE', borderColor: '#EAEAEA', borderWidth: '1px', padding: '10px', fontSize: '16px', fontFamily: 'Georgia, serif', color: '#333' },
  mouseover: { borderColor: '#CBCBCB' },
  focus: { borderColor: '#ACACAC', outline: 'none' },
  valid: { borderColor: '#8D8D8D' },
  invalid: { borderColor: '#6E6E6E' }
}, {
  base: { backgroundColor: '#2C2F33', borderColor: '#23272A', borderWidth: '1px', padding: '10px', fontSize: '16px', fontFamily: 'Arial, sans-serif', color: '#FFFFFF' },
  mouseover: { borderColor: '#1E2124' },
  focus: { borderColor: '#141617', outline: 'none' },
  valid: { borderColor: '#0A0C0D' },
  invalid: { borderColor: '#34383C' }
},
{
  base: { backgroundColor: '#36393F', borderColor: '#2E3136', borderWidth: '2px', padding: '12px', fontSize: '18px', fontFamily: 'Arial, sans-serif', color: '#FFFFFF' },
  mouseover: { borderColor: '#242628' },
  focus: { borderColor: '#1A1C1E', outline: 'none' },
  valid: { borderColor: '#101214' },
  invalid: { borderColor: '#40444B' }
},
{
  base: { backgroundColor: '#292B2F', borderColor: '#202225', borderWidth: '1px', padding: '10px', fontSize: '16px', fontFamily: 'Arial, sans-serif', color: '#FFFFFF' },
  mouseover: { borderColor: '#181A1D' },
  focus: { borderColor: '#0E1011', outline: 'none' },
  valid: { borderColor: '#040506' },
  invalid: { borderColor: '#2E3136' }
},
{
  base: { backgroundColor: '#3E4147', borderColor: '#34373C', borderWidth: '1px', padding: '12px', fontSize: '18px', fontFamily: 'Arial, sans-serif', color: '#FFFFFF' },
  mouseover: { borderColor: '#2A2D31' },
  focus: { borderColor: '#202225', outline: 'none' },
  valid: { borderColor: '#16181B' },
  invalid: { borderColor: '#484C52' }
},
{
  base: { backgroundColor: '#23272A', borderColor: '#1B1E21', borderWidth: '1px', padding: '10px', fontSize: '16px', fontFamily: 'Arial, sans-serif', color: '#FFFFFF' },
  mouseover: { borderColor: '#121416' },
  focus: { borderColor: '#090A0B', outline: 'none' },
  valid: { borderColor: '#000000' },
  invalid: { borderColor: '#2C2F33' }
}






];