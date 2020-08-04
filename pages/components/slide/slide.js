//var scale_timer;
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        min: {
            type: Number,
            value: 0
        },
        max: {
            type: Number,
            value: 200
        },
        def: {
            type: Number,
            value: 30
        },
        unit: {
            type: String,
            value: 'kg'
        },
        title: {
            type: String,
            value: 'weight'
        },
        step: { //步长 每格代表的值
            type: Number,
            value: 1
        },
        dot: { //小数点位数
            type: Number,
            value: 0
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        curVal: 0, //当前值
        middleStep: 5,
        bigStep: 10,
        cellW: 10,
        lasttime: Date.now(), //最后一次滚动时间.
        lastleft: 0, //最后一个left数据, 初始化的时候设置.
        timestep:0,
        lastcur: -1, //最后一次记录的位置, 故意为-1, 是为了初始刷新一次.
        dot10:1, // 10**dot的值, 参与计算. 
        stepw:1,// _this_.cellW/ _this_.step 每步长宽度, 参与计算
    },
    created() {
        //组件实例被创建，此时不能使用setData

    },
    ready() {
        //初始化
        // var _this = this;
        const _this_ = this.data;
       // console.log('((_this_.max - _this_.min) / _this_.step)', ((_this_.max - _this_.min) / _this_.step));
      //  console.log('((_this_.max - _this_.min) / _this_.step)>>0', ((_this_.max - _this_.min) / _this_.step) >> 0);

        //一共有多少格
        const count = (((_this_.max - _this_.min) / _this_.step) >> 0) + 1;
       console.log('count', count);
      //  console.log('count>>0', count >> 0);
        _this_.stepw=  _this_.cellW/_this_.step;
        _this_.lastleft=(_this_.def - _this_.min) *_this_.stepw;
        //_this_.lastcur=_this_.def;
        _this_.dot10= 10 ** _this_.dot;
        console.log('data'," _this_.stepw", _this_.stepw," _this_.lastleft", _this_.lastleft," _this_.lastcur", _this_.lastcur," _this_.dot10", _this_.dot10);

        this.setData({
            count,
            scaleWidth: (count * _this_.cellW) + 'px', //尺子总长度
            salNum:  _this_.lastleft, //这里已经初始了左边的滚动距离.
            //curVal: _this_.def,
        });
        
        // this.triggerEvent('slide', {
        //     "curVal": this.data.curVal
        // });
        //初始值
        // _this.setVal(_this_.salNum);
    },
    methods: {
        scroll(e) {
           
            // const timen=Date.now(); //最后一次滚动时间.
            // const passtime= timen- this.data.lasttime;

            // this.data.lasttime= timen;

            const move=e.detail.scrollLeft - this.data.lastleft;
            this.data.lastleft= e.detail.scrollLeft;

            //const logger = wx.getLogManager({level: 1})
            // const speed=move/passtime;
            // console.log("dodododo, 当前时间:", timen);
            // console.log("dodododo, passtime:", passtime);
            // console.log("dodododo, 当前位置:", e.detail.scrollLeft);
         //   console.log("dodododo, passmove:", move);
            // console.log("dodododo, speed:", speed);
            if(move<2 && move>-2 ){
                this.setVal(e.detail.scrollLeft);
                return;
            }
            if (this.data.timestep<20) {
                this.data.timestep++;
                return;
            } 
                this.data.timestep=0;
                this.setVal(e.detail.scrollLeft);
                return;
            
            //if(speed<0.5)this.data.timestep=50;

            // 移动距离
            // const left = e.detail.scrollLeft;
           
        },
        setVal(left) {
         //   console.log("ooooo");

            // const curVal =( (  left / this.data.cellW  * this.data.step + this.data.min)*10**this.data.dot+0.5>>0)/10**this.data.dot;
            const curVal= ((left / this.data.stepw + this.data.min) * this.data.dot10 + 0.5 >> 0) / this.data.dot10;
            console.log({left},this.data.stepw, this.data.dot10);
            if (this.data.lastcur==curVal)  return;
            
            this.data.lastcur=curVal;
            this.setData({
                curVal,
                //: curVal > this.data.max ? this.data.max : (curVal < this.data.min ? this.data.min : curVal), 这行实际没有, 而且还会掩盖bug.
                // salNum: left
            });
            this.triggerEvent('slide', {
                "curVal": this.data.curVal
            });
        },
        // setDefVal: function(){
        //     //初始值
        //     var _this = this;
        //     this.setData({
        //         salNum: (_this.data.curVal - this.data.min) * this.data.cellW * this.data.step
        //     });
        // }
    }
});


