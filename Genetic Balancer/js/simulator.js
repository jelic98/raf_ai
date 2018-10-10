var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Constraint = Matter.Constraint;
var Events = Matter.Events;

class Simulator {

	simulate(dna) {
		this.clear();
  		this.initialize(dna);
		this.run(dna);
	}

	clear() {
		this.clearState();
		this.clearPhysics();
	}

	initialize(dna) {
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
		
		this.pad = Bodies.rectangle(
			canvasWidth * 0.5,
			canvasHeight * 0.5,
			canvasWidth * 0.5,
			canvasHeight * 0.05, {
			render: {
         		fillStyle: 'white'
			}	
		});
		
		this.ground = Bodies.rectangle(
			canvasWidth * 0.5,
			canvasHeight,
			canvasWidth,
			1, {
			isStatic: true,
			visible: false
		});
		
		this.ball = Bodies.circle(
			canvasWidth * 0.5 + 1,
			0,
			canvasWidth * 0.025, {
			friction: FRICTION,
			render: {
				fillStyle: 'white'
			}
		});

		World.add(this.engine.world, [
			this.pad,
			this.ground,
			Constraint.create({ 
            	bodyA: this.pad, 
            	pointB: {
					x: canvasWidth * 0.5,
					y: canvasHeight * 0.5
				},
            	stiffness: 1,
            	length: 0
        	}),
			this.ball
    	]);

		var context = this;

		Events.on(this.engine, 'collisionStart', function(event) {
			let a = event.pairs[0].bodyA;
			let b = event.pairs[0].bodyB;
    		
			context.onCollision(a, b, dna);	
		});

		this.render.options.background = 'black';
	}

	run(dna) {
		Engine.run(this.engine);	
		Render.run(this.render);

		var context = this;

		this.duration = 0;
		this.actionInterval = setInterval(function() {
			if(context.duration > DURATION) {
				clearInterval(this.actionInterval);
				return;
			}

			context.actionCallback(dna);
			context.duration += ACTION_PAUSE;
		}, ACTION_PAUSE);
	}
	
	clearState() {
		this.finished = false;
	}

	clearPhysics() {
		if(typeof this.engine !== 'undefined') {
			Render.stop(this.render);
			World.clear(this.engine.world);
        	Engine.clear(this.engine);
		
			this.render.canvas.remove();
			this.render.textures = {};	
		}
	}

	onCollision(a, b, dna) {
		if((a === this.ball && b === this.ground)
			|| (a === this.ground && b === this.ball)) {
			clearInterval(this.actionInterval);
			
			dna.calculateFitness();

			this.finished = dna.dead = true;

			this.render.options.background = lerpColor(
				color(255, 0, 0),
				color(0, 255, 0),
				dna.fitness);
		}	
	}  

	actionCallback(dna) {
		var gene = dna.nextGene();

		if(typeof gene === 'undefined') {
			clearInterval(this.actionInterval);
			
			dna.calculateFitness();
	
			this.finished = true;
		}

		if(gene === 'L') {
			this.pad.torque = -TORQUE;
		}else if(gene === 'R') {
			this.pad.torque = TORQUE;
		}else {
			this.pad.torque = 0;
		}
	}
}
