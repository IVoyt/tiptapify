import activities from './activities'
import animalsAndNature from './animals_and_nature'
import component from './component'
import flags from './flags'
import foodAndDrink from './food_and_drink'
import objects from './objects'
import peopleAndBody from './people_and_body'
import smileysAndEmotion from './smileys_and_emotion'
import symbols from './symbols'
import travelAndPlaces from './travel_and_places'

export default [
  {
    name: 'activities',
    items: activities,
    order: 6
  },
  {
    name: 'animals_and_nature',
    items: animalsAndNature,
    order: 4
  },
  {
    name: 'component',
    items: component,
    order: 9
  },
  {
    name: 'flags',
    items: flags,
    order: 10
  },
  {
    name: 'food_and_drink',
    items: foodAndDrink,
    order: 5
  },
  {
    name: 'objects',
    items: objects,
    order: 8
  },
  {
    name: 'people_and_body',
    items: peopleAndBody,
    order: 2
  },
  {
    name: 'smileys_and_emotion',
    items: smileysAndEmotion,
    order: 1
  },
  {
    name: 'symbols',
    items: symbols,
    order: 3
  },
  {
    name: 'travel_and_places',
    items: travelAndPlaces,
    order: 7
  }
]