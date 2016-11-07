var size;
//1:地面　2:ブロック　3:プレイヤ　4:ゾンビ 5:こうもり　6:銅  7:銀  8:金 9:スライム 10:黄色スライム　11:赤スライム 12:♥
var level = [
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 5, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 8, 8, 0, 2,12, 2],
   [0, 0, 0, 7, 7, 7, 7, 0, 0, 0],
   [0, 6, 6, 2, 2, 2, 2, 6, 0, 0],
   [0,10,11, 0, 3, 0, 9, 0, 0, 4],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var tileSize = 96;
var playerPosition; //マップ内のプレイやの位置(ｘ、ｙ)を保持する
var playerSprite; //プレイヤーのスプライト
var blockSprite;
var coinSprite;
var leftBtn; //左ボタン
var rightBtn; //右ボタン
var jumpBtn; //ジャンプ
var winSize;
var attackflg = false;

var gameScene = cc.Scene.extend({
   onEnter: function() {
      this._super();

      //音楽再生エンジン
      audioEngine = cc.audioEngine;
      //bgm再生
      if (!audioEngine.isMusicPlaying()) {
        audioEngine.playMusic(res.bgm_forest, true);
      }

      winSize = cc.director.getWinSize();

      var background = new backgroundLayer();
      this.addChild(background);
      var level = new levelLayer();
      this.addChild(level);
      var player = new playerLayer();
      this.addChild(player);
      var enemys = new enemybatLayer();
      this.addChild(enemys);
      var enemys2 = new enemyslimeLayer();
      this.addChild(enemys2);
      var enemys3 = new enemyzombieLayer();
      this.addChild(enemys3);
      var enemys4 = new slime2Layer();
      this.addChild(enemys4);

      var coins = new coinLayer();
      this.addChild(coins);

   }
});


