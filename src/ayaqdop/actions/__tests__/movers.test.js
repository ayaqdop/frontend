import { privateFunctions } from '../movers'

const gameObjects = {
  ball: {
    position: [12, 9]
  },
  teams: [
    {
      name: 'Barcelona',
      moves: 5,
      players: [
        { number: 1, position: [1, 8] },
        { number: 18, position: [6, 3] },
        { number: 23, position: [4, 6] },
        { number: 3, position: [4, 11] },
        { number: 20, position: [6, 14] },
        { number: 8, position: [10, 5] },
        { number: 5, position: [8, 8] },
        { number: 4, position: [10, 12] },
        { number: 14, position: [12, 4] },
        { number: 10, position: [12, 13] },
        { number: 9, moves: 3, position: [12, 8] }
      ]
    },
    {
      name: 'Bayern',
      moves: 0,
      players: [
        { number: 1, position: [24, 9] },
        { number: 32, position: [19, 3] },
        { number: 5, position: [22, 7] },
        { number: 17, position: [22, 10] },
        { number: 27, position: [19, 14] },
        { number: 25, position: [16, 4] },
        { number: 6, position: [18, 9] },
        { number: 11, position: [16, 13] },
        { number: 10, position: [13, 14] },
        { number: 7, position: [13, 3] },
        { number: 9, position: [15, 8] }
      ]
    }
  ]
}

test('move ball', () => {
  const toPosition = [12, 12]
  const testObjects = privateFunctions.moveBall(gameObjects, toPosition)
  expect(testObjects.ball.position).toEqual(toPosition)
  expect(testObjects.teams[0].moves).toEqual(4)
})
test('move player', () => {
  const piece = { team: gameObjects.teams[0].name, number: 9 }
  const toPosition = [11, 9]
  const testObjects = privateFunctions.movePlayer(
    gameObjects,
    piece,
    toPosition
  )
  expect(testObjects.teams[0].players[10].position).toEqual(toPosition)
  expect(testObjects.teams[0].moves).toEqual(4)
  expect(testObjects.teams[0].players[10].moves).toEqual(2)
})
