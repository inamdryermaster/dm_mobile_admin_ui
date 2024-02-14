import {
  FaInfoCircle,
  FaTag,
  FaExclamationTriangle,
  FaNewspaper,
  FaBullhorn,
  FaClock,
} from 'react-icons/fa'; // Import icons from Font Awesome
import {
  blue,
  green,
  grey,
  orange,
  purple,
  red,
  yellow,
} from '@mui/material/colors';
export const icons = [
  {
    name: 'information',
    icon: <FaInfoCircle size={28} />,
    backgroundColor: blue[400], // Use Material-UI color
  },
  {
    name: 'promotion',
    icon: <FaTag size={28} />,
    backgroundColor: green[300], // Use Material-UI color
  },
  {
    name: 'alert',
    icon: <FaExclamationTriangle size={28} />,
    backgroundColor: red[300], // Use Material-UI color
  },
  {
    name: 'reminder',
    icon: <FaClock size={28} />,
    backgroundColor: orange[300], // Use Material-UI color
  },
  {
    name: 'news',
    icon: <FaNewspaper size={28} />,
    backgroundColor: yellow[900], // Use Material-UI color
  },
  {
    name: 'advertisement',
    icon: <FaBullhorn size={28} />,
    backgroundColor: purple[300], // Use Material-UI color
  },
  {
    name: 'warning',
    icon: <FaExclamationTriangle size={28} />,
    backgroundColor: orange[600],
  },
];
