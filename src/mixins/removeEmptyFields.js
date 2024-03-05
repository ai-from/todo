import checkField from "./checkField"

export default {
  mixins: [checkField],
  methods: {
    removeEmptyFields: function(arr){
      for( let i = 0; i < arr.length; i++){
        if (!this.checkField(arr[i].name)){
          arr.splice(i, 1)
          i--
        }
      }
    }
  }
}