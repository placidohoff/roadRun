//We load all assets of the of the scebe main through here instead:
class SceneLoad extends Phaser.Scene{
    constructor(){
        super('SceneLoad');
    }
    preload(){
        this.bar = new Bar({scene:this, x:240, y:320})
        //We can detect progress of our loading and show a progress bar:
        this.progText = this.add.text(game.config.width/2, game.config.height/2, "0%", {color: '#fff', fontSize: game.config.width/20})
        this.load.on('progress', this.onProgress, this);

        this.load.image("road", "assets/road.jpg")
        this.load.spritesheet("cars", "assets/cars.png", {frameWidth: 60, frameHeight:126})
        this.load.image("line", "assets/line.png");
        //Obstacles:
        this.load.image("pcar1", "assets/pcar1.png");
        this.load.image("pcar2", "assets/pcar2.png");
        this.load.image("cone", "assets/cone.png");
        this.load.image("barrier", "assets/barrier.png");

        //Buttons:
        this.load.image("musicOff", "assets/buttons/toggles/icons/music_off.png");
        this.load.image("musicOn", "assets/buttons/toggles/icons/music_on.png");
        this.load.image("sfxOff", "assets/buttons/toggles/icons/sfx_off.png");
        this.load.image("sfxOn", "assets/buttons/toggles/icons/sfx_on.png");
        
        this.load.image("toggleBack", "assets/buttons/toggles/toggles/1.png");
        this.load.image("toggle2", "assets/buttons/toggles/toggles/2.png");
        this.load.image("toggle3", "assets/buttons/toggles/toggles/3.png");
        this.load.image("toggle4", "assets/buttons/toggles/toggles/4.png");
        this.load.image("toggle5", "assets/buttons/toggles/toggles/5.png");
        this.load.image("toggle6", "assets/buttons/toggles/toggles/6.png");

        this.load.audio("backgroundMusic", ["assets/audio/random-race.mp3", "assets/audio/random-race.ogg"])
        this.load.audio("boom", ["assets/audio/boom.mp3", "assets/audio/boom.ogg"])
        this.load.audio("whoosh", ["assets/audio/whoosh.mp3", "assets/audio/whoosh.ogg"])

        this.load.image("title", "assets/title.png");
        this.load.image("button1", "assets/ui/ui/buttons/2/1.png");

    }
    create(){
        this.scene.start('SceneTitle');
    }
    update(){

    }
    onProgress(value){
        console.log(value)
        this.bar.setPercent(value)
        value = Math.floor(value * 100);
        this.progText.setText(value + "%");
    }
}