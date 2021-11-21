const colors = require('tailwindcss/colors') // eslint-disable-line

const meta = {
  nyckelviken: {
    description:
      'Probably my all-time favorite local route! A demanding 5k trail around the outer edges of Nyckelviken nature reserve. Lots of elevation and amazing views. Clearly marked with blue signs. A good start is the first parking lot next to the outdoor gym.',
    rating: 5,
    location: 'Nacka · Stockholm',
    color: colors.blue[500],
    added: '2020-03-25',
  },
  hellasgarden_gula: {
    description: 'A fairly complex and fun route going around Källtorpssjön clearly marked with yellow signs.',
    rating: 5,
    location: 'Nacka · Stockholm',
    color: colors.yellow[300],
    added: '2020-03-25',
  },
  langsjon_jarlasjon: {
    description:
      'This route joins up multiple smaller fairly unknown paths resulting in a nice 5k with two fun climbs; the first one up the hill next to Långsjön and the other one at Fannydalsplatån.',
    rating: 4,
    location: 'Nacka · Stockholm',
    color: colors.yellow[400],
    added: '2020-03-25',
  },
  grona_atrail: {
    rating: 3,
    location: 'Nackareservatet · Stockholm',
    color: colors.green[500],
    description:
      'I have mixed feelings about this one. It is very technical with lots of flat rocks (swedish: "hällar") making it pretty rough! It is nice anyways because you feel like you are in the middle of the forest, but still easy to access.',
    added: '2020-03-25',
  },
  kranglan_trails: {
    description:
      'Short and sweet route around the estern part of Järlasjön that takes you along the water until starting a massive climb up "Nacke π". Please note that this is a very steep mountainbike trail so watch out for cyclists.',
    rating: 4,
    location: 'Nacka · Stockholm',
    color: colors.purple[500],
    added: '2020-03-29',
  },
  booleden_varmdoleden: {
    description:
      'Not for the faint of heart! This trail combines Booleden and Värmdöleden for around 40km of (mostly) trails. Booleden (15km) starts at Boo Hembygsgård in Orminge and leads to Strömmen on the border to Värmdö, where the Värmdöleden takes over (25k). They are both marked with orange stripes on trees or poles. Do not miss the breathtaking view from Himlaberget (70.4m above sea level).',
    rating: 4,
    location: 'Boo - Värmdö',
    color: colors.red[500],
    added: '2020-03-29',
  },
  kvarnsjon: {
    description:
      'A nice trail around the lake Kvarnsjön marked with yellow signs. The fun parts are in the woods east of the lake, but the views from the western paved parts are worth it. This route can be kombined with the path "Knuts Hav" for a longer route, follow the orange signs.',
    rating: 3,
    location: 'Värmdö',
    color: colors.yellow[400],
    added: '2020-04-08',
  },
  getstigen: {
    description:
      'Short and fun trail with pretty views of Velamsundsviken. It can be a bit hard to find, pass the boat club and continue on the dock until the trail starts.',
    rating: 4,
    location: 'Velamsund',
    color: colors.yellow[400],
    added: '2020-04-08',
  },
  jarvso_klack: {
    description: 'Järvsö-klack is a 390m heigh montain close to Järvsö. Perfect if you want steep climbs, or train on downhills.',
    rating: 4,
    location: 'Järvsö',
    color: colors.pink[400],
    added: '2020-04-08',
  },
  trollsjon: {
    rating: 4,
    location: 'Boo · Stockholm',
    color: colors.pink[400],
    added: '2020-04-25',
  },
  roda_sparet_velamsund: {
    rating: 5,
    location: 'Velamsund',
    color: colors.red[400],
    added: '2020-04-25',
  },
  langsjon: {
    rating: 4,
    location: 'Långsjön · Nacka',
    color: colors.red[400],
    swimrun: true,
    description:
      "A short swimrun loop in and around Långsjön. 4 run sections on trails and gravel roads with one nice climb and 3 swims around 250-300 meters each. \nStart at the north-western part of the lake and run towards the beach, from the beach swim east aiming at the small beach/outdoor gym. \nFollow the gravel road until a cliff appears on the right. Swim along the edge of the lake until the next cliff appears. Follow the trail back around 500 meters until you see a trail going up the mountain. Take right at the peak and follow the trail until you come down to the water. \nSwim towards the beach, and then follow the road then make a U-turn to a path 'above' the regular trail, follow it until the end and you completed one loop! \nRepeat as many times you want.",
    added: '2020-06-13',
    geoJson: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            name: 'Långsjön',
            dash: [9999, 1],
          },
          geometry: {
            type: 'LineString',
            coordinates: [
              [18.1850999, 59.30788, 34.2],
              [18.18563, 59.30772, 32.8],
              [18.186, 59.30778, 32.7],
              [18.18643, 59.30778, 31.8],
              [18.1876399, 59.30806, 33.3],
              [18.18804, 59.30808, 33.2],
              [18.18819, 59.30787, 30.6],
              [18.18844, 59.30782, 29.7],
              [18.18863, 59.30776, 28.9],
              [18.18878, 59.30777, 28.9],
              [18.18881, 59.3078, 29.2],
            ],
          },
        },
        {
          type: 'Feature',
          properties: {
            dash: [2, 3],
          },
          geometry: {
            type: 'LineString',
            coordinates: [
              [18.18882, 59.3078, 29.2],
              [18.191144, 59.307648, 25.3],
              [18.1934669, 59.307495, 24.9],
            ],
          },
        },
        {
          type: 'Feature',
          properties: {
            dash: [9999, 1],
          },
          geometry: {
            type: 'LineString',
            coordinates: [
              [18.1934669, 59.307495, 24.9],
              [18.19348, 59.30724, 25.7],
              [18.19313, 59.30674, 28.2],
              [18.19258, 59.3067, 29.6],
              [18.1924, 59.30667, 30.2],
              [18.19221, 59.30669, 30.5],
              [18.19187, 59.30669, 31.3],
              [18.19138, 59.30666, 31.7],
              [18.19063, 59.30667, 31],
              [18.190098, 59.306904, 29.3],
            ],
          },
        },
        {
          type: 'Feature',
          properties: {
            dash: [2, 3],
          },
          geometry: {
            type: 'LineString',
            coordinates: [
              [18.190098, 59.306904, 29.3],
              [18.188146, 59.306548, 29.4],
              [18.186193, 59.306192, 31.5],
            ],
          },
        },
        {
          type: 'Feature',
          properties: {
            dash: [9999, 1],
          },
          geometry: {
            type: 'LineString',
            coordinates: [
              [18.186193, 59.306192, 31.5],
              [18.186257, 59.305819, 35.2],
              [18.18626, 59.3058, 35.5],
              [18.18675, 59.30584, 36.1],
              [18.18714, 59.30584, 37.1],
              [18.18744, 59.3058, 38.3],
              [18.18769, 59.30568, 40.4],
              [18.1880099, 59.30547, 43.8],
              [18.1881999, 59.30525, 46.8],
              [18.18837, 59.30504, 49.5],
              [18.18854, 59.3049, 49],
              [18.18788, 59.30471, 47.2],
              [18.1871699, 59.3048, 47.1],
              [18.18646, 59.30472, 45],
              [18.18596, 59.30481, 43.6],
              [18.18569, 59.30486, 42.8],
              [18.18544, 59.30498, 42.9],
              [18.18505, 59.30531, 37.8],
              [18.18418, 59.30573, 32],
              [18.1842599, 59.30594, 30.7],
              [18.18461, 59.30626, 29.5],
              [18.18468, 59.3064, 28.7],
            ],
          },
        },
        {
          type: 'Feature',
          properties: {
            dash: [2, 3],
          },
          geometry: {
            type: 'LineString',
            coordinates: [
              [18.18468, 59.3064, 28.7],
              [18.186638, 59.307068, 28],
              [18.188596, 59.307736, 28.7],
            ],
          },
        },
        {
          type: 'Feature',
          properties: {
            dash: [9999, 1],
          },
          geometry: {
            type: 'LineString',
            coordinates: [
              [18.188596, 59.307736, 28.7],
              [18.188961, 59.307911, 30.2],
              [18.18904, 59.30807, 31.7],
              [18.18933, 59.30817, 31.9],
              [18.18962, 59.30819, 31.2],
              [18.18987, 59.30825, 30.8],
              [18.1901, 59.30826, 30.3],
              [18.19027, 59.30822, 29.6],
              [18.19048, 59.30823, 29.2],
              [18.19059, 59.30825, 29.1],
              [18.19095, 59.30834, 28.8],
              [18.191, 59.30838, 29.2],
              [18.19047, 59.30835, 30.1],
              [18.1900799, 59.30837, 31.3],
              [18.18978, 59.30836, 32.1],
              [18.18918, 59.3083, 33.6],
              [18.18831, 59.30826, 35.1],
              [18.18788, 59.30818, 34.4],
              [18.18666, 59.30802, 33.4],
              [18.18665, 59.30802, 33.4],
              [18.1863199, 59.30798, 33.6],
              [18.18584, 59.30799, 34.5],
              [18.18568, 59.30803, 34.9],
              [18.1850999, 59.30788, 34.2],
            ],
          },
        },
      ],
    },
  },
  kinnerstugan: {
    description: 'Beautiful route at Lummelunda, Gotland that goes along breathtaking cliffs by the ocean.',
    rating: 5,
    location: 'Lummelunda - Gotland',
    color: colors.red[500],
    added: '2020-06-28',
  },
  salbohed: {
    description:
      'A very flat 6k run on (mostly) gravel. Not technical at all, so good for recovery runs or going flat-out. This route goes "through" some properties but on public roads, be nice and say hi if you meet anyone 😊.',
    rating: 3,
    location: 'Salbohed - Västmanland',
    color: colors.green[500],
    added: '2021-11-21',
  },
}

module.exports = { meta }
