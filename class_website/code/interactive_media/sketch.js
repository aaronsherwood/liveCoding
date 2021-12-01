import * as THREE from '../../build/three.module.js';

import { FontLoader } from '../jsm/loaders/FontLoader.js';
import { TextGeometry } from '../jsm/geometries/TextGeometry.js';

import Stats from '../jsm/libs/stats.module.js';

//renderer;

let scene, camera, stats;

let line, uniforms;

let vert, frag;

const loader = new FontLoader();
loader.load( './fonts/helvetiker_bold.typeface.json', function ( font ) {

  init( font );
  animate();

} );

async function init( font ) {

  let vert_shader = await (await fetch('./code/interactive_media/vertex.vert')).text();
  let frag_shader = await (await fetch('./code/interactive_media/frag.frag')).text();

  camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 500;

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x050505 );

  uniforms = {

    amplitude: { value: 5.0 },
    opacity: { value: 0.3 },
    color: { value: new THREE.Color( 0xffffff ) }

  };

  const shaderMaterial = new THREE.ShaderMaterial( {

    uniforms: uniforms,
    vertexShader: vert_shader,//document.getElementById( 'vertexshader' ).textContent,
    fragmentShader: frag_shader,//document.getElementById( 'fragmentshader' ).textContent,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true

  } );


  const geometry = new TextGeometry( 'Interactive\n    Media', {

    font: font,
    size: 50,
    height: 15,
    curveSegments: 10,

    bevelThickness: 5,
    bevelSize: 1.5,
    bevelEnabled: true,
    bevelSegments: 10,

  } );

  geometry.center();

  const count = geometry.attributes.position.count;

  const displacement = new THREE.Float32BufferAttribute( count * 3, 3 );
  geometry.setAttribute( 'displacement', displacement );

  const customColor = new THREE.Float32BufferAttribute( count * 3, 3 );
  geometry.setAttribute( 'customColor', customColor );

  const color = new THREE.Color( 0xffffff );

  for ( let i = 0, l = customColor.count; i < l; i ++ ) {

    color.setHSL( i/l, 0.5, 0.5 );
    color.toArray( customColor.array, i * customColor.itemSize );

  }

  line = new THREE.Line( geometry, shaderMaterial );
  line.rotation.x = 0.1;
  scene.add( line );

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  const container = document.getElementById( 'container' );
  //container.appendChild( renderer.domElement );

  stats = new Stats();
  //container.appendChild( stats.dom );

  //

  window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

  requestAnimationFrame( animate );

  render();
  stats.update();

}

function render() {

  const time = Date.now() * 0.001;

  line.rotation.y = 0.1 * (Math.sin(time*.5));

  uniforms.amplitude.value = .25 *Math.sin( 0.1 * time );
  uniforms.color.value.offsetHSL( 0.0005, 0, 0 );

  const attributes = line.geometry.attributes;
  const array = attributes.displacement.array;

  for ( let i = 0, l = array.length; i < l; i += 3 ) {

    array[ i ] += 0.3 * ( 0.5 - Math.random() );
    array[ i + 1 ] += 0.3 * ( 0.5 - Math.random() );
    array[ i + 2 ] += 0.3 * ( 0.5 - Math.random() );

  }

  attributes.displacement.needsUpdate = true;

  renderer.render( scene, camera );

}
