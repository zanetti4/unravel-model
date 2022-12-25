<template>
	<div
		id="box"
		class="container"
	>
		<handle-model 
			@callback="openModel"
			@callback-close="closeModel"
		></handle-model>
	</div>
</template>

<script>
import UThree from './three/UThree';
import handleModel from './components/HandleModel';
import * as THREE from 'three';

let app, camera, scene, renderer, controls, clock, copterModel;
// let app, camera, scene, renderer, controls, clock;

export default {
	name: 'HomeUThree',
	components: {
		handleModel,
	},
	methods: {
		//初始化 UThree
		async initUThree(){
			app = new UThree('box');
			app.initThree();
			app.initHelper();
			app.initOrbitControls();
			app.initLight();
			app.loaderSky('texture/skybox/');
			
			copterModel = await app.loaderObjModel(
				'model/helicopter-obj/', 
				'helicopter', 
				'helicopter'
			);
						
			// let r = 60;
			let r = 20;
			
			copterModel.traverse(function(child){
				child.fromPosition = [child.position.x, child.position.y, child.position.z];
				child.toPosition = [Math.random() * r, Math.random() * r, Math.random() * r];
				
				/* if(child.name === 'Object34'){
					//
					child.material.color.set(0x00ff00);
				} */
			});
			
			console.log('copterModel:');
			console.log(copterModel);
			
			window.app = app;
			camera = app.camera;
			scene = app.scene;			
			renderer = app.renderer;
			controls = app.controls;
			clock = new THREE.Clock();
			console.log(scene, renderer, controls, clock);
			scene.add(copterModel);
			camera.position.set(30, 30, 30);
			camera.lookAt( 0, 0, 0 );
			// renderer.render(scene, camera);
			app.fnRender();
		},
		//拆解模型
		openModel(){
			copterModel.traverse(e => {
				if(e.isMesh){
					//mesh 节点
					const fromPosition = e.fromPosition;
					const toPosition = e.toPosition;
					
					app.modelMove({
						fromPosition,
						toPosition
					}, e);
				}
			});
		},
		//合并模型
		closeModel(){
			copterModel.traverse(e => {
				if(e.isMesh){
					//mesh 节点
					const fromPosition = e.fromPosition;
					const toPosition = e.toPosition;
					
					app.modelMove({
						fromPosition: toPosition,
						toPosition: fromPosition,
					}, e);
				}
			});
		},
	},
	mounted() {
		this.initUThree();
	}
}
</script>

<style lang="less" scoped>
.container {
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-color: #D9C44E;
	// background-color: #000;
	position: relative;
	z-index: 1000;
}
</style>
