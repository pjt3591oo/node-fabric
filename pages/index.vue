<template>
  <div>
    <div>
      <h1>검색</h1>
      <input type="text" v-model="keyword" placeholder="검색">
      <button @click="search">검색</button>
      <!--<button @click="invoke">invoke</button>-->

      <ul>
        <li v-for="data in dataset" v-bind:key="data._id">
          <a :href="data._source.link">{{data._source.text}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      dataset: [],
      keyword: ''
    }
  },

  methods: {
    async search () {
      let datas = await axios.get(`http://localhost:3000/api/v1.0/elastic/search?keyword=${this.keyword}`)
      this.dataset = datas.data.hits.hits

      let a = await axios.post('http://localhost:3000/api/v1.0/chains/invoke/', {
        keyword: this.keyword,
      })
      console.log(datas)
//      console.log(a)
    },
    async invoke() {
      let a = await axios.post('http://localhost:3000/api/v1.0/chains/invoke/', {
        keyword: this.keyword,
      })
      console.log(a)
    },
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
