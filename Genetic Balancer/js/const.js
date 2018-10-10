// Project: Genetic Balancer
// Author: Lazar Jelic - ljelic17@raf.rs
// Source: https://github.com/jelic98/raf_ai

const TOTAL_POPULATION = 16; // Number of members in single population
const DURATION = 10000; // Evolution target duration in milliseconds
const ACTION_PAUSE = 100; // Pause between reading genes (and then taking action) in milliseconds
const MIN_FITNESS = 0.01; // Minimum fitness allowed (added to prevent division by zero in some cases)

const MUTATION_RATE_START = 0.01; // Starting mutation rate value (must be greater than ending value)
const MUTATION_RATE_END = 0.001; // Ending mutaion rate value (must be greater than starting value)
const MUTATION_RATE_DELTA = 0.002; // Step size from starting to ending mutation value
const MUTATION_GEN_PAUSE = 10; // Number of generations that need to live before decreasing mutation rate

const TORQUE = 0.1; // Force at which after reading signle gene
const FRICTION = 0; // Friction between balancing bodies
