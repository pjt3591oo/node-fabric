<template>
  <div>
    <h1>CA서버 로그인</h1>
    <input type="text" v-model="adminId" placeholder="CA 서버 ID">
    <input type="text" v-model="adminPw" placeholder="CA 서버 PassWord">

    <h1>관리자 등록</h1>
    <input type="text" v-model="addedId" placeholder="관리자 추가">
    <button @click="enrollAdmin">등록</button>

    <h1>유저 추가</h1>
    <button @click="userRegister">유저추가</button>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  data () {
    return {
      adminId: '',
      adminPw: '',
      addedId: ''
    }
  },

  methods: {
    async enrollAdmin() {
      if(this.adminId && this.adminPw && this.addedId){
        console.log(this.adminId, this.adminPw, this.addedId)
        let a = await axios.post('http://localhost:3000/api/v1.0/chains/enrollAdmin', {
          adminId: this.adminId,
          adminPw: this.adminPw,
          addedId: this.addedId
        })
        if (a.status === 200) {
          alert(`${this.addedId}계정존재`)
        } else if (a.status === 201) {
          alert(`${this.addedId} 관리자 계정이 추가`)
        } else {
          alert(`${this.adminId}와 ${this.adminPw}는 잘못된 CA서버 계정입니다.`)
        }
        console.log(a);
      }else{
        alert('test')
      }

    },

    async userRegister() {
      let a = await axios.post('http://localhost:3000/api/v1.0/chains/registerUser', {})

    }
  }
}
</script>
