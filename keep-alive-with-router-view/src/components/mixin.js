let object = {}
object.data = () => {
  return {
    msg: "",
    isFirstEnter: false
  }
}
object.methods = {
  getData() {
    console.log(this.$route.meta.keepAlive)
    this.msg = `我是${this.$route.name}数据`
  }
}
export default object