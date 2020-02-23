import axios from 'axios'
import consts from '@/consts'

export default {
  methods: {
    updateDatabase: function(){
      let data_json = JSON.stringify(this.notes)
      axios.post(consts.API_URL_UPDATE_NOTES, data_json)
          .then((res) => {})
          .catch((err) => {console.log(err)})
    }
  }
}