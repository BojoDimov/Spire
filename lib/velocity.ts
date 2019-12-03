/// Usage: let gameObject = ....
/// let gameObjectVelocity = velocity(gameObject)
/// in main game loop: gameObjectVelocity.update()
/// in keyboard event handler: gameObjectVelocity.input(inputEvent)
export default function velocity(target: any) {
  let velX = 0;
  let lastKey = null;
  function update() {
    if (velX > 0)
      velX -= .01;
    if (velX < 0)
      velX += .01;

    target.position.x += .1 * velX;
  }

  function input(input: KeyboardEvent) {
    if (input.code === 'KeyA') {
      if (lastKey === 'KeyA')
        velX -= .1;
      else
        velX -= .5;
      lastKey = 'KeyA';
    }
    if (input.code === 'KeyD') {
      if (lastKey === 'KeyD')
        velX += .1;
      else
        velX += .5;
      lastKey = 'KeyD';
    }
  }

  return {
    update,
    input
  };
}