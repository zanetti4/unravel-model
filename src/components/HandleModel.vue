<template>
	<div class="handle">
		<div class="bit">
			<span 
				:style="{
					color: isMerged ? '#116dcf' : '#333',
				}"
				class="merge"
			>模型合并</span>
			<Switch v-model="unravelStatus" @on-change="change" />
			<span 
				:style="{
					color: isMerged ? '#333' : '#116dcf',
				}"
				class="unravel"
			>模型拆解</span>
		</div>
	</div>
</template>

<script>
	import {reactive, toRefs, computed} from 'vue';
	
	export default {
		emits: ['callback', 'callbackClose'],
		setup(props, context){
			const state = reactive({
				isMerged: true,
			});
			
			const unravelStatus = computed(() => {
				return !state.isMerged;
			});
			
			//开关变化时触发
			const change = status => {
				if(status){
					//模型拆解
					context.emit('callback');
				}else{
					//模型合并
					context.emit('callbackClose');
				}
				
				state.isMerged = !status;
			}
			
			return {
				...toRefs(state),
				unravelStatus,
				change,
			}
		},
	}
</script>

<style lang="less" scoped>
	.handle {
		// padding: 20px 0 0 20px;
		position: absolute;
		z-index: 2000;
		top: 20px;
		left: 20px;
		.bit {
			margin-bottom: 10px;
			.merge {
				margin-right: 10px;
			}
			.unravel {
				margin-left: 10px;
			}
		}
	}
</style>
