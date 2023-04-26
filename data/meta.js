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
    location: 'Lummelunda · Gotland',
    color: colors.red[500],
    added: '2020-06-28',
  },
  salbohed: {
    description:
      'A very flat 6k run on (mostly) gravel. Not technical at all, so good for recovery runs or going flat-out. This route goes "through" some properties but on public roads, be nice and say hi if you meet anyone 😊.',
    rating: 3,
    location: 'Salbohed · Västmanland',
    color: colors.emerald[500],
    added: '2021-11-21',
  },
  goat_loop: {
    description:
      'With a mix of mountains and pavement, this route starts at San Augustin and goes around the goat cheese farm "🐐 Quesería la Gloria". The trail part starts by the end of the parking lot of Hotel Gloria Palace. Pass through the tunnel and make a sharp left after ~100 meters on a small steep trail (270m at 22% avg grade). After this hill the trail gets easier with a steady climb towards the goat farm. Take a right after passing the farm which will bring you down towards the ocean (with amazing views). After the descent simply follow the paved road back towards San Augustin.',
    rating: 4,
    location: 'San Augustin · Gran Canaria',
    color: colors.yellow[500],
    added: '2022-09-16',
  },
  barranco_del_canario_loop: {
    description:
      'A mountain-loop that starts by Las Burras beach in San Augustin and goes around the ravine "Barranco del Canario".\nStart by Las Burras parking lot going into a small forest section next to the football field. You will pass a small road/water drainage section, after this make sure to hold left instead of continuing stright as there are homeless people living in the forest up ahead.\nPass through the tunnel under the highway then simply follow the path until it splits in two, where you should take the left turn. The path will quickly lead you to the steepest climb of the route, and after that the climb flattens a little bit. On your right you will have an amazing view over Barranco Del Toro the whole climb.\nThe trail down is wider and easier to run than the climb, and takes you all the way down to another highway tunnel passage. Take a right after the tunnel following the path until you come out on the car road taking you back to Burras Beach (Ocean dip optional but highly recommended 🏊‍♂️).',
    rating: 5,
    location: 'San Augustin · Gran Canaria',
    color: colors.red[400],
    added: '2022-09-23',
  },
  duvnas_utskog: {
    description:
      'A fun loop crossing through parts of Nyckelviken on the way towards Duvnäs utskog and Skuru. Some really nice hills (almost 20% gradients) and amazing views over the ocean. In the Kungshamn and Duvnäs utskog area there are short stretches of pavement, but its worth it to access the trails! Its recommended to bring your phone or load the gpx on you watch as there are tons of small trails just before arriving at Kungshamn and easy to run the wrong one.',
    rating: 4,
    location: 'Nacka · Stockholm',
    color: colors.green[500],
    added: '2023-01-12',
  },
  julso_scenic_trail: {
    description: 'placeholder description',
    rating: 4,
    location: 'Julsø · Denmark',
    color: colors.amber[500],
    added: '2023-04-26',
  },
}

module.exports = { meta }
