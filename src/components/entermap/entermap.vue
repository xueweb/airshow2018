<template>
  <div class="entermap">
      <div id="map2" class="map2" style="position: relative;width: 6rem;height: 6rem"></div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'entermap',
    mounted(){
      this.initmapb();
    },
    methods:{
      initmapb() {
        let _this = this;
        let map = new AMap.Map('img-wrap', {
          center: [113.510306, 22.222376],
          resizeEnable: true,
          zoom: 14,
          lang: "zh"
        });
        _this.mapb = map;
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
          map.addControl(new AMap.ToolBar());
          map.addControl(new AMap.Scale());
        });
        AMap.plugin('AMap.Geolocation', function () {
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'RB'
          });
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', function (data) {
            if (data) {
              // _this.params.push(JSON.stringify(data.position.getLng()));
              // _this.params.push(JSON.stringify(data.position.getLat()));
              //地理编码
              // _this.initializationb()

              // _this.positionpar.o = data.position.c.

              // debugger
            }
          });//返回定位信息
          AMap.event.addListener(geolocation, 'error', function (data) {
            console.log(data)
          });      //返回定位出错信息
        });
        AMap.plugin('AMap.Geocoder', function () {
          _this.geocoder = new AMap.Geocoder({
            city: "010",
            radius: 1000
          });
        });
        AMap.plugin('AMap.Driving', function () {
          _this.driving = new AMap.Driving({
            map: _this.mapb,
            panel: "panel",
            city: '珠海市',
          });
        });
        AMap.plugin('AMap.Transfer', function () {
          _this.transfer2 = new AMap.Transfer({
            map: _this.mapb,
            city: '珠海市',
            panel: 'panel',
            // policy: AMap.TransferPolicy.LEAST_TIME //乘车策略
          });

        });
      },
    }
  }
</script>

<style scoped lang="less">

</style>