var backgroundLayer = cc.Layer.extend({
   ctor: function() {
      this._super();

      //背景
      var backgroundSpriteBack = cc.Sprite.create(res.background_back_png);
      var size = backgroundSpriteBack.getContentSize();
      this.addChild(backgroundSpriteBack);
      backgroundSpriteBack.setPosition(winSize.width / 2, winSize.height / 2);
      //背景画像を画面の大きさに合わせるためのScaling処理
      backgroundSpriteBack.setScale(winSize.height / size.height);

      //手前の木
      var backgroundSpriteFront = cc.Sprite.create(res.background_front_png);
      var size = backgroundSpriteFront.getContentSize();
      this.addChild(backgroundSpriteFront);
      backgroundSpriteFront.setPosition(winSize.width / 2, winSize.height / 4 - 25);


      //木漏れ日
      /*var backgroundSpriteRight = cc.Sprite.create(res.background_right_png);
      var size = backgroundSpriteRight.getContentSize();
      this.addChild(backgroundSpriteRight);
      backgroundSpriteRight.setPosition(winSize.width / 2 , winSize.height / 2);
      */
      var backgroundSpriteRight = cc.Sprite.create(res.background_right_png);
      var size = backgroundSpriteRight.getContentSize();
      this.addChild(backgroundSpriteRight);
      backgroundSpriteRight.setPosition(winSize.width / 2 , winSize.height / 2);

      var animationframe = [];
      //スプライトフレームを格納する配列
      var texture = cc.textureCache.addImage(res.background_right_png);
      //スプライトフレームを作成
      var frame = new cc.SpriteFrame.createWithTexture(texture, cc.rect(1280, 544, 1280, 544));
      //スプライトフレームを配列に登録
      animationframe.push(frame);
      var animation = new cc.Animation(animationframe, 0.08);
      //永久ループのアクションを定義
      var action = new cc.RepeatForever(new cc.animate(animation));
      //実行
      backgroundSpriteRight.runAction(action);

      //カーテン右
      var curtain_right = cc.Sprite.create(res.curtain_png);
      curtain_right.setFlippedX(true);
      var size = curtain_right.getContentSize();
      this.addChild(curtain_right);
      curtain_right.setPosition(winSize.width - 100, winSize.height / 2);
      //背景画像を画面の大きさに合わせるためのScaling処理
      curtain_right.setScale(winSize.height / size.height);

      //カーテン左
      var curtain_left = cc.Sprite.create(res.curtain_png);
      var size = curtain_left.getContentSize();
      this.addChild(curtain_left);
      curtain_left.setPosition(winSize.width / 9, winSize.height / 2);
      //背景画像を画面の大きさに合わせるためのScaling処理
      curtain_left.setScale(winSize.height / size.height);

      //ゲージ(左)
      var gauge = cc.Sprite.create(res.gauge_png);
      var size = gauge.getContentSize();
      this.addChild(gauge);
      gauge.setPosition(winSize.width / 6 + 10, winSize.height / 1 - 90);
      var animationframe = [];
      //スプライトフレームを格納する配列
      var texture = cc.textureCache.addImage(res.gauge_png);
      //スプライトフレームを作成
      var frame = new cc.SpriteFrame.createWithTexture(texture, cc.rect(200, 48, 200, 48));
      //スプライトフレームを配列に登録
      animationframe.push(frame);
      var animation = new cc.Animation(animationframe, 0.08);
      //永久ループのアクションを定義
      var action = new cc.RepeatForever(new cc.animate(animation));
      //実行
      gauge.runAction(action);

      //ゲージ(右)
      var gauge2 = cc.Sprite.create(res.gauge_png);
      var size = gauge2.getContentSize();
      this.addChild(gauge2);
      gauge2.setPosition(winSize.width / 2 + 10, winSize.height / 1 - 90);
      var animationframe = [];
      //スプライトフレームを格納する配列
      var texture = cc.textureCache.addImage(res.gauge_png);
      //スプライトフレームを作成
      var frame = new cc.SpriteFrame.createWithTexture(texture, cc.rect(200, 48, 200, 48));
      //スプライトフレームを配列に登録
      animationframe.push(frame);
      var animation = new cc.Animation(animationframe, 0.08);
      //永久ループのアクションを定義
      var action = new cc.RepeatForever(new cc.animate(animation));
      //実行
      gauge2.runAction(action);

      //パネル
      var panel = cc.Sprite.create(res.panel_png);
      var size = panel.getContentSize();
      this.addChild(panel);
      panel.setPosition(winSize.width / 2, winSize.height + 50);
   }
});

var levelLayer = cc.Layer.extend({
   ctor: function() {
      this._super();
      var size = cc.director.getWinSize();
      for (i = 0; i < 7; i++) {　　　　　　
         for (j = 0; j < 10; j++) {
            switch (level[i][j]) {
               case 1:
                  var groundSprite = cc.Sprite.create(res.ground_png);
                  groundSprite.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2);
                  this.addChild(groundSprite);
                  break;
               case 2:
                  blockSprite = cc.Sprite.create(res.block_png);
                  blockSprite.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2);
                  this.addChild(blockSprite);
                  break;
            }
         }
      }
      this.scheduleUpdate();
   }/*,
   update: function(dt) {
     //衝突判定処理
       var playerBoundingBox = player.getBoundingBox();
       var coinBoundingBox = blockSprite.getBoundingBox();
       //rectIntersectsRectは２つの矩形が交わっているかチェックする
       if (cc.rectIntersectsRect(playerBoundingBox, coinBoundingBox)){
         //gameLayer.removeAsteroid(this); //削除する
         console.log("hit");
         remove(this);
       }
   }*/
});


