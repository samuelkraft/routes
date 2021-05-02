const colors = require('tailwindcss/colors') // eslint-disable-line

const meta = {
  nyckelviken: {
    description:
      'Probably my all-time favorite local route! A demanding 5k trail around the outer edges of Nyckelviken nature reserve. Lots of elevation and amazing views. Clearly marked with blue signs. A good start is the first parking lot next to the outdoor gym.',
    rating: 5,
    location: 'Nacka · Stockholm',
    color: colors.blue[500],
  },
  hellasgarden_gula: {
    description: 'A fairly complex and fun route going around Källtorpssjön clearly marked with yellow signs.',
    rating: 5,
    location: 'Nacka · Stockholm',
    color: colors.yellow[300],
  },
  langsjon_jarlasjon: {
    description:
      'This route joins up multiple smaller fairly unknown paths resulting in a nice 5k with two fun climbs; the first one up the hill next to Långsjön and the other one at Fannydalsplatån.',
    rating: 4,
    location: 'Nacka · Stockholm',
    color: colors.yellow[400],
  },
  grona_atrail: {
    rating: 4,
    location: 'Nackareservatet · Stockholm',
    color: colors.green[500],
  },
  kranglan_trails: {
    description:
      'Short and sweet route around the estern part of Järlasjön that takes you along the water until starting a massive climb up "Nacke π". Please note that this is a very steep mountainbike trail so watch out for cyclists.',
    rating: 4,
    location: 'Nacka · Stockholm',
    color: colors.purple[500],
  },
  booleden_varmdoleden: {
    description:
      'Not for the faint of heart! This trail combines Booleden and Värmdöleden for around 40km of (mostly) trails. Booleden (15km) starts at Boo Hembygsgård in Orminge and leads to Strömmen on the border to Värmdö, where the Värmdöleden takes over (25k). They are both marked with orange stripes on trees or poles. Do not miss the breathtaking view from Himlaberget (70.4m above sea level).',
    rating: 4,
    location: 'Boo - Värmdö',
    color: colors.red[500],
  },
  kvarnsjon: {
    description:
      'A nice trail around the lake Kvarnsjön marked with yellow signs. The fun parts are in the woods east of the lake, but the views from the western paved parts are worth it. This route can be kombined with the path "Knuts Hav" for a longer route, follow the orange signs.',
    rating: 3,
    location: 'Värmdö',
    color: colors.yellow[400],
  },
  getstigen: {
    description:
      'Short and fun trail with pretty views of Velamsundsviken. It can be a bit hard to find, pass the boat club and continue on the dock until the trail starts.',
    rating: 4,
    location: 'Velamsund',
    color: colors.yellow[400],
  },
  jarvso_klack: {
    description: 'Järvsö-klack is a 390m heigh montain close to Järvsö. Perfect if you want steep climbs, or train on downhills.',
    rating: 4,
    location: 'Järvsö',
    color: colors.pink[400],
  },
  trollsjon: {
    rating: 4,
    location: 'Boo · Stockholm',
    color: colors.pink[400],
  },
  roda_sparet_velamsund: {
    rating: 5,
    location: 'Velamsund',
    color: colors.red[400],
  },
}

module.exports = { meta }
