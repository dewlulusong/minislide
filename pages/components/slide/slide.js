var scale_timer;
Component({
	/**
   	* 组件的属性列表
   	*/
	properties: {
	  	min:{
	  		type: Number,
	      	value: 0
	  	},
	  	max:{
	  		type: Number,
	      	value: 200
	  	},
	  	def:{
	  		type: Number,
	      	value: 30
	  	},
        unit:{
            type: String,
            value: 'kg'
        },
        title:{
            type: String,
            value: 'weight'
        },
        step:{ //步长 每格代表的值
            type: Number,
            value: 1
        },
        dot:{ //小数点位数
            type: Number,
            value: 0
        },
  	},

  	/**
   	* 组件的初始数据
   	*/
  	data: {
        curVal: 0,//当前值
        middleStep: 5,
        bigStep: 10,
        cellW: 10
  	},
	created: function(){
        //组件实例被创建，此时不能使用setData

    },
    ready: function(){
        //初始化
        var _this = this;
        var _this_ = this.data;
        console.log('((_this_.max - _this_.min) / _this_.step)',((_this_.max - _this_.min) / _this_.step));
        console.log('((_this_.max - _this_.min) / _this_.step)>>0',((_this_.max - _this_.min) / _this_.step)>>0);

        //一共有多少格
        var count = (((_this_.max - _this_.min) / _this_.step)>>0) + 1;
        console.log('count',count);
        console.log('count>>0',count>>0);


        _this.setData({
            count: count,
            scaleWidth: (count * _this_.cellW) + 'px', //尺子总长度
            salNum: (_this_.def - _this_.min) / _this_.step *  _this_.cellW //这里已经初始化成功了.
        });

        //初始值
      //  _this.setVal(_this_.salNum);
    },
    methods:{
        bindscroll: function(e){
            // 移动距离
            let left = e.detail.scrollLeft;

            this.setVal(left);

        },
        setVal: function(left){

            let curVal =( (  left / this.data.cellW  * this.data.step + this.data.min)*10**this.data.dot+0.5>>0)/10**this.data.dot;
            this.setData({
                curVal//: curVal > this.data.max ? this.data.max : (curVal < this.data.min ? this.data.min : curVal), 这行实际没有, 而且还会掩盖bug.
                // salNum: left
            });

            this.triggerEvent('slide',{"curVal":this.data.curVal});
        },
        // setDefVal: function(){
        //     //初始值
        //     var _this = this;
        //     this.setData({
        //         salNum: (_this.data.curVal - this.data.min) * this.data.cellW * this.data.step
        //     });
        // }
    }
})