var player;
var playerLayer = cc.Layer.extend({
   ctor: function() {
      this._super();
      player = new Player();
      this.addChild(player);
      //ショッピングカートを操作するレイヤー

      //左ボタン
      leftBtn = cc.Sprite.create(res.leftbutton_png);
      this.addChild(leftBtn, 0);
      leftBtn.setPosition(60, 40);
      leftBtn.setOpacity(128);
      leftBtn.setTag(1);
      //右ボタン
      rightBtn = cc.Sprite.create(res.rightbutton_png);
      this.addChild(rightBtn, 0);
      rightBtn.setPosition(150, 40);
      rightBtn.setOpacity(128);
      rightBtn.setTag(2);

      //ジャンプボタン
      jumpBtn = cc.Sprite.create(res.rightbutton_png);
      jumpBtn.setRotation(-90);
      this.addChild(jumpBtn, 0);
      jumpBtn.setPosition(winSize.width - 60, 40);
      jumpBtn.setOpacity(128);
      jumpBtn.setTag(3);


      cc.eventManager.addListener(listener, leftBtn);
      cc.eventManager.addListener(listener.clone(), rightBtn);
      cc.eventManager.addListener(listener.clone(), jumpBtn);

      cc.eventManager.addListener(keylistener, this);

   }

});

var Player;
var Player = cc.Sprite.extend({
   ctor: function() {
      this._super();
      this.initWithFile(res.player_frames);
      this.workingFlag = false;
      this.xSpeed = 0;
      console.log(this);
      this.ySpeed = 0;
      this.jumpFlag = false;
      for (i = 0; i < 7; i++) {
         for (j = 0; j < 10; j++) {
            if (level[i][j] == 3) {
               this.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2);
               playerPosition = {
                  x: j,
                  y: i
               };
            }
         }
      }

          var animationframe = [];
          //スプライトフレームを格納する配列
          var texture = cc.textureCache.addImage(res.player_frames);
          for (i = 0; i < 4; i++) {
              //スプライトフレームを作成
              var frame = new cc.SpriteFrame.createWithTexture(texture, cc.rect(192 * i, 390, 192, 128));
              //スプライトフレームを配列に登録
              animationframe.push(frame);
          }
          //スプライトフレームの配列を連続再生するアニメーションの定義
          var animation = new cc.Animation(animationframe, 0.1);
          //永久ループのアクションを定義
          var action = new cc.RepeatForever(new cc.animate(animation));
          //実行
          this.runAction(action);

          /*if(this.jumpFlag == true){
            var animationframe = [];
            //スプライトフレームを格納する配列
            var texture = cc.textureCache.addImage(res.player_frames);
            for (i = 0; i < 4; i++) {
                //スプライトフレームを作成
                var frame = new cc.SpriteFrame.createWithTexture(texture, cc.rect(192 * i, 390, 192, 128));
                //スプライトフレームを配列に登録
                animationframe.push(frame);
            }
            //スプライトフレームの配列を連続再生するアニメーションの定義
            var animation = new cc.Animation(animationframe, 0.1);
            //永久ループのアクションを定義
            var action = new cc.RepeatForever(new cc.animate(animation));
            //実行
            this.runAction(action);
          }*/
          this.scheduleUpdate();
   },


   //移動のため
   update: function(dt) {
      //console.log(this.jumpFlag, this.ySpeed);

      if (this.xSpeed > 0) { //スピードが正の値（右方向移動）
         //　向きを判定させる
         this.setFlippedX(false);
      }
      if (this.xSpeed < 0) { //スピードが負の値（左方向移動）
         this.setFlippedX(true);
      }
      //プレイヤーを降下させる処理　ジャンプボタンが押されてないときで、プレイヤが空中にある場合
      if (this.jumpFlag == false) {
         if (this.getPosition().y < tileSize * 1.6) this.ySpeed = 0;
         else this.ySpeed = this.ySpeed - 0.5;

      }
      //画面端の処理(左)
      if(this.getPosition().x < winSize.width / 9 && this.xSpeed < 0){
        this.xSpeed = 0;
      }
      //画面端の処理(右)
      if(this.getPosition().x > winSize.width - 100 && this.xSpeed > 0){
        this.xSpeed = 0;
      }
      //位置を更新する
      this.setPosition(this.getPosition().x + this.xSpeed, this.getPosition().y + this.ySpeed);


   }
});


