<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>
<script>
import BScroll from "better-scroll"
	export default{
		props:{
			probetype:{
				type:Number,
				default:1
			},
			click:{
				type:Boolean,
				default:true
			},
			data:{
				type:Array,
				default:null
			},
			listenScroll:{
				type:Boolean,
				default:false
			},
			pullup:{
				type:Boolean,
				default:false
			},
			pulldown:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				scroll:""
			}
		},
		mounted(){
			setTimeout(()=>{
				this._initScroll();

			}, 20)

		},
		methods:{
			_initScroll(){
				if (!this.$refs.wrapper) {
					return
				}
				this.scroll = new BScroll(this.$refs.wrapper,{
					probeType:this.probetype,
					// click:this.click
				})
				if (this.listenScroll) {
					let _this = this;
					this.scroll.on("scroll",(pos)=>{
						_this.$emit("scroll",pos);
					})
				}
				// 派发上拉加载事件
				if (this.pullup) {
					this.scroll.on("scrollEnd",(pos)=>{

						if (this.scroll.y<=this.scroll.maxScrollY+50) {
							this.$emit("pullupEvent")
						}
					})
				}
				// 派发下拉刷新事件
				if (this.pulldown) {
					this.scroll.on("touchend",(pos)=>{
						if (pos.y>50) {
							this.$emit("pulldownEndEvent")
						}
					})
					var _this = this;
					this.scroll.on("scroll",(pos)=>{
						console.log(pos.y);
						if (pos.y>1) {
							_this.$emit("pulldownBeforeEvent")
						}
					})
				}
			},
			enable(){
				this.scroll && this.scroll.enable();
			},
			disable(){
				this.scroll && this.scroll.disable();
			},
			refresh(){
				this.scroll && this.scroll.refresh();
			},
			scrollTo(){
				this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
			},
			scrollToElement(){
				this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
			}
		},
		watch:{
			data(){
				setTimeout(()=>{
					this.refresh();
				},20)
			}
		}

	}
</script>
<style >

</style>
