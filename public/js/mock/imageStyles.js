const imageStyles = [
  {
    default: { borderRadius: '50%', boxShadow: '0px 0px 10px #888888', transition: 'all 0.3s' },
    hover: { boxShadow: '0px 0px 20px #666666', transform: 'scale(1.1)' },
    active: { boxShadow: 'inset 0px 0px 10px #444444' }
  },
  {
    default: { filter: 'grayscale(100%)', transition: 'all 0.3s' },
    hover: { filter: 'grayscale(0%)' },
    active: { filter: 'brightness(0.8)' }
  },
  {
    default: { border: '5px solid #f1f1f1', transition: 'all 0.3s' },
    hover: { border: '5px solid #ccc' },
    active: { border: '5px solid #000' }
  },
  {
    default: { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', transition: 'all 0.3s' },
    hover: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
    active: { clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }
  },
  {
    default: { opacity: '0.5', transition: 'all 0.3s' },
    hover: { opacity: '1' },
    active: { opacity: '0.8' }
  },
  {
    default: { transform: 'rotate(0deg)', transition: 'all 0.3s' },
    hover: { transform: 'rotate(15deg)' },
    active: { transform: 'rotate(-15deg)' }
  },
  {
    default: { boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transition: 'all 0.3s' },
    hover: { boxShadow: '0 8px 16px 0 rgba(0,0,0,0.4)' },
    active: { boxShadow: '0 4px 8px 0 rgba(0,0,0,0.8)' }
  }
];
