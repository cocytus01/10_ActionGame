//myScene.js

var titlelevel = [
   [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
var MyLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        var size = cc.director.getWinSize();

        //音楽再生エンジン
        audioEngine = cc.audioEngine;

        var Title_background = cc.Sprite.create(res.background_back_png);
        var Titlesize = Title_background.getContentSize();
        var winSize = cc.director.getWinSize();
        this.addChild(Title_background);
        Title_background.setPosition(winSize.width / 2, winSize.height / 2);
        //背景画像を画面の大きさに合わせるためのScaling処理
        Title_background.setScale(winSize.height / Titlesize.height);

        var Title_png = cc.Sprite.create(res.title_png);
        Title_png.setPosition(size.width / 2, size.height / 2);
        this.addChild(Title_png);

        var playBtn = new cc.MenuItemImage(res.play_png, res.plau_png, function() {
          s = cc.TransitionFade.create(2, new gameScene());
          audioEngine.playEffect(res.se_push);
          cc.director.runScene(s);
        });
        playBtn.setPosition(size.width / 2, size.height / 2 - 200);
        var play = new cc.Menu(playBtn);
        play.setPosition(0, 0);
        this.addChild(play, 100);

        //add code
         //タップイベントリスナーを登録する
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        return true;
    },

    onTouchBegan: function(touch, event) {
        return true;
    },
    onTouchMoved: function(touch, event) {},
    onTouchEnded: function(touch, event) {
      //bgmの再生をとめる
        /*if (audioEngine.isMusicPlaying()) {
          audioEngine.stopMusic();
        }*/
        //クリック時のSE再生
        //audioEngine.playEffect("res/zabun.mp3");
        //audioEngine.playEffect("res/se_select16.wav");
        // 次のシーンに切り替える
        //s = cc.TransitionFade.create(2, new gameScene());
        //cc.director.runScene(s);
    },
});

var Shinelayer = cc.Sprite.extend({
  ctor: function() {
    this._super();
    //this.initWithFile(res.coin_png);

    for (i = 0; i < 7; i++) {　　　　　　
      for (j = 0; j < 10; j++) {
        switch (titlelevel[i][j]) {
          //銅コイン
          case 0:
          coinSprite = cc.Sprite.create(res.Sparkle_png);
          //this.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2);
          coinSprite.setPosition(tileSize / Math.random() + tileSize * j, 96 * (7 - i) - tileSize / Math.random());
          this.addChild(coinSprite);

          var animationframe = [];
          //スプライトフレームを格納する配列
          var texture = cc.textureCache.addImage(res.Sparkle_png);
          for (k = 0; k < 7; k++) {
              //スプライトフレームを作成
              var frame = new cc.SpriteFrame.createWithTexture(texture, cc.rect(64 * k, 0, 64, 64));
              //スプライトフレームを配列に登録
              animationframe.push(frame);
          }
          //スプライトフレームの配列を連続再生するアニメーションの定義

          var animation = new cc.Animation(animationframe, Math.random() * 0.5);
          //永久ループのアクションを定義
          var action = new cc.RepeatForever(new cc.animate(animation));
          //実行
          coinSprite.runAction(action);
          coinSprite.scheduleUpdate();
          break;
        }
      }
    }
  }
});

var MyScene = cc.Scene.extend({
    onEnter: function() {

        this._super();
        var layer = new MyLayer();
        this.addChild(layer);

        var titleShine = new Shinelayer();
        this.addChild(titleShine);
    }
});
