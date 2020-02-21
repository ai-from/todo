export default {
  methods: {
    removeEmptyFields: function(arr){
      for( let i = 0; i < arr.length; i++){
        if (arr[i].name.length === 0){
          arr.splice(i, 1)
          i--
        }
      }
    }
  }
}