//タッチリスナーの実装
var listener = cc.EventListener.create({
   event: cc.EventListener.TOUCH_ONE_BY_ONE,
   // swallowTouches: true,

   onTouchBegan: function(touch, event) {
      var target = event.getCurrentTarget();
      var location = target.convertToNodeSpace(touch.getLocation());
      var spriteSize = target.getContentSize();
      var spriteRect = cc.rect(0, 0, spriteSize.width, spriteSize.height);
      //タッチした場所が、スプライトの内部に収まっていたら
      if (cc.rectContainsPoint(spriteRect, location)) {
         console.log(target.getTag() + "Btnがタッチされました");

         //タッチしたスプライトが左ボタンだったら
         if (target.getTag()　 == 1) {
            player.xSpeed = -2.5;
            leftBtn.setOpacity(255);
            rightBtn.setOpacity(128);
         } else {
            //タッチしたスプライトが右ボタンだったら
            if (target.getTag()　 == 2) {
               player.xSpeed = 2.5;
               rightBtn.setOpacity(255);
               leftBtn.setOpacity(128);
            }
         }
         //タッチしたスプライトがジャンプボタンだったら
         if (target.getTag()　 == 3) {
            if (player.jumpFlag == false && player.ySpeed == 0) player.ySpeed = 9;
            player.jumpFlag = true;
            jumpBtn.setOpacity(255);
         }
      }
      return true;
   },
   //タッチを止めたときは、移動スピードを0にする
   onTouchEnded: function(touch, event) {
      player.jumpFlag = false;
      player.xSpeed = 0;
      //player.ySpeed = 0;
      leftBtn.setOpacity(128);
      rightBtn.setOpacity(128);
      jumpBtn.setOpacity(128);
   }

});

//キーボードリスナーの実装
var keylistener = cc.EventListener.create({
   event: cc.EventListener.KEYBOARD,
   // swallowTouches: true,

   onKeyPressed: function(keyCode, event) {
      if (keyCode == 65 || keyCode == 37) { // a-Keyで左に移動
         player.xSpeed = -2.5;
         leftBtn.setOpacity(255);
         rightBtn.setOpacity(128);
      }
      if (keyCode == 68 || keyCode == 39) { // d-Keyで左に移動
         player.xSpeed = 2.5;
         rightBtn.setOpacity(255);
         leftBtn.setOpacity(128);
      }
      if (keyCode == 32 || keyCode == 38) { // スペースキーか上矢印キーでジャンプ
         if (player.jumpFlag == false && player.ySpeed == 0) player.ySpeed = 9;
         player.jumpFlag = true;
         jumpBtn.setOpacity(255);
      }
      if (keyCode == 87) {
        attackflg = true;
      }
      return true;
   },
   onKeyReleased: function(keyCode, event) {
      player.jumpFlag = false;
      player.xSpeed = 0;
      //player.ySpeed = 0;
      leftBtn.setOpacity(128);
      rightBtn.setOpacity(128);
      jumpBtn.setOpacity(128);
   },

});



