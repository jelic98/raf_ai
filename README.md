[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

# RAF IS

Project from *"Intelligent Systems"* course at Faculty of Computing in Belgrade.

## Genetic Balancer

A bot trying to balance the ball with the knowledge gained from the application of a [genetic algorithm](https://en.wikipedia.org/wiki/Genetic_algorithm). For natural selection, [rejection sampling](https://en.wikipedia.org/wiki/Rejection_sampling) was used (Monte Carlo method). The point of breaking DNA is in direct proportion to the maximum fitness value of both parents, which in this case accelerates evolution because the initial movements of the balancing body are more important than the final ones. Mutation rate decreases over time to prevent overshooting good solution (DNA). Physics was done with [Matter.js](http://brm.io/matter-js).

Take a look at this awesome [demo](https://lazarjelic.com/ecloga/projects/genetic).

### TODO
* Physics dependency injection - Separate bodies from physics itself, allow anything to be balanced
* Single canvas - Instead of using a separate canvas for each individual, simulate the entire population on a single canvas
