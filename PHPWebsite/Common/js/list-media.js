function ListMedia(selector, options) {
	this.selector = selector;
	this.options = options;
	this.mediaLoading = false;
	this.startPoint = 0;
	this.endPoint = 30;
	this.mediaJsonData = {};
	this.initListener = false;
	this.canRequestMedia = true;
	this.excludeMedia = [];

	this.init();
}
// Initiate the creating of the list
ListMedia.prototype.init = function () {
	var self = this;
	this.getJsonMediaData(function() {
		self.createMediaContainer();
	});
}
// Get the json data of the media
ListMedia.prototype.getJsonMediaData = function (callback) {
	var self = this;
	if(self.canRequestMedia) {
		$.post(self.options.url,{
				mediaPerPage:self.options.mediaPerPage, 
				excludeMedia:self.excludeMedia.toString()
			}, function (data) {
			if (typeof data == "object") {
				if(typeof callback == "function") {
					self.mediaJsonData = data;
					if(data.length < self.options.mediaPerPage){
						self.canRequestMedia = false;
					}
					callback();
				}
			} else {
				console.error("MediaList: Data Error");
			}
		}).fail(function(){
			console.error("MediaList: Request Error");
		});	
	}	
}

ListMedia.prototype.createMediaContainer = function () {
	var self = this;

	$.each(self.mediaJsonData, function(i) {
		if(i >= self.startPoint && i < self.endPoint){
			self.selector.find(".grid").append(self.createMedia(self.mediaJsonData[i]));
		}
		if(i == self.mediaJsonData.length -1) {
			if(typeof self.options.afterMediaAdded == "function"){
				self.options.afterMediaAdded();			
			}
			if(!self.initListener)	
				self.scrollListerner();
		}
	});
}

ListMedia.prototype.createMedia = function (obj) {
	if(obj.type == "image"){
		return    '<div class="masonry-item media-item new" data-type="image">'
				+ '	<img class="lazyload masonry-content" title="'+obj.url+'" alt="Gallery Image" src="'+obj.url+'">'
				+ '</div>';
	}else{
		return    '<div class="masonry-item  media-item video-item new" data-id="'+obj.id+'" data-type="video">'
				+ '	<img class="lazyload masonry-content" title="'+obj.FileName+'" alt="'+obj.FileDescription+'" src="'+obj.origenalPath+'" data-src="'+obj.origenalPath+'">'
				+ '</div>';
	}
}

ListMedia.prototype.scrollListerner = function() {
	var self = this;
	self.initListener = true;
	$(window).off("scroll").on("scroll",function(){
		var windowScrolled = $(window).scrollTop();
		var windowHeight = $(window).height();
		var selectorHeight = parseInt(self.selector.height());
		var selectorOffsetBottom = (selectorHeight - windowHeight) - (windowScrolled + (windowHeight * 3) );

		if(selectorOffsetBottom <= 0 && !self.mediaLoading) {			
			if(self.endPoint >= self.options.mediaPerPage){
				self.startPoint = 0;
				self.endPoint = 30;
				self.mediaLoading = true;
				self.getJsonMediaData(function(){
					self.createMediaContainer();
					self.mediaLoading = false;
				});				
			}else{
				self.startPoint += 30;
				self.endPoint += 30;
				self.createMediaContainer();
			}
		}
	});
}

$.fn.listMedia = function (options) {
	var options = $.extend({
		url:"#",
		mediaPerPage:1000,
	},options)
	this.listMedia = new ListMedia(this, options);
	return this.listMedia;
}