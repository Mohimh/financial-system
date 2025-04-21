<template>
    <el-row class="box" justify="center" :align="'center'">
        <el-col :span="8" justify="center" :align="'middle'">
            <!-- <video autoplay muted loop src="../../../public/bochi the rock.mp4"></video> -->
            <!-- <img :src="imgUrl" alt="" style="height: 600px; align-items: center;"> -->
        </el-col>
        <el-col :span="8" >
            <Login v-show="formType"/>
            <Register v-show="!formType"/>
        </el-col>
    </el-row>
    


</template>

<script setup>
    import Login from '@/components/login.vue'
    import Register from '@/components/register.vue'
    import { useStore } from 'vuex'
    import { computed, ref } from 'vue'

    const store = useStore()
    const formType = computed(() => store.state.login.formType)
    // const imgUrl = new URL('../../../public/1689007725209.jpg', import.meta.url).href

</script>

<style scoped>
.box {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-image: url('../../../布吉岛5252.jpg');
    background-repeat: no-repeat;
}

/* video {
    width: 100%;
    object-fit: cover;
    position: fixed;
    top: 0;
    left: 0;
} */
</style>