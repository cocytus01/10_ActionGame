/*
var coinLayer = cc.Layer.extend({
   ctor: function() {
      this._super();
      coin = new Coin();
      this.addChild(coin);
      //cc.eventManager.addListener(listener, this);

   }

});
var Coin = cc.Sprite.extend({
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
          var coinSprite = cc.Sprite.create(res.coin_png);
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
          var coinSprite = cc.Sprite.create(res.coin_png);
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
          var coinSprite = cc.Sprite.create(res.coin_png);
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

          coinSprite.scheduleUpdate();
          break;
        }
      }
    }
  }
});*/
