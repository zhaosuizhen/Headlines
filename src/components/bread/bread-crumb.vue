<template>
    <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>

        <el-breadcrumb-item>
            <slot name = title_1></slot>
        </el-breadcrumb-item>

        <el-breadcrumb-item>
            <slot name = title_2></slot>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
