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
	      	value: 100
	  	},
	  	def:{
	  		type: Number,
	      	value: 30
	  	},
        unit:{
            type: String,
            value: ''
        }
  	},

  	/**
   	* 组件的初始数据
   	*/
  	data: {
        curVal: 0,//当前值
		step: 1,//步长 每格代表的值
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
        //一共有多少格
        var count = Math.ceil((_this_.max - _this_.min) / _this_.step) + 1;
        _this.setData({
            count: count,
            scaleWidth: (count * _this_.cellW) + 'px', //尺子总长度
            salNum: (_this_.def - _this_.min) / _this_.step *  _this_.cellW
        });

        //初始值
        _this.setVal(_this_.salNum);
    },
    methods:{
        bindscroll: function(e){
            // 移动距离
            let left = e.detail.scrollLeft;

            this.setVal(left);

        },
        setVal: function(left){

            let curVal = Math.round(  left / this.data.cellW / this.data.step ) + this.data.min;
            this.setData({
                curVal: curVal > this.data.max ? this.data.max : (curVal < this.data.min ? this.data.min : curVal),
                // salNum: left
            });

            this.triggerEvent('slide',{"curVal":this.data.curVal});
        },
        setDefVal: function(){
            //初始值
            var _this = this;
            this.setData({
                salNum: (_this.data.curVal - this.data.min) * this.data.cellW * this.data.step
            });
        }
    }
})