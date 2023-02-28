var signuser = new Vue({
    el: "#sign1",
    data: {
      other: false,
      message: 'Sign Vue',
      form1:{
          fname: '',
          lname: '',
          // username: '',
          password: '',
          email: '',
          gender: '',
          phone: '',
          weight1: '',
          height1: '',
          address: '',
          age: '',
      },
      // logtype: '',
    },
    methods:{
      submitSign(e){
          e.preventDefault();
          // console.log('Save Data');
          if(this.form1.fname != "" && this.form1.lname != "" && this.form1.password != "" && this.form1.email != "" && this.form1.gender != "" && this.form1.phone != "" && this.form1.weight != "" && this.form1.height != "" && this.form1.address != ""){
              axios.post("action.php",{
                  fname:this.form1.fname,
                  lname:this.form1.lname,
                  sex:this.form1.gender,
                  age:this.form1.age,
                  email:this.form1.email,
                  phone:this.form1.phone,
                  weight_u:this.form1.weight1,
                  height_u:this.form1.height1,
                  u_addr:this.form1.address,
                  u_pass:this.form1.password,
                  action:"insert"
                  
              }).then(function(res){
                  console.log('Saving')
              })
          }
      }
    }
  });