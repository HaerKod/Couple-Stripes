// HENIKA -> [ microcosmos / portals & gravity ] .r1

import * as THREE from './three.module.min.js';
import * as BufferGeometryUtils from './BufferGeometryUtils.js';
import { FontLoader } from './FontLoader.js';
const mainRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
mainRenderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(mainRenderer.domElement);
const mainScene = new THREE.Scene();
const mainCamera = new THREE.PerspectiveCamera(50, document.documentElement.clientWidth / document.documentElement.clientHeight, 0.1, 46);
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.9);
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.1);
directionalLight.position.set(-1, 1, 1);
mainScene.add(ambientLight, directionalLight);
const button = [];
let oldWindow;
onWindowResize();
function onWindowResize() {
	if (oldWindow != document.body.clientWidth / document.body.clientHeight) {
		(document.body.clientHeight / document.body.clientWidth >= 1.5) ? mainCamera.fov = (Math.atan((document.body.clientHeight / 2) / ((document.body.clientWidth / 2) / (Math.tan(50 * Math.PI / 360) / 1.5)))) * 360 / Math.PI : mainCamera.fov = 50;
		mainCamera.aspect = document.body.clientWidth / document.body.clientHeight;
		mainCamera.updateProjectionMatrix();
		for (let i = 0; i < button.length; i++) {
			if (i != 3 && i != 5 && i != 8) button[i].lookAt(0, 0, 0);
			if (i == 3) button[i].position.set(-Math.tan(mainCamera.fov * Math.PI / 360) / document.body.clientHeight * document.body.clientWidth * 3 + 0.17, Math.tan(mainCamera.fov * Math.PI / 360) * 3 - 0.17, -3);
			if (i == 5) button[i].position.set(-Math.tan(mainCamera.fov * Math.PI / 360) / document.body.clientHeight * document.body.clientWidth * 3 + 0.17, -Math.tan(mainCamera.fov * Math.PI / 360) * 3 + 0.17, -3);
      if (i == 8) button[i].position.set(Math.tan(mainCamera.fov * Math.PI / 360) / document.body.clientHeight * document.body.clientWidth * 3 - 0.19, Math.tan(mainCamera.fov * Math.PI / 360) * 3 - 0.18, -3);
		}
		
		mainRenderer.setSize(document.body.clientWidth, document.body.clientHeight);
		oldWindow = document.body.clientWidth / document.body.clientHeight;
	}
}
let levelStat = [];
if (localStorage.getItem('progress') !== null) {
  levelStat = localStorage.getItem('progress').split(',');
  if (levelStat[0] == '') levelStat = [];
}
let currentLevel;
if (levelStat.length < 40) {
	currentLevel = levelStat.length;
} else {
	currentLevel = 39;
}
const blackFade = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true }));
blackFade.position.z = -10;
const loadingBar = new THREE.Object3D();
loadingBar.dot = [];
loadingBar.dot[0] = new THREE.Mesh(new THREE.CircleGeometry(0.05, 24), new THREE.MeshBasicMaterial({ color: 0xFFFFFF }));
loadingBar.dot[1] = loadingBar.dot[0].clone();
loadingBar.dot[0].position.set(-0.7, -1, -5);
loadingBar.dot[1].position.set(0.7, -1, -5);
loadingBar.dot[0].scale.set(0, 0, 1);
loadingBar.dot[1].scale.set(0, 0, 1);
loadingBar.bar = new THREE.Mesh(new THREE.PlaneGeometry(1.32, 0.02), new THREE.MeshBasicMaterial({ color: 0xFFFFFF }));
loadingBar.bar.geometry.translate(0.66, 0, 0);
loadingBar.bar.position.set(-0.66, -1, -5);
loadingBar.bar.scale.x = 0;
loadingBar.add(loadingBar.bar, loadingBar.dot[0], loadingBar.dot[1]);
mainScene.add(blackFade, loadingBar);
document.body.style.backgroundImage = "linear-gradient(rgba(15, 0, 30, 0.8), rgba(15, 0, 30, 0.8)), url(textures/background.jpg)";
let loadingCount = 13;
let loadingFull = loadingCount;
let Amatic;
let Kablammo;
gsap.from([loadingBar.dot[0].position, loadingBar.dot[1].position], { duration: 0.5, x: 0, ease: "power2.out" });
gsap.to([loadingBar.dot[0].scale, loadingBar.dot[1].scale], { duration: 0.5, x: 1, y: 1, ease: "back.out", onComplete: function() { goLoad() } });
const gameSound = [];
function goLoad() {
	new FontLoader().load('./fonts/Amatic.json', function(font) {
		Amatic = font;
		checkLoading();
	});
	new FontLoader().load('./fonts/Kablammo.json', function(font) {
		Kablammo = font;
		checkLoading();
	});
	gameSound[0] = new Howl({
		src: ['sounds/backLoop.mp3'],
		usingWebAudio: true,
		mute: false,
		webAudio: true,
		loop: true,
		volume: 0.4,
		onload: checkLoading
	});
	gameSound[1] = new Howl({
		src: ['sounds/buttonSound.mp3'],
		usingWebAudio: true,
		mute: false,
		webAudio: true,
		volume: 1,
		onload: checkLoading
	});
	gameSound[2] = new Howl({
		src: ['sounds/hitSound.mp3'],
		usingWebAudio: true,
		mute: false,
		webAudio: true,
		volume: 1,
		onload: checkLoading
	});
	gameSound[3] = new Howl({
		src: ['sounds/boomSound.mp3'],
		usingWebAudio: true,
		mute: false,
		webAudio: true,
		volume: 1,
		onload: checkLoading
	});
	gameSound[4] = new Howl({
		src: ['sounds/starSound.mp3'],
		usingWebAudio: true,
		mute: false,
		webAudio: true,
		volume: 1,
		onload: checkLoading
	});
	gameSound[5] = new Howl({
		src: ['sounds/portalSound.mp3'],
		usingWebAudio: true,
		mute: false,
		webAudio: true,
		volume: 0.7,
		onload: checkLoading
	});
	gameSound[6] = new Howl({
		src: ['sounds/resultSound.mp3'],
		usingWebAudio: true,
		mute: false,
		webAudio: true,
		volume: 1,
		onload: checkLoading
	});
	gameSound[7] = new Howl({
		src: ['sounds/successSound.mp3'],
		usingWebAudio: true,
		mute: false,
		webAudio: true,
		volume: 1,
		onload: checkLoading
	});
	gameSound[8] = new Howl({
		src: ['sounds/onSound.mp3'],
		usingWebAudio: true,
		mute: false,
		webAudio: true,
		volume: 0.3,
		onload: checkLoading
	});
	gameSound[9] = new Howl({
		src: ['sounds/offSound.mp3'],
		usingWebAudio: true,
		mute: false,
		webAudio: true,
		volume: 0.2,
		onload: checkLoading
	});
	gameSound[10] = new Howl({
		src: ['sounds/successBackSound.mp3'],
		usingWebAudio: true,
		mute: false,
		webAudio: true,
		volume: 0.3,
		onload: checkLoading
	});
}
function checkLoading() {
	loadingCount--;
	if (loadingCount >= 0) {
  	if (loadingBar.tween !== undefined && loadingBar.tween !== null) {
		  loadingBar.tween.kill();
		  loadingBar.tween = null;
  	}
  	loadingBar.tween = gsap.to(loadingBar.bar.scale, { duration: 0.2, x: 1 / loadingFull * (loadingFull - loadingCount), ease: "none", onComplete: function() {
	  	if (loadingCount == 0) {
		    setTimeout(() => createGraphics(), 50);
	  	}
  	} });
	}
}
const hero = [new THREE.Object3D(), new THREE.Object3D()];
const deadHero = [new THREE.Object3D()];
const star = [new THREE.Object3D(), new THREE.Object3D(), new THREE.Object3D()];
const portal = new THREE.Object3D();
const enterPortal = new THREE.Object3D();
const gravityPoint = [];
const antigravityPoint = [];
const gravityColor = new THREE.Color(0xFF80AB);
const gravityBulbColor = new THREE.Color(0xFF4081);
const gravityBlimColor = new THREE.Color(0xAA00FF);
const gravityBulbBlimColor = new THREE.Color(0xFFFF8D);
const antigravityColor = new THREE.Color(0x82B1FF);
const antigravityBulbColor = new THREE.Color(0x536DFE);
const antigravityBlimColor = new THREE.Color(0x008C7A);
const antigravityBulbBlimColor = new THREE.Color(0xB2FF59);
const deadSkinMaterial = new THREE.Color(0x9FA8DA);
const transparentMaterial = new THREE.MeshLambertMaterial({ color: 0x000000, transparent: true, opacity: 0.0000001 });
let onPlay = false;
const hint = [];
const explosion = new THREE.Object3D();
const monster = [];
const titleText = [
	[`MICROCOSMOS`],
	[`PORTALS`, `and`, `GRAVITY`]
];
const title = [];
const titleMaterial = new THREE.MeshLambertMaterial({ color: 0xEEFF41 });
const blimMaterial = [];
for (let i = 0; i < 5; i++) {
  blimMaterial[i] = new THREE.MeshLambertMaterial({ color: 0x000000 });
  gsap.to(blimMaterial[i].color, { duration: 0.3 + Math.random() * 0.3, setHex: 0xFFFFFF, ease: "none", repeat: -1 });
}
const resultStars = new THREE.Object3D();
const resultText = [
	[`Level passed!`, `Good!`, `Excellent!`, `Wonderful!`]
];
const resultPhrase = [];
const lostText = [`Упс!`];
let lostPhrase;
let currentCatchedStars;
const menuContainer = new THREE.Object3D();
const tempGeometry = [];
const askClearProgressText = [
	[`Clear`, `game progress?`]
];
const clearProgressButtonText = [
	[`Yes`, `No`]
];
const askClearProgressPhrase = [];
const planet = new THREE.Object3D();
let onHold = false;
let muted = false;
let onStart = true;
const backStars = [];
let adCount = 0;
function createGraphics() {
	const backStarGeometry = new THREE.PlaneGeometry(0.12, 0.12);
	backStarGeometry.rotateZ(Math.PI * 0.25);
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 160; j++) {
		  tempGeometry[tempGeometry.length] = backStarGeometry.clone();
		  tempGeometry[tempGeometry.length - 1].translate(-45 + 90 * Math.random(), -45 + 90 * Math.random(), 0);
		}
		backStars[i] = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), blimMaterial[i]);
	  clearTempGeometries(tempGeometry);
	  backStars[i].position.z = -45;
		mainScene.add(backStars[i]);
	}
	let shape = new THREE.Shape();
  shape.absarc(0.2, 0.2, 0.2, Math.PI, Math.PI * 1.5);
  shape.absarc(0.2, -0.2, 0.2, Math.PI * 0.5, Math.PI);
  shape.absarc(-0.2, -0.2, 0.2, 0, Math.PI * 0.5);
  shape.absarc(-0.2, 0.2, 0.2, Math.PI * 1.5, Math.PI * 2);
  const backStarGeometry2 = new THREE.ShapeGeometry(shape, 1);
	for (let j = 0; j < 160; j++) {
		tempGeometry[tempGeometry.length] = backStarGeometry2.clone();
		const randomScale = 0.5 + Math.random() * 1.3;
		tempGeometry[tempGeometry.length - 1].scale(randomScale, randomScale, 1);
		tempGeometry[tempGeometry.length - 1].translate(-40 + 80 * Math.random(), -40 + 80 * Math.random(), 0);
	}
  backStars[3] = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), blimMaterial[4]);
  clearTempGeometries(tempGeometry);
  backStars[3].position.z = -45;
	for (let i = 0; i < 2; i++) {
		askClearProgressPhrase[i] = new THREE.Mesh(new THREE.ShapeGeometry(Amatic.generateShapes(askClearProgressText[0][i], 0.15), 2), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0 }));
		askClearProgressPhrase[i].geometry.center();
		askClearProgressPhrase[i].position.set(0, 0.3 - 0.21 * i, -3);
		mainScene.add(askClearProgressPhrase[i]);
	}
	planet.sky = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshBasicMaterial({ color: 0x00E5FF, transparent: true, opacity: 0 }));
  planet.sky.position.z = -3.1;
	planet.body = new THREE.Mesh(new THREE.CircleGeometry(5.2, 64, 0, Math.PI), new THREE.MeshBasicMaterial({ color: 0x558B2F }));
  planet.three = [];
  tempGeometry[tempGeometry.length] = new THREE.CylinderGeometry(0.15, 0.2, 4, 16, 1, true);
  tempGeometry[tempGeometry.length - 1].translate(0, 2, 0);
  tempGeometry[tempGeometry.length] = new THREE.TorusGeometry(0.6, 0.1, 12, 12, Math.PI * .5);
  tempGeometry[tempGeometry.length - 1].rotateX(Math.PI);
  tempGeometry[tempGeometry.length - 1].translate(0.12, 2.6, 0);
  tempGeometry[tempGeometry.length] = new THREE.TorusGeometry(0.8, 0.1, 12, 12, Math.PI * .5);
  tempGeometry[tempGeometry.length - 1].rotateX(Math.PI);
  tempGeometry[tempGeometry.length - 1].translate(0.12, 2.6, 0);
  tempGeometry[tempGeometry.length - 1].rotateY(Math.PI / 3 * 2);
  tempGeometry[tempGeometry.length] = new THREE.TorusGeometry(1, 0.1, 12, 12, Math.PI * .5);
  tempGeometry[tempGeometry.length - 1].rotateX(Math.PI);
  tempGeometry[tempGeometry.length - 1].translate(0.12, 2.6, 0);
  tempGeometry[tempGeometry.length - 1].rotateY(Math.PI / 3 * 4);
  planet.three[0] = new THREE.Object3D();
  planet.three[0].trunk = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), new THREE.MeshLambertMaterial({ color: 0x6D4C41 }));
  clearTempGeometries();
  planet.three[0].trunk.geometry.rotateY(1.4);
  tempGeometry[tempGeometry.length] = new THREE.SphereGeometry(0.5, 36, 24);
  tempGeometry[tempGeometry.length - 1].translate(0, 4, 0);
  tempGeometry[tempGeometry.length] = tempGeometry[0].clone();
  tempGeometry[tempGeometry.length - 1].scale(1.2, 1.2, 1.2);
  tempGeometry[tempGeometry.length - 1].translate(0.9, -1.9, 0);
  tempGeometry[tempGeometry.length] = tempGeometry[0].clone();
  tempGeometry[tempGeometry.length - 1].scale(1.3, 1.3, 1.3);
  tempGeometry[tempGeometry.length - 1].translate(1, -2.4, 0);
  tempGeometry[tempGeometry.length - 1].rotateY(Math.PI / 3 * 4);
  tempGeometry[tempGeometry.length] = tempGeometry[0].clone();
  tempGeometry[tempGeometry.length - 1].scale(1.4, 1.4, 1.4);
  tempGeometry[tempGeometry.length - 1].translate(0.9, -2.4, 0);
  tempGeometry[tempGeometry.length - 1].rotateY(Math.PI / 3 * 2);
  tempGeometry[tempGeometry.length] = tempGeometry[0].clone();
  tempGeometry[tempGeometry.length - 1].scale(2, 2, 2);
  tempGeometry[tempGeometry.length - 1].translate(0, -4.7, 0);
  tempGeometry[tempGeometry.length] = tempGeometry[0].clone();
  tempGeometry[tempGeometry.length - 1].scale(1.2, 1.2, 1.2);
  tempGeometry[tempGeometry.length - 1].translate(0.9, -2.2, 0);
  tempGeometry[tempGeometry.length - 1].rotateY(Math.PI / 3);
  tempGeometry[tempGeometry.length] = tempGeometry[0].clone();
  tempGeometry[tempGeometry.length - 1].scale(1, 1, 1);
  tempGeometry[tempGeometry.length - 1].translate(1, -1.5, 0);
  tempGeometry[tempGeometry.length - 1].rotateY(Math.PI / 3 * 3);
  tempGeometry[tempGeometry.length] = tempGeometry[0].clone();
  tempGeometry[tempGeometry.length - 1].scale(1.2, 1.2, 1.2);
  tempGeometry[tempGeometry.length - 1].translate(0.8, -2.2, 0);
  tempGeometry[tempGeometry.length - 1].rotateY(Math.PI / 3 * 5);
  tempGeometry[tempGeometry.length] = tempGeometry[0].clone();
  tempGeometry[tempGeometry.length - 1].scale(1.3, 1.3, 1.3);
  tempGeometry[tempGeometry.length] = tempGeometry[0].clone();
  tempGeometry[tempGeometry.length - 1].scale(1.2, 1.2, 1.2);
  tempGeometry[tempGeometry.length - 1].translate(0.4, 0, 0);
  tempGeometry[tempGeometry.length] = tempGeometry[0].clone();
  tempGeometry[tempGeometry.length - 1].scale(1.3, 1.3, 1.3);
  tempGeometry[tempGeometry.length - 1].translate(0, -0.3, 0.4);
  tempGeometry[tempGeometry.length] = tempGeometry[0].clone();
  tempGeometry[tempGeometry.length - 1].scale(1.3, 1.3, 1.3);
  tempGeometry[tempGeometry.length - 1].translate(-0.3, -0.4, -0.4);
  tempGeometry[tempGeometry.length] = tempGeometry[0].clone();
  tempGeometry[tempGeometry.length - 1].scale(1.5, 1.5, 1.5);
  tempGeometry[tempGeometry.length - 1].translate(-0.6, -1.9, 0);
  tempGeometry[tempGeometry.length] = tempGeometry[0].clone();
  tempGeometry[tempGeometry.length - 1].scale(1.5, 1.5, 1.5);
  tempGeometry[tempGeometry.length - 1].translate(-0.9, -2.5, 0);
  tempGeometry[tempGeometry.length] = tempGeometry[tempGeometry.length - 1].clone();
  tempGeometry[tempGeometry.length - 1].rotateY(Math.PI / 3 * 2);
  tempGeometry[tempGeometry.length] = tempGeometry[tempGeometry.length - 1].clone();
  tempGeometry[tempGeometry.length - 1].rotateY(Math.PI / 3 * 2);
  tempGeometry[tempGeometry.length] = tempGeometry[0].clone();
  tempGeometry[tempGeometry.length - 1].scale(1.3, 1.3, 1.3);
  tempGeometry[tempGeometry.length - 1].translate(-0.8, -1.3, 0);
  tempGeometry[tempGeometry.length - 1].rotateY(Math.PI / 3 * 1.2);
  tempGeometry[tempGeometry.length] = tempGeometry[tempGeometry.length - 1].clone();
  tempGeometry[tempGeometry.length - 1].rotateY(Math.PI / 3 * 1.7);
  tempGeometry[tempGeometry.length] = tempGeometry[tempGeometry.length - 1].clone();
  tempGeometry[tempGeometry.length - 1].rotateY(Math.PI / 3 * 1.7);
  tempGeometry[tempGeometry.length] = tempGeometry[0].clone();
  tempGeometry[tempGeometry.length - 1].translate(-0.8, 0.4, 0);
  tempGeometry[tempGeometry.length - 1].rotateY(Math.PI / 3 * 2);
  tempGeometry[tempGeometry.length] = tempGeometry[tempGeometry.length - 1].clone();
  tempGeometry[tempGeometry.length - 1].rotateY(Math.PI / 3 * 1.7);
  planet.three[0].leaves = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), new THREE.MeshLambertMaterial({ color: 0x00695C }));
  clearTempGeometries();
  planet.three[0].leaves.geometry.rotateY(-1.6);
  planet.three[0].add(planet.three[0].trunk, planet.three[0].leaves);
  planet.three[0].position.set(1.6, 4.3, 0.1);
  planet.three[0].rotation.set(0.1, 0, -0.28);
  planet.three[0].scale.set(-0.85, 0.85, 0.85);
  planet.three[1] = planet.three[0].clone();
  planet.three[1].scale.set(0.6, 0.6, 0.6);
  planet.three[1].rotation.set(-0.1, 0, 0.29);
  planet.three[1].position.set(-1.2, 4.3, -0.15);
	planet.add(planet.body, planet.three[0], planet.three[1], planet.sky);
	planet.position.set(0, -15.9, -7);
	planet.visible = false;
	menuContainer.level = [];
  const levelBody = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 2, 0, Math.PI * 2, 0, Math.PI * 0.5), new THREE.MeshLambertMaterial({ color: 0xECEFF1 }));
  levelBody.geometry.rotateX(Math.PI * 0.5);
  levelBody.geometry.scale(1, 1, 0.3);
  const levelBorder = new THREE.Mesh(new THREE.TorusGeometry(0.218, 0.02, 6), new THREE.MeshNormalMaterial());
  const levelLine = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.014), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.5 }));
  levelLine.geometry.translate(0.5, 0, 0);
  shape = null;
  shape = new THREE.Shape();
  for (let i = 4; i >= 0; i--) {
  	shape.absarc(Math.cos(Math.PI / 5 + Math.PI / 2.5 * i) * 0.46, Math.sin(Math.PI / 5 + Math.PI / 2.5 * i) * 0.46, 0.13, Math.PI / 2.5 * 2.5 + Math.PI / 2.5 * i, Math.PI / 2.5 * 3.5 + Math.PI / 2.5 * i);
  	shape.absarc(Math.cos(Math.PI / 2.5 * i) * 0.5, Math.sin(Math.PI / 2.5 * i) * 0.5, 0.07, Math.PI / 2.5 * 6 + Math.PI / 2.5 * i, Math.PI / 2.5 * 4 + Math.PI / 2.5 * i, true);
  }
  menuContainer.levelEmptyStarMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.5 })
  menuContainer.levelStarMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 })
  const levelStar = new THREE.Mesh(new THREE.ShapeGeometry(shape, 2), menuContainer.levelEmptyStarMaterial);
  menuContainer.levelNumMaterial = new THREE.MeshLambertMaterial({ color: 0x2E7D32 })
  menuContainer.levelCurrentMaterial = new THREE.MeshLambertMaterial({ color: 0xFF8F00 })
  levelStar.geometry.scale(0.17, 0.17, 1);
  levelStar.geometry.rotateZ(Math.PI * 0.1);
  shape = null;
  shape = new THREE.Shape();
  shape.absarc(0.08, 0.03, 0.03, 0, Math.PI * 0.5);
  shape.absarc(-0.08, 0.03, 0.03, Math.PI * 0.5, Math.PI);
  shape.absarc(0, 0, 0.11, Math.PI, Math.PI * 2);
  tempGeometry[tempGeometry.length] = (new THREE.ExtrudeGeometry(shape, { steps: 1, depth: 0.05, curveSegments: 7, bevelEnabled: false }));
  tempGeometry[tempGeometry.length - 1].translate(0, -0.02, -0.025);
  tempGeometry[tempGeometry.length] = new THREE.TorusGeometry(0.07, 0.02, 5, 12, Math.PI);
  tempGeometry[tempGeometry.length - 1] = tempGeometry[tempGeometry.length - 1].toNonIndexed();
  tempGeometry[tempGeometry.length - 1].translate(0, 0.04, 0);
  const lock = new THREE.Object3D();
  lock.body = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), new THREE.MeshLambertMaterial({ color: 0x2196F3 }));
  clearTempGeometries();
  shape = null;
  shape = new THREE.Shape();
  shape.absarc(0, 0, 0.025, Math.PI * 1.65, Math.PI * 3.35);
  shape.lineTo(-0.02, -0.065);
  shape.lineTo(0.02, -0.065);
  lock.keyhole = new THREE.Mesh(new THREE.ShapeGeometry(shape, 6), new THREE.MeshBasicMaterial({ color: 0x000000 }));
  lock.keyhole.geometry.translate(0, -0.02, 0.026);
  lock.add(lock.body, lock.keyhole);
	for (let i = 0; i < 40; i++) {
		menuContainer.level[i] = new THREE.Object3D();
		menuContainer.level[i].clickableArea = levelBody.clone();
		menuContainer.level[i].border = levelBorder.clone();
		menuContainer.level[i].star = [];
		for (let j = 0; j < 3; j++) {
			menuContainer.level[i].star[j] = levelStar.clone();
			menuContainer.level[i].star[j].position.set(0.35 * Math.cos(Math.PI * 0.7 - Math.PI * 0.2 * j), 0.35 * Math.sin(Math.PI * 0.7 - Math.PI * 0.2 * j), 0);
      menuContainer.level[i].star[j].rotation.z = Math.PI * 0.7 - Math.PI * 0.2 * j - Math.PI * 0.5;
      menuContainer.level[i].star[j].visible = false;
			menuContainer.level[i].add(menuContainer.level[i].star[j]);
		}
		menuContainer.level[i].num = new THREE.Mesh(new THREE.ExtrudeGeometry(Amatic.generateShapes(`${i + 1}`, 0.22), { steps: 1, depth: 0.2, curveSegments: 3, bevelEnabled: false }), menuContainer.levelNumMaterial);
    menuContainer.level[i].num.geometry.center();
		menuContainer.level[i].add(menuContainer.level[i].num, menuContainer.level[i].clickableArea, menuContainer.level[i].border);
	  menuContainer.level[i].position.y = 0.45 * i;
		menuContainer.add(menuContainer.level[i]);
	}
	menuContainer.level[1].position.x = 0.6;
	menuContainer.level[2].position.x = -0.8;
	menuContainer.level[3].position.x = 0.5;
	menuContainer.level[4].position.x = -0.1;
	menuContainer.level[5].position.x = 0.8;
	menuContainer.level[6].position.x = -0.6;
	menuContainer.level[7].position.x = 0.2;
	menuContainer.level[8].position.x = -0.6;
	menuContainer.level[9].position.x = 0.4;
	menuContainer.level[10].position.x = -0.3;
	menuContainer.level[11].position.x = 0.8;
	menuContainer.level[12].position.x = -0.7;
	menuContainer.level[13].position.x = 0.5;
	menuContainer.level[14].position.x = -0.1;
	menuContainer.level[15].position.x = 0.8;
	menuContainer.level[16].position.x = -0.6;
	menuContainer.level[17].position.x = 0.2;
	menuContainer.level[18].position.x = -0.6;
	menuContainer.level[19].position.x = 0.4;
	menuContainer.level[20].position.x = -0.3;
	menuContainer.level[21].position.x = 0.8;
	menuContainer.level[22].position.x = -0.7;
	menuContainer.level[23].position.x = 0.5;
	menuContainer.level[24].position.x = -0.1;
	menuContainer.level[25].position.x = 0.8;
	menuContainer.level[26].position.x = -0.6;
	menuContainer.level[27].position.x = 0.2;
	menuContainer.level[28].position.x = -0.6;
	menuContainer.level[29].position.x = 0.4;
	menuContainer.level[30].position.x = -0.3;
	menuContainer.level[31].position.x = 0.8;
	menuContainer.level[32].position.x = -0.7;
	menuContainer.level[33].position.x = 0.5;
	menuContainer.level[34].position.x = -0.1;
	menuContainer.level[35].position.x = 0.8;
	menuContainer.level[36].position.x = -0.6;
	menuContainer.level[37].position.x = 0.2;
	menuContainer.level[38].position.x = -0.8;
	menuContainer.level[39].position.x = 0.6;
  menuContainer.line = [];
	for (let i = 1; i < 40; i++) {
		menuContainer.level[i].clickableArea.scale.set(0, 0, 0);
		menuContainer.level[i].num.visible = false;
		menuContainer.level[i].line = levelLine.clone();
		menuContainer.level[i].line.position.set(menuContainer.level[i].position.x, menuContainer.level[i].position.y, 0);
		menuContainer.add(menuContainer.level[i].line);
		menuContainer.level[i].scale.set(0.75, 0.75, 0.75);
		menuContainer.level[i].line.rotation.z = new THREE.Vector2(menuContainer.level[i - 1].position.x - menuContainer.level[i].position.x, menuContainer.level[i - 1].position.y - menuContainer.level[i].position.y).angle();
	  menuContainer.level[i].line.scale.x = new THREE.Vector2(menuContainer.level[i].position.x, menuContainer.level[i].position.y).distanceTo(new THREE.Vector2(menuContainer.level[i - 1].position.x, menuContainer.level[i - 1].position.y));
		menuContainer.level[i].line.visible = false;
		menuContainer.level[i].lock = lock.clone();
		menuContainer.level[i].add(menuContainer.level[i].lock);
	}
	menuContainer.blackFade = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0 }));
  menuContainer.blackFade.position.z = -4;
	menuContainer.position.z = -5;
	menuContainer.visible = false;
	for (let i = 0; i < 11; i++) {
		title[i] = new THREE.Mesh(new THREE.ExtrudeGeometry(Kablammo.generateShapes(titleText[0][0][i], 0.36), { steps: 1, depth: 0.2, curveSegments: 8, bevelEnabled: false }), titleMaterial);
    title[i].geometry.center();
    title[i].rotation.set(-0.1, -0.1, -0.1);
    title[i].tween_1 = gsap.to(title[i].rotation, { duration: "random(1, 2)", x: 0.01, ease: "power1.inOut", repeat: -1, yoyo: true });
    title[i].tween_2 = gsap.to(title[i].rotation, { duration: "random(1, 2)", y: 0.01, ease: "power1.inOut", repeat: -1, yoyo: true });
    title[i].tween_3 = gsap.to(title[i].rotation, { duration: "random(1, 2)", z: 0.01, ease: "power1.inOut", repeat: -1, yoyo: true });
    title[i].scale.set(0, 0, 0);
    mainScene.add(title[i]);
	}
	for (let i = 11; i < 14; i++) {
	  title[i] = new THREE.Mesh(new THREE.ShapeGeometry(Amatic.generateShapes(titleText[1][i - 11], 0.2), 2), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0 }));
    title[i].geometry.center();
    mainScene.add(title[i]);
	}
	title[0].position.set(-0.61 + 0.075, 0.42, -5);
	title[1].position.set(-0.29 + 0.075, 0.42, -5);
	title[2].position.set(-0.04 + 0.075, 0.42, -5);
	title[3].position.set(0.23 + 0.075, 0.42, -5);
	title[4].position.set(0.52 + 0.075, 0.42, -5);
	title[5].position.set(-0.76, 0, -5);
	title[6].position.set(-0.47, 0, -5);
	title[7].position.set(-0.19, 0, -5);
	title[8].position.set(0.14, 0, -5);
	title[9].position.set(0.48, 0, -5);
	title[10].position.set(0.77, 0, -5);
	title[11].position.set(0, -0.42, -5);
	title[12].scale.set(0.7, 0.7, 1);
	title[12].position.set(0, -0.65, -5);
	title[13].position.set(0, -0.89, -5);
	hero[0].container = new THREE.Object3D();
	hero[0].head = new THREE.Object3D();
	tempGeometry[tempGeometry.length] = new THREE.SphereGeometry(0.5, 36, 16, 0, Math.PI * 2, 0, Math.PI * 0.7);
  tempGeometry[tempGeometry.length] = new THREE.SphereGeometry(0.09, 18, 8, 0, Math.PI * 2, 0, Math.PI * 0.7);
  tempGeometry[tempGeometry.length - 1].rotateX(Math.PI * 0.5);
  tempGeometry[tempGeometry.length - 1].translate(0, 0.05, 0.55);
  tempGeometry[tempGeometry.length] = new THREE.TorusGeometry(0.1, 0.035, 5, 16, 3.5);
  tempGeometry[tempGeometry.length - 1].rotateZ(-1.75);
  tempGeometry[tempGeometry.length - 1].translate(0.5, 0, 0);
  tempGeometry[tempGeometry.length] = tempGeometry[tempGeometry.length - 1].clone();
  tempGeometry[tempGeometry.length - 1].rotateZ(Math.PI);
  tempGeometry[tempGeometry.length] = new THREE.CircleGeometry(0.1, 6);
  tempGeometry[tempGeometry.length - 1].translate(0.5, 0, -0.035);
  tempGeometry[tempGeometry.length] = tempGeometry[tempGeometry.length - 1].clone();
  tempGeometry[tempGeometry.length - 1].rotateZ(Math.PI);
  tempGeometry[tempGeometry.length] = new THREE.TorusGeometry(0.025, 0.027, 5, 12);
  tempGeometry[tempGeometry.length - 1].rotateX(0.2);
  tempGeometry[tempGeometry.length - 1].translate(0, -0.12, 0.5);
	hero[0].scull = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), new THREE.MeshLambertMaterial({ color: 0xFEB186 }));
  clearTempGeometries();
  tempGeometry[tempGeometry.length] = new THREE.SphereGeometry(0.15, 20, 12);
  tempGeometry[tempGeometry.length - 1].translate(-0.22, 0.15, 0.45);
  tempGeometry[tempGeometry.length] = tempGeometry[tempGeometry.length - 1].clone();
  tempGeometry[tempGeometry.length - 1].translate(0.44, 0, 0);
	hero[0].eyes = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), new THREE.MeshLambertMaterial({ color: 0xFFFFFF }));
  clearTempGeometries();
  hero[0].pupil = [];
  hero[0].pupil[0] = new THREE.Mesh(new THREE.SphereGeometry(0.04, 14, 5, 0, Math.PI * 2, 0, Math.PI * 0.5), new THREE.MeshLambertMaterial({ color: 0x212121 }));
  hero[0].pupil[0].geometry.rotateX(Math.PI * 0.5);
  hero[0].pupil[0].geometry.translate(0, 0, 0.145);
  hero[0].pupil[0].position.set(-0.22, 0.15, 0.45);
  hero[0].pupil[1] = hero[0].pupil[0].clone();
  hero[0].pupil[1].position.x = 0.22;
  hero[0].eyesRotation = [0, 0];
  gsap.fromTo([hero[0].pupil[0].rotation, hero[0].pupil[1].rotation], { x: function() { return hero[0].pupil[0].rotation.x }, y: function() { return hero[0].pupil[0].rotation.y } }, { duration: 1, x: function() { return hero[0].eyesRotation[0] }, y: function() { return hero[0].eyesRotation[1] }, ease: "power3.inOut", repeat: -1, repeatRefresh: true, repeatDelay: 0.5, onRepeat: function() { hero[0].eyesRotation = [-0.4 + Math.random() * 0.8, -0.8 + Math.random() * 1.6] } });
  tempGeometry[tempGeometry.length] = new THREE.CylinderGeometry(0.025, 0.025, 0.2, 6, 8, false, 0, Math.PI);
  tempGeometry[tempGeometry.length - 1].rotateY(-Math.PI * 0.5);
  tempGeometry[tempGeometry.length - 1].rotateZ(-Math.PI * 0.5);
  bendGeometry(tempGeometry[tempGeometry.length - 1], "y", -8);
  tempGeometry[tempGeometry.length - 1].rotateZ(Math.PI * 0.25);
  tempGeometry[tempGeometry.length] = tempGeometry[tempGeometry.length - 1].clone();
  tempGeometry[tempGeometry.length - 1].rotateZ(Math.PI * 0.5);
  tempGeometry[tempGeometry.length] = tempGeometry[tempGeometry.length - 1].clone();
  tempGeometry[tempGeometry.length - 1].rotateZ(Math.PI * 0.15);
  tempGeometry[0].translate(-0.22, 0.15, 0.6);
  tempGeometry[1].translate(-0.22, 0.15, 0.6);
  tempGeometry[2].translate(0.22, 0.15, 0.6);
  hero[0].deadEyes = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), new THREE.MeshLambertMaterial({ color: 0x212121 }));
  clearTempGeometries();
  hero[0].deadEyes.visible = false;
  hero[0].head.add(hero[0].scull, hero[0].deadEyes, hero[0].eyes, hero[0].pupil[0], hero[0].pupil[1]);
  hero[0].headTween_1 = gsap.to(hero[0].head.rotation, { duration: "random(1, 2)", x: "random(-0.1, 0.1)", ease: "power2.inOut", repeat: -1, repeatRefresh: true, yoyo: true });
  hero[0].headTween_2 = gsap.to(hero[0].head.rotation, { duration: "random(1, 2)", y: "random(-0.1, 0.1)", ease: "power2.inOut", repeat: -1, repeatRefresh: true, yoyo: true });
  hero[0].headTween_3 = gsap.to(hero[0].head.rotation, { duration: "random(1, 2)", z: "random(-0.1, 0.1)", ease: "power2.inOut", repeat: -1, repeatRefresh: true, yoyo: true });
  tempGeometry[tempGeometry.length] = new THREE.SphereGeometry(0.56, 36, 10, 0, Math.PI * 2, Math.PI * 0.65, Math.PI * 0.35);
  tempGeometry[tempGeometry.length] = new THREE.SphereGeometry(0.1, 10, 8, 0, Math.PI * 2, Math.PI * 0.4, Math.PI * 0.6);
  tempGeometry[tempGeometry.length - 1].scale(1, 1.8, 1);
  tempGeometry[tempGeometry.length - 1].rotateZ(-0.1);
  tempGeometry[tempGeometry.length - 1].translate(-0.17, -0.55, 0);
  tempGeometry[tempGeometry.length] = tempGeometry[tempGeometry.length - 1].clone();
  tempGeometry[tempGeometry.length - 1].rotateY(Math.PI);
  tempGeometry[tempGeometry.length] = new THREE.SphereGeometry(0.08, 9, 6, 0, Math.PI * 2, Math.PI * 0.4, Math.PI * 0.6);
  tempGeometry[tempGeometry.length - 1].scale(1, 1.8, 1);
  tempGeometry[tempGeometry.length - 1].rotateZ(-0.85);
  tempGeometry[tempGeometry.length - 1].translate(-0.46, -0.37, 0);
  tempGeometry[tempGeometry.length] = tempGeometry[tempGeometry.length - 1].clone();
  tempGeometry[tempGeometry.length - 1].rotateY(Math.PI);
	hero[0].body = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), new THREE.MeshLambertMaterial({ color: 0xECEFF1 }));
  clearTempGeometries();
  tempGeometry[tempGeometry.length] = new THREE.SphereGeometry(0.56, 36, 1, 0, Math.PI * 2, Math.PI * 0.29, Math.PI * 0.06);
  tempGeometry[tempGeometry.length - 1].scale(1, 0.5, 1);
  tempGeometry[tempGeometry.length - 1].translate(0, -0.382, 0);
  hero[0].innerBody = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), new THREE.MeshLambertMaterial({ color: 0x00B8D4 }));
  clearTempGeometries();
  hero[0].helmet = new THREE.Object3D();
  hero[0].helmet.glass = new THREE.Mesh(new THREE.SphereGeometry(0.72, 36, 16, 0, Math.PI * 2, 0, Math.PI * 0.76), new THREE.MeshLambertMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.25, side: THREE.BackSide }));
  hero[0].helmet.glass.geometry.scale(1, 0.68, 1);
  hero[0].helmet.glass.geometry.translate(0, 0.1, 0);
  hero[0].helmet.deadGlass = new THREE.Mesh(new THREE.SphereGeometry(0.72, 36, 16, 0, Math.PI * 2, 0, Math.PI * 0.65), new THREE.MeshLambertMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.25, side: THREE.DoubleSide }));
  hero[0].helmet.deadGlass.geometry.rotateX(2);
  hero[0].helmet.deadGlass.geometry.rotateY(4.3);
  hero[0].helmet.deadGlass.geometry.scale(1, 0.68, 1);
  hero[0].helmet.deadGlass.geometry.translate(0, 0.1, 0);
  hero[0].helmet.deadGlass.visible = false;
  tempGeometry[tempGeometry.length] = new THREE.SphereGeometry(0.72, 14, 2, 0, Math.PI * 2, 0, Math.PI * 0.07);
  tempGeometry[tempGeometry.length - 1].rotateX(0.7);
  tempGeometry[tempGeometry.length - 1].rotateY(-0.6);
  tempGeometry[tempGeometry.length] = new THREE.SphereGeometry(0.72, 9, 1, 0, Math.PI * 2, 0, Math.PI * 0.03);
  tempGeometry[tempGeometry.length - 1].rotateX(1);
  tempGeometry[tempGeometry.length - 1].rotateY(-0.9);
  hero[0].highlight = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), new THREE.MeshLambertMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.3 }));
  clearTempGeometries();
  hero[0].highlight.geometry.scale(1, 0.68, 1);
  hero[0].highlight.geometry.translate(0, 0.1, 0);
  hero[0].helmet.antenna = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.34, 6, 1), hero[0].body.material);
  hero[0].helmet.antenna.geometry.translate(0, 0.75, 0);
  hero[0].helmet.bulb = new THREE.Mesh(new THREE.SphereGeometry(0.055, 6, 6), new THREE.MeshLambertMaterial({ color: 0xF50057 }));
  hero[0].helmet.bulb.geometry.translate(0, 0.87, 0);
  hero[0].helmet.bulb.blimColor = new THREE.Color(0xFF9E80);
  hero[0].helmet.brokenAntenna = new THREE.Object3D();
  hero[0].helmet.brokenAntenna.part = [];
  hero[0].helmet.brokenAntenna.part[0] = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.035, 0.12, 6, 1), hero[0].body.material);
  hero[0].helmet.brokenAntenna.part[0].geometry.translate(0, 0.65, 0);
  hero[0].helmet.brokenAntenna.part[1] = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.22, 6, 1), hero[0].body.material);
  hero[0].helmet.brokenAntenna.part[1].geometry.rotateZ(-1.4);
  hero[0].helmet.brokenAntenna.part[1].geometry.translate(0.12, 0.75, 0);
  hero[0].helmet.brokenAntenna.add(hero[0].helmet.brokenAntenna.part[0], hero[0].helmet.brokenAntenna.part[1]);
  hero[0].helmet.brokenAntenna.visible = false;
  hero[0].helmet.deadBulb = new THREE.Mesh(new THREE.SphereGeometry(0.055, 6, 6), new THREE.MeshLambertMaterial({ color: 0xF50057 }));
  hero[0].helmet.deadBulb.geometry.translate(0.2, 0.76, 0);
  hero[0].helmet.deadBulb.blimColor = new THREE.Color(0xFF9E80);
  hero[0].helmet.deadBulb.visible = false;
  gsap.to(hero[0].helmet.bulb.material.color, { duration: 0.5, r: hero[0].helmet.bulb.blimColor.r, g: hero[0].helmet.bulb.blimColor.g, b: hero[0].helmet.bulb.blimColor.b, ease: "power4.in", repeat: -1, yoyo: true });
  hero[0].helmet.add(hero[0].helmet.deadBulb, hero[0].helmet.brokenAntenna, hero[0].helmet.deadGlass, hero[0].helmet.glass, hero[0].highlight, hero[0].helmet.antenna, hero[0].helmet.bulb);
  hero[0].container.add(hero[0].head, hero[0].body, hero[0].innerBody, hero[0].helmet);
  hero[0].add(hero[0].container);
  hero[0].rotation.set(-0.15, -0.15, -0.15);
  hero[0].tween_1 = gsap.to(hero[0].rotation, { duration: "random(4, 7)", x: 0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
  hero[0].tween_2 = gsap.to(hero[0].rotation, { duration: "random(4, 7)", y: 0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
  hero[0].tween_3 = gsap.to(hero[0].rotation, { duration: "random(4, 7)", z: 0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
  hero[0].newSpeed = { x: 0, y: 0 };
  hero[0].oldSpeed = { x: 0, y: 0 };
  hero[0].acceleration = 0;
  hero[0].scale.set(0, 0, 0);
  hero[0].hold = false;
  deadHero[0].container = new THREE.Object3D();
	deadHero[0].head = new THREE.Object3D();
	deadHero[0].scull = hero[0].scull.clone();
	deadHero[0].scull.material = new THREE.MeshLambertMaterial({ color: 0x9FA8DA });
	deadHero[0].eyes = hero[0].eyes.clone();
	deadHero[0].deadEyes = hero[0].deadEyes.clone();
  deadHero[0].deadEyes.visible = true;
  deadHero[0].head.add(deadHero[0].scull, deadHero[0].deadEyes, deadHero[0].eyes);
  deadHero[0].body = hero[0].body.clone();
  deadHero[0].innerBody = hero[0].innerBody.clone();
  deadHero[0].helmet = new THREE.Object3D();
  deadHero[0].helmet.deadGlass = hero[0].helmet.deadGlass.clone();
  deadHero[0].helmet.deadGlass.visible = true;
  deadHero[0].highlight = hero[0].highlight.clone();
  deadHero[0].helmet.brokenAntenna = hero[0].helmet.brokenAntenna.clone();
  deadHero[0].helmet.brokenAntenna.visible = true;
  deadHero[0].helmet.deadBulb = hero[0].helmet.deadBulb.clone();
  deadHero[0].helmet.deadBulb.visible = true;
  deadHero[0].helmet.add(deadHero[0].helmet.deadBulb, deadHero[0].helmet.brokenAntenna, deadHero[0].helmet.deadGlass, deadHero[0].highlight);
  deadHero[0].container.add(deadHero[0].head, deadHero[0].body, deadHero[0].innerBody, deadHero[0].helmet);
  deadHero[0].add(deadHero[0].container);
  deadHero[0].rotation.set(-0.15, -0.15, -0.15);
  gsap.to(deadHero[0].rotation, { duration: "random(4, 7)", x: 0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
  gsap.to(deadHero[0].rotation, { duration: "random(4, 7)", y: 0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
  gsap.to(deadHero[0].rotation, { duration: "random(4, 7)", z: 0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
  deadHero[0].scale.set(0, 0, 0);
  lostPhrase = new THREE.Mesh(new THREE.ShapeGeometry(Amatic.generateShapes(lostText[0], 0.3), 2), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0 }));
  lostPhrase.geometry.center();
  lostPhrase.position.set(0, -0.85, -5);
  const sparkleGeometry = [];
  sparkleGeometry[0] = new THREE.CircleGeometry(0.1, 16);
  sparkleGeometry[1] = new THREE.RingGeometry(0.07, 0.1, 16, 1);
  const gravitySparkleMaterial = [];
  gravitySparkleMaterial[0] = new THREE.MeshBasicMaterial({ color: 0xFF9E80 });
  gravitySparkleMaterial[1] = new THREE.MeshBasicMaterial({ color: 0xFF80AB });
  const antigravitySparkleMaterial = [];
  antigravitySparkleMaterial[0] = new THREE.MeshBasicMaterial({ color: 0x80D8FF });
  antigravitySparkleMaterial[1] = new THREE.MeshBasicMaterial({ color: 0x69F0AE });
  for (let i = 0; i < 4; i++) {
    gravityPoint[i] = new THREE.Object3D();
    gravityPoint[i].container = new THREE.Object3D();
    gravityPoint[i].part = [];
    gravityPoint[i].part[0] = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 16), new THREE.MeshLambertMaterial({ color: 0xFF80AB }));
    gravityPoint[i].part[1] = new THREE.Object3D();
    gravityPoint[i].part[1].part = [];
    gravityPoint[i].part[1].part[0] = new THREE.Mesh(new THREE.TorusGeometry(0.47, 0.015, 4, 40), new THREE.MeshLambertMaterial({ color: 0xFFCDD2 }));
    gravityPoint[i].part[1].part[1] = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 10), new THREE.MeshLambertMaterial({ color: 0xFF4081 }));
    gravityPoint[i].part[1].part[1].geometry.translate(0.47, 0, 0);
    gravityPoint[i].part[1].part[1].rotateZ(0.1 + Math.random() * 2);
    gravityPoint[i].part[1].add(gravityPoint[i].part[1].part[0], gravityPoint[i].part[1].part[1]);
    gravityPoint[i].part[2] = new THREE.Object3D();
    gravityPoint[i].part[2].part = [];
    gravityPoint[i].part[2].part[0] = new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.015, 4, 50), gravityPoint[i].part[1].part[0].material);
    gravityPoint[i].part[2].part[1] = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 10), new THREE.MeshLambertMaterial({ color: 0xFF4081 }));
    gravityPoint[i].part[2].part[1].geometry.translate(0.66, 0, 0);
    gravityPoint[i].part[2].part[1].rotateZ(-0.1 - Math.random() * 2);
    gravityPoint[i].part[2].add(gravityPoint[i].part[2].part[0], gravityPoint[i].part[2].part[1]);
    gravityPoint[i].container.add(gravityPoint[i].part[0], gravityPoint[i].part[1], gravityPoint[i].part[2]);
    gravityPoint[i].container.position.set(-0.1, -0.1, 0);
    gravityPoint[i].clickableArea = new THREE.Mesh(new THREE.CircleGeometry(0.9, 8), transparentMaterial);
    gravityPoint[i].active = false;
    gravityPoint[i].field = new THREE.Object3D();
    gravityPoint[i].ringTween = [];
    for (let j = 3; j < 13; j++) {
    	gravityPoint[i].part[j] = new THREE.Mesh(new THREE.RingGeometry(4.5, 4.54, 80, 1), new THREE.MeshBasicMaterial({ color: 0xF8BBD0, transparent: true, opacity: 0 }));
      gravityPoint[i].part[j].geometry.scale(0.95 + Math.random() * 0.1, 0.95 + Math.random() * 0.1, 1);
      gravityPoint[i].part[j].geometry.rotateZ(Math.random() * 3);
      gsap.to(gravityPoint[i].part[j].scale, { duration: 4, x: 0, y: 0, ease: "power1.in", repeat: -1, delay: 0.4 * (j - 3), onUpdate: function() {
      	gravityPoint[i].part[j].material.opacity = (1 - gravityPoint[i].part[j].scale.x) * 0.6;
      } });
    	gravityPoint[i].field.add(gravityPoint[i].part[j]);
    }
    gravityPoint[i].field.scale.set(0, 0, 1)
    gravityPoint[i].add(gravityPoint[i].container, gravityPoint[i].clickableArea, gravityPoint[i].field);
    gravityPoint[i].tween = [];
    gravityPoint[i].tween[0] = gsap.to(gravityPoint[i].children[0].children[1].rotation, { duration: "random(0.5, 1)", z: Math.PI * 2, ease: "none", repeat: -1 });
    gravityPoint[i].tween[1] = gsap.to(gravityPoint[i].children[0].children[1].rotation, { duration: "random(2, 3)", x: Math.PI * 2, ease: "none", repeat: -1 });
    gravityPoint[i].tween[2] = gsap.to(gravityPoint[i].children[0].children[1].rotation, { duration: "random(3, 4)", y: Math.PI * 2, ease: "none", repeat: -1 });
    gravityPoint[i].tween[3] = gsap.to(gravityPoint[i].children[0].children[2].rotation, { duration: "random(0.5, 1)", z: -Math.PI * 2, ease: "none", repeat: -1 });
    gravityPoint[i].tween[4] = gsap.to(gravityPoint[i].children[0].children[2].rotation, { duration: "random(2, 3)", x: -Math.PI * 2, ease: "none", repeat: -1 });
    gravityPoint[i].tween[5] = gsap.to(gravityPoint[i].children[0].children[2].rotation, { duration: "random(3, 4)", y: -Math.PI * 2, ease: "none", repeat: -1 });
    gravityPoint[i].tween[6] = gsap.to(gravityPoint[i].children[0].children[0].scale, { duration: 0.3, x: 0.9, y: 0.9, ease: "power1.out", repeat: -1, yoyo: true });
    gravityPoint[i].tween[7] = gsap.to(gravityPoint[i].children[0].children[0].material.color, { duration: 0.3, r: gravityBlimColor.r, g: gravityBlimColor.g, b: gravityBlimColor.b, ease: "power2.out", repeat: -1, yoyo: true });
    gravityPoint[i].tween[8] = gsap.to(gravityPoint[i].children[0].children[1].children[1].material.color, { duration: "random(0.1, 0.3)", r: gravityBulbBlimColor.r, g: gravityBulbBlimColor.g, b: gravityBulbBlimColor.b, ease: "power1.inOut", repeat: -1, yoyo: true });
    gravityPoint[i].tween[9] = gsap.to(gravityPoint[i].children[0].children[2].children[1].material.color, { duration: "random(0.1, 0.3)", r: gravityBulbBlimColor.r, g: gravityBulbBlimColor.g, b: gravityBulbBlimColor.b, ease: "power1.inOut", repeat: -1, yoyo: true });
    for (let j = 0; j < 10; j++) {
    	gravityPoint[i].tween[j].pause();
    	gravityPoint[i].scale.set(0, 0, 0);
    }
    gsap.to(gravityPoint[i].container.position, { duration: "random(2, 4)", x: 0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
    gsap.to(gravityPoint[i].container.position, { duration: "random(2, 4)", y: 0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
    gravityPoint[i].container.rotation.set(-0.25, -0.25, -0.25);
    gsap.to(gravityPoint[i].container.rotation, { duration: "random(2, 4)", x: 0.25, ease: "power1.inOut", repeat: -1, yoyo: true });
    gsap.to(gravityPoint[i].container.rotation, { duration: "random(2, 4)", y: 0.25, ease: "power1.inOut", repeat: -1, yoyo: true });
    gsap.to(gravityPoint[i].container.rotation, { duration: "random(2, 4)", z: 0.25, ease: "power1.inOut", repeat: -1, yoyo: true });
    gravityPoint[i].sparkle = [];
    for (let j = 0; j < 16; j++) {
    	gravityPoint[i].sparkle[j] = new THREE.Mesh(sparkleGeometry[Math.round(Math.random())], gravitySparkleMaterial[Math.round(Math.random())]);
    	gravityPoint[i].sparkle[j].scale.set(0, 0, 1);
    	gravityPoint[i].add(gravityPoint[i].sparkle[j]);
    }
    mainScene.add(gravityPoint[i]);
  }
  for (let i = 0; i < 4; i++) {
  	antigravityPoint[i] = new THREE.Object3D();
    antigravityPoint[i].container = new THREE.Object3D();
    antigravityPoint[i].part = [];
    antigravityPoint[i].part[0] = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 16), new THREE.MeshLambertMaterial({ color: 0x82B1FF }));
    antigravityPoint[i].part[1] = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 10), new THREE.MeshLambertMaterial({ color: 0x536DFE }));
    antigravityPoint[i].part[1].position.y = 0.66;
    antigravityPoint[i].part[2] = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 10), new THREE.MeshLambertMaterial({ color: 0x536DFE }));
    antigravityPoint[i].part[2].position.y = -0.66;
    antigravityPoint[i].part[3] = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.08, 5, 1, true), new THREE.MeshLambertMaterial({ color: 0xE3F2FD }));
    antigravityPoint[i].part[4] = new THREE.Object3D();
    antigravityPoint[i].part[4].part = [];
    antigravityPoint[i].part[4].part[0] = new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.015, 4, 40), antigravityPoint[i].part[3].material);
    antigravityPoint[i].part[4].part[0].geometry.rotateX(Math.PI * 0.5);
    antigravityPoint[i].part[4].part[1] = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 10), new THREE.MeshLambertMaterial({ color: 0x536DFE }));
    antigravityPoint[i].part[4].part[1].geometry.translate(0.66, 0, 0);
    antigravityPoint[i].part[4].part[1].rotateY(-Math.random() * Math.PI);
    antigravityPoint[i].part[4].add(antigravityPoint[i].part[4].part[0], antigravityPoint[i].part[4].part[1]);
    antigravityPoint[i].container.add(antigravityPoint[i].part[0], antigravityPoint[i].part[1], antigravityPoint[i].part[2], antigravityPoint[i].part[3], antigravityPoint[i].part[4]);
    antigravityPoint[i].container.position.set(-0.1, -0.1, 0);
    antigravityPoint[i].clickableArea = new THREE.Mesh(new THREE.CircleGeometry(0.9, 8), transparentMaterial);
    antigravityPoint[i].active = false;
    antigravityPoint[i].field = new THREE.Object3D();
    antigravityPoint[i].ringTween = [];
    for (let j = 3; j < 13; j++) {
    	antigravityPoint[i].part[j] = new THREE.Mesh(new THREE.RingGeometry(4.5, 4.54, 80, 1), new THREE.MeshBasicMaterial({ color: 0x84FFFF, transparent: true, opacity: 0 }));
      antigravityPoint[i].part[j].geometry.scale(0.95 + Math.random() * 0.1, 0.95 + Math.random() * 0.1, 1);
      antigravityPoint[i].part[j].geometry.rotateZ(Math.random() * 3);
      antigravityPoint[i].part[j].scale.set(0, 0, 1);
      gsap.to(antigravityPoint[i].part[j].scale, { duration: 4, x: 1, y: 1, ease: "power1.out", repeat: -1, delay: 0.4 * (j - 3), onUpdate: function() {
      	antigravityPoint[i].part[j].material.opacity = (1 - antigravityPoint[i].part[j].scale.x) * 0.5;
      } });
    	antigravityPoint[i].field.add(antigravityPoint[i].part[j]);
    }
    antigravityPoint[i].field.scale.set(0, 0, 1)
    antigravityPoint[i].add(antigravityPoint[i].container, antigravityPoint[i].clickableArea, antigravityPoint[i].field);
    antigravityPoint[i].tween = [];
    antigravityPoint[i].tween[0] = gsap.to(antigravityPoint[i].children[0].children[0].scale, { duration: 0.3, x: 0.9, y: 0.9, ease: "power1.in", repeat: -1, yoyo: true });
    antigravityPoint[i].tween[1] = gsap.to(antigravityPoint[i].children[0].children[1].position, { duration: 0.3, y: 0.46, ease: "power1.inOut", repeat: -1, yoyo: true });
    antigravityPoint[i].tween[2] = gsap.to(antigravityPoint[i].children[0].children[2].position, { duration: 0.3, y: -0.46, ease: "power1.inOut", repeat: -1, yoyo: true });
    antigravityPoint[i].tween[3] = gsap.to(antigravityPoint[i].children[0].children[4].rotation, { duration: "random(0.5, 1)", y: Math.PI * 2, ease: "none", repeat: -1 });
    antigravityPoint[i].tween[4] = gsap.to(antigravityPoint[i].children[0].children[4].rotation, { duration: 0.5, x: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
    antigravityPoint[i].tween[5] = gsap.to(antigravityPoint[i].children[0].children[4].rotation, { duration: 1, z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
    antigravityPoint[i].tween[6] = gsap.to(antigravityPoint[i].children[0].children[0].material.color, { duration: 0.3, r: antigravityBlimColor.r, g: antigravityBlimColor.g, b: antigravityBlimColor.b, ease: "power2.out", repeat: -1, yoyo: true });
    antigravityPoint[i].tween[7] = gsap.to(antigravityPoint[i].children[0].children[1].material.color, { duration: "random(0.1, 0.3)", r: antigravityBulbBlimColor.r, g: antigravityBulbBlimColor.g, b: antigravityBulbBlimColor.b, ease: "power1.inOut", repeat: -1, yoyo: true });
    antigravityPoint[i].tween[8] = gsap.to(antigravityPoint[i].children[0].children[2].material.color, { duration: "random(0.1, 0.3)", r: antigravityBulbBlimColor.r, g: antigravityBulbBlimColor.g, b: antigravityBulbBlimColor.b, ease: "power1.inOut", repeat: -1, yoyo: true });
    antigravityPoint[i].tween[9] = gsap.to(antigravityPoint[i].children[0].children[4].children[1].material.color, { duration: "random(0.1, 0.3)", r: antigravityBulbBlimColor.r, g: antigravityBulbBlimColor.g, b: antigravityBulbBlimColor.b, ease: "power1.inOut", repeat: -1, yoyo: true });
    for (let j = 0; j < 10; j++) {
    	antigravityPoint[i].tween[j].pause();
    	antigravityPoint[i].scale.set(0, 0, 0);
    }
    gsap.to(antigravityPoint[i].container.position, { duration: "random(2, 4)", x: 0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
    gsap.to(antigravityPoint[i].container.position, { duration: "random(2, 4)", y: 0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
    antigravityPoint[i].container.rotation.set(-0.25, -0.25, -0.25);
    gsap.to(antigravityPoint[i].container.rotation, { duration: "random(2, 4)", x: 0.25, ease: "power1.inOut", repeat: -1, yoyo: true });
    gsap.to(antigravityPoint[i].container.rotation, { duration: "random(2, 4)", y: 0.25, ease: "power1.inOut", repeat: -1, yoyo: true });
    gsap.to(antigravityPoint[i].container.rotation, { duration: "random(2, 4)", z: 0.25, ease: "power1.inOut", repeat: -1, yoyo: true });
    antigravityPoint[i].sparkle = [];
    for (let j = 0; j < 16; j++) {
    	antigravityPoint[i].sparkle[j] = new THREE.Mesh(sparkleGeometry[Math.round(Math.random())], antigravitySparkleMaterial[Math.round(Math.random())]);
    	antigravityPoint[i].sparkle[j].scale.set(0, 0, 1);
    	antigravityPoint[i].add(antigravityPoint[i].sparkle[j]);
    }
    mainScene.add(antigravityPoint[i]);
  }
  shape = null;
  shape = new THREE.Shape();
  shape.moveTo(0.015, 0);
  for (let j = 0; j < 5; j++) {
  	shape.lineTo(0.015 * Math.cos(Math.PI / 2.5 * j), 0.015 * Math.sin(Math.PI / 2.5 * j));
  	shape.lineTo(0.03 * Math.cos(Math.PI / 5 + Math.PI / 2.5 * j), 0.03 * Math.sin(Math.PI / 5 + Math.PI / 2.5 * j));
  }
  const starSparkleGeometry = new THREE.ShapeGeometry(shape, 1);
  const starSparkleMaterial = [];
  starSparkleMaterial[0] = new THREE.MeshBasicMaterial({ color: 0xEEFF41 });
  starSparkleMaterial[1] = new THREE.MeshBasicMaterial({ color: 0xFFAB40 });
  shape = null;
  shape = new THREE.Shape();
  for (let i = 4; i >= 0; i--) {
    shape.absarc(Math.cos(Math.PI / 5 + Math.PI / 2.5 * i) * 0.46, Math.sin(Math.PI / 5 + Math.PI / 2.5 * i) * 0.46, 0.13, Math.PI / 2.5 * 2.5 + Math.PI / 2.5 * i, Math.PI / 2.5 * 3.5 + Math.PI / 2.5 * i);
    shape.absarc(Math.cos(Math.PI / 2.5 * i) * 0.5, Math.sin(Math.PI / 2.5 * i) * 0.5, 0.07, Math.PI / 2.5 * 6 + Math.PI / 2.5 * i, Math.PI / 2.5 * 4 + Math.PI / 2.5 * i, true);
  }
  resultStars.star = [];
  for (let i = 0; i < 3; i++) {
  	star[i] = new THREE.Object3D();
    star[i].body = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { steps: 0, depth: 0, curveSegments: 3, bevelEnabled: true, bevelSize: 0.15, bevelThickness: 0.15, bevelSegments: 6, bevelOffset: -0.07 }), new THREE.MeshLambertMaterial({ color: 0xFFD740 }));
    star[i].body.geometry.scale(0.45, 0.45, 0.45);
    star[i].body.geometry.rotateZ(Math.PI * 0.1);
    star[i].add(star[i].body);
    star[i].body.rotation.set(-0.3, -0.3, -0.3);
    star[i].body.position.set(-0.05, -0.05, 0);
    gsap.to(star[i].body.rotation, { duration: "random(1, 2)", x: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
    gsap.to(star[i].body.rotation, { duration: "random(1, 2)", y: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
    gsap.to(star[i].body.rotation, { duration: "random(1, 2)", z: 0.3, ease: "power1.inOut", repeat: -1, yoyo: true });
    gsap.to(star[i].body.position, { duration: "random(1, 2)", x: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
    gsap.to(star[i].body.position, { duration: "random(1, 2)", y: 0.05, ease: "power1.inOut", repeat: -1, yoyo: true });
    star[i].sparkle = [];
    for (let j = 0; j < 12; j++) {
    	star[i].sparkle[j] = new THREE.Mesh(starSparkleGeometry, starSparkleMaterial[Math.round(Math.random())]);
    	star[i].sparkle[j].scale.set(0, 0, 1);
    	star[i].sparkle[j].rotation.z = Math.random();
    	mainScene.add(star[i].sparkle[j]);
    }
    star[i].body.scale.set(0, 0, 0);
    resultStars.star[i] = new THREE.Object3D();
    resultStars.star[i].body = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { steps: 0, depth: 0, curveSegments: 8, bevelEnabled: true, bevelSize: 0.15, bevelThickness: 0.15, bevelSegments: 12, bevelOffset: -0.07 }), new THREE.MeshLambertMaterial({ color: 0xFFD740 }));
    resultStars.star[i].body.geometry.scale(0.35, 0.35, 0.35);
    resultStars.star[i].body.geometry.rotateZ(Math.PI * 0.1);
    resultStars.star[i].add(resultStars.star[i].body);
    resultStars.star[i].body.rotation.set(-0.15, -0.15, -0.15);
    resultStars.star[i].body.position.set(-0.02, -0.02, 0);
    resultStars.star[i].position.set(1.4 * Math.cos(Math.PI / 8 * 5 - Math.PI / 8 * i), 1.4 * Math.sin(Math.PI / 8 * 5 - Math.PI / 8 * i), 0);
    resultStars.star[i].rotation.z = Math.PI / 8 * 5 - Math.PI / 8 * i - Math.PI * 0.5;
    gsap.to(resultStars.star[i].body.rotation, { duration: "random(1, 2)", x: 0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
    gsap.to(resultStars.star[i].body.rotation, { duration: "random(1, 2)", y: 0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
    gsap.to(resultStars.star[i].body.rotation, { duration: "random(1, 2)", z: 0.15, ease: "power1.inOut", repeat: -1, yoyo: true });
    gsap.to(resultStars.star[i].body.position, { duration: "random(1, 2)", x: 0.02, ease: "power1.inOut", repeat: -1, yoyo: true });
    gsap.to(resultStars.star[i].body.position, { duration: "random(1, 2)", y: 0.02, ease: "power1.inOut", repeat: -1, yoyo: true });
    resultStars.star[i].sparkle = [];
    for (let j = 0; j < 16; j++) {
    	resultStars.star[i].sparkle[j] = new THREE.Mesh(starSparkleGeometry, starSparkleMaterial[Math.round(Math.random())]);
    	resultStars.star[i].sparkle[j].scale.set(0, 0, 1);
    	resultStars.star[i].sparkle[j].rotation.z = Math.random();
    	resultStars.add(resultStars.star[i].sparkle[j]);
    }
    resultStars.star[i].body.scale.set(0, 0, 0);
    resultStars.add(resultStars.star[i]);
    resultStars.scale.set(1.4, 1.4, 1.4);
    resultStars.position.set(0, -0.5, -8);
    mainScene.add(star[i]);
  }
  resultStars.visible = false;
  for (let i = 0; i < 4; i++) {
  	resultPhrase[i] = new THREE.Mesh(new THREE.ShapeGeometry(Amatic.generateShapes(resultText[0][i], 0.2), 2), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0 }));
    resultPhrase[i].geometry.center();
    resultPhrase[i].position.set(0, -0.8, -5);
    mainScene.add(resultPhrase[i]);
  }
  const portalParticleMaterial = [];
  portalParticleMaterial[0] = new THREE.MeshLambertMaterial({ color: 0xEA80FC });
  portalParticleMaterial[1] = new THREE.MeshLambertMaterial({ color: 0x64FFDA });
  portalParticleMaterial[2] = new THREE.MeshLambertMaterial({ color: 0x8C9EFF });
  const particleGeometry = new THREE.SphereGeometry(0.24, 16, 1, 0, Math.PI * 2, 0, Math.PI * 0.5);
  particleGeometry.rotateX(Math.PI * 0.5);
  portal.body = new THREE.Mesh(new THREE.SphereGeometry(0.5, 24, 1, 0, Math.PI * 2, 0, Math.PI * 0.5), new THREE.MeshNormalMaterial());
  portal.body.geometry.rotateX(Math.PI * 0.5);
  gsap.to(portal.body.rotation, { duration: 2, z: -Math.PI * 2, ease: "none", repeat: -1 });
  gsap.to(portal.body.scale, { duration: "random(0.3, 0.5)", x: 0.7, ease: "power1.inOut", repeat: -1, yoyo: true });
  gsap.to(portal.body.scale, { duration: "random(0.3, 0.5)", y: 0.7, ease: "power1.inOut", repeat: -1, yoyo: true });
  portal.particle = [];
  for (let j = 0; j < 48; j++) {
  	portal.particle[j] = new THREE.Object3D();
  	portal.particle[j].body = new THREE.Mesh(particleGeometry, portalParticleMaterial[Math.floor(Math.random() * 3)]);
  	const particleAngle = Math.random() * Math.PI * 2;
  	const particleDist = 1 + Math.random();
  	const particleTime = 0.6 + Math.random() * 3.4;
  	portal.particle[j].body.position.set(particleDist * Math.cos(particleAngle), particleDist * Math.sin(particleAngle), 0);
  	portal.particle[j].body.scale.set(0, 0, 0);
  	gsap.to(portal.particle[j].body.position, { duration: particleTime, x: 0, y: 0, ease: "power2.in", repeat: -1 });
    gsap.to(portal.particle[j].body.scale, { duration: particleTime, x: 1, y: 1, z: 1, ease: "power3.in", repeat: -1 });
    portal.particle[j].add(portal.particle[j].body);
    gsap.to(portal.particle[j].rotation, { duration: "random(1, 3)", z: -Math.PI * 2, ease: "none", repeat: -1 });
  	portal.add(portal.particle[j]);
  }
  portal.sparkle = [];
  for (let j = 0; j < 36; j++) {
  	portal.sparkle[j] = new THREE.Mesh(particleGeometry, portalParticleMaterial[Math.floor(Math.random() * 3)]);
  	portal.sparkle[j].scale.set(0, 0, 0);
  	portal.sparkle[j].rotation.z = Math.random() * 3;
  	mainScene.add(portal.sparkle[j]);
  }
  portal.add(portal.body);
  portal.scale.set(0, 0, 0);
  enterPortal.body = new THREE.Mesh(new THREE.SphereGeometry(0.5, 24, 1, 0, Math.PI * 2, 0, Math.PI * 0.5), new THREE.MeshNormalMaterial());
  enterPortal.body.geometry.rotateX(Math.PI * 0.5);
  gsap.to(enterPortal.body.rotation, { duration: 2, z: -Math.PI * 2, ease: "none", repeat: -1 });
  gsap.to(enterPortal.body.scale, { duration: "random(0.3, 0.5)", x: 0.7, ease: "power1.inOut", repeat: -1, yoyo: true });
  gsap.to(enterPortal.body.scale, { duration: "random(0.3, 0.5)", y: 0.7, ease: "power1.inOut", repeat: -1, yoyo: true });
  enterPortal.particle = [];
  for (let j = 0; j < 48; j++) {
  	enterPortal.particle[j] = new THREE.Object3D();
  	enterPortal.particle[j].body = new THREE.Mesh(particleGeometry, portalParticleMaterial[Math.floor(Math.random() * 3)]);
  	const particleAngle = Math.random() * Math.PI * 2;
  	const particleDist = 1 + Math.random();
  	const particleTime = 0.6 + Math.random() * 3.4;
  	enterPortal.particle[j].posTween = gsap.to(enterPortal.particle[j].body.position, { duration: particleTime, x: particleDist * Math.cos(particleAngle), y: particleDist * Math.sin(particleAngle), ease: "power2.out", repeat: -1 });
  	enterPortal.particle[j].scaleTween = gsap.to(enterPortal.particle[j].body.scale, { duration: particleTime, x: 0, y: 0, z: 0, ease: "power3.out", repeat: -1 });
  	enterPortal.particle[j].add(enterPortal.particle[j].body);
  	enterPortal.particle[j].rotTween = gsap.to(enterPortal.particle[j].rotation, { duration: "random(1, 3)", z: -Math.PI * 2, ease: "none", repeat: -1 });
  	enterPortal.particle[j].posTween.pause();
  	enterPortal.particle[j].scaleTween.pause();
  	enterPortal.particle[j].rotTween.pause();
  	enterPortal.add(enterPortal.particle[j]);
  }
  enterPortal.add(enterPortal.body);
  enterPortal.scale.set(0, 0, 0);
  enterPortal.visible = false;
  button[0] = new THREE.Object3D();
  tempGeometry[tempGeometry.length] = new THREE.SphereGeometry(0.2, 12, 2, 0, Math.PI, 0, Math.PI * 0.5);
  tempGeometry[tempGeometry.length - 1].rotateX(Math.PI * 0.5);
  tempGeometry[tempGeometry.length - 1].rotateZ(Math.PI * 0.5);
  tempGeometry[tempGeometry.length - 1].scale(1, 1, 0.3);
  tempGeometry[tempGeometry.length - 1].translate(0.15, 0, 0);
  tempGeometry[tempGeometry.length] = tempGeometry[tempGeometry.length - 1].clone();
  tempGeometry[tempGeometry.length - 1].rotateZ(Math.PI);
  tempGeometry[tempGeometry.length] = new THREE.CylinderGeometry(0.2, 0.2, 0.3, 4, 1, true, 0, Math.PI);
  tempGeometry[tempGeometry.length - 1].rotateY(-Math.PI * 0.5);
  tempGeometry[tempGeometry.length - 1].rotateZ(Math.PI * 0.5);
  tempGeometry[tempGeometry.length - 1].scale(1, 1, 0.3);
  button[0].clickableArea = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), hero[0].body.material);
  clearTempGeometries();
  tempGeometry[tempGeometry.length] = new THREE.TorusGeometry(0.218, 0.02, 6, 24, Math.PI);
  tempGeometry[tempGeometry.length - 1].rotateZ(Math.PI * 0.5);
  tempGeometry[tempGeometry.length - 1].translate(-0.15, 0, 0);
  tempGeometry[tempGeometry.length] = tempGeometry[tempGeometry.length - 1].clone();
  tempGeometry[tempGeometry.length - 1].rotateZ(Math.PI);
  tempGeometry[tempGeometry.length] = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 3, 1, true, 0, Math.PI);
  tempGeometry[tempGeometry.length - 1].rotateY(-Math.PI * 0.5);
  tempGeometry[tempGeometry.length - 1].rotateZ(Math.PI * 0.5);
  tempGeometry[tempGeometry.length - 1].translate(0, 0.218, 0);
  tempGeometry[tempGeometry.length] = tempGeometry[tempGeometry.length - 1].clone();
  tempGeometry[tempGeometry.length - 1].rotateZ(Math.PI);
  button[0].border = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), new THREE.MeshNormalMaterial());
  clearTempGeometries();
  shape = null;
  shape = new THREE.Shape();
  shape.absarc(-0.08, 0.08, 0.01, Math.PI / 3, Math.PI);
  shape.absarc(-0.08, -0.08, 0.01, Math.PI, Math.PI / 3 * 5);
  shape.absarc(0.065, 0, 0.01, Math.PI / 3 * 5, Math.PI / 3 * 7);
  tempGeometry[tempGeometry.length] = new THREE.ExtrudeGeometry(shape, { steps: 1, depth: 0.05, curveSegments: 6, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 10 });
  tempGeometry[tempGeometry.length - 1].translate(0.14, 0, 0);
  tempGeometry[tempGeometry.length] = new THREE.CylinderGeometry(0.035, 0.035, 0.26, 4, 1, true, 0, Math.PI);
  tempGeometry[tempGeometry.length - 1].rotateY(-Math.PI * 0.5);
  tempGeometry[tempGeometry.length - 1].rotateZ(Math.PI * 0.5);
  tempGeometry[tempGeometry.length - 1].translate(-0.08, 0, 0.055);
  tempGeometry[tempGeometry.length - 1] = tempGeometry[tempGeometry.length - 1].toNonIndexed();
  tempGeometry[tempGeometry.length] = new THREE.SphereGeometry(0.035, 8, 2, 0, Math.PI, 0, Math.PI * 0.5);
  tempGeometry[tempGeometry.length - 1].rotateX(Math.PI * 0.5);
  tempGeometry[tempGeometry.length - 1].rotateZ(-Math.PI * 0.5);
  tempGeometry[tempGeometry.length - 1].translate(-0.21, 0, 0.055);
  tempGeometry[tempGeometry.length - 1] = tempGeometry[tempGeometry.length - 1].toNonIndexed();
  button[0].icon = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), new THREE.MeshLambertMaterial({ color: 0x558B2F }));
  clearTempGeometries();
  button[0].add(button[0].clickableArea, button[0].border, button[0].icon);
  button[0].position.set(0.35, -1.4, -5);
  button[0].scale.set(0, 0, 0);
  button[0].ready = false;
  button[0].visible = false;
  button[1] = new THREE.Object3D();
  button[1].clickableArea = new THREE.Mesh(new THREE.SphereGeometry(0.3, 36, 2, 0, Math.PI * 2, 0, Math.PI * 0.5), hero[0].body.material);
  button[1].clickableArea.geometry.rotateX(Math.PI * 0.5);
  button[1].clickableArea.geometry.scale(1, 1, 0.3);
  button[1].border = new THREE.Mesh(new THREE.TorusGeometry(0.324, 0.025, 6, 56), new THREE.MeshNormalMaterial());
  shape = null;
  shape = new THREE.Shape();
  shape.absarc(-0.1, 0.1, 0.02, Math.PI / 3, Math.PI);
  shape.absarc(-0.1, -0.1, 0.02, Math.PI, Math.PI / 3 * 5);
  shape.absarc(0.08, 0, 0.02, Math.PI / 3 * 5, Math.PI / 3 * 7);
  button[1].icon = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { steps: 1, depth: 0.05, curveSegments: 8, bevelEnabled: true, bevelSize: 0.06, bevelThickness: 0.06, bevelSegments: 12 }), new THREE.MeshLambertMaterial({ color: 0xEC407A }));
  button[1].icon.geometry.translate(0.033, 0, 0);
  button[1].add(button[1].icon, button[1].border, button[1].clickableArea);
  button[1].position.set(0, -1.6, -5);
  button[1].scale.set(0, 0, 0);
  button[1].ready = false;
  button[2] = new THREE.Object3D();
  button[2].clickableArea = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 2, 0, Math.PI * 2, 0, Math.PI * 0.5), hero[0].body.material);
  button[2].clickableArea.geometry.rotateX(Math.PI * 0.5);
  button[2].clickableArea.geometry.scale(1, 1, 0.3);
  button[2].border = new THREE.Mesh(new THREE.TorusGeometry(0.218, 0.02, 6), new THREE.MeshNormalMaterial());
  shape = null;
  shape = new THREE.Shape();
  shape.absarc(-0.1, 0.1, 0.02, Math.PI / 3, Math.PI);
  shape.absarc(-0.1, -0.1, 0.02, Math.PI, Math.PI / 3 * 5);
  shape.absarc(0.08, 0, 0.02, Math.PI / 3 * 5, Math.PI / 3 * 7);
  tempGeometry[tempGeometry.length] = button[1].icon.geometry.clone();
  tempGeometry[tempGeometry.length - 1].rotateZ(Math.PI);
  tempGeometry[tempGeometry.length - 1].scale(0.4, 0.4, 0.4);
  tempGeometry[tempGeometry.length - 1].translate(-0.03, 0.09, 0.03);
  tempGeometry[tempGeometry.length] = new THREE.TorusGeometry(0.11, 0.03, 6, 36, Math.PI * 1.5);
  tempGeometry[tempGeometry.length - 1].rotateZ(Math.PI);
  tempGeometry[tempGeometry.length - 1] = tempGeometry[tempGeometry.length - 1].toNonIndexed();
  tempGeometry[tempGeometry.length - 1].translate(0, -0.015, 0.046);
  tempGeometry[tempGeometry.length] = new THREE.SphereGeometry(0.03, 6, 4, 0, Math.PI * 2, 0, Math.PI * 0.5);
  tempGeometry[tempGeometry.length - 1].translate(-0.11, -0.015, 0.046);
  tempGeometry[tempGeometry.length - 1] = tempGeometry[tempGeometry.length - 1].toNonIndexed();
  button[2].icon = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), new THREE.MeshLambertMaterial({ color: 0x1976D2 }));
  clearTempGeometries();
  button[2].icon.geometry.scale(0.9, 0.9, 0.9);
  gsap.to(button[2].icon.scale, { duration: 0.4, x: 0.85, y: 0.85, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.4 });
  gsap.to([button[2].border.scale, button[2].clickableArea.scale], { duration: 0.4, y: 0.85, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 0.4 });
  button[2].add(button[2].icon, button[2].border, button[2].clickableArea);
  button[2].position.set(-0.5, -1.4, -5);
  button[2].scale.set(0, 0, 0);
  button[2].ready = false;
  button[2].visible = false;
  button[3] = new THREE.Object3D();
  button[3].clickableArea = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.3), transparentMaterial);
  shape = null;
  shape = new THREE.Shape();
  shape.absarc(-0.1, 0, 0.025, Math.PI * 0.5, Math.PI * 1.5);
  shape.absarc(0.1, 0, 0.025, Math.PI * 1.5, Math.PI * 2.5);
  button[3].icon = [];
  for (let i = 0; i < 3; i++) {
  	button[3].icon[i] = new THREE.Mesh(new THREE.ShapeGeometry(shape, 4), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0 }));
    button[3].icon[i].position.y = 0.08 - 0.08 * i;
    button[3].add(button[3].icon[i]);
  }
  button[3].scale.set(0.6, 0.6, 1);
  button[3].add(button[3].clickableArea);
  button[3].position.set(-Math.tan(mainCamera.fov * Math.PI / 360) / document.body.clientHeight * document.body.clientWidth * 3 + 0.17, Math.tan(mainCamera.fov * Math.PI / 360) * 3 - 0.17, -3);
  button[3].ready = false;
  button[4] = new THREE.Object3D();
  button[4].clickableArea = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 2, 0, Math.PI * 2, 0, Math.PI * 0.5), hero[0].body.material);
  button[4].clickableArea.geometry.rotateX(Math.PI * 0.5);
  button[4].clickableArea.geometry.scale(1, 1, 0.3);
  button[4].border = new THREE.Mesh(new THREE.TorusGeometry(0.218, 0.02, 6), new THREE.MeshNormalMaterial());
  tempGeometry[tempGeometry.length] = new THREE.CapsuleGeometry(0.035, 0.2, 4, 6);
  tempGeometry[tempGeometry.length - 1].rotateZ(Math.PI * 0.5);
  tempGeometry[tempGeometry.length - 1].translate(0, 0.1, 0.05);
  tempGeometry[tempGeometry.length] = tempGeometry[tempGeometry.length - 1].clone();
  tempGeometry[tempGeometry.length - 1].translate(0, -0.1, 0);
  tempGeometry[tempGeometry.length] = tempGeometry[tempGeometry.length - 1].clone();
  tempGeometry[tempGeometry.length - 1].translate(0, -0.1, 0);
  button[4].icon = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), new THREE.MeshLambertMaterial({ color: 0x558B2F }));
  clearTempGeometries();
  button[4].icon.geometry.scale(0.85, 0.85, 0.85);
  button[4].add(button[4].icon, button[4].border, button[4].clickableArea);
  button[4].position.set(0.35, -1.4, -5);
  gsap.to([button[4].icon.scale, button[0].icon.scale, button[1].icon.scale], { duration: 0.4, x: 0.85, y: 0.85, ease: "power1.inOut", repeat: -1, yoyo: true });
  gsap.to([button[4].border.scale, button[4].clickableArea.scale, button[1].border.scale, button[1].clickableArea.scale, button[0].border.scale, button[0].clickableArea.scale], { duration: 0.4, y: 0.85, ease: "power1.inOut", repeat: -1, yoyo: true });
  button[4].scale.set(0, 0, 0);
  button[4].ready = false;
  button[4].visible = false;
  button[5] = new THREE.Object3D();
  button[5].clickableArea = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.3), transparentMaterial);
  shape = null;
  shape = new THREE.Shape();
  shape.absarc(0.02, 0.1, 0.02, Math.PI / 3, Math.PI);
  shape.absarc(0, -0.3, 0.35, Math.PI * 0.5, Math.PI * 2);
  shape.absarc(0.3, -0.3, 0.05, 0, Math.PI);
  shape.absarc(0, -0.3, 0.25, Math.PI * 2, Math.PI * 0.5, true);
  shape.absarc(0.02, -0.1, 0.02, Math.PI, Math.PI / 3 * 5);
  shape.absarc(0.2, 0, 0.02, Math.PI / 3 * 5, Math.PI / 3 * 7);
  tempGeometry[tempGeometry.length] = new THREE.ShapeGeometry(shape, 16);
  shape = null;
  shape = new THREE.Shape();
  shape.absarc(0, 0.15, 0.05, 0, Math.PI);
  shape.lineTo(-0.05, 0.05);
  shape.absarc(-0.15, 0, 0.05, Math.PI * 0.5, Math.PI * 1.5);
  shape.lineTo(-0.05, -0.05);
  shape.absarc(0, -0.15, 0.05, Math.PI, Math.PI * 2);
  shape.lineTo(0.05, -0.05);
  shape.absarc(0.15, 0, 0.05, Math.PI * 1.5, Math.PI * 2.5);
  shape.lineTo(0.05, 0.05);
  tempGeometry[tempGeometry.length] = new THREE.ShapeGeometry(shape, 4);
  tempGeometry[tempGeometry.length - 1].rotateZ(Math.PI * 0.25);
  tempGeometry[tempGeometry.length - 1].translate(0, -0.3, 0);
  button[5].icon = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0 }));
  clearTempGeometries();
  button[5].icon.geometry.scale(0.4, 0.4, 1);
  button[5].icon.geometry.translate(0, 0.11, 0);
  button[5].icon.scale.set(-0.9, 0.9, 1);
  button[5].scale.set(0.7, 0.7, 1);
  button[5].add(button[5].clickableArea, button[5].icon);
  button[5].position.set(-Math.tan(mainCamera.fov * Math.PI / 360) / document.body.clientHeight * document.body.clientWidth * 3 + 0.17, -Math.tan(mainCamera.fov * Math.PI / 360) * 3 + 0.17, -3);
  button[5].ready = false;
  button[6] = new THREE.Object3D();
  button[6].clickableArea = levelBody.clone();
  button[6].border = levelBorder.clone();
  button[6].border.material = new THREE.MeshLambertMaterial({ color: 0xFF5252 });
  button[6].icon = new THREE.Mesh(new THREE.ExtrudeGeometry(Amatic.generateShapes(clearProgressButtonText[0][0], 0.2), { steps: 1, depth: 0.2, curveSegments: 3, bevelEnabled: false }), button[6].border.material);
  button[6].icon.geometry.center();
  button[6].add(button[6].border, button[6].clickableArea, button[6].icon);
  button[6].scale.set(0, 0, 0);
  button[6].position.set(0, -0.25, -3);
  button[6].ready = false;
  button[7] = new THREE.Object3D();
  button[7].clickableArea = levelBody.clone();
  button[7].border = levelBorder.clone();
  button[7].border.material = new THREE.MeshLambertMaterial({ color: 0x0091EA });
  button[7].icon = new THREE.Mesh(new THREE.ExtrudeGeometry(Amatic.generateShapes(clearProgressButtonText[0][1], 0.2), { steps: 1, depth: 0.2, curveSegments: 3, bevelEnabled: false }), button[7].border.material);
  button[7].icon.geometry.center();
  button[7].add(button[7].border, button[7].clickableArea, button[7].icon);
  button[7].scale.set(0, 0, 0);
  button[7].position.set(0, -0.65, -3);
  button[7].ready = false;
  button[8] = new THREE.Object3D();
  button[8].clickableArea = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.3), transparentMaterial);
  shape = null;
  shape = new THREE.Shape();
  shape.absarc(0, 0, 0.15, Math.PI * 1.7, Math.PI * 2.3);
  shape.absarc(0.13 * Math.cos(Math.PI * 0.3), 0.13 * Math.sin(Math.PI * 0.3), 0.02, Math.PI * 0.3, Math.PI * 1.3);
  shape.absarc(0, 0, 0.11, Math.PI * 2.3, Math.PI * 1.7, true);
  shape.absarc(0.13 * Math.cos(Math.PI * -0.3), 0.13 * Math.sin(Math.PI * -0.3), 0.02, Math.PI * 0.7, Math.PI * 1.7);
  tempGeometry[tempGeometry.length] = new THREE.ShapeGeometry(shape, 6);
  shape = null;
  shape = new THREE.Shape();
  shape.absarc(0, 0, 0.08, Math.PI * 1.8, Math.PI * 2.2);
  shape.absarc(0.06 * Math.cos(Math.PI * 0.2), 0.06 * Math.sin(Math.PI * 0.2), 0.02, Math.PI * 0.2, Math.PI * 1.2);
  shape.absarc(0, 0, 0.04, Math.PI * 2.3, Math.PI * 1.7, true);
  shape.absarc(0.06 * Math.cos(Math.PI * -0.2), 0.06 * Math.sin(Math.PI * -0.2), 0.02, Math.PI * 0.8, Math.PI * 1.8);
  tempGeometry[tempGeometry.length] = new THREE.ShapeGeometry(shape, 6);
  button[8].onIcon = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0 }));
  clearTempGeometries();
  shape = null;
  shape = new THREE.Shape();
  shape.absarc(-0.02, 0.13, 0.02, 0, Math.PI * 0.75);
  shape.lineTo(-0.09, 0.07);
  shape.absarc(-0.13, 0.05, 0.02, Math.PI * 0.5, Math.PI);
  shape.absarc(-0.13, -0.05, 0.02, Math.PI, Math.PI * 1.5);
  shape.lineTo(-0.09, -0.07);
  shape.absarc(-0.02, -0.13, 0.02, Math.PI * 1.25, Math.PI * 2);
  tempGeometry[tempGeometry.length] = new THREE.ShapeGeometry(shape, 6);
  button[8].icon = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), button[8].onIcon.material);
  clearTempGeometries();
  shape = null;
  shape = new THREE.Shape();
  shape.absarc(0, 0.07, 0.02, 0, Math.PI);
  shape.lineTo(-0.02, 0.02);
  shape.absarc(-0.07, 0, 0.02, Math.PI * 0.5, Math.PI * 1.5);
  shape.lineTo(-0.02, -0.02);
  shape.absarc(0, -0.07, 0.02, Math.PI, Math.PI * 2);
  shape.lineTo(0.02, -0.02);
  shape.absarc(0.07, 0, 0.02, Math.PI * 1.5, Math.PI * 2.5);
  shape.lineTo(0.02, 0.02);
  tempGeometry[tempGeometry.length] = new THREE.ShapeGeometry(shape, 4);
  tempGeometry[tempGeometry.length - 1].rotateZ(Math.PI * 0.25);
  tempGeometry[tempGeometry.length - 1].translate(0.085, 0, 0);
  button[8].offIcon = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), button[8].onIcon.material);
  clearTempGeometries();
  button[8].offIcon.visible = false;
  button[8].icon.geometry.scale(0.8, 0.8, 1);
  button[8].scale.set(0.65, 0.65, 1);
  button[8].add(button[8].clickableArea, button[8].onIcon, button[8].icon, button[8].offIcon);
  button[8].position.set(Math.tan(mainCamera.fov * Math.PI / 360) / document.body.clientHeight * document.body.clientWidth * 3 - 0.19, Math.tan(mainCamera.fov * Math.PI / 360) * 3 - 0.18, -3);
  button[8].ready = false;
  hint[0] = new THREE.Object3D();
  hint[0].line = [];
  hint[0].text = [
  	`Tap`,
  	`to activate`,
  	`and deactivate`,
  	`gravity`
  ];
  for (let i = 0; i < hint[0].text.length; i++) {
  	hint[0].line[i] = new THREE.Mesh(new THREE.ShapeGeometry(Amatic.generateShapes(hint[0].text[i], 0.17), 2), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0 }));
    hint[0].line[i].position.y = -0.25 * i;
    hint[0].add(hint[0].line[i]);
  }
  hint[0].position.set(-1.1, 1.47, -5);
  shape = null;
  shape = new THREE.Shape();
  shape.moveTo(0, 0.02);
  shape.lineTo(0.55, 0.01);
  shape.lineTo(0.3, 0.19);
  shape.lineTo(0.32, 0.22);
  shape.lineTo(0.6, 0);
  shape.lineTo(0.32, -0.22);
  shape.lineTo(0.3, -0.19);
  shape.lineTo(0.55, -0.01);
  shape.lineTo(0, -0.02);
  hint[1] = new THREE.Mesh(new THREE.ShapeGeometry(shape, 1), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0 }));
  hint[1].geometry.scale(0.42, 0.42, 1);
  hint[2] = new THREE.Object3D();
  hint[2].part = [];
  for (let i = 0; i < 12; i++) {
  	hint[2].part[i] = new THREE.Mesh(new THREE.PlaneGeometry(0.06, 0.012), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0 }));
    hint[2].part[i].geometry.translate(0.03, 0, 0);
    hint[2].part[i].geometry.scale(1 + Math.random() * 1, 1, 1);
    hint[2].part[i].position.set(0.3 * Math.cos(Math.PI / 6 * i), 0.3 * Math.sin(Math.PI / 6 * i), 0);
    hint[2].part[i].rotation.z = Math.PI / 6 * i;
    hint[2].add(hint[2].part[i]);
  }
  hint[2].position.set(0.745, 1.56, -5);
  gsap.to(hint[2].rotation, { duration: 8, z: -Math.PI * 2, ease: "none", repeat: -1 });
  hint[3] = new THREE.Object3D();
  hint[3].line = [];
  hint[3].text = [
  	`Blue ones`,
  	`can push away`
  ];
  for (let i = 0; i < hint[3].text.length; i++) {
  	hint[3].line[i] = new THREE.Mesh(new THREE.ShapeGeometry(Amatic.generateShapes(hint[3].text[i], 0.17), 2), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0 }));
    hint[3].line[i].geometry.computeBoundingBox();
    hint[3].line[i].geometry.translate(-hint[3].line[i].geometry.boundingBox.max.x, 0, 0);
    hint[3].line[i].position.y = -0.25 * i;
    hint[3].add(hint[3].line[i]);
  }
  hint[3].position.set(1.1, -1.49, -5);
  hint[4] = new THREE.Object3D();
  hint[4].line = [];
  hint[4].text = [
    `Beware`,
    `of space`,
    `eyes!`,
  ];
  for (let i = 0; i < hint[4].text.length; i++) {
  	hint[4].line[i] = new THREE.Mesh(new THREE.ShapeGeometry(Amatic.generateShapes(hint[4].text[i], 0.17), 2), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0 }));
  	hint[4].line[i].geometry.computeBoundingBox();
    hint[4].line[i].geometry.translate(-hint[4].line[i].geometry.boundingBox.max.x, 0, 0);
  	hint[4].line[i].position.y = -0.25 * i;
  	hint[4].add(hint[4].line[i]);
  }
  hint[4].position.set(-0.35, 0.17, -5);
  hint[5] = new THREE.Object3D();
  hint[5].line = [];
  hint[5].text = [
    `Sometimes`,
    `the portal`,
    `moves!`
  ];
  for (let i = 0; i < hint[5].text.length; i++) {
  	hint[5].line[i] = new THREE.Mesh(new THREE.ShapeGeometry(Amatic.generateShapes(hint[5].text[i], 0.17), 2), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0 }));
  	hint[5].line[i].position.y = -0.25 * i;
  	hint[5].add(hint[5].line[i]);
  }
  hint[5].position.set(-1.2, -0.6, -5);
  hint[6] = new THREE.Mesh(new THREE.CircleGeometry(0.1, 16), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0 }));
  shape = null;
  shape = new THREE.Shape();
  shape.moveTo(0.015, 0);
  for (let j = 0; j < 12; j++) {
  	shape.lineTo(0.015 * Math.cos(Math.PI / 6 * j), 0.015 * Math.sin(Math.PI / 6 * j));
  	shape.lineTo(0.03 * Math.cos(Math.PI / 12 + Math.PI / 6 * j), 0.03 * Math.sin(Math.PI / 12 + Math.PI / 6 * j));
  }
  explosion.wave = new THREE.Mesh(new THREE.ShapeGeometry(shape, 1), blimMaterial[0]);
  explosion.add(explosion.wave);
  explosion.particle = [];
  shape = null;
  shape = new THREE.Shape();
  shape.moveTo(0.15, 0);
  shape.lineTo(-0.15, 0.15);
  shape.lineTo(-0.15, -0.15);
  for (let i = 0; i < 48; i++) {
  	explosion.particle[i] = new THREE.Mesh(new THREE.ShapeGeometry(shape, 1), blimMaterial[Math.floor(Math.random() * 5)]);
    explosion.particle[i].geometry.scale(0.9 + Math.random(), 0.9 + Math.random(), 1);
    explosion.particle[i].geometry.rotateZ(Math.random() * 6);
    explosion.particle[i].position.set(-3 + Math.random() * 6, -3 + Math.random() * 6, -15.4)
    explosion.particle[i].scale.set(0, 0, 1);
    mainScene.add(explosion.particle[i]);
  }
  explosion.scale.set(0, 0, 1);
  gsap.to(explosion.rotation, { duration: 3, z: -Math.PI * 2, ease: "none", repeat: -1 });
  monster[0] = new THREE.Object3D();
  monster[0].container = new THREE.Object3D();
	tempGeometry[tempGeometry.length] = new THREE.SphereGeometry(0.4, 16, 24, 0, Math.PI * 1.6);
  tempGeometry[tempGeometry.length - 1].rotateY(Math.PI * 0.7);
  tempGeometry[tempGeometry.length - 1].rotateZ(Math.PI * 0.5);
  tempGeometry[tempGeometry.length] = new THREE.CylinderGeometry(0.05, 0.05, 1.15, 4, 20, false, 0, Math.PI);
  tempGeometry[tempGeometry.length - 1].rotateY(-Math.PI * 0.5);
  tempGeometry[tempGeometry.length - 1].rotateZ(-Math.PI * 0.5);
  bendGeometry(tempGeometry[tempGeometry.length - 1], "y", -2.85);
  tempGeometry[tempGeometry.length - 1].translate(0, 0, 0.37);
  tempGeometry[tempGeometry.length - 1].rotateX(-Math.PI * 0.23);
  tempGeometry[tempGeometry.length] = tempGeometry[tempGeometry.length - 1].clone();
  tempGeometry[tempGeometry.length - 1].rotateX(Math.PI * 0.46);
  monster[0].scull = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), new THREE.MeshLambertMaterial({ color: 0x827717 }));
  clearTempGeometries();
  tempGeometry[tempGeometry.length] = new THREE.SphereGeometry(0.37, 16, 16, 0, Math.PI * 0.4);
  tempGeometry[tempGeometry.length - 1].rotateY(Math.PI * 0.3);
  tempGeometry[tempGeometry.length - 1].rotateZ(Math.PI * 0.5);
  monster[0].eye = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), new THREE.MeshLambertMaterial({ color: 0xEFEBE9 }));
  clearTempGeometries();
  monster[0].pupil = new THREE.Object3D();
  monster[0].pupil.part = [];
  tempGeometry[tempGeometry.length] = new THREE.SphereGeometry(0.38, 24, 2, 0, Math.PI * 2, 0, Math.PI * 0.17);
  tempGeometry[tempGeometry.length - 1].rotateX(Math.PI * 0.5);
  monster[0].pupil.part[0] = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), new THREE.MeshLambertMaterial({ color: 0xBF360C }));
  clearTempGeometries();
  tempGeometry[tempGeometry.length] = new THREE.SphereGeometry(0.385, 16, 2, 0, Math.PI * 2, 0, Math.PI * 0.09);
  tempGeometry[tempGeometry.length - 1].rotateX(Math.PI * 0.5);
  monster[0].pupil.part[1] = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), new THREE.MeshLambertMaterial({ color: 0x212121 }));
  clearTempGeometries();
  tempGeometry[tempGeometry.length] = new THREE.SphereGeometry(0.39, 12, 2, 0, Math.PI * 2, 0, Math.PI * 0.04);
  tempGeometry[tempGeometry.length - 1].rotateX(Math.PI * 0.44);
  tempGeometry[tempGeometry.length - 1].rotateY(-Math.PI * 0.06);
  monster[0].pupil.part[2] = new THREE.Mesh(new BufferGeometryUtils.mergeGeometries(tempGeometry), new THREE.MeshLambertMaterial({ color: 0xFFFFFF }));
  clearTempGeometries();
  monster[0].pupil.add(monster[0].pupil.part[0], monster[0].pupil.part[1], monster[0].pupil.part[2]);
  monster[0].spike = [];
  monster[0].spikeMaterial = new THREE.MeshLambertMaterial({ color: 0x8D6E63 })
  for (let i = 0; i < 6; i++) {
    monster[0].spike[i] = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.3, 8, 1, true), monster[0].spikeMaterial);
    monster[0].spike[i].geometry.translate(0, 0.15, 0);
    monster[0].spike[i].geometry.rotateZ(-Math.PI * 0.5);
    monster[0].spike[i].position.set(0.38 * Math.cos(Math.PI / 3 * i + Math.PI / 6), 0.38 * Math.sin(Math.PI / 3 * i + Math.PI / 6), 0);
    monster[0].spike[i].rotation.z = Math.PI / 3 * i + Math.PI / 6;
    monster[0].container.add(monster[0].spike[i]);
  }
  monster[0].container.add(monster[0].pupil, monster[0].scull, monster[0].eye);
  monster[0].add(monster[0].container);
  for (let i = 1; i < 6; i++) {
  	monster[i] = monster[0].clone();
  }
  for (let i = 0; i < 6; i++) {
  	monster[i].eyeRotation = [0, 0];
    gsap.fromTo(monster[i].children[0].children[6].rotation, { x: function() { return monster[i].children[0].children[6].rotation.x }, y: function() { return monster[i].children[0].children[6].rotation.y } }, { duration: 0.8, x: function() { return monster[i].eyeRotation[0] }, y: function() { return monster[i].eyeRotation[1] }, ease: "power4.inOut", repeat: -1, repeatRefresh: true, repeatDelay: 0.5, delay: "random(0, 0.5)", onRepeat: function() { monster[i].eyeRotation = [-0.3 + Math.random() * 0.6, -0.9 + Math.random() * 1.8] } });
    monster[i].children[0].position.set(-0.1, -0.1, 0);
    gsap.to(monster[i].children[0].position, { duration: "random(2, 4)", x: 0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
    gsap.to(monster[i].children[0].position, { duration: "random(2, 4)", y: 0.1, ease: "power1.inOut", repeat: -1, yoyo: true });
  	monster[i].children[0].rotation.set(-0.2, -0.2, -0.2);
    gsap.to(monster[i].children[0].rotation, { duration: "random(2, 4)", x: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
    gsap.to(monster[i].children[0].rotation, { duration: "random(2, 4)", y: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
    gsap.to(monster[i].children[0].rotation, { duration: "random(2, 4)", z: 0.2, ease: "power1.inOut", repeat: -1, yoyo: true });
    for (let j = 0; j < 6; j++) {
     	gsap.to(monster[i].children[0].children[j].scale, { duration: "random(0.3, 0.8)", x: 0.7, ease: "power2.inOut", repeat: -1, yoyo: true });
    }
    monster[i].scale.set(0, 0, 0);
    mainScene.add(monster[i]);
  }
  gravityPoint[0].position.set(2.7, -2, -16);
  activatePoint(gravityPoint[0]);
  antigravityPoint[0].position.set(-2.5, 4.5, -16);
  activatePoint(antigravityPoint[0]);
  monster[0].position.set(-2.3, -1.8, -16);
  hero[0].position.set(0.7, 1.5, -7);
  hero[0].container.rotation.z = -0.2;
  star[0].position.set(-0.7, 5.5, -15);
  star[1].position.set(-3, 2.7, -15);
  star[2].position.set(1.7, -3.5, -15);
  deadHero[0].position.z = -7;
  portal.position.set(-0.7, 1.5, -9);
  enterPortal.position.set(2, 0, -16);
  mainScene.add(button[8], backStars[3], button[7], button[6], button[5], button[4], planet, button[3], menuContainer.blackFade, menuContainer, button[2], lostPhrase, deadHero[0], resultStars, button[1], hint[6], hint[5], hint[4], explosion, hint[3], hint[2], hint[1], hint[0], button[0], hero[0], portal, enterPortal);
  setTimeout(() => hideLoadingScreen(), 100);
}
function hideLoadingScreen() {
	document.body.addEventListener('mousemove', onDocumentMouseMove, false);
  document.body.addEventListener('wheel', onWheel, false);
  document.body.addEventListener('touchstart', onDocumentTouchStart, false);
  document.body.addEventListener('mousedown', onDocumentMouseDown, false);
	gsap.to([loadingBar.dot[0].position, loadingBar.dot[1].position, loadingBar.bar.position, loadingBar.bar.scale], { duration: 0.3, x: 0, ease: "back.in" });
  gsap.to([loadingBar.dot[0].scale, loadingBar.dot[1].scale], { duration: 0.5, x: 0, y: 0, ease: "back.in" });
	gsap.to(blackFade.material, { duration: 1, opacity: 0, ease: "none" });
	showStartScreen();
}
function showStartScreen() {
	for (let i = 0; i < 11; i++) {
		gsap.to(title[i].scale, { duration: "random(0.5, 1)", x: 1, y: 1, z: 1, ease: "back.out", delay: "random(0, 0.5)" });
	}
	for (let i = 11; i < 14; i++) {
		gsap.to(title[i].material, { duration: 1, opacity: 1, ease: "power1.in", delay: 0.5 + 0.1 * (i - 11) });
	}
	gsap.to(portal.scale, { duration: 1, x: 0.7, y: 0.7, z: 0.7, ease: "power1.inOut" });
  gsap.to(hero[0].scale, { duration: 0.9, x: 1, y: 1, z: 1, ease: "back.out", delay: 0.3 });
  gsap.to(monster[0].scale, { duration: 0.9, x: 1.5, y: 1.5, z: 1.5, ease: "back.out", delay: 0.6 });
	gsap.to(gravityPoint[0].scale, { duration: 0.8, x: 1, y: 1, z: 1, ease: "back.out", delay: 0.4 });
  gsap.to(antigravityPoint[0].scale, { duration: 0.8, x: 1, y: 1, z: 1, ease: "back.out", delay: 0.7 });
  gsap.to(star[0].body.scale, { duration: 0.6, x: 1.4, y: 1.4, z: 1.4, ease: "back.out", delay: 0.4 });
  gsap.to(star[1].body.scale, { duration: 0.6, x: 1.2, y: 1.2, z: 1.2, ease: "back.out", delay: 0.6 });
  gsap.to(star[2].body.scale, { duration: 0.6, x: 1, y: 1, z: 1, ease: "back.out", delay: 0.8 });
  button[1].lookAt(0, 0, 0);
  gsap.from(button[1].position, { duration: 0.5, x: -1.5, ease: "power1.out", delay: 0.9 });
	gsap.to(button[1].scale, { duration: 0.5, x: 1, y: 1, z: 1, ease: "back.out", delay: 0.9, onComplete: function() { button[1].ready = true } });
}
function hideStartScreen() {
	gameSound[0].play();
	button[8].ready = true;
	gsap.to(button[8].onIcon.material, { duration: 0.5, opacity: 0.4, ease: "power1.inOut" });
	gsap.to(button[1].scale, { duration: 0.15, x: 0.6, y: 0.6, ease: "power1.out", repeat: 1, yoyo: true, onComplete: function() {
		gsap.to(button[1].position, { duration: 0.3, x: 2, ease: "power1.inOut" });
  	gsap.to(button[1].scale, { duration: 0.3, x: 0, y: 0, z: 0, ease: "power1.inOut" });
    for (let i = 0; i < 11; i++) {
		  gsap.to(title[i].scale, { duration: "random(0.3, 0.5)", x: 0, y: 0, z: 0, ease: "back.in", delay: "random(0, 0.3)" });
  	}
	  for (let i = 11; i < 14; i++) {
  		gsap.to(title[i].material, { duration: 0.5, opacity: 0, ease: "power1.inOut", delay: 0.05 * (i - 11) });
  	}
  	gsap.to(portal.scale, { duration: 0.6, x: 0, y: 0, z: 0, ease: "back.in", delay: 0.2 });
    gsap.to(hero[0].scale, { duration: 0.5, x: 0, y: 0, z: 0, ease: "back.in", delay: 0.3 });
    gsap.to(monster[0].scale, { duration: 0.5, x: 0, y: 0, z: 0, ease: "back.in" });
  	gsap.to(gravityPoint[0].scale, { duration: 0.4, x: 0, y: 0, z: 0, ease: "back.in", delay: 0.4 });
    gsap.to(antigravityPoint[0].scale, { duration: 0.4, x: 0, y: 0, z: 0, ease: "back.in", delay: 0.2 });
    gsap.to(star[0].body.scale, { duration: 0.4, x: 0, y: 0, z: 0, ease: "back.in" });
    gsap.to(star[1].body.scale, { duration: 0.4, x: 0, y: 0, z: 0, ease: "back.in", delay: 0.2 });
    gsap.to(star[2].body.scale, { duration: 0.4, x: 0, y: 0, z: 0, ease: "back.in", delay: 0.4 });
    gsap.to(blackFade.material, { duration: 0.8, opacity: 1, ease: "none", onComplete: function() {
    	for (let i = 0; i < 11; i++) {
    		title[i].tween_1.kill();
    		title[i].tween_1 = null;
    		title[i].tween_2.kill();
    		title[i].tween_2 = null;
    		title[i].tween_3.kill();
    		title[i].tween_3 = null;
    		title[i].visible = false;
    	}
    	for (let i = 11; i < 14; i++) {
    	  title[i].visible = false;
    	}
    	button[1].visible = false;
    	hero[0].container.rotation.z = 0;
      if (levelStat.length < 40) {
      	goLevel();
      } else {
      	onPlay = true;
      	goMenu();
      }
      onStart = false;
    } });
	} });
}
function goMenu() {
	if (onPlay) {
		if (onStart) {
			menuContainer.blackFade.material.opacity = 1;
			blackFade.material.opacity = 0;
			updateMenu();
     	menuContainer.visible = true;
     	if (levelStat.length > 0) gsap.to(button[5].icon.material, { duration: 0.5, opacity: 0.4, ease: "power1.inOut", onComplete: function(){ button[5].ready = true } });
  	  gsap.to(menuContainer.blackFade.material, { duration: 0.5, opacity: 0, ease: "power1.inOut", onComplete: function() {
        onSlide = true;
      } });
		} else {
    	gsap.to(menuContainer.blackFade.material, { duration: 0.5, opacity: 1, ease: "power1.inOut", onComplete: function() {
	      onPlay = false;
  	    clearLevel();
	      updateMenu();
      	menuContainer.visible = true;
      	if (levelStat.length > 0) gsap.to(button[5].icon.material, { duration: 0.5, opacity: 0.4, ease: "power1.inOut", onComplete: function(){ button[5].ready = true } });
  	    gsap.to(menuContainer.blackFade.material, { duration: 0.5, opacity: 0, ease: "power1.inOut", onComplete: function() {
          onSlide = true;
      	} });
    	} });
		}
	} else {
	  if (currentLevel == 39) {
	  	button[4].ready = false;
	  	button[2].ready = false;
	  	gsap.to(button[4].scale, { duration: 0.15, x: 0.6, y: 0.6, ease: "power1.out", repeat: 1, yoyo: true, onComplete: function() {
	  	  gsap.to([button[4].scale, button[2].scale], { duration: 0.3, x: 0, y: 0, z: 0, ease: "power1.inOut" });
	    	gsap.to(resultPhrase[currentCatchedStars].material, { duration: 0.4, opacity: 0, ease: "power1.inOut" });
	  	  for (let i = 0; i < currentCatchedStars; i++) {
	    		gsap.to(resultStars.star[i].body.scale, { duration: 0.4, x: 0, y: 0, z: 0, ease: "back.in", delay: 0.1 * i });
	    	}
	    	gsap.to(hero[0].position, { duration: 0.6, y: -10, ease: "power3.in" });
        gsap.to(planet.position, { duration: 0.6, y: -15.9, ease: "power3.in" });
        gsap.to(blackFade.material, { duration: 0.6, opacity: 1, ease: "power1.inOut", onComplete: function() {
		    	planet.sky.material.opacity = 0;
		    	planet.visible = false;
	  	    resultStars.visible = false;
		      button[2].visible = false;
		      button[4].visible = false;
		      hero[0].container.rotation.z = 0;
		      menuContainer.blackFade.material.opacity = 1;
		      blackFade.material.opacity = 0;
		      clearLevel();
	        updateMenu();
        	menuContainer.visible = true;
        	if (levelStat.length > 0) gsap.to(button[5].icon.material, { duration: 0.5, opacity: 0.4, ease: "power1.inOut", onComplete: function(){ button[5].ready = true } });
  	      gsap.to(menuContainer.blackFade.material, { duration: 0.5, opacity: 0, ease: "power1.inOut", onComplete: function() {
            onSlide = true;
        	} });
      	} });
	  	} });
	  } else {
	    button[0].ready = false;
      button[2].ready = false;
    	gsap.to([button[0].scale, button[2].scale], { duration: 0.3, x: 0, y: 0, z: 0, ease: "power1.inOut" });
      gsap.to(resultPhrase[currentCatchedStars].material, { duration: 0.4, opacity: 0, ease: "power1.inOut" });
      for (let i = 0; i < currentCatchedStars; i++) {
    	  gsap.to(resultStars.star[i].body.scale, { duration: 0.4, x: 0, y: 0, z: 0, ease: "back.in", delay: 0.1 * i });
      }
      gsap.to(hero[0].scale, { duration: 0.6, x: 0, y: 0, z: 0, ease: "power2.in" });
      gsap.to(hero[0].position, { duration: 0.6, x: 2.5, ease: "power2.in" });
      gsap.to(hero[0].container.rotation, { duration: 0.6, z: -Math.PI, ease: "power2.in" });
      gsap.to(blackFade.material, { duration: 0.6, opacity: 1, ease: "power1.inOut", onComplete: function() {
		    resultStars.visible = false;
		    button[0].visible = false;
		    button[2].visible = false;
		    hero[0].container.rotation.z = 0;
		    menuContainer.blackFade.material.opacity = 1;
		    blackFade.material.opacity = 0;
		    clearLevel();
	      updateMenu();
      	menuContainer.visible = true;
      	if (levelStat.length > 0) gsap.to(button[5].icon.material, { duration: 0.5, opacity: 0.4, ease: "power1.inOut", onComplete: function(){ button[5].ready = true } });
  	    gsap.to(menuContainer.blackFade.material, { duration: 0.5, opacity: 0, ease: "power1.inOut", onComplete: function() {
          onSlide = true;
      	} });
    	} });
	  }
	}
}
function goClearProgress() {
	gsap.to(button[5].icon.rotation, { duration: 0.5, z: Math.PI * 2, ease: "power1.out", onComplete: function(){ button[5].icon.rotation.z = 0 } });
	gsap.to(button[5].icon.material, { duration: 0.5, opacity: 0, ease: "power1.inOut" });
	onSlide = false;
	hideMenuButton();
	for (let i = 0; i < 2; i++) {
  	gsap.to(askClearProgressPhrase[i].material, { duration: 1, opacity: 1, ease: "power1.in", delay: 0.2 * i });
  }
  gsap.to(menuContainer.blackFade.material, { duration: 0.4, opacity: 0.85, ease: "power1.inOut", onComplete: function() {
  	button[6].lookAt(0, 0, 0);
  	button[7].lookAt(0, 0, 0);
  	gsap.to(button[6].scale, { duration: 0.3, x: 0.65, y: 0.65, z: 0.65, ease: "back.out", onComplete: function() { 
	   	gsap.to(button[7].scale, { duration: 0.3, x: 0.65, y: 0.65, z: 0.65, ease: "back.out", onComplete: function() { 
	    	button[6].ready = true;
  	    button[7].ready = true;
    	} });
  	} });
  } });
}
function cancelClearProgress() {
	gsap.to(button[7].scale, { duration: 0.1, x: 0.4, y: 0.4, ease: "power1.out", repeat: 1, yoyo: true, onComplete: function() {
    gsap.to(button[7].scale, { duration: 0.25, x: 0, y: 0, z: 0, ease: "back.in" });
    gsap.to(button[6].scale, { duration: 0.25, x: 0, y: 0, z: 0, ease: "back.in", delay: 0.05 });
    for (let i = 0; i < 2; i++) {
    	gsap.to(askClearProgressPhrase[i].material, { duration: 0.5, opacity: 0, ease: "power1.in", delay: 0.1 * i });
    }
    gsap.to(button[5].icon.material, { duration: 0.5, opacity: 0.4, ease: "power1.inOut", onComplete: function(){ button[5].ready = true } });
    gsap.to(menuContainer.blackFade.material, { duration: 0.5, opacity: 0, ease: "power1.inOut", onComplete: function() {
      onSlide = true;
    } });
	} });
}
function confirmClearProgress() {
	gsap.to(button[6].scale, { duration: 0.1, x: 0.4, y: 0.4, ease: "power1.out", repeat: 1, yoyo: true, onComplete: function() {
    gsap.to(button[6].scale, { duration: 0.25, x: 0, y: 0, z: 0, ease: "back.in" });
    gsap.to(button[7].scale, { duration: 0.25, x: 0, y: 0, z: 0, ease: "back.in", delay: 0.05 });
    for (let i = 0; i < 2; i++) {
    	gsap.to(askClearProgressPhrase[i].material, { duration: 0.5, opacity: 0, ease: "power1.out", delay: 0.1 * i });
    }
    gsap.to(menuContainer.blackFade.material, { duration: 0.5, opacity: 1, ease: "power1.inOut", onComplete: function() {
      levelStat = [];
      saveProgress();
      currentLevel = 0;
      updateMenu();
      gsap.to(menuContainer.blackFade.material, { duration: 0.5, opacity: 0, ease: "power1.inOut", onComplete: function() {
        onSlide = true;
      } });
    } });
	} });
}
function updateMenu() {
	if (menuContainer.levelTween !== undefined && menuContainer.levelTween !== null) {
		menuContainer.levelTween.kill();
		menuContainer.levelTween = null;
	}
	menuContainer.position.y = -menuContainer.level[currentLevel].position.y;
	for (let i = 0; i < 40; i++) {
		for (let j = 0; j < 3; j++) {
			menuContainer.level[i].star[j].visible = false;
			menuContainer.level[i].star[j].material = menuContainer.levelEmptyStarMaterial;
		}
		menuContainer.level[i].clickableArea.scale.set(1, 1, 1);
		menuContainer.level[i].border.scale.set(1, 1, 1);
		menuContainer.level[i].num.scale.set(1, 1, 1);
		if (i <= levelStat.length) {
			menuContainer.level[i].num.material = menuContainer.levelNumMaterial;
			menuContainer.level[i].clickableArea.scale.set(1, 1, 1);
			menuContainer.level[i].num.visible = true;
			menuContainer.level[i].scale.set(1, 1, 1);
			if (i > 0) {
				menuContainer.level[i].line.visible = true;
				menuContainer.level[i].lock.visible = false;
			}
			if (i < levelStat.length) {
				for (let j = 0; j < 3; j++) {
					menuContainer.level[i].star[j].visible = true;
					if (j < levelStat[i]) menuContainer.level[i].star[j].material = menuContainer.levelStarMaterial;
				}
			}
			if (i == levelStat.length) {
				menuContainer.level[i].num.material = menuContainer.levelCurrentMaterial;
				menuContainer.level[i].clickableArea.scale.x = 1.15;
				menuContainer.level[i].border.scale.x = 1.15;
				menuContainer.level[i].num.scale.x = 1.15;
				menuContainer.levelTween = gsap.to([menuContainer.level[i].clickableArea.scale, menuContainer.level[i].border.scale, menuContainer.level[i].num.scale], { duration: 0.4, x: 1, y: 1.15, ease: "power1.inOut", repeat: -1, yoyo: true });
			}
		} else {
			menuContainer.level[i].clickableArea.scale.set(0, 0, 0);
			menuContainer.level[i].num.visible = false;
			menuContainer.level[i].lock.visible = true;
			menuContainer.level[i].scale.set(0.75, 0.75, 0.75);
			if (i > 0) menuContainer.level[i].line.visible = false;
			
		}
	}
}
function showMenuButton() {
	for (let i = 0; i < 3; i++) {
		gsap.to(button[3].icon[i].material, { duration: 0.3, opacity: 0.4, ease: "power1.inOut", delay: 0.1 * i });
	}
	setTimeout(function() { button[3].ready = true }, 500);
}
function hideMenuButton() {
	button[3].ready = false;
	for (let i = 0; i < 3; i++) {
		gsap.to(button[3].icon[i].material, { duration: 0.3, opacity: 0, ease: "power1.inOut", delay: 0.1 * i });
	}
}
function clearLevel() {
	hero[0].position.y = 100;
	if (portal.moveTween !== undefined && portal.moveTween !== null) {
		portal.moveTween.kill();
		portal.moveTween = null;
	}
	portal.position.y = 100;
	for (let i = 0; i < 3; i++) {
		star[i].position.y = 100;
	}
	for (let j = 0; j < levelData[currentLevel][1].length; j++) {
		gravityPoint[j].position.y = 100;
	}
	for (let j = 0; j < levelData[currentLevel][2].length; j++) {
		antigravityPoint[j].position.y = 100;
	}
	for (let j = 0; j < levelData[currentLevel][5].length; j++) {
		monster[j].position.y = 100;
	}
	if (currentLevel == 0 && hint[1].tween !== undefined && hint[1].tween !== null) {
		for (let i = 0; i < 4; i++) {
			hint[0].line[i].tween.kill();
			hint[0].line[i].tween = null;
			hint[0].line[i].material.opacity = 0;
		}
		hint[1].tween.kill();
		hint[1].tween = null;
		hint[1].material.opacity = 0;
		for (let i = 0; i < 12; i++) {
			hint[2].part[i].tween.kill();
			hint[2].part[i].tween = null;
			hint[2].part[i].material.opacity = 0;
		}
	} else if (currentLevel == 1 && hint[1].tween !== undefined && hint[1].tween !== null) {
		for (let i = 0; i < 2; i++) {
			hint[3].line[i].tween.kill();
			hint[3].line[i].tween = null;
			hint[3].line[i].material.opacity = 0;
		}
		hint[1].tween.kill();
		hint[1].tween = null;
		hint[1].material.opacity = 0;
		for (let i = 0; i < 12; i++) {
			hint[2].part[i].tween.kill();
			hint[2].part[i].tween = null;
			hint[2].part[i].material.opacity = 0;
		}
	}
	for (let i = 0; i < 3; i++) {
		hint[4].line[i].visible = false;
		hint[5].line[i].visible = false;
	}
	if (levelData[currentLevel][4].length > 1) {
	  if (hint[6].tween !== undefined && hint[6].tween !== null) {
	    hint[6].tween.kill();
	    hint[6].tween = null;
	  }
	  if (hint[6].moveTween !== undefined && hint[6].moveTween !== null) {
	  	hint[6].moveTween.kill();
	  	hint[6].moveTween = null;
	  }
	  hint[6].visible = false;
	}
}
function goChooseLevel(chosen) {
	button[5].ready = false;
	gsap.to(button[5].icon.material, { duration: 0.5, opacity: 0, ease: "power1.inOut" });
	gsap.to(menuContainer.level[chosen].scale, { duration: 0.15, x: 0.6, y: 0.6, ease: "power1.out", repeat: 1, yoyo: true, onComplete: function() {
    gsap.to(menuContainer.blackFade.material, { duration: 0.5, opacity: 1, ease: "power1.inOut", onComplete: function() {
      currentLevel = chosen;
      menuContainer.visible = false;
      menuContainer.blackFade.material.opacity = 0;
      blackFade.material.opacity = 1;
      goLevel();
    } });
	} });
}
function goLevel() {
	if (currentLevel == 0) {
		hint[1].rotation.z = 0;
		hint[1].position.set(-0.2, 1.56, -5);
		hint[2].position.set(0.745, 1.56, -5);
		for (let i = 0; i < 4; i++) {
			hint[0].line[i].tween = gsap.to(hint[0].line[i].material, { duration: 1, opacity: 1, ease: "power1.inOut", delay: 0.8 + 0.1 * i });
		}
		hint[1].tween = gsap.to(hint[1].material, { duration: 1, opacity: 1, ease: "power1.inOut", delay: 1 });
    for (let i = 0; i < 12; i++) {
    	hint[2].part[i].tween = gsap.to(hint[2].part[i].material, { duration: 0.5, opacity: 1, ease: "power1.inOut", delay: 0.8 + 0.05 * i });
    }
	} else if (currentLevel == 1) {
		hint[1].rotation.z = Math.PI;
		hint[1].position.set(0.08, -1.4, -5);
		hint[2].position.set(-0.745, -1.4, -5);
		for (let i = 0; i < 2; i++) {
			hint[3].line[i].tween = gsap.to(hint[3].line[i].material, { duration: 1, opacity: 1, ease: "power1.inOut", delay: 0.8 + 0.1 * i });
		}
		hint[1].tween = gsap.to(hint[1].material, { duration: 1, opacity: 1, ease: "power1.inOut", delay: 1 });
		for (let i = 0; i < 12; i++) {
			hint[2].part[i].tween = gsap.to(hint[2].part[i].material, { duration: 0.5, opacity: 1, ease: "power1.inOut", delay: 0.8 + 0.05 * i });
		}
	} else if (currentLevel == 6) {
		
		for (let i = 0; i < 3; i++) {
			hint[4].line[i].visible = true;
			gsap.to(hint[4].line[i].material, { duration: 1, opacity: 1, ease: "power1.inOut", delay: 0.8 + 0.1 * i });
		}
		setTimeout(function() {
			for (let i = 0; i < 3; i++) {
				
			  gsap.to(hint[4].line[i].material, { duration: 1, opacity: 0, ease: "power1.inOut", delay: 0.8 + 0.1 * i, onComplete: function() { hint[4].line[i].visible = false } });
			}
		}, 2500)
	} else if (currentLevel == 4) {
		for (let i = 0; i < 3; i++) {
			hint[5].line[i].visible = true;
	    gsap.to(hint[5].line[i].material, { duration: 1, opacity: 1, ease: "power1.inOut", delay: 0.8 + 0.1 * i });
		}
		setTimeout(function() {
			for (let i = 0; i < 3; i++) {
				gsap.to(hint[5].line[i].material, { duration: 1, opacity: 0, ease: "power1.inOut", delay: 0.8 + 0.1 * i, onComplete: function() { hint[5].line[i].visible = false } });
			}
		}, 2500)
	}
	for (let i = 0; i < gravityPoint.length; i++) {
		for (let j = 0; j < 10; j++) {
			gravityPoint[i].tween[j].pause();
		}
		gravityPoint[i].children[0].children[0].scale.set(1, 1, 1);
    gravityPoint[i].children[0].children[1].rotation.set(0, 0, 0);
    gravityPoint[i].children[0].children[2].rotation.set(0, 0, 0);
    gravityPoint[i].children[0].children[0].material.color = gravityColor;
    gravityPoint[i].children[0].children[1].children[1].material.color = gravityBulbColor;
    gravityPoint[i].children[0].children[2].children[1].material.color = gravityBulbColor;
		gravityPoint[i].active = false;
		gravityPoint[i].scale.set(0, 0, 0);
		gravityPoint[i].children[2].scale.set(0, 0, 1);
	}
	for (let i = 0; i < antigravityPoint.length; i++) {
		for (let j = 0; j < 10; j++) {
			antigravityPoint[i].tween[j].pause();
		}
		antigravityPoint[i].children[0].children[0].scale.set(1, 1, 1);
    antigravityPoint[i].children[0].children[4].rotation.set(0, 0, 0);
    antigravityPoint[i].children[0].children[1].position.y = 0.66;
    antigravityPoint[i].children[0].children[2].position.y = -0.66;
    antigravityPoint[i].children[0].children[0].material.color = antigravityColor;
    antigravityPoint[i].children[0].children[1].material.color = antigravityBulbColor;
    antigravityPoint[i].children[0].children[2].material.color = antigravityBulbColor;
    antigravityPoint[i].children[0].children[4].children[1].material.color = antigravityBulbColor;
		antigravityPoint[i].active = false;
		antigravityPoint[i].scale.set(0, 0, 0);
		antigravityPoint[i].children[2].scale.set(0, 0, 1);
	}
	hero[0].oldSpeed.x = 0;
	hero[0].oldSpeed.y = 0;
	hero[0].newSpeed.x = 0;
	hero[0].newSpeed.y = 0;
	if (hero[0].hold) {
  	hero[0].tween_1.play();
  	hero[0].tween_2.play();
  	hero[0].tween_3.play();
	}
	hero[0].scale.set(0, 0, 0);
	for (let i = 0; i < levelData[currentLevel][0].length; i++) {
		hero[i].position.set(levelData[currentLevel][0][i][0], levelData[currentLevel][0][i][1], -15);
		gsap.to(hero[i].scale, { duration: 1.5, x: 1, y: 1, z: 1, ease: "back.out", delay: 0.2 });
	  gsap.from(hero[i].container.rotation, { duration: 1.5, z: Math.PI * 2, ease: "back.out", delay: 0.2 });
	}
	enterPortal.position.set(levelData[currentLevel][0][0][0], levelData[currentLevel][0][0][1], -16);
  for (let j = 0; j < 48; j++) {
    enterPortal.particle[j].posTween.play();
    enterPortal.particle[j].scaleTween.play();
    enterPortal.particle[j].rotTween.play();
  }
  enterPortal.visible = true;
  gameSound[5].play();
  gsap.to(enterPortal.scale, { duration: 0.6, x: 1, y: 1, z: 1, ease: "power3.out", repeat: 1, yoyo: true, onComplete: function() {
    enterPortal.visible = false;
    for (let j = 0; j < 48; j++) {
      enterPortal.particle[j].posTween.pause();
      enterPortal.particle[j].scaleTween.pause();
      enterPortal.particle[j].rotTween.pause();
    }
  } });
	for (let i = 0; i < levelData[currentLevel][1].length; i++) {
		gravityPoint[i].position.set(levelData[currentLevel][1][i][0], levelData[currentLevel][1][i][1], -16);
		gsap.to(gravityPoint[i].scale, { duration: 0.6, x: 1, y: 1, z: 1, ease: "back.out", delay: 0.4 + Math.random() * 0.6 });
	}
	for (let i = 0; i < levelData[currentLevel][2].length; i++) {
		antigravityPoint[i].position.set(levelData[currentLevel][2][i][0], levelData[currentLevel][2][i][1], -16);
		gsap.to(antigravityPoint[i].scale, { duration: 0.6, x: 1, y: 1, z: 1, ease: "back.out", delay: 0.4 + Math.random() * 0.6 });
	}
	for (let i = 0; i < monster.length; i++) {
		monster[i].scale.set(0, 0, 0);
	}
	for (let i = 0; i < levelData[currentLevel][5].length; i++) {
	  monster[i].position.set(levelData[currentLevel][5][i][0], levelData[currentLevel][5][i][1], -16);
		gsap.to(monster[i].scale, { duration: 0.6, x: 1, y: 1, z: 1, ease: "back.out", delay: 0.4 + Math.random() * 0.6 });
	}
	if (portal.moveTween !== undefined && portal.moveTween !== null) {
		portal.moveTween.kill();
		portal.moveTween = null;
	}
	portal.scale.set(0, 0, 0);
	portal.position.set(levelData[currentLevel][4][0][0], levelData[currentLevel][4][0][1], -16);
	gsap.to(portal.scale, { duration: 1, x: 1, y: 1, z: 1, ease: "power1.out", delay: 0.6 });
  if (levelData[currentLevel][4].length > 1) {
  	hint[6].material.opacity = 0;
  	hint[6].visible = true;
  	hint[6].position.set(levelData[currentLevel][4][0][0], levelData[currentLevel][4][0][1], -16.1);
    if (hint[6].moveTween !== undefined && hint[6].moveTween !== null) {
    	hint[6].moveTween.kill();
    	hint[6].moveTween = null;
    }
  	hint[6].moveTween = gsap.timeline({ repeat: levelData[currentLevel][4][2], delay: 0.6 });
  	for (let i = 0; i < levelData[currentLevel][4][1].length; i++) {
  		hint[6].moveTween.to(hint[6].position, { duration: levelData[currentLevel][4][1][i][2], x: levelData[currentLevel][4][1][i][0], y: levelData[currentLevel][4][1][i][1], ease: "power1.inOut", repeat: levelData[currentLevel][4][1][i][3], yoyo: levelData[currentLevel][4][1][i][4] });
  	}
  	hint[6].tween = gsap.to(hint[6].material, { duration: 0.5, opacity: 0.5, ease: "none", delay: 0.6 });
  }
	for (let i = 0; i < 3; i++) {
		star[i].body.scale.set(0, 0, 0);
		star[i].position.set(levelData[currentLevel][3][i][0], levelData[currentLevel][3][i][1], -16);
		gsap.to(star[i].body.scale, { duration: 0.5, x: 1, y: 1, z: 1, ease: "back.out", delay: 0.4 + 0.2 * i });
	}
	gsap.to(blackFade.material, { duration: 1, opacity: 0, ease: "none" });
  currentCatchedStars = 0;
	onPlay = true;
	showMenuButton();
}
function activatePoint(object) {
	if (levelData[currentLevel][4].length > 1 && (portal.moveTween === undefined || portal.moveTween === null)) {
		portal.moveTween = gsap.timeline({ repeat: levelData[currentLevel][4][2] });
		for (let i = 0; i < levelData[currentLevel][4][1].length; i++) {
			portal.moveTween.to(portal.position, { duration: levelData[currentLevel][4][1][i][2], x: levelData[currentLevel][4][1][i][0], y: levelData[currentLevel][4][1][i][1], ease: "power1.inOut", repeat: levelData[currentLevel][4][1][i][3], yoyo: levelData[currentLevel][4][1][i][4] });
		}
	}
	if (levelData[currentLevel][4].length > 1 && hint[6].tween !== undefined && hint[6].tween !== null) {
	  hint[6].tween.kill();
	  hint[6].tween = null;
		gsap.to(hint[6].material, { duration: 0.5, opacity: 0, ease: "none", onComplete: function() {
			hint[6].moveTween.kill();
			hint[6].moveTween = null;
			hint[6].visible = false;
		} });
	}
	if (currentLevel == 0 && hint[1].tween !== undefined && hint[1].tween !== null) {
		for (let i = 0; i < 4; i++) {
			hint[0].line[i].tween.kill();
			hint[0].line[i].tween = null;
		  gsap.to(hint[0].line[i].material, { duration: 1, opacity: 0, ease: "power1.inOut", delay: 0.1 * i });
		}
		hint[1].tween.kill();
		hint[1].tween = null;
		gsap.to(hint[1].material, { duration: 1, opacity: 0, ease: "power1.inOut" });
		for (let i = 0; i < 12; i++) {
			hint[2].part[i].tween.kill();
			hint[2].part[i].tween = null;
			gsap.to(hint[2].part[i].material, { duration: 0.5, opacity: 0, ease: "power1.inOut", delay: 0.05 * i });
		}
	} else if (currentLevel == 1 && hint[1].tween !== undefined && hint[1].tween !== null) {
		for (let i = 0; i < 2; i++) {
			hint[3].line[i].tween.kill();
			hint[3].line[i].tween = null;
			gsap.to(hint[3].line[i].material, { duration: 1, opacity: 0, ease: "power1.inOut", delay: 0.1 * i });
		}
		hint[1].tween.kill();
		hint[1].tween = null;
		gsap.to(hint[1].material, { duration: 1, opacity: 0, ease: "power1.inOut" });
		for (let i = 0; i < 12; i++) {
			hint[2].part[i].tween.kill();
			hint[2].part[i].tween = null;
			gsap.to(hint[2].part[i].material, { duration: 0.5, opacity: 0, ease: "power1.inOut", delay: 0.05 * i });
		}
	}
	object.children[1].scale.set(0, 0, 0);
	object.active = true;
	gsap.to(object.children[0].scale, { duration: 0.1, x: 0.8, y: 0.8, ease: "power1.out", repeat: 1, yoyo: true });
	gsap.to(object.children[2].scale, { duration: 0.3, x: 1, y: 1, ease: "power1.out", onComplete: function() { object.children[1].scale.set(1, 1, 1) } });
	for (let i = 0; i < 10; i++) {
		object.tween[i].restart();
	}
	for (let j = 3; j < 19; j++) {
		object.children[j].position.set(0, 0, 0);
		const sparkleAngle = Math.random() * Math.PI * 2;
		const sparkleTime = 0.2 + Math.random() * 0.2;
		const sparkleDist = 0.8 + Math.random() * 1.2;
		gsap.fromTo(object.children[j].scale, { x: 0, y: 0 }, { duration: sparkleTime, x: 1.5, y: 1.5, ease: "power1.in", repeat: 1, yoyo: true });
		gsap.fromTo(object.children[j].position, { x: 0, y: 0 }, { duration: sparkleTime, x: sparkleDist * Math.cos(sparkleAngle), y: sparkleDist * Math.sin(sparkleAngle), ease: "none" });
	}
}
function deactivateGravity(object, sparkle) {
	object.children[1].scale.set(0, 0, 0);
	object.active = false;
	gsap.to(object.children[0].scale, { duration: 0.1, x: 0.8, y: 0.8, ease: "power1.out", repeat: 1, yoyo: true });
	for (let i = 0; i < 10; i++) {
		object.tween[i].pause();
	}
	if (sparkle) {
  	for (let j = 3; j < 19; j++) {
		  object.children[j].position.set(0, 0, 0);
		  const sparkleAngle = Math.random() * Math.PI * 2;
		  const sparkleTime = 0.2 + Math.random() * 0.2;
		  const sparkleDist = 0.8 + Math.random() * 1.2;
      gsap.fromTo(object.children[j].scale, { x: 0, y: 0 }, { duration: sparkleTime, x: 1.5, y: 1.5, ease: "power1.in", repeat: 1, yoyo: true });
      gsap.fromTo(object.children[j].position, { x: 0, y: 0 }, { duration: sparkleTime, x: sparkleDist * Math.cos(sparkleAngle), y: sparkleDist * Math.sin(sparkleAngle), ease: "none" });
  	}
	}
	gsap.to(object.children[2].scale, { duration: 0.3, x: 0, y: 0, ease: "power1.in" });
	gsap.to([object.children[0].children[1].rotation, object.children[0].children[2].rotation], { duration: 0.3, x: 0, y: 0, z: 0, ease: "power1.inOut" });
  gsap.to(object.children[0].children[0].scale, { duration: 0.3, x: 1, y: 1, ease: "power1.inOut" });
  gsap.to(object.children[0].children[0].material.color, { duration: 0.3, r: gravityColor.r, g: gravityColor.g, b: gravityColor.b, ease: "power1.inOut" });
  gsap.to([object.children[0].children[1].children[1].material.color, object.children[0].children[2].children[1].material.color], { duration: 0.3, r: gravityBulbColor.r, g: gravityBulbColor.g, b: gravityBulbColor.b, ease: "power1.inOut", onComplete: function() { object.children[1].scale.set(1, 1, 1) } });
}
function deactivateAntigravity(object, sparkle) {
	object.children[1].scale.set(0, 0, 0);
	object.active = false;
	gsap.to(object.children[0].scale, { duration: 0.1, x: 0.8, y: 0.8, ease: "power1.out", repeat: 1, yoyo: true });
	for (let i = 0; i < 10; i++) {
		object.tween[i].pause();
	}
	if (sparkle) {
	  for (let j = 3; j < 19; j++) {
		  object.children[j].position.set(0, 0, 0);
		  const sparkleAngle = Math.random() * Math.PI * 2;
	  	const sparkleTime = 0.2 + Math.random() * 0.2;
	  	const sparkleDist = 0.8 + Math.random() * 1.2;
	  	gsap.fromTo(object.children[j].scale, { x: 0, y: 0 }, { duration: sparkleTime, x: 1.5, y: 1.5, ease: "power1.in", repeat: 1, yoyo: true });
		  gsap.fromTo(object.children[j].position, { x: 0, y: 0 }, { duration: sparkleTime, x: sparkleDist * Math.cos(sparkleAngle), y: sparkleDist * Math.sin(sparkleAngle), ease: "none" });
  	}
	}
	gsap.to(object.children[2].scale, { duration: 0.3, x: 0, y: 0, ease: "power1.in" });
  gsap.to(object.children[0].children[0].scale, { duration: 0.3, x: 1, y: 1, ease: "power1.inOut" });
	gsap.to(object.children[0].children[4].rotation, { duration: 0.3, x: 0, y: 0, z: 0, ease: "power1.inOut" });
  gsap.to(object.children[0].children[1].position, { duration: 0.3, y: 0.66, ease: "power1.inOut" });
  gsap.to(object.children[0].children[2].position, { duration: 0.3, y: -0.66, ease: "power1.inOut" });
  gsap.to(object.children[0].children[0].material.color, { duration: 0.3, r: antigravityColor.r, g: antigravityColor.g, b: antigravityColor.b, ease: "power1.inOut" });
	gsap.to([object.children[0].children[1].material.color, object.children[0].children[2].material.color, object.children[0].children[4].children[1].material.color], { duration: 0.3, r: antigravityBulbColor.r, g: antigravityBulbColor.g, b: antigravityBulbColor.b, ease: "power1.inOut", onComplete: function() { object.children[1].scale.set(1, 1, 1) } });
}
function getStar(object) {
	gameSound[4].play();
	currentCatchedStars++;
	gsap.to(star[object].body.scale, { duration: 0.2, x: 0, y: 0, z: 0, ease: "back.in", onComplete: function() {
		for (let j = 0; j < 12; j++) {
			star[object].sparkle[j].position.set(star[object].position.x, star[object].position.y, -16);
			const sparkleAngle = Math.random() * Math.PI * 2;
			const sparkleTime = 0.2 + Math.random() * 0.5;
			const sparkleDist = 0.4 + Math.random() * 1.6;
			gsap.to(star[object].sparkle[j].scale, { duration: sparkleTime * 0.5, x: "random(6, 8)", y: "random(6, 8)", ease: "none", repeat: 1, yoyo: true });
			gsap.to(star[object].sparkle[j].position, { duration: sparkleTime, x: star[object].sparkle[j].position.x + sparkleDist * Math.cos(sparkleAngle), y: star[object].sparkle[j].position.y + sparkleDist * Math.sin(sparkleAngle), ease: "power2.out" });
		}
	} });
}
function goEndLevel() {
	if (levelStat.length < currentLevel + 1) {
  	levelStat.push(currentCatchedStars);
	} else {
		if (levelStat[currentLevel] < currentCatchedStars) levelStat[currentLevel] = currentCatchedStars;
	}
	saveProgress();
	onPlay = false;
	hero[0].position.set(0, 0, -7);
	button[2].visible = true;
	button[2].icon.rotation.z = 0;
	button[2].lookAt(0, 0, 0);
	if (currentLevel == 39) {
		hero[0].hold = true;
  	hero[0].tween_1.pause();
  	hero[0].tween_2.pause();
  	hero[0].tween_3.pause();
  	hero[0].rotation.set(0, 0, 0);
  	planet.visible = true;
  	enterPortal.position.set(0, 2.3, -8);
  	enterPortal.visible = true;
    for (let j = 0; j < 48; j++) {
    	enterPortal.particle[j].posTween.play();
    	enterPortal.particle[j].scaleTween.play();
    	enterPortal.particle[j].rotTween.play();
    }
    gsap.to(enterPortal.scale, { duration: 0.4, x: 0.8, y: 0.8, z: 0.8, ease: "power1.out", repeat: 1, yoyo: true, onComplete: function() {
      enterPortal.visible = false;
      for (let j = 0; j < 48; j++) {
      	enterPortal.particle[j].posTween.pause();
      	enterPortal.particle[j].scaleTween.pause();
      	enterPortal.particle[j].rotTween.pause();
      }
    } });
  	gsap.to(planet.position, { duration: 1, y: -5.9, ease: "power2.out" });
    gsap.from(hero[0].position, { duration: 1, y: 1.5, ease: "power1.out" });
    gsap.to(planet.sky.material, { duration: 1, opacity: 0.7, ease: "none", onComplete: function() {
	  	gsap.from(resultPhrase[currentCatchedStars].scale, { duration: 0.4, x: 0, y: 0, ease: "back.out" });
	    gsap.to(resultPhrase[currentCatchedStars].material, { duration: 0.4, opacity: 1, ease: "power1.in", onComplete: function() {
	    	button[2].position.x = -0.35;
	    	button[4].visible = true;
  	  	button[4].lookAt(0, 0, 0);
	    	gsap.to(button[2].scale, { duration: 0.4, x: 1, y: 1, z: 1, ease: "back.out", onComplete: function() { 
	  	  	gsap.to(button[4].scale, { duration: 0.4, x: 1, y: 1, z: 1, ease: "back.out", onComplete: function() { 
	    	  	button[4].ready = true;
  	  	  	button[2].ready = true;
	  	  	} });
	    	} });
  	  } });
  	} });
	} else {
		gsap.from(hero[0].position, { duration: 1, x: -1.5, ease: "power1.out" });
    gsap.to(blackFade.material, { duration: 1, opacity: 0.7, ease: "none", onComplete: function() {
	  	gsap.from(resultPhrase[currentCatchedStars].scale, { duration: 0.4, x: 0, y: 0, ease: "back.out" });
	    gsap.to(resultPhrase[currentCatchedStars].material, { duration: 0.4, opacity: 1, ease: "power1.in", onComplete: function() {
	    	button[0].position.x = 0.35;
	    	button[2].position.x = -0.5;
	    	button[0].lookAt(0, 0, 0);
  	  	button[0].visible = true;
	  	  gsap.from(button[0].position, { duration: 0.4, x: -1, ease: "power1.out" });
	    	gsap.to(button[0].scale, { duration: 0.4, x: 1, y: 1, z: 1, ease: "back.out", onComplete: function() { 
	    		showMenuButton();
	  	  	gsap.to(button[2].scale, { duration: 0.4, x: 1, y: 1, z: 1, ease: "back.out", onComplete: function() { 
	    	  	button[0].ready = true;
  	  	  	button[2].ready = true;
	  	  	} });
	    	} });
  	  } });
  	} });
	}
	gameSound[10].play();
	gameSound[7].play();
  gsap.from(hero[0].container.rotation, { duration: 1, z: Math.PI, ease: "back.out" });
  gsap.to(hero[0].scale, { duration: 1, x: 1, y: 1, z: 1, ease: "back.out", onComplete: function() { 
  } });
  if (currentCatchedStars == 1) {
  	resultStars.rotation.z = -Math.PI / 8;
  } else if (currentCatchedStars == 2) {
  	resultStars.rotation.z = -Math.PI / 16;
  } else {
  	resultStars.rotation.z = 0;
  }
	resultStars.visible = true;
  for (let i = 0; i < currentCatchedStars; i++) {
  	for (let j = 0; j < 16; j++) {
  		resultStars.star[i].sparkle[j].position.set(resultStars.star[i].position.x, resultStars.star[i].position.y, -0.05);
  		const sparkleAngle = Math.random() * Math.PI * 2;
  		const sparkleTime = 0.4 + Math.random() * 0.5;
  		const sparkleDist = 0.3 + Math.random() * 0.7;
  		gsap.to(resultStars.star[i].sparkle[j].scale, { duration: sparkleTime * 0.5, x: "random(2, 4)", y: "random(2, 4)", ease: "none", repeat: 1, yoyo: true, delay: 0.3 + 0.3 * i });
  		gsap.to(resultStars.star[i].sparkle[j].position, { duration: sparkleTime, x: resultStars.star[i].sparkle[j].position.x + sparkleDist * Math.cos(sparkleAngle), y: resultStars.star[i].sparkle[j].position.y + sparkleDist * Math.sin(sparkleAngle), ease: "power2.out", delay: 0.3 + 0.3 * i });
  	}
  	gsap.to(resultStars.star[i].body.scale, { duration: 0.7, x: 1, y: 1, z: 1, ease: "back.out", delay: 0.3 + 0.3 * i, onStart: function() { gameSound[6].play() } });
  }
}
function goNextLevel() {
	hideMenuButton();
	gsap.to(button[0].scale, { duration: 0.15, x: 0.6, y: 0.6, ease: "power1.out", repeat: 1, yoyo: true, onComplete: function() {
		gsap.to(button[0].position, { duration: 0.3, x: 2, ease: "power1.inOut" });
    gsap.to(button[2].scale, { duration: 0.3, x: 0, y: 0, z: 0, ease: "back.in" });
  	gsap.to(button[0].scale, { duration: 0.3, x: 0, y: 0, z: 0, ease: "power1.inOut" });
    gsap.to(resultPhrase[currentCatchedStars].material, { duration: 0.4, opacity: 0, ease: "power1.inOut" });
    for (let i = 0; i < currentCatchedStars; i++) {
    	gsap.to(resultStars.star[i].body.scale, { duration: 0.4, x: 0, y: 0, z: 0, ease: "back.in", delay: 0.1 * i });
    }
    gsap.to(hero[0].scale, { duration: 0.6, x: 0, y: 0, z: 0, ease: "power2.in" });
    gsap.to(hero[0].position, { duration: 0.6, x: 2.5, ease: "power2.in" });
    gsap.to(hero[0].container.rotation, { duration: 0.6, z: -Math.PI, ease: "power2.in" });
    gsap.to(blackFade.material, { duration: 0.6, opacity: 1, ease: "power1.inOut", onComplete: function() {
		  resultStars.visible = false;
		  button[0].visible = false;
		  button[2].visible = false;
		  hero[0].container.rotation.z = 0;
		  currentLevel++;
  		goLevel();
  	} });
	} });
}
function goRestartLevel() {
	hideMenuButton();
	gsap.to(button[2].icon.rotation, { duration: 0.3, z: Math.PI * 2, ease: "power1.inOut" });
	gsap.to(button[2].scale, { duration: 0.15, x: 0.6, y: 0.6, ease: "power1.out", repeat: 1, yoyo: true, onComplete: function() {
    gsap.to(button[2].scale, { duration: 0.3, x: 0, y: 0, z: 0, ease: "back.in" });
  	if (currentLevel == 39) {
  		gsap.to(button[4].scale, { duration: 0.3, x: 0, y: 0, z: 0, ease: "back.in", delay: 0.1 });
      gsap.to(hero[0].position, { duration: 0.6, y: -10, ease: "power3.in" });
      gsap.to(planet.position, { duration: 0.6, y: -15.9, ease: "power3.in" });
  	} else {
  		gsap.to(button[0].scale, { duration: 0.3, x: 0, y: 0, z: 0, ease: "back.in", delay: 0.1 });
  		gsap.to(hero[0].position, { duration: 0.6, x: 2.5, ease: "power2.in" });
      gsap.to(hero[0].container.rotation, { duration: 0.6, z: -Math.PI, ease: "power2.in" });
      gsap.to(hero[0].scale, { duration: 0.6, x: 0, y: 0, z: 0, ease: "power2.in" });
  	}
    gsap.to(resultPhrase[currentCatchedStars].material, { duration: 0.4, opacity: 0, ease: "power1.inOut" });
    for (let i = 0; i < currentCatchedStars; i++) {
    	gsap.to(resultStars.star[i].body.scale, { duration: 0.4, x: 0, y: 0, z: 0, ease: "back.in", delay: 0.1 * i });
    }
    gsap.to(blackFade.material, { duration: 0.6, opacity: 1, ease: "power1.inOut", onComplete: function() {
		  if (currentLevel == 39) {
		  	planet.sky.material.opacity = 0;
		  	planet.visible = false;
		  }
		  resultStars.visible = false;
		  button[0].visible = false;
		  button[2].visible = false;
		  button[4].visible = false;
		  hero[0].container.rotation.z = 0;
		  goLevel();
  	} });
	} });
}
function goBoom(object) {
	gameSound[3].play();
	gameSound[2].play();
	onPlay = false;
  explosion.position.set(object.position.x, object.position.y, -16.5);
  gsap.to(object.scale, { duration: 0.3, x: 1.3, y: 1.3, z: 1.3, ease: "back.inOut", repeat: 1, yoyo: true });
	gsap.to(explosion.scale, { duration: 0.2, x: 80, y: 80, ease: "back.out", repeat: 1, yoyo: true });
  for (let j = 0; j < 48; j++) {
  	explosion.particle[j].position.set(object.position.x, object.position.y, -16.5);
  	const sparkleAngle = Math.random() * Math.PI * 2;
  	const sparkleTime = 0.3 + Math.random() * 0.7;
  	const sparkleDist = 1.5 + Math.random() * 2;
  	gsap.to(explosion.particle[j].scale, { duration: sparkleTime * 0.5, x: 1, y: 1, ease: "none", repeat: 1, yoyo: true });
  	gsap.to(explosion.particle[j].position, { duration: sparkleTime, x: explosion.particle[j].position.x + sparkleDist * Math.cos(sparkleAngle), y: explosion.particle[j].position.y + sparkleDist * Math.sin(sparkleAngle), ease: "power2.out" });
  }
  hero[0].pupil[0].visible = false;
  hero[0].pupil[1].visible = false;
  hero[0].helmet.glass.visible = false;
  hero[0].helmet.antenna.visible = false;
  hero[0].helmet.bulb.visible = false;
  hero[0].deadEyes.visible = true;
  hero[0].helmet.deadGlass.visible = true;
  hero[0].helmet.brokenAntenna.visible = true;
  hero[0].helmet.deadBulb.visible = true;
  gsap.to(hero[0].scull.material.color, { duration: 2, r: deadSkinMaterial.r, g: deadSkinMaterial.g, b: deadSkinMaterial.b, ease: "power1.inOut" });
  hero[0].headTween_1.pause();
  hero[0].headTween_2.pause();
  hero[0].headTween_3.pause();
  for (let j = 0; j < levelData[currentLevel][1].length; j++) {
  	if (gravityPoint[j].active) deactivateGravity(gravityPoint[j], false);
  }
  for (let j = 0; j < levelData[currentLevel][2].length; j++) {
  	if (antigravityPoint[j].active) deactivateAntigravity(antigravityPoint[j], false);
  }
  gsap.to(hero[0].position, { duration: 1.5, x: hero[0].position.x + 0.6 * Math.cos(new THREE.Vector2(hero[0].position.x - object.position.x, hero[0].position.y - object.position.y).angle()), y: hero[0].position.y + 0.6 * Math.sin(new THREE.Vector2(hero[0].position.x - object.position.x, hero[0].position.y - object.position.y).angle()), ease: "power3.out" });
  goLost();
}
function goLost() {
	hideMenuButton();
	deadHero[0].position.set(0, 0, -7);
  deadHero[0].visible = true;
  deadHero[0].container.rotation.z = 0;
  gsap.to(deadHero[0].scale, { duration: 0.7, x: 1, y: 1, z: 1, ease: "back.out", delay: 0.5 });
  gsap.from(deadHero[0].position, { duration: 0.7, x: -1.5, ease: "power1.out", delay: 0.5 });
  gsap.from(deadHero[0].container.rotation, { duration: 0.7, z: Math.PI * 0.5, ease: "back.out", delay: 0.5 });
  gsap.from(lostPhrase.scale, { duration: 0.4, x: 0, y: 0, ease: "back.out", delay: 0.7 });
  gsap.to(lostPhrase.material, { duration: 0.4, opacity: 1, ease: "power1.in", delay: 0.7 });
  gsap.to(blackFade.material, { duration: 1.5, opacity: 0.8, ease: "power1.inOut", onComplete: function() {
  	gsap.to(lostPhrase.material, { duration: 0.6, opacity: 0, ease: "power1.inOut" });
  	gsap.to(deadHero[0].scale, { duration: 0.6, x: 0, y: 0, z: 0, ease: "power2.in" });
    gsap.to(deadHero[0].position, { duration: 0.6, x: 2.5, ease: "power2.in" });
    gsap.to(deadHero[0].container.rotation, { duration: 0.6, z: -Math.PI, ease: "power2.in" });
  	gsap.to(blackFade.material, { duration: 0.5, opacity: 1, ease: "none", onComplete: function() {
  	  updateLevel();
  	  showMenuButton();
  	  onPlay = true;
  	  gsap.to(blackFade.material, { duration: 0.5, opacity: 0, ease: "none" });
    } });
  } });
}
function updateLevel() {
	currentCatchedStars = 0;
	hero[0].oldSpeed.x = 0;
	hero[0].oldSpeed.y = 0;
	hero[0].newSpeed.x = 0;
	hero[0].newSpeed.y = 0;
	hero[0].scale.set(1, 1, 1);
	for (let i = 0; i < levelData[currentLevel][0].length; i++) {
		hero[i].position.set(levelData[currentLevel][0][i][0], levelData[currentLevel][0][i][1], -15);
	  hero[i].pupil[0].visible = true;
    hero[i].pupil[1].visible = true;
    hero[i].helmet.glass.visible = true;
    hero[i].helmet.antenna.visible = true;
    hero[i].helmet.bulb.visible = true;
    hero[i].deadEyes.visible = false;
    hero[i].helmet.deadGlass.visible = false;
    hero[i].helmet.brokenAntenna.visible = false;
    hero[i].helmet.deadBulb.visible = false;
    hero[i].scull.material.color.set(0xFEB186);
	}
	if (portal.moveTween !== undefined && portal.moveTween !== null) {
		portal.moveTween.kill();
		portal.moveTween = null;
		portal.position.set(levelData[currentLevel][4][0][0], levelData[currentLevel][4][0][1], -16);
	}
	portal.scale.set(1, 1, 1);
	if (levelData[currentLevel][4].length > 1) {
	  if (hint[6].tween !== undefined && hint[6].tween !== null) {
	    hint[6].tween.kill();
	    hint[6].tween = null;
	  }
	  hint[6].visible = true;
		hint[6].position.set(levelData[currentLevel][4][0][0], levelData[currentLevel][4][0][1], -16.1);
  	hint[6].moveTween = gsap.timeline({ repeat: levelData[currentLevel][4][2] });
  	for (let i = 0; i < levelData[currentLevel][4][1].length; i++) {
  		hint[6].moveTween.to(hint[6].position, { duration: levelData[currentLevel][4][1][i][2], x: levelData[currentLevel][4][1][i][0], y: levelData[currentLevel][4][1][i][1], ease: "power1.inOut", repeat: levelData[currentLevel][4][1][i][3], yoyo: levelData[currentLevel][4][1][i][4] });
  	}
  	hint[6].tween = gsap.to(hint[6].material, { duration: 0.5, opacity: 0.5, ease: "none", delay: 0.6 });
	}
	for (let i = 0; i < 3; i++) {
		star[i].body.scale.set(1, 1, 1);
	}
}
let onSlide = false;
let oldDeltaY = 0;
let hammertime = new Hammer(document.body);
hammertime.get('pan').set({ enable: true });
hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
hammertime.on('pan', function(event) {
	if (onSlide) {
		menuContainer.position.y += oldDeltaY - event.deltaY * (Math.tan(mainCamera.fov * Math.PI / 360) * 10 / document.body.clientHeight);
		oldDeltaY = event.deltaY * (Math.tan(mainCamera.fov * Math.PI / 360) * 10 / document.body.clientHeight);
	}
	if (event.eventType == 4) {
		oldDeltaY = 0;
		let slideTo = -event.velocityY * 1.5;
		if (menuContainer.position.y + slideTo > 0) slideTo = 0 - menuContainer.position.y;
		if (menuContainer.position.y + slideTo < -17.55) slideTo = -17.55 - menuContainer.position.y;

    menuContainer.slideTween = gsap.to(menuContainer.position, { duration: 0.7, y: menuContainer.position.y + slideTo, ease: "power1.out" });
	}
});
let onTouch = false;
const raycaster = new THREE.Raycaster(), mouse = new THREE.Vector2();
function onDocumentTouchStart(event) {
  event.preventDefault();
  onTouch = true;
  if (onSlide && menuContainer.slideTween !== undefined && menuContainer.slideTween !== null) {
  	menuContainer.slideTween.kill();
  	menuContainer.slideTween = null;
  }
  mouse.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, mainCamera);
  if (event.touches.length == 1 && !onHold) checkUserAction();
}
function onDocumentMouseDown(event) {
	event.preventDefault();
	if (!onTouch && !onHold) {
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
		raycaster.setFromCamera(mouse, mainCamera);
		checkUserAction(raycaster);
	}
}
function checkUserAction() {
	if (onPlay) {
  	for (let i = 0; i < gravityPoint.length; i++) {
  	  if (raycaster.intersectObject(gravityPoint[i].clickableArea).length > 0) {
        if (gravityPoint[i].active) {
        	gameSound[9].play();
        	deactivateGravity(gravityPoint[i], true);
        } else {
        	gameSound[8].play();
        	activatePoint(gravityPoint[i]);
        }
        break;
    	}
  	}
  	for (let i = 0; i < antigravityPoint.length; i++) {
  		if (raycaster.intersectObject(antigravityPoint[i].clickableArea).length > 0) {
  			if (antigravityPoint[i].active) {
        	gameSound[9].play();
	        deactivateAntigravity(antigravityPoint[i], true);
        } else {
        	gameSound[8].play();
	        activatePoint(antigravityPoint[i]);
        }
        break;
  		}
  	}
	}
	if (raycaster.intersectObject(button[0].clickableArea).length > 0 && button[0].ready) {
		gameSound[1].play();
		button[0].ready = false;
		button[2].ready = false;
		goNextLevel();
	}
	if (raycaster.intersectObject(button[2].clickableArea).length > 0 && button[2].ready) {
	  gameSound[1].play();
		button[0].ready = false;
		button[2].ready = false;
		goRestartLevel();
	}
	if (raycaster.intersectObject(button[3].clickableArea).length > 0 && button[3].ready) {
		gameSound[1].play();
		hideMenuButton();
		goMenu();
	}
	if (raycaster.intersectObject(button[4].clickableArea).length > 0 && button[4].ready) {
	  gameSound[1].play();
		goMenu();
	}
	if (raycaster.intersectObject(button[1].clickableArea).length > 0 && button[1].ready) {
	  gameSound[1].play();
		button[1].ready = false;
		hideStartScreen();
	}
	if (raycaster.intersectObject(button[6].clickableArea).length > 0 && button[6].ready) {
	  gameSound[1].play();
		button[6].ready = false;
		button[7].ready = false;
		confirmClearProgress();
	}
	if (raycaster.intersectObject(button[7].clickableArea).length > 0 && button[7].ready) {
	  gameSound[1].play();
		button[6].ready = false;
		button[7].ready = false;
		cancelClearProgress();
	}
	if (raycaster.intersectObject(button[5].clickableArea).length > 0 && button[5].ready) {
	  gameSound[1].play();
		button[5].ready = false;
		goClearProgress();
	}
	if (onSlide) {
  	for (let i = 0; i < 40; i++) {
		  if (raycaster.intersectObject(menuContainer.level[i].clickableArea).length > 0) {
	      gameSound[1].play();
	      onSlide = false;
	      goChooseLevel(i);
	      break;
		  }
  	}
	}
	if (raycaster.intersectObject(button[8].clickableArea).length > 0 && button[8].onIcon.material.opacity > 0) {
		if (button[8].onIcon.visible) {
			button[8].onIcon.visible = false;
			button[8].offIcon.visible = true;
			Howler.mute(true);
		} else {
			button[8].onIcon.visible = true;
			button[8].offIcon.visible = false;
			Howler.mute(false);
		}
	}
	document.body.style.cursor = "default";
}
function onDocumentMouseMove(event) {
	event.preventDefault();
	document.body.style.cursor = "default";
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	raycaster.setFromCamera(mouse, mainCamera);
	for (let i = 0; i < 9; i++) {
		if (raycaster.intersectObject(button[i].clickableArea).length > 0 && button[i].ready) {
			document.body.style.cursor = "pointer";
			break;
		}
	}
	if (onSlide) {
		for (let i = 0; i < 40; i++) {
			if (raycaster.intersectObject(menuContainer.level[i].clickableArea).length > 0) {
				document.body.style.cursor = "pointer";
				break;
			}
		}
	}
}
function onWheel(event) {
	if (onSlide) {
		menuContainer.position.y += event.deltaY * 0.002;
		if (menuContainer.position.y > 0) menuContainer.position.y = 0;
		if (menuContainer.position.y < -17.55) menuContainer.position.y = -17.55;
	}
}
function saveProgress() {
	localStorage.setItem('progress', levelStat);
}
function clearTempGeometries() { while (tempGeometry.length > 0) { tempGeometry[tempGeometry.length - 1].dispose(); tempGeometry.pop(); } }
function bendGeometry(geometry, axis, angle) { let theta = 0; if (angle !== 0) { const v = geometry.attributes.position.array; for (let i = 0; i < v.length; i += 3) { let x = v[i]; let y = v[i + 1]; let z = v[i + 2]; switch (axis) { case "x": theta = z * angle; break; case "y": theta = x * angle; break; default: theta = x * angle; break; } let sinTheta = Math.sin(theta); let cosTheta = Math.cos(theta); switch (axis) { case "x": v[i] = x; v[i + 1] = (y - 1.0 / angle) * cosTheta + 1.0 / angle; v[i + 2] = -(y - 1.0 / angle) * sinTheta; break; case "y": v[i] = -(z - 1.0 / angle) * sinTheta; v[i + 1] = y; v[i + 2] = (z - 1.0 / angle) * cosTheta + 1.0 / angle; break; default: v[i] = -(y - 1.0 / angle) * sinTheta; v[i + 1] = (y - 1.0 / angle) * cosTheta + 1.0 / angle; v[i + 2] = z; break; } } geometry.attributes.position.needsUpdate = true; } }
const clock = new THREE.Clock();
let delta;
loop();
function loop() {
  if (oldWindow !== document.body.clientWidth / document.body.clientHeight) onWindowResize();
  delta = clock.getDelta() * 0.4;
  if (onHold) {
  	delta = 0;
  	onHold = false;
  }
  if (onPlay) {
  	if (button[8].onIcon.visible) Howler.mute(false);
  	for (let i = 0; i < levelData[currentLevel][0].length; i++) {
  		for (let j = 0; j < 3; j++) {
  			if (star[j].body.scale.x == 1 && new THREE.Vector2(hero[i].position.x, hero[i].position.y).distanceTo(new THREE.Vector2(star[j].position.x, star[j].position.y)) < 1.1) {
  				getStar(j);
  				break;
  			}
  		}
  		if (new THREE.Vector2(hero[i].position.x, hero[i].position.y).distanceTo(new THREE.Vector2(portal.position.x, portal.position.y)) < 1.7) {
  		  if (hero[i].scale.x == 1) {
  		  	hideMenuButton();
  		  	gameSound[5].play();
  		  	gsap.to(hero[i].scale, { duration: 1.2, x: 0, y: 0, z: 0, ease: "power1.in" });
  		  	gsap.to(portal.scale, { duration: 0.6, x: 0, y: 0, z: 0, ease: "back.in", delay: 0.8, onComplete: function() {
  		  		for (let j = 0; j < 36; j++) {
  		  			portal.sparkle[j].position.set(portal.position.x, portal.position.y, -16);
  		  			const sparkleAngle = Math.random() * Math.PI * 2;
  		  			const sparkleTime = 0.3 + Math.random() * 0.6;
  		  			const sparkleDist = 1 + Math.random() * 1.5;
  		  			gsap.to(portal.sparkle[j].scale, { duration: sparkleTime, x: "random(0.5, 0.7)", y: "random(0.5, 0.7)", z: 0.6, ease: "power1.in", repeat: 1, yoyo: true });
  		  			gsap.to(portal.sparkle[j].position, { duration: sparkleTime, x: portal.sparkle[j].position.x + sparkleDist * Math.cos(sparkleAngle), y: portal.sparkle[j].position.y + sparkleDist * Math.sin(sparkleAngle), ease: "power2.out", repeat: 1, yoyo: true });
  		  		}
  		  		if (onPlay) goEndLevel();
  		  	} });
  		  }
  			hero[i].acceleration += 3000 * delta;
  		  hero[i].oldSpeed.x = hero[i].newSpeed.x;
  			hero[i].oldSpeed.y = hero[i].newSpeed.y;
  			hero[i].newSpeed.x -= (hero[i].acceleration) * delta * Math.cos(new THREE.Vector2(hero[i].position.x - portal.position.x, hero[i].position.y - portal.position.y).angle());
  			hero[i].newSpeed.y -= (hero[i].acceleration) * delta * Math.sin(new THREE.Vector2(hero[i].position.x - portal.position.x, hero[i].position.y - portal.position.y).angle());
  		} else if (hero[i].scale.x == 1) {
  			hero[i].acceleration = 0;
  		  for (let j = 0; j < levelData[currentLevel][5].length; j++) {
  		  	if (new THREE.Vector2(hero[i].position.x, hero[i].position.y).distanceTo(new THREE.Vector2(monster[j].position.x, monster[j].position.y)) < 1) {
  		  		if (menuContainer.blackFade.material.opacity == 0) goBoom(monster[j]);
  		  	}
  		  }
  			for (let j = 0; j < levelData[currentLevel][1].length; j++) {
          if (new THREE.Vector2(hero[i].position.x, hero[i].position.y).distanceTo(new THREE.Vector2(gravityPoint[j].position.x, gravityPoint[j].position.y)) < 1.3) {
            if (menuContainer.blackFade.material.opacity == 0) goBoom(gravityPoint[j]);
          }
  				if (gravityPoint[j].active) {
  					hero[i].oldSpeed.x = hero[i].newSpeed.x;
  					hero[i].oldSpeed.y = hero[i].newSpeed.y;
  					hero[i].newSpeed.x -= 7 * delta * Math.cos(new THREE.Vector2(hero[i].position.x - gravityPoint[j].position.x, hero[i].position.y - gravityPoint[j].position.y).angle());
  					hero[i].newSpeed.y -= 7 * delta * Math.sin(new THREE.Vector2(hero[i].position.x - gravityPoint[j].position.x, hero[i].position.y - gravityPoint[j].position.y).angle());
  				}
  			}
  			for (let j = 0; j < levelData[currentLevel][2].length; j++) {
  				if (new THREE.Vector2(hero[i].position.x, hero[i].position.y).distanceTo(new THREE.Vector2(antigravityPoint[j].position.x, antigravityPoint[j].position.y)) < 1.3) {
  					if (menuContainer.blackFade.material.opacity == 0) goBoom(antigravityPoint[j]);
  				}
  				if (antigravityPoint[j].active) {
  					hero[i].oldSpeed.x = hero[i].newSpeed.x;
  					hero[i].oldSpeed.y = hero[i].newSpeed.y;
  					hero[i].newSpeed.x += 7 * delta * Math.cos(new THREE.Vector2(hero[i].position.x - antigravityPoint[j].position.x, hero[i].position.y - antigravityPoint[j].position.y).angle());
  					hero[i].newSpeed.y += 7 * delta * Math.sin(new THREE.Vector2(hero[i].position.x - antigravityPoint[j].position.x, hero[i].position.y - antigravityPoint[j].position.y).angle());
  				}
  			}
  		}
  		if (hero[i].scale.x == 1 && (Math.abs(hero[i].position.y) > Math.tan(mainCamera.fov * Math.PI / 360) * 15 + 1 || Math.abs(hero[i].position.x) > Math.tan(mainCamera.fov * Math.PI / 360) / document.body.clientHeight * document.body.clientWidth * 15 + 1)) {
  			onPlay = false;
  			if (button[3].ready) {
  				for (let j = 0; j < levelData[currentLevel][1].length; j++) {
  					if (gravityPoint[j].active) deactivateGravity(gravityPoint[j], false);
  				}
  				for (let j = 0; j < levelData[currentLevel][2].length; j++) {
  					if (antigravityPoint[j].active) deactivateAntigravity(antigravityPoint[j], false);
  				}
  		  	if (menuContainer.blackFade.material.opacity == 0) {
  		  		gameSound[2].play();
  		  		goLost();
  		  	}
  	  	}
  		}
  		hero[i].position.set(hero[i].position.x + (hero[i].oldSpeed.x + hero[i].newSpeed.x) * delta / 2, hero[i].position.y + (hero[i].oldSpeed.y + hero[i].newSpeed.y) * delta / 2, -15);
  	}
  }
  mainRenderer.render(mainScene, mainCamera);
  requestAnimationFrame(loop);
}
visibilityChange();
function visibilityChange() {
  let hidden = 'hidden';
  if (hidden in document) document.addEventListener('visibilitychange', onchange);
  else if ((hidden = 'mozHidden') in document) document.addEventListener('mozvisibilitychange', onchange);
  else if ((hidden = 'webkitHidden') in document) document.addEventListener('webkitvisibilitychange', onchange);
  else if ((hidden = 'msHidden') in document) document.addEventListener('msvisibilitychange', onchange);
  else if ('onfocusin' in document) document.onfocusin = document.onfocusout = onchange;
  else window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;
  function onchange(evt) {
    let v = false;
    let h = true;
    let evtMap = {
      focus: v,
      focusin: v,
      pageshow: v,
      blur: h,
      focusout: h,
      pagehide: h
    };
    evt = evt || window.event;
    let windowHidden = false;
    if (evt.type in evtMap) {
      windowHidden = evtMap[evt.type];
    } else {
      windowHidden = this[hidden];
    }
    if (windowHidden) {
      Howler.mute(true);
      onHold = true;
    } else {
      if (button[8] !== undefined && button[8].onIcon.visible) Howler.mute(false);
    }
  }
  if (document[hidden] !== undefined) {
    onchange({
      type: document[hidden] ? 'blur' : 'focus'
    });
  }
}
const levelData = [
	[
		[[2.4, -5]],
		[[2.4, 5]],
		[],
		[[2.4, -3], [2.4, -1.5], [2.4, 0]],
		[[2.4, 2.2]],
		[]
	],
	[
		[[-1.1, -2.1]],
		[],
		[[-2.4, -4.5]],
		[[-0.15, -0.2], [0.6, 1.2], [1.4, 2.6]],
		[[2.4, 4.5]],
		[]
	],
	[
		[[0, -4.5]],
		[[-2.5, 4.5], [2.5, 4.5]],
		[],
		[[0, -2.5], [0, -1], [0, 0.5]],
		[[0, 2.5]],
		[]
	],
	[
		[[0, -2.5]],
		[],
		[[0, -5], [-3, 0]],
		[[0, -0.6], [0.4, 1.25], [1.3, 2.9]],
		[[2.4, 4.5]],
		[]
	],
	[
		[[0, -2.8]],
		[],
		[[0, 5], [0, -5]],
		[[0, -1], [0, 1], [0, 3]],
		[[-3, 0], [[3, 0, 2.5, -1, true]], 0],
		[]
	],
	[
		[[-2.4, -4.5]],
		[[-2.4, 0], [2.4, 0]],
		[],
		[[-1, -2.4], [0, 0], [-1, 2.4]],
		[[-2.4, 4.5]],
		[]
	],
	[
		[[0, -4.5]],
		[[3, 4.5], [-3, 4.5]],
		[],
		[[1.4, -2.4], [1.8, 0], [1.4, 2.4]],
		[[0, 4.5]],
		[[0, 0]]
	],
	[
		[[0, -2.5]],
		[],
		[[-3, -4.5], [3, -4.5]],
		[[2, -1], [2, 1], [1.2, 2.8]],
		[[0, 4.5]],
		[[0, 0]]
	],
	[
		[[2.5, 4.5]],
		[[-2.5, 4.5], [2.5, -4.5]],
		[],
		[[-0.1, -3.2], [1.7, -1.3], [2.5, 1.5]],
		[[-2.5, -4.5]],
		[[0, 0]]
	],
	[
		[[-3, 4.5]],
		[[1, -5]],
		[[-1, -5]],
		[[-1.5, 1.5], [0, -1.5], [1.5, 1.5]],
		[[3, 4.5]],
		[[0, 4.5]]
	],
	[
		[[-3, -2.25]],
		[[3, -4.5]],
		[[-3, -4.5]],
		[[0, 4], [-2.5, 1.5], [2.5, 1.5]],
		[[3, 0]],
		[[0, 0], [0, -2.25], [0, -4.5]]
	],
	[
		[[0, -5]],
		[[3, 5]],
		[[3, -5], [-3, 5]],
		[[-2.5, -2.5], [-2, 0], [0, 2.1]],
		[[3, 1]],
		[[0, -2.5], [2, -2.5]]
	],
	[
		[[0, -1.5]],
		[[0, 1.5], [3, -1.5]],
		[],
		[[-3, 1.5], [0, 4.5], [3, 1.5]],
		[[0, -4.5]],
		[]
	],
	[
		[[0, -1.5]],
		[[-3.5, -1.5], [3.5, -1.5]],
		[[0, -5]],
		[[1.75, 0.1], [2.5, 1.8], [1.75, 3.5]],
		[[0, 5]],
		[[0, 1.8]]
	],
	[
		[[0.5, -4.5]],
		[[0.5, 0]],
		[[-2.5, -4.5]],
		[[2.5, -2.5], [2.5, 2.5], [-1.5, 2.5]],
		[[-2.5, 0]],
		[]
	],
	[
		[[0, -4.5]],
		[[0, 4.5], [-3.5, -4.5], [3.5, -4.5]],
		[],
		[[1.5, -2.8], [3, -0.5], [3, 3.5]],
		[[-3, 1.5], [[3, 1.5, 3, -1, true]], 0],
		[[0, -1.5]]
	],
	[
		[[3, -4.5]],
		[[-3, 4.5]],
		[[-3, -4.5], [3, 4.5]],
		[[3, -2], [2.5, 0.5], [1, 2.5]],
		[[-1, 1.5]],
		[[1, -1.5]]
	],
	[
		[[1.5, -2.5]],
		[[-1, 1]],
		[[1.5, -5]],
		[[1.5, 1], [-1, 4], [-1, -2]],
		[[3, 4.5]],
		[]
	],
	[
		[[-1, -4.5]],
		[[-1, 4.5]],
		[[-3, 0], [3, 4.5]],
		[[-1, -1], [1, 1], [3, -1]],
		[[3, -4.5]],
		[[1, -4.5], [1, -2.5]]
	],
	[
		[[-3, 0]],
		[[0, 0]],
		[[-3, -5]],
		[[-2.5, 2.5], [0, 4], [2.5, 2.5]],
		[[-3, -2.5], [[3, -2.5, 2.5, -1, true]], 0],
		[]
	],
	[
		[[-1.5, -3.5]],
		[[3, -3], [-3, 5]],
		[[1, -5]],
		[[0.5, -2.5], [1.3, -0.5], [0.5, 1.5]],
		[[-1, 3]],
		[[-1, -1], [-3, -1.5], [1.5, 4.5], [3, 3]]
	],
	[
		[[0, 0]],
		[[-3, 0], [3, 0], [0, -5]],
		[],
		[[0, -3], [0, 1.7], [0, 3.2]],
		[[0, 5]],
		[[3, -2], [2, -3.8], [-3, -1.9], [-1.9, -3.8]]
	],
	[
		[[3, -5]],
		[[-3, -5], [3, 0]],
		[[3, 5]],
		[[0, -4], [1, -1], [1, 2.2]],
		[[-3, 2.5]],
		[[3, -3], [-1, 0], [-3, 0]]
	],
	[
		[[0, 5]],
		[[-3, 0]],
		[[-3, 5]],
		[[1, 2.5], [3, 0], [1, -2.5]],
		[[-3, -5], [[3, -5, 2.5, -1, true]], 0],
		[[-1, 0], [3, 5], [1, 0]]
	],
	[
		[[1.8, -2.7]],
		[],
		[[3, -4.5], [-3, -2], [3, 2]],
		[[-0.5, -2], [-3, 2.5], [-2.2, 0.1]],
		[[-3, 4.5]],
		[[0, 0], [0, 2]]
	],
	[
		[[0, -5]],
		[[0, -2], [0, 2]],
		[[-3, -5]],
		[[2.5, -2], [0, 0], [-2.5, 2]],
		[[3, 5]],
		[[2, 2], [4, 2]]
	],
	[
		[[0, -4]],
		[[3, 2]],
		[[3, -2]],
		[[-2.5, -2], [-2.5, 0], [-2.5, 2]],
		[[0, 4.5]],
		[[0, -2], [0, 0]]
	],
	[
	  [[-1.2, -2.5]],
		[[3, 5], [-3, 5], [3, -5]],
		[],
		[[-1.5, 2.5], [1.5, -2.5], [1.5, 2.5]],
		[[-3, -5]],
		[[0, 0]]
	],
	[
		[[-1, 0]],
		[[-1, 5], [-1, -5]],
		[[-3, 0]],
		[[-1, -2.5], [1, 2.5], [-1, 2.5]],
		[[3, -5], [[3, 5, 4, -1, true]], 0],
		[[1, 0]]
	],
	[
		[[3, -4.5]],
		[[-3, -4.5], [3, -1.5], [-3, 1.5]],
		[],
		[[-1.5, -1.5], [1.5, 1.5], [0, 4]],
		[[-3, 5]],
		[[1, -1.5], [-1, 1.5]]
	],
	[
		[[-2, 0]],
		[],
		[[-3, -4.5], [3, 4.5], [-3, 4.5]],
		[[0, 3.5], [2.5, 1.6], [3, -1.5]],
		[[3, -4.5]],
		[[0, -4.5], [0, -2.5], [0, -0.5], [0, 1.5]]
	],
	[
		[[0, -5]],
		[[-3, 0]],
		[[-3, -5], [-3, 5]],
		[[-1.2, -2.5], [2, 0], [-1.2, 2.5]],
		[[3, 5]],
		[[0, 0], [2, -3], [2, 3]]
	],
	[
		[[1.5, 2.5]],
		[[-3, 5], [3, -5]],
		[],
		[[-3, -5], [0, 0], [-1.5, -2.5]],
		[[3, 5]],
		[[-3, 3], [-3, 1], [3, -3], [3, -1]]
	],
	[
	  [[3, -4.5]],
		[[-3, 4.5]],
		[[3, 0], [-3, -3]],
		[[0, -3.5], [-1.5, -1], [1.5, 2.5]],
		[[3, 4.5]],
		[[1, -1.5], [-1, 1.5]]
	],
	[
		[[0, -4.5]],
		[[-3.4, -1.5], [0, 5], [3.4, -1.5]],
		[],
		[[1.5, -0.8], [0, 0.5], [1.5, -3]],
		[[0, 3]],
		[[0, -1.5], [-1.7, 1.5], [1.7, 1.5]]
	],
	[
		[[0, -1.5]],
		[[0, 0.8]],
		[[1.5, -3.5]],
		[[-2, 0.8], [0, 3], [2, 0.8]],
		[[3, 5], [[3, -5, 4, 0, false], [-3, -5, 3, 0, false], [-3, 5, 5, 0, false], [3, 5, 3, 0, false]], -1],
		[]
	],
	[
		[[0, 5]],
		[[0, -5]],
		[[-3, 3.5], [3, 3.5]],
		[[1.5, 1], [0, -1], [1, 3.5]],
		[[-3, -3], [[3, -3, 2.5, -1, true]], 0],
		[[2.3, -1], [-2.3, -1], [0, 2]]
	],
	[
	  [[0, -5]],
		[[3, -2], [-3, -2]],
		[],
		[[-1.5, -0.5], [1.5, -0.5], [1.5, -3.5]],
		[[-2, 5], [[2, 5, 1.5, 0, false], [2, 1, 1.5, 0, false], [-2, 1, 1.5, 0, false], [-2, 5, 1.5, 0, false]], -1],
		[[0, 3], [0, -2]]
	],
	[
		[[0, -4]],
		[],
		[[-3, -5], [3, -5], [3, 5], [-3, 5]],
		[[-2, -2], [0, 0], [2, 2]],
		[[0, 4]],
		[[0.2, -2], [2.2, -2], [-0.2, 2], [-2.2, 2]]
	],
	[
		[[0, 3]],
		[[-3, -2], [3, -2]],
		[],
		[[0, -2], [-2, 0.5], [2, 0.5]],
		[[-3, 5], [[3, 5, 3, -1, true]], 0],
		[[0, 0]]
	]
];