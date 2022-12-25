import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader';
import TWEEN from '@tweenjs/tween.js';

export default class UThree {
	constructor(id) {
		this.id = id;
		this.el = document.getElementById(id);
	}
	
	//初始化场景
	initThree(){
		let _this = this;
		let width = this.el.offsetWidth;
		let height = this.el.offsetHeight;
		
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 3000);
		
		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});
		
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(width, height);
		this.el.append(this.renderer.domElement);
		this.renderer.setClearColor('#D9C44E');
		// this.renderer.setClearColor('#000');
		
		window.addEventListener('resize', function(){
			_this.camera.aspect = _this.el.offsetWidth / _this.el.offsetHeight;
			// _this.camera.aspect = _this.el.offsetWidth / _this.el.offsetWidth;
			_this.camera.updateProjectionMatrix();
			_this.renderer.setSize(_this.el.offsetWidth, _this.el.offsetHeight);
			// _this.renderer.setSize(_this.el.offsetWidth, _this.el.offsetWidth);
		}, false);
	}
		
	//初始化 helper
	initHelper(){
		this.scene.add(new THREE.AxesHelper(100));
	}
	
	//初始化控制器
	initOrbitControls(){
		let controls = new OrbitControls(this.camera, this.renderer.domElement);
		
		controls.enableDamping = true;
		controls.enableZoom = true;
		controls.autoRotate = false;
		controls.autoRotateSpeed = 0.3;
		controls.enablePan = true;
		this.controls = controls;
	}
	
	//初始化灯光
	initLight(){
		let directionalLight = new THREE.DirectionalLight('#FFF');
		
		directionalLight.position.set(30, 30, 30).normalize();
		this.scene.add(directionalLight);
		
		let ambientLight = new THREE.AmbientLight('#FFF', 0.3);
		
		this.scene.add(ambientLight);
		
		return {
			directionalLight,
			ambientLight,
		}
	}
	
	//加载 obj 模型
	loaderObjModel(path, objName, mtlName){
		return new Promise(resolve => {
			new MTLLoader()
			.setPath(path)
			.load(mtlName + '.mtl', function(materials){
				console.log(materials);
				materials.preload();
				//加载 obj
				new OBJLoader()
				.setPath(path)
				.setMaterials(materials)
				.load(objName + '.obj', function(object){
					object.scale.set(3, 3, 3);
					resolve(object);
				});
			});
		});
	}
	
	//渲染函数
	fnRender = () => {
		//执行渲染操作，指定场景、相机作为参数
		this.renderer.render(this.scene, this.camera);
		requestAnimationFrame(this.fnRender); //请求再次执行渲染函数 fnRender
	}
	
	//加载天空盒
	loaderSky(path){
		let skyTexture = new THREE.CubeTextureLoader()
		.setPath(path)
		.load([
			'px.jpg', //右
			'nx.jpg', //左
			'py.jpg', //上
			'ny.jpg', //下
			'pz.jpg', //前
			'nz.jpg', //后
		]);
		
		this.scene.background = skyTexture;
		this.renderer.setClearAlpha(1);
	}
	
	// Setup the animation loop.
	animate = (time) => {
		requestAnimationFrame(this.animate);
		TWEEN.update(time);
	}
	
	//拆解模型
	modelMove(position, mesh){
		requestAnimationFrame(this.animate);
		
		const coords = {}
		
		position.fromPosition.forEach((coord, index) => {
			if(index === 0){
				//x 坐标
				coords.x = coord;
			}
			
			if(index === 1){
				//y 坐标
				coords.y = coord;
			}
			
			if(index === 2){
				//z 坐标
				coords.z = coord;
			}
		});
		
		const toCoords = {}
		
		position.toPosition.forEach((coord, index) => {
			if(index === 0){
				//x 坐标
				toCoords.x = coord;
			}
			
			if(index === 1){
				//y 坐标
				toCoords.y = coord;
			}
			
			if(index === 2){
				//z 坐标
				toCoords.z = coord;
			}
		});
		
		var tween = new TWEEN.Tween(coords)
			.to(toCoords, 1000)
			// .easing(TWEEN.Easing.Linear.Out)
			.onUpdate(function(){
				// Called after tween.js updates 'coords'.
				mesh.position.set(coords.x, coords.y, coords.z);
			})
			.start();
			//Uncaught TypeError: this._easingFunction is not a function
	}
}