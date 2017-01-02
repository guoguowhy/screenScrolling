(function(root,factory,plug){
	factory(root.jQuery,plug);
})(window,function($,plug){
	var __PROTOTYPE__ = {
		_init : function(){
			this.$pageWrap = this.addClass("page-wrap")
			.find("ul:first")
			.addClass("page-wrap page-animate")
			.children("li").addClass("page").parent();
			this.$pages = this.$pageWrap.find("li.page");
			this.index = 0;
			this.last = this.$pages.length-1;
			this.lock = true;
		},
		_serials : function(){
			if(!this.showSerial)return;
			this.$serials = $("<ul></ul>");
			for(var i=0;i<this.$pages.length;i++){
				this.$serials.append("<li class='"+(!i?"curr":"")+"'><a href='#'></a></li>");
			}
			this.$serials.addClass("serial");
			this.append(this.$serials);
		},
		_attachEvent : function(event,args){
			this.trigger(event,args);
		},
		_bind : function(){
			var _$this = this;//
			this.on("mousewheel",function(e){
				if(_$this.lock){
					_$this.lock = false;
					var dir = e.originalEvent.deltaY<0;
					var beforeIndex = _$this.index;
					dir?_$this.index--:_$this.index++;
					_$this.index = Math.min(_$this.index,_$this.last);
					_$this.index = Math.max(_$this.index,0);
					if(beforeIndex==_$this.index){
						_$this.lock = true;
						return;
					}
					_$this._attachEvent("beforeWheel",{
						before : beforeIndex,
						beforeDOM : _$this.$pages.eq(beforeIndex),
						after : _$this.index,
						afterDOM : _$this.$pages.eq(_$this.index)
					});
					_$this.$pageWrap.css({
						"transform": "translateY(-"+_$this.index+"00%)",
						"-moz-transform": "translateY(-"+_$this.index+"00%)",
						"-webkit-transform": "translateY(-"+_$this.index+"00%)",
						"-o-transform": "translateY(-"+_$this.index+"00%)"
					});
					setTimeout(function(){
						_$this.lock = true;
						_$this._attachEvent("afterWheel",{
							before : beforeIndex,
							beforeDOM : _$this.$pages.eq(beforeIndex),
							after : _$this.index,
							afterDOM : _$this.$pages.eq(_$this.index)
						});
						_$this.$serials
							.children()
							.eq(_$this.index)
							.addClass("curr")
							.siblings()
							.removeClass("curr");
					},1000);
				}
			});
		}
	};
	var __DEFAULTS__ = {
		showSerial : true//是否显示serial按钮
	}; 
	$.fn[plug] = function(options){
		$.extend(this,__PROTOTYPE__,__DEFAULTS__,options);
		this._init();
		this._serials();
		this._bind();
		return this;
	}
},"pageWrapper");
