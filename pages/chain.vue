<template>
  <div>
    <div>
      <h1>추가하기</h1>
      <input type="text" v-model="Key" placeholder="Key">
      <input type="text" v-model="colour" placeholder="colour">
      <input type="text" v-model="make" placeholder="make">
      <input type="text" v-model="model" placeholder="model">
      <input type="text" v-model="owner" placeholder="owner">

      <button @click="invoke">invoke</button>
    </div>


    <div>
      <h1>검색</h1>
      <input type="text" v-model="search" placeholder="검색">
      <button @click="get">querySearch</button>
      <button @click="getAll">queryAll</button>
      <ul>
        <li v-for="data in dataset" v-bind:key="data">
          key: {{data.Key}}, color: {{data.Record.colour}}, make: {{data.Record.make}}, model: {{data.Record.model}}, owner: {{data.Record.owner}}
        </li>
      </ul>
    </div>


  </div>
</template>

<script>
import axios from 'axios'

export default{
  asyncData () {

  },
  data () {
    return {
      Key: '',
      colour: '',
      make: '',
      model: '',
      owner: '',
      dataset: [],
      search: ''
    }
  },
  methods: {

    async invoke() {
      let a = await axios.post('http://localhost:3000/api/v1.0/chains/invoke/', {
        Key: this.Key,
        colour: this.colour,
        make: this.make,
        model: this.model,
        owner: this.owner,
      })
      console.log(a)
    },

    async getAll(){
      let a = await axios.get('http://localhost:3000/api/v1.0/chains/query/all', {})
      this.dataset = a.data
    },

    async get() {
      let a = await axios.get(`http://localhost:3000/api/v1.0/chains/query/one?search=${this.search}`)

      this.dataset = []
      let temp = {Key: '', Record: {}}
      temp['Key'] = this.search
      temp['Record'] = {
        colour: a.data.colour,
        make: a.data.make,
        model: a.data.model,
        owner: a.data.owner,
        Key: this.search
      }
      this.dataset.push(temp)
      console.log({...a.data, Key: this.search})

    }
  }
}
</script>
