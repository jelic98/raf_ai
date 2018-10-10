# RAF AI

Projekat iz kursa *"Inteligentni sistemi"* na Računarskom fakultetu.

## Genetic Balancer

Bot koji pokušava da balansira lopticu znanjem stečenim primenom [genetskog algoritma](https://en.wikipedia.org/wiki/Genetic_algorithm). Za prirodnu selekciju korišćen je [rejection sampling](https://en.wikipedia.org/wiki/Rejection_sampling) (tzv. Monte Karlo metod). Fizika je odrađena u [Matter.js](http://brm.io/matter-js).

### TODO
* Physics dependency injection - Razdvojiti tela od same fizike, omogućiti da se može balansirati bilo šta
* Single canvas - Umesto da se za svaku jedinku koristi poseban canvas, celu populaciju simulirati na jednom canvasu
