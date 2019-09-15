window.onload = function() {
	var container = document.querySelector(".container");
	var boxes = container.children;
	var column = Math.floor(container.clientWidth / boxes[0].offsetWidth);
	//先计算可以放多少列
	
	var heights = [];
	//这个数组用来存放每一列的高度
	
	heights = waterfall(0,heights);
	
	function waterfall(start, heights) {
		for(var i = start; i < boxes.length; i++) {
			if(i < column) {
				heights.push(boxes[i].offsetHeight);
			} else {
				var min = getMin(heights);
				var minIndex = min.index;
				var minHeight = min.value;
				//把每一张图片定位到高度最小的那一列上
				boxes[i].style.position = "absolute";
				boxes[i].style.top = minHeight + "px";
				boxes[i].style.left = boxes[minIndex].offsetLeft + "px";
				heights[minIndex] += boxes[i].offsetHeight;
			}
		}
		return heights;
	}
	
	var flag = true;
	var abc = 0;
	window.onscroll = function() {
		if(bottomed() && flag && (abc<3)) {
			flag = false;
			//如果触底，就发送Ajax请求，得到一批新数据
			var json = [
				{"src": "images/pbl/21.jpg"},
				{"src": "images/pbl/22.jpg"},
				{"src": "images/pbl/23.jpg"},
				{"src": "images/pbl/24.jpg"},
				{"src": "images/pbl/25.jpg"},
				{"src": "images/pbl/26.jpg"},
				{"src": "images/pbl/27.jpg"},
				{"src": "images/pbl/28.jpg"},
				{"src": "images/pbl/29.jpg"},
				{"src": "images/pbl/30.jpg"},
				{"src": "images/pbl/31.jpg"},
				{"src": "images/pbl/32.jpg"},
				{"src": "images/pbl/33.jpg"},
				{"src": "images/pbl/34.jpg"},
				{"src": "images/pbl/35.jpg"},			
			];
			var a = boxes.length;
			var imgarr = [];
			var divarr = [];
			for(var i = 0; i<json.length; i++) {
				//现在要把JSON传过来的图渲染到页面上
				var div = document.createElement("div");
				div.className = "box";
				divarr.push(div);
				var img = document.createElement("img");
				img.src = json[i].src;
				div.appendChild(img);
				imgarr.push(img);
				// container.appendChild(div); 现在图片还未加载，不要把div挂到.container，否则获取不到高度
			}
			var counter = 0;
			imgarr.forEach(function(v,i) {
				v.onload = function() {
					counter++;
					if(counter == json.length) {
						divarr.forEach(function(val,ind) {
							container.appendChild(val);
							// 把img加载完成之后再把div挂上
						});
						waterfall(a, heights);
						flag = true;
						abc++;
						console.log(abc);
					}
				}
			})
		}
	}
	
	//判断是否已经触底
	function bottomed() {
		var lastbox = boxes[boxes.length - 1];
		if(window.innerHeight + window.pageYOffset > lastbox.offsetTop) {
			return true;
		} else {
			return false;
		}
	}
	
	//得到一个数组中最小的那一项的索引和值
	function getMin(arr) {
		var min = {};
		min.index = 0;
		min.value = arr[min.index];
		for(var i = 0; i < arr.length; i++) {
			if(arr[i] < min.value) {
				min.value = arr[i];
				min.index = i;
			}
		}
		return min;
	}
}
