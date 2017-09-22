var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    //Create a light
    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(-60, 60, 80), scene);
	var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(0, 10, 0), scene);
	var light3 = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(1, -1, 0), scene);
	
	//light colors
	light3.diffuse = new BABYLON.Color3(0, 0, 1);
    light3.specular = new BABYLON.Color3(0, 1, 1);
	
    //Create an Arc Rotate Camera - aimed negative z this time
    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, 1.0, 110, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    //Creation of 6 spheres
    var sphere1 = BABYLON.Mesh.CreateSphere("Sphere1", 10.0, 9.0, scene);
    var sphere2 = BABYLON.Mesh.CreateSphere("Sphere2", 2.0, 9.0, scene);//Only two segments
    var sphere3 = BABYLON.Mesh.CreateSphere("Sphere3", 10.0, 9.0, scene);
    var sphere4 = BABYLON.Mesh.CreateSphere("Sphere4", 10.0, 9.0, scene);
    var sphere5 = BABYLON.Mesh.CreateSphere("Sphere5", 10.0, 9.0, scene);
    var sphere6 = BABYLON.Mesh.CreateSphere("Sphere6", 10.0, 9.0, scene);
	var sphere7 = BABYLON.Mesh.CreateSphere("Sphere7", 10.0, 9.0, scene);

    //Position the spheres
    sphere1.position.x = 40;
    sphere2.position.x = 25;
    sphere3.position.x = 25;
	sphere3.position.z = 20;
    sphere4.position.x = 5;
    sphere5.position.x = -10;
	sphere5.position.z = 10;
    sphere6.position.x = -35;
	sphere7.position.x = -35;
	sphere7.position.z = 10;

    //Creation of a plane
    var plane = BABYLON.Mesh.CreatePlane("plane", 100, scene);
    plane.position.y = 0;
    plane.rotation.x = Math.PI / 2;

    //Creation of a material with wireFrame
    var materialSphere1 = new BABYLON.StandardMaterial("texture1", scene);
    materialSphere1.wireframe = true;

    //Creation of a red material with alpha
    var materialSphere2 = new BABYLON.StandardMaterial("texture2", scene);
    materialSphere2.diffuseTexture = new BABYLON.Texture("textures/albedo.png", scene);
    materialSphere2.alpha = 0.3;
	materialSphere2.wireframe = true;

    //Creation of a material with an image texture
    var materialSphere3 = new BABYLON.StandardMaterial("texture3", scene);
    materialSphere3.diffuseTexture = new BABYLON.Texture("textures/albedo.png", scene);

    //Creation of a material with translated texture
    var materialSphere4 = new BABYLON.StandardMaterial("texture4", scene);
    materialSphere4.diffuseTexture = new BABYLON.Texture("textures/earth.jpg", scene);
    materialSphere4.diffuseTexture.vOffset = 0.1;//Vertical offset of 10%
    materialSphere4.diffuseTexture.uOffset = 0.4;//Horizontal offset of 40%

    //Creation of a material with an alpha texture
    var materialSphere5 = new BABYLON.StandardMaterial("texture5", scene);
    materialSphere5.diffuseTexture = new BABYLON.Texture("textures/distortion.png", scene);
    materialSphere5.diffuseTexture.hasAlpha = true;//Has an alpha

    //Creation of a material and show all the faces
    var materialSphere6 = new BABYLON.StandardMaterial("texture6", scene);
    materialSphere6.diffuseTexture = new BABYLON.Texture("textures/waterbump.png", scene);
    materialSphere6.diffuseTexture.hasAlpha = true;//Have an alpha
    materialSphere6.backFaceCulling = false;//Show all the faces of the element

    //Creation of a repeated textured material
    var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
    materialPlane.diffuseColor = new BABYLON.Color3(1, 1, 1); //Red
    materialPlane.alpha = 0.3;
    //Apply the materials to meshes
    sphere1.material = materialSphere1;
    sphere2.material = materialSphere2;

    sphere3.material = materialSphere3;
    sphere4.material = materialSphere4;

    sphere5.material = materialSphere5;
    sphere6.material = materialSphere6;

    plane.material =  materialPlane;

    // Create a particle system
    var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);

    // Where the particles come from
    particleSystem.emitter = sphere1; // the starting object, the emitter
    particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, 0); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 0); // To...

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    // Size of each particle (random between...
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.5;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 1.5;

    // Emission rate
    particleSystem.emitRate = 1500;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

    // Direction of each particle after it has been emitted
    particleSystem.direction1 = new BABYLON.Vector3(7, 0, 3);
    particleSystem.direction2 = new BABYLON.Vector3(7, 0, 3);

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 3;
    particleSystem.updateSpeed = 0.005;

    // Start the particle system
    particleSystem.start();
   
   // Shadows
	var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
	shadowGenerator.getShadowMap().renderList.push(sphere1);
	shadowGenerator.useVarianceShadowMap = true;

	plane.receiveShadows = true;
	
    // Skybox
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 500.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    // Launch animation

    scene.beginAnimation(sphere1, 0, 100, true);
	
        // Animations
    var alpha = 0;
    scene.beforeRender = function () {
        sphere1.position = new BABYLON.Vector3(20 * Math.sin(alpha), 0, 15 * Math.cos(alpha));
        alpha += 0.01;
    };
	
    return scene;
};