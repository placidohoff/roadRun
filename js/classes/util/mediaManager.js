class MediaManager
{
    constructor(config)
    {
        this.scene = config.scene;
        emitter.on(G.PLAY_SOUND, this.playSound, this);
        emitter.on(G.MUSIC_CHANGED, this.musicChanged, this);
    }
    musicChanged(){
        if(this.background){
            if(model.musicOn == false){
                this.background.stop();
            }
            else{
                this.background.play();
            }
            
        }
    }
    playSound(key){
        if(model._soundOn){
            let sound = this.scene.sound.add(key);
            sound.play();
        }
       
    }
    setBackgroundMusic(key){
        if(model.musicOn && !this.background){
            this.background = this.scene.sound.add(key, {volume:3, loop:true});
            this.background.play();
        }
        
    }
}