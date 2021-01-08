import 'react-native-get-random-values'
import {v4 as uuidv4} from 'uuid'

export const artworks = [
  {
    idCategory: uuidv4(),
    title: 'Graphic design',
    cover: {
      uri:
        'https://images.pexels.com/photos/4046710/pexels-photo-4046710.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    overlayColor: '#ffffff',
    check: false,
  },
  {
    idCategory: uuidv4(),
    title: 'Architecture',
    cover: {
      uri:
        'https://images.pexels.com/photos/3569263/pexels-photo-3569263.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    overlayColor: '#282b35',
    check: false,
  },
  {
    idCategory: uuidv4(),
    title: 'Travel',
    cover: {
      uri:
        'https://images.pexels.com/photos/3214692/pexels-photo-3214692.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    overlayColor: '#282b35',
    check: false,
  },
  {
    idCategory: uuidv4(),
    title: 'Painting',
    cover: {
      uri:
        'https://images.pexels.com/photos/139764/pexels-photo-139764.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    overlayColor: '#ffffff',
    check: false,
  },
  {
    idCategory: uuidv4(),
    title: 'Illustration',
    cover: {
      uri:
        'https://images.pexels.com/photos/4906326/pexels-photo-4906326.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    overlayColor: '#ffffff',
    check: false,
  },
  {
    idCategory: uuidv4(),
    title: 'Typography',
    cover: {
      uri:
        'https://images.pexels.com/photos/616849/pexels-photo-616849.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    overlayColor: '#282b35',
    check: false,
  },
  {
    idCategory: uuidv4(),
    title: 'Portrait photography',
    cover: {
      uri:
        'https://images.pexels.com/photos/1250426/pexels-photo-1250426.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    overlayColor: '#282b35',
    check: false,
  },
  {
    idCategory: uuidv4(),
    title: 'Street photography',
    cover: {
      uri:
        'https://images.pexels.com/photos/1655304/pexels-photo-1655304.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    overlayColor: '#ffffff',
    check: false,
  },
]
