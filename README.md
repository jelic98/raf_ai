# RAF IS

Projekat iz kursa *"Inteligentni sistemi"* na Računarskom fakultetu.

## Genetic Balancer

Bot koji pokušava da balansira lopticu znanjem stečenim primenom [genetskog algoritma](https://en.wikipedia.org/wiki/Genetic_algorithm). Za prirodnu selekciju korišćen je [rejection sampling](https://en.wikipedia.org/wiki/Rejection_sampling) (tzv. Monte Karlo metod). Tačka kidanja DNK je u direktnoj proporcionalnosti sa maksimalnom fitness vrednošću oba roditelja, što u ovom slučaju ubrzava evoluciju zato što su početni pokreti balansirajućeg tela bitniji od završnih. Stepen mutacije se smanjuje vremenom kako se ne bi premašilo dobro rešenje (DNK). Fizika je odrađena u [Matter.js](http://brm.io/matter-js).

Demo je dostupan [ovde](https://lazarjelic.com/ecloga/projects/genetic).

### TODO
* Physics dependency injection - Razdvojiti tela od same fizike, omogućiti da se može balansirati bilo šta
* Single canvas - Umesto da se za svaku jedinku koristi poseban canvas, celu populaciju simulirati na jednom canvasu
