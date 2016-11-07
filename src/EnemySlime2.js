
var slime2Layer = cc.Layer.extend({
   ctor: function() {
      this._super();
      slime2 = new Slime2();
      this.addChild(slime2);
      //cc.eventManager.addListener(listener, this);

   }

});
var Slime2 = cc.Sprite.extend({
  ctor: function() {
    this._super();
    //this.initWithFile(res.coin_png);
    this.velocity = cc.p(0, 0);
    this.FrameCount = 0;

    for (i = 0; i < 7; i++) {　　　　　　
      for (j = 0; j < 10; j++) {
        switch (level[i][j]) {
          //黄色
          case 10:
          var slime2Sprite = cc.Sprite.create(res.slime_frames2);
          //this.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2);
          slime2Sprite.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2 - 20);
          this.addChild(slime2Sprite);

          var animationframe = [];
          //スプライトフレームを格納する配列
          var texture = cc.textureCache.addImage(res.slime_frames2);
          /*for (k = 0; i < 4; k++) {
              //スプライトフレームを作成
              var frame = new cc.SpriteFrame.createWithTexture(texture, cc.rect(128 * k, 64, 128, 64));
              //スプライトフレームを配列に登録
              animationframe.push(frame);
          }
          for (l = 0; l < 3; l++) {
            //スプライトフレームを作成
            var frame = new cc.SpriteFrame.createWithTexture(texture, cc.rect(128, 64 * l, 128, 64));
            //スプライトフレームを配列に登録
            animationframe.push(frame);
          }*/
          for (k = 0; k < 3; k++) {
            for (l = 0; l < 4; l++) {
              //スプライトフレームを作成
              var frame = new cc.SpriteFrame.createWithTexture(texture, cc.rect(128 * l, 64 * k, 128, 64));
              //スプライトフレームを配列に登録
              animationframe.push(frame);
            }
          }
          //スプライトフレームの配列を連続再生するアニメーションの定義
          var animation = new cc.Animation(animationframe, 0.08);
          //永久ループのアクションを定義
          var action = new cc.RepeatForever(new cc.animate(animation));
          //実行
          slime2Sprite.runAction(action);

          slime2Sprite.scheduleUpdate();
          break;

          //赤
          case 11:
          var slime2Sprite = cc.Sprite.create(res.slime_frames2);
          //this.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2);
          slime2Sprite.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2 - 20);
          this.addChild(slime2Sprite);

          var animationframe = [];
          //スプライトフレームを格納する配列
          var texture = cc.textureCache.addImage(res.slime_frames2);
          for (k = 0; k < 3; k++) {
            for (l = 0; l < 4; l++) {
              //スプライトフレームを作成
              var frame = new cc.SpriteFrame.createWithTexture(texture, cc.rect(128 * l, 192 + (64*k), 128, 64));
              //スプライトフレームを配列に登録
              animationframe.push(frame);
            }
          }
          //スプライトフレームの配列を連続再生するアニメーションの定義
          var animation = new cc.Animation(animationframe, 0.08);
          //永久ループのアクションを定義
          var action = new cc.RepeatForever(new cc.animate(animation));
          //実行
          slime2Sprite.runAction(action);

          slime2Sprite.scheduleUpdate();
          break;
        }
      }
    }
  }
});
