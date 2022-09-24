import I18n from '../languages/i18n';
export const rooms = [
  {
    indx: 5,
    color: '#FF5757',
    h: 'lux',
    p: 'withCond',
    max: 2,
    imgs: [
      require('../img/cabins/luxe3.jpg'),
      require('../img/cabins/luxe4.jpg'),
      require('../img/cabins/luxe5.jpg'),
      require('../img/cabins/luxe6.jpg'),
      require('../img/cabins/luxe1.jpg'),
      require('../img/cabins/luxe2.jpg'),
    ],
  },
  {
    indx: 4,
    color: '#7FFF6A',
    h: 'halfLux',
    p: 'withCond',
    max: 2,
    imgs: [
      require('../img/cabins/deluxe3.jpg'),
      require('../img/cabins/deluxe1.jpg'),
      require('../img/cabins/deluxe2.jpg'),
    ],
  },
  {
    indx: 4,
    color: '#27E3C2',
    h: 'halfLux',
    p: 'withCondExtra',
    max: 2,
    imgs: [
      require('../img/cabins/deluxe3.jpg'),
      require('../img/cabins/deluxe1.jpg'),
      require('../img/cabins/deluxe2.jpg'),
    ],
  },
  {
    indx: 3,
    color: '#eec1ee',
    h: 'oneBedCabin',
    p: 'withExtra',
    max: 1,
    imgs: [
      require('../img/cabins/odnomestnaya3.jpg'),
      require('../img/cabins/odnomestnaya1.jpg'),
      require('../img/cabins/odnomestnaya2.jpg'),
    ],
  },
  {
    indx: 2,
    color: '#F1C84C',
    h: 'twoBedCabin',
    p: 'withCond',
    max: 2,
    imgs: [
      require('../img/cabins/odnomestnaya3.jpg'),
      require('../img/cabins/odnomestnaya1.jpg'),
      require('../img/cabins/odnomestnaya2.jpg'),
    ],
  },
  {
    indx: 1,
    color: '#8BF8FF',
    h: 'threeBedCabin',
    max: 3,
    imgs: [
      require('../img/cabins/triple1.jpg'),
      require('../img/cabins/triple2.jpg'),
    ],
  },
  {
    indx: 0,
    color: '#ffa500',
    h: 'fourBedCabin',
    max: 4,
    imgs: [
      require('../img/cabins/chetyrehmenstnaya1.jpg'),
      require('../img/cabins/chetyrehmenstnaya2.jpg'),
    ],
  },
  {indx: -1, color: 'gray', h: 'booked'},
];
