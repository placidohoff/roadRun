//This is a container object:
this.car;
class Road extends Phaser.GameObjects.Container{
    constructor(config){
        super(config.scene)
        this.scene=config.scene;
        this.back = this.scene.add.image(0, 0, "road");
        this.add(this.back);
        this.scene.add.existing(this);
        //model.gameOver = false;

        //We want to have two roads on the screen at once, so we scale down the width by half:
        // this.back.displayWidth = game.config.width * .5;
        // this.back.scaleY = this.back.scaleX;
        Align.scaleToGameW(this.back, .5);

        //Containers don't usually have height/width but we will set it to be what we need it to be.
        this.setSize(this.back.displayWidth, game.config.height)

        //This group is not a child of the road container.
        this.lineGroup = this.scene.add.group();

        //used to help with repeat the lines logic
        this.count = 0;

        //First, add car to the scene, then to the container:
        this.car = this.scene.add.sprite(this.displayWidth /4, game.config.height * .9, "cars");
        this.add(this.car);
        //Adjust size:
        Align.scaleToGameW(this.car, gameOptions.scaleMod);

        //Make the container clickable:
        this.back.setInteractive();

        this.back.on('pointerdown', this.changeLanes, this)
            //Had an undefined error when i did not pass in the 'context'

        this.addObstacle();
        
    }

    //Had an 'undefined' error when this was called with no 'context'
    changeLanes(){
        if(!model.gameOver){
            //PLAY-SOUND LOGIC:
            emitter.emit(G.PLAY_SOUND, "whoosh")
            //If on the right, go left, vice versa:
            if(this.car.x > 0){
                this.car.x = -this.displayWidth/4;
            }else{
                this.car.x = this.displayWidth/4;
            }
        }
        else{
            model.gameOver = false;
            game.scene.start('SceneMain')
        }
    }

    makeLines(){
        this.vSpace = this.displayHeight / 10;
        for(let i = 0; i < 20; i++){
            let line = this.scene.add.image(this.x, this.vSpace * i, "line");
            //save these values to fix repeating the lines:
                //Save the original position
            line.oy = line.y
            this.lineGroup.add(line);
        }
    }

    moveLines(){
        if(!model.gameOver){
            //We use 'itterate' which is specific to groups.
                //It also makes use of '.bind(this) which allows us to use keyword 'this' which will refer to the scene instead of normally it would refer to the group. We want 'this' to refer to the scene:

            this.lineGroup.children.iterate(function(child){
                //Manage the speed via '/20'
                child.y += this.vSpace /gameOptions.vSpaceMod;
            }.bind(this));
            //repeat lines logic:
                //Every twenty times a child moves.
            this.count++;
            if(this.count == 20){
                this.count = 0;
                this.lineGroup.children.iterate(function(child){
                    //set each child back to its original position to scroll again.
                    child.y = child.oy
                }.bind(this));
            }
        }
    }

    addObstacle(){
        let objs = [
            {key:'pcar1', speed:10, scale: 10}, 
            {key:'pcar2',speed:10, scale: 10}, 
            {key:'cone', speed:20, scale: 5}, 
            {key:'barrier',speed:20, scale: 8}
        ]
        let index = Math.floor(Math.random() * 4);
        let key = objs[index].key;
        let speed = objs[index].speed;
        let scale = objs[index].scale /100;
        this.object = this.scene.add.sprite(-this.displayWidth/4, 0, key);
        this.object.speed = speed;

        let lane = Math.random() * 100;
        lane <= 50 ? this.object.x = this.displayWidth/4 : this.object.x = -this.displayWidth/4;

        //Add it to the container itself.
        this.add(this.object);
        
        //Keep the same scale as the player
        Align.scaleToGameW(this.object, scale);
    }
    moveObstacle(){
        if(!model.gameOver){
            this.object.y += (this.vSpace / this.object.speed) * (model.speed/2);
            if(Collision.checkCollide(this.car, this.object)){
                this.car.alpha = .5;
                emitter.emit(G.PLAY_SOUND, "boom");
                model.gameOver = true;

                //Add Crash Animation:
                this.scene.tweens.add({targets: this.car, 
                                        duration: 1000, 
                                        y:game.config.height,
                                        angle: 270})

                //Add a timed event to restart the game:
                this.scene.time.addEvent({
                    delay: 2000,
                    callback: this.goGameOver,
                    callbackScope: this.scene,
                    loop: false
                })
                
            }else{
                this.car.alpha = 1;
            }
            if(this.object.y > game.config.height){
                //For each obstacle passed, we emit a 'UP_SCORE' Event:
                emitter.emit(G.UP_POINTS, 1);
                this.object.destroy();
                this.addObstacle();
            }
        }
    }
    goGameOver(){
        this.scene.start("SceneOver");
    }
}