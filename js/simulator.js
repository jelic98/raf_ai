var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Constraint = Matter.Constraint;
var Events = Matter.Events;

var canvasWidth;
var canvasHeight;

class Simulator {

	constructor() {
  		intializeConstants();
		
		this.clearState();
  		this.initializePhysics();
	}

	simulate(dna) {
		this.clear();
		this.prepare(dna);
		this.run();
	}

	clear() {
		this.clearState();
		this.clearPhysics();
	}

	initializePhysics() {
		this.engine = Engine.create();
    	this.render = Render.create({
        	element: document.body,
       		engine: this.engine,
        	options: {
            	width: canvasWidth,
            	height: canvasHeight,
				wireframes: false
        	}
    	});
	}

	prepare(dna) {
		var pad = Bodies.rectangle(canvasWidth * 0.5, canvasHeight * 0.5, canvasWidth * 0.5, canvasHeight * 0.1);
		
		var ground = Bodies.rectangle(canvasWidth * 0.5, canvasHeight, canvasWidth, 1, {
			visible: false
		});
		
		var ball = Bodies.circle(canvasWidth * 0.5, canvasHeight * 0.5, canvasWidth * 0.5, canvasHeight * 0.1);

		World.add(this.engine.world, [
			pad,
			ground,
			Constraint.create({ 
            	bodyA: pad, 
            	pointB: {
					x: canvasWidth * 0.5,
					y: canvasHeight * 0.5
				},
            	stiffness: 1,
            	length: 0
        	}),
			ball
    	]);

		var context = this;

		Events.on(this.engine, 'collisionStart', function(event) {
    		context.onCollision(event.pairs[0].bodyA, event.pairs[0].bodyB, dna);
		});

		this.render.options.background = 'black';
	}

	run() {
		Engine.run(this.engine);	
		Render.run(this.render);
	}

	clearState() {
		this.finished = false;
	}

	clearPhysics() {
		Render.stop(this.render);
		World.clear(this.engine.world);
        Engine.clear(this.engine);
		
		this.render.canvas.remove();
		this.render.textures = {};	
	}

	onCollision(a, b, dna) {
		if((a === this.ball && b === this.ground)
			|| (a === this.ground && b === this.ball)) {
			this.finished = dna.dead = true;
		}
	}  
}

function intializeConstants() {
	var totalRows = floor(sqrt(TOTAL_POPULATION));
	var canvasRatio = 1 / totalRows;	

	canvasWidth = (window.innerWidth ||
    	document.documentElement.clientWidth ||
        document.body.clientWidth ||
        document.body.offsetWidth) * canvasRatio;

	canvasHeight = (window.innerHeight ||
    	document.documentElement.clientHeight ||
        document.body.clientHeight ||
        document.body.offsetHeight) * canvasRatio;
}
