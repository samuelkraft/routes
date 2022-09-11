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
    color: colors.emerald[500],
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
    description:
      "A short swimrun loop in and around Långsjön. 4 run sections on trails and gravel roads with one nice climb and 3 swims around 250-300 meters each. \nStart at the north-western part of the lake and run towards the beach, from the beach swim east aiming at the small beach/outdoor gym. \nFollow the gravel road until a cliff appears on the right. Swim along the edge of the lake until the next cliff appears. Follow the trail back around 500 meters until you see a trail going up the mountain. Take right at the peak and follow the trail until you come down to the water. \nSwim towards the beach, and then follow the road then make a U-turn to a path 'above' the regular trail, follow it until the end and you completed one loop! \nRepeat as many times you want.",
    added: '2020-06-13',
    type: 'swimrun',
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
    color: colors.emerald[500],
    added: '2021-11-21',
  },
}

module.exports = { meta }
