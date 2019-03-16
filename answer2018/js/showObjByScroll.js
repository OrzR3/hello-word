/*
 * @author pengmiao 
 * showObjByScroll对象的作用就是当导航无法完全展示时，点击被隐藏的对象导航整体滑动，让对象完全展示
 * @parentObj  必传  导航对象 支持样式或ID
 * @width  可选 可视区域的宽度，为0则取屏幕宽度
 * @parentLeft 可选 你对象的左边距
 */
function showObjByScroll(parent,width,parentLeft)
{
	//导航对象
	this.parentObj = document.querySelector(parent);
	//可视区域的宽度
	this.clientWidth = ("undefined" == typeof(width)) ? document.documentElement.clientWidth : width;
	//导航队列
	this.childList = new Array();
	//导航对像偏移值
	this.shifting = 0;
	//你对象的左边距
	this.parentLeft = ("undefined" == typeof(parentLeft)) ? 0 : parentLeft;
}
/*
 * @child  当前被操作的对象
 * @index  必传 下标
 */
showObjByScroll.prototype.showChild = function(child,index)
{
	if(this.childList.length == 0)this.childList = this.getAllChilds();
	var _left = child.offsetLeft + this.parentLeft;
	var _width = child.offsetWidth;
	console.log(child);
	console.log("_left:"+_left+" _width:"+_width);
//	console.log(this.clientWidth);
	var childNeedWidth = _left + _width; //对像完全展示需要的宽度
	console.log("childNeedWidth:"+childNeedWidth+"  clientWidth:"+this.clientWidth+"  shifting:"+this.shifting);
	if(childNeedWidth > this.clientWidth-this.shifting)//后面不完全展示的情况
	{
		this.shifting = 0 - (childNeedWidth-this.clientWidth*1);
		console.log("this.shifting:"+this.shifting);
		this.parentObj.style.left = this.shifting+"px";
	}
	else if(this.shifting<0 && _left+this.shifting<0)//前面不完全展示的情况
	{
		console.log("else");
		this.shifting = (index != 0) ? this.shifting+_width : this.parentLeft;
		this.parentObj.style.left = this.shifting+"px";
	}else{
	}
}
//获得导航内部所有对象
showObjByScroll.prototype.getAllChilds = function()
{
	var  childs=this.parentObj.childNodes;
	var  array = new Array();
    for(var i=0;i<childs.length;i++){
            array.push(childs[i]);
    }
	return array;
}
