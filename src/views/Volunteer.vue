

<template>
  <section>

  </section>
</template>

<script>
export default {
  created(){
if(localStorage.getItem('userid') == undefined){
  this.$router.push({path:'/', hash:'#home-donate'})
}
      },
};
</script>

<style lang="scss" scoped>
  section{
    min-height:100vh;
background: rgba(0, 0, 0,0.9);
     header {
        position:relative;
        width: 100%;
        z-index: 999;
        left: 0px;
        right: 0px;
        .sticky {
    display: flex;
    padding:4rem  10%  .72rem;
    justify-content: space-between;
    flex-wrap: wrap;
    
        .logo {
            width: 30%;
    max-width: 200px;
    img{
        position: relative;
        width: 100%;
    }
    }
    
    nav{
        width: 60%;
        ul{
            display: flex;
            align-items: center;
            position: relative;
            height: 100%;
            justify-content: space-between;
    
            list-style: none;
            
            li a{
                text-decoration: none;
                color:var(--primary-alt);
                position: relative;
                text-transform: uppercase;
    
    &:after{
        display: block;
        
        position: absolute;
        left: 0;
        bottom: -5px;
        width: 0;
        height: 2px;
        background-color: #fff;
        content: "";
        -webkit-transition: all 0.2s;
        -moz-transition: all 0.2s;
        -o-transition: all 0.2s;
        transition: all 0.2s;
    }
                &:hover:after {
        width: 15px;
    }
            }
        }
    
    }
    }
    }
  }
</style>
