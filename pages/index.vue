<template>
  <div class="search_section">
    <div>
      <h1>Rapid Search Engine</h1>
      <div class="main_search_wrap">
          <input class="search_input" type="text" v-model="keyword" @keyup.enter="search" placeholder="검색">
          <button class="search_btn" @click="search">검색</button>
      </div>
      <!--<button @click="invoke">invoke</button>-->
      <ul class="search_list">
        <li v-for="data in dataset" v-bind:key="data._id">
          <a :href="data._source.link">
              {{data._source.text.slice(1, 30)}}
          </a>
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

      await axios.post('http://localhost:3000/api/v1.0/chains/invoke/', {
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

<style scoped>
* {
    color: #5b5b5b;
    font-size: 16px;
    line-height: 26px;
    box-sizing: border-box;
    -webkit-box-sizing: boder-box;
    -moz-box-sizing: boder-box;
}
input::-webkit-input-placeholder { font-size:16px; color: #5b5b5b; }
input::-moz-placeholder { font-size:16px; color: #5b5b5b; }
input:-ms-input-placeholder { font-size:16px; color: #5b5b5b; }
input:-moz-placeholder { font-size:16px; color: #5b5b5b; }

.search_section {
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 70px;
    padding: 0 15px;
}
.main_search_wrap {
    max-width: 600px;
    height: 50px;
    overflow: hidden;
    margin: 0 auto;
    margin-bottom: 60px;
    padding-right: 125px;
}

.search_section h1 {
    margin-bottom: 20px;
    font-size: 21px;
    font-weight: 400;
    text-align: center;
}

.search_input {
    width: 100%;
    height: 100%;
    padding: 0 15px;
    border: 1px solid #e8e8e8;
}
.search_btn {
    position: absolute;
    top: 0;
    right: 0;
    width: 105px;
    height: 100%;
    padding: 0;
    background-color: #fccd0b;
    color: #fff;
    font-size: 16px;
    font-weight: 300;
    border: none;
    cursor: pointer;
}
ul.search_list li {
    margin-bottom: 25px;
    padding-left: 20px;
    border-left: 2px solid #e8e8e8;
}
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


/* reset css */
html, body { margin: 0; padding: 0; }
div { position: relative; height: auto; }
img, video { vertical-align: top; width: 100%; }
a { text-decoration: none; color: inherit; }
ul, li, ol, dl {
    list-style:none;
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0px;
}
select::-ms-expand { display: none; }
select { -webkit-appearance: none; -moz-appearance: none; appearance: none; }
input, select, textarea, button { font: inherit; color: inherit; outline: none; border: none; }
article, aside, details, figcaption, figire, footer, header, hgroup, menu, nav, section { display: block; }
table { border-collapse:collapse; border-spacing:0; }
input, select { vertical-align: middle; }
lable { cursor:pointer; vertical-align: middle; }
button { background: none; outline: none; border: none; cursor: pointer;}
button { background: none; outline: none; border: none; cursor: pointer; background-color: transparent; border-radius: 0px; }
a:hover { color: inherit!important; text-decoration: none!important; }
a:focus { color: inherit!important; text-decoration: none!important; }
input { outline:none; }
input:-webkit-autofill { -webkit-box-shadow: 0 0 0 1000px #f6f8f9 inset !important; }
p { display: block; margin: 0px; -webkit-margin-before: 0em; -webkit-margin-after: 0em; -webkit-margin-start: 0px; -webkit-margin-end: 0px; }


</style>
