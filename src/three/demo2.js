import * as THREE from 'three';


export default function render(containerEl) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.shadowMapEnabled = true;
  renderer.setSize(300, 300);
  containerEl.appendChild(renderer.domElement);
  const cube = drawCube();
  const axes = new THREE.AxesHelper(20);
  
  scene.add(axes);
  scene.add( cube );
  scene.add(drawPlane());
  scene.add(drawLight());
  
  camera.position.set(-30, 40, 30);
  camera.lookAt(0,0,0)
  function animate() {
    requestAnimationFrame( animate );
    cube.rotation.x += 0.001;
    cube.rotation.y += 0.001;
    renderer.render( scene, camera );
  }
  animate();
}

function drawLight() {
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(0,100,0);
  spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  spotLight.castShadow = true;
  return spotLight;
}

function drawPlane() {
  const planeGeometry = new THREE.PlaneGeometry(100, 100);
  const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.rotation.z = 0.1 * Math.PI;
  plane.position.set(0, 0 , 0);
  plane.receiveShadow = true;
  return plane;
}

function drawCube() {
  const geometry = new THREE.BoxGeometry( 10, 10, 10 );
  const material = new THREE.MeshLambertMaterial( {
    color: 0x00ff00,
    wireframe: true
  } );
  const cube = new THREE.Mesh( geometry, material );
  cube.castShadow = true;
  cube.position.y = 10;
  return cube;
}

function drawLine() {
  const geometry = new THREE.Geometry();
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
  geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, 10, 0));
  geometry.vertices.push(new THREE.Vector3(10, 0, 0));
  const line = new THREE.Line(geometry, material);
  return line;
}