/*var coinLayer = cc.Layer.extend({
   ctor: function() {
      this._super();
      coin = new Coin();
      this.addChild(coin);
      //cc.eventManager.addListener(listener, this);

   }

});*/
var coinLayer = cc.Sprite.extend({
  ctor: function() {
    this._super();
    //this.initWithFile(res.coin_png);
    this.velocity = cc.p(0, 0);
    this.FrameCount = 0;

    for (i = 0; i < 7; i++) {　　　　　　
      for (j = 0; j < 10; j++) {
        switch (level[i][j]) {
          //銅コイン
          case 6:
          coinSprite = cc.Sprite.create(res.coin_png);
          //this.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2);
          coinSprite.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2);
          this.addChild(coinSprite);

          var animationframe = [];
          //スプライトフレームを格納する配列
          var texture = cc.textureCache.addImage(res.coin_png);
          for (k = 0; k < 8; k++) {
              //スプライトフレームを作成
              var frame = new cc.SpriteFrame.createWithTexture(texture, cc.rect(24 * k, 0, 24, 24));
              //スプライトフレームを配列に登録
              animationframe.push(frame);
          }
          //スプライトフレームの配列を連続再生するアニメーションの定義
          var animation = new cc.Animation(animationframe, 0.08);
          //永久ループのアクションを定義
          var action = new cc.RepeatForever(new cc.animate(animation));
          //実行
          coinSprite.runAction(action);
          coinSprite.scheduleUpdate();
          break;

          //銀コイン
          case 7:
          coinSprite = cc.Sprite.create(res.coin_png);
          //this.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2);
          coinSprite.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2);
          this.addChild(coinSprite);

          var animationframe = [];
          //スプライトフレームを格納する配列
          var texture = cc.textureCache.addImage(res.coin_png);
          for (k = 0; k < 8; k++) {
              //スプライトフレームを作成
              var frame = new cc.SpriteFrame.createWithTexture(texture, cc.rect(24 * k, 24, 24, 24));
              //スプライトフレームを配列に登録
              animationframe.push(frame);
          }
          //スプライトフレームの配列を連続再生するアニメーションの定義
          var animation = new cc.Animation(animationframe, 0.08);
          //永久ループのアクションを定義
          var action = new cc.RepeatForever(new cc.animate(animation));
          //実行
          coinSprite.runAction(action);
          coinSprite.scheduleUpdate();
          break;

          //金コイン
          case 8:
          coinSprite = cc.Sprite.create(res.coin_png);
          //this.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2);
          coinSprite.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2);
          this.addChild(coinSprite);

          var animationframe = [];
          //スプライトフレームを格納する配列
          var texture = cc.textureCache.addImage(res.coin_png);
          for (k = 0; k < 8; k++) {
              //スプライトフレームを作成
              var frame = new cc.SpriteFrame.createWithTexture(texture, cc.rect(24 * k, 48, 24, 24));
              //スプライトフレームを配列に登録
              animationframe.push(frame);
          }
          //スプライトフレームの配列を連続再生するアニメーションの定義
          var animation = new cc.Animation(animationframe, 0.08);
          //永久ループのアクションを定義
          var action = new cc.RepeatForever(new cc.animate(animation));
          //実行
          coinSprite.runAction(action);
          this.scheduleUpdate();
          break;
          //ハート
          case 12:
          heartSprite = cc.Sprite.create(res.heart_png);
          heartSprite.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2);
          this.addChild(heartSprite);
        }
      }
    }
    this.scheduleUpdate();
  },
  update: function(dt) {
    //衝突判定処理

      var playerBoundingBox = player.getBoundingBox();
      var coinBoundingBox = coinSprite.getBoundingBox();
      //rectIntersectsRectは２つの矩形が交わっているかチェックする
      if (cc.rectIntersectsRect(playerBoundingBox, coinBoundingBox)){
        //gameLayer.removeAsteroid(this); //削除する
        console.log("hit");
        //audioEngine.playEffect(res.se_coin , false);
        //this.removeChild(coinSprite);
        this.removeChild(coinSprite);
      }
      var heartBoundingBox = heartSprite.getBoundingBox();
      //rectIntersectsRectは２つの矩形が交わっているかチェックする
      if (cc.rectIntersectsRect(playerBoundingBox, heartBoundingBox)){
        //gameLayer.removeAsteroid(this); //削除する
        console.log("hit");
        //audioEngine.playEffect(res.se_coin , false);
        //this.removeChild(coinSprite);
        this.removeChild(heartSprite);
      }
  }
});
