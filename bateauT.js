

var b2Vec2 = Box2D.Common.Math.b2Vec2,
	b2BodyDef = Box2D.Dynamics.b2BodyDef,
	b2Body = Box2D.Dynamics.b2Body,
	b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
	b2Fixture = Box2D.Dynamics.b2Fixture,
	b2World = Box2D.Dynamics.b2World,
	b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
	b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef,
	b2AABB = Box2D.Collision.b2AABB,
	b2MassData = Box2D.Collision.Shapes.b2MassData,
	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
  var b2BuoyancyController = Box2D.Dynamics.Controllers.b2BuoyancyController;
var b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
var b2ContactListener = Box2D.Dynamics.b2ContactListener;

   world = new b2World(new b2Vec2(0,9.8), true);

var SCALE = 30;
var scale = 30;
  var scale2 = 30;

var animLevel = 0.3;
var animLevel2T = 0;
  
var bC = null;
var buoyancyController;
var lo, boom;

        var imgT = new Image();
        imgT.src = "flecheT.png";
   var imglo = new Image();
   imglo.src = "duct.png";
   var imgcoral = new Image();
   imgcoral.src = "coral-reef.jpg";
			var audioB = new Audio("BOATCYLINDER.mp3");

var drawater;drawater=false;

var vec =Math.random()*Math.PI, scale22=Math.random()+0.3, height2=Math.random()*0.4+0.2, speed22=Math.random()*2+1 ;   
  var h=16;
    
	
  var Body = function(world,details) { 
    this.details = details ;
    this.definition = new b2BodyDef();
    this.definition.position = new b2Vec2(details.x , details.y );
    this.definition.linearVelocity = new b2Vec2(details.vx || 0, details.vy || 0);
   this.definition.userData = this;
   this.definition.IsAwake = details.sleep;
   this.definition.angle = details.angle || 0;
    this.definition.type = details.type == "static" ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;
    this.body = world.CreateBody(this.definition);
    fixtureDef = new b2FixtureDef();
    fixtureDef.density= details.density || 1,
    fixtureDef.friction= details.friction || 0.2,
    fixtureDef.restitution= 0.2;
	fixtureDef.isSensor = details.sensor;	
	fixtureDef.filter.groupIndex = details.filter;
    switch(details.shape) {
      case "circle":
        fixtureDef.shape = new b2CircleShape(details.radius);
        break;
      case "polygon":
        fixtureDef.shape = new b2PolygonShape();  
		fixtureDef.shape.SetAsArray(details.points,details.points.length);
        break;     
      case "block":     
        fixtureDef.shape = new b2PolygonShape();
        fixtureDef.shape.SetAsBox(details.width/2, details.height/2);
        break;
    }

    this.body.CreateFixture(fixtureDef); 
  };

				 
  Body.prototype.draw = function() {
    var posB = this.body.GetPosition(),
        angle = this.body.GetAngle();

    context.save();
    context.translate(posB.x,posB.y);
    context.rotate(angle);

    if(this.details.color) {
      context.fillStyle = this.details.color;
      switch(this.details.shape) {
        case "circle":
          context.beginPath();
          context.arc(0,0,this.details.radius,0,Math.PI*2);
          context.fill();
          break;
        case "polygon":
          var points = this.details.points;
          context.beginPath();
          context.moveTo(points[0].x,points[0].y);
          for(var i=1;i<points.length;i++) {
            context.lineTo(points[i].x,points[i].y);
          }
          context.fill();
          break;
        case "block":
          context.fillRect(-this.details.width/2,
                           -this.details.height/2,
                           this.details.width,
                           this.details.height);
        default:
          break;
      }
    }
if(this.details.image) { context.drawImage(this.details.image, -this.details.width/2, -this.details.height/2, this.details.width,this.details.height); }
    
	if(this.details.image2) {
		var points = this.details.points;      
          for(var i=1;i<points.length;i++) { context.drawImage(this.details.image2, points[0].x,points[0].y,points[i].x,points[i].y) };
    }
	context.restore();
            world.ClearForces();					
		};

		
var contacts;

			 

		
function pool(){
	if(drawater){
if( frame % 3 == 0 ) light_frame++;
        light_frame = light_frame % 30;
	//	context.drawImage( imageportal, 64 * light_frame, 0, 62, 62, fix1T.body.GetPosition().x * scale-30, fix1T.body.GetPosition().y * scale-75, 62, 124 );
     	context.drawImage( imageportal, 64 * light_frame, 0, 62, 62, fix3.body.GetPosition().x * scale-30, fix3.body.GetPosition().y * scale-80, 62, 124 );
     	
        var imgY = 200 * animLevel;
        context.globalAlpha = animLevel;
       // context.drawImage(img, 500, -imgY+150);
        animLevel += .004; 
        if (animLevel >= 1.3) {animLevel = 1.3; }
		
        context.beginPath();
        context.moveTo(150,800);        
        vec+=0.02*speed22;        
        for(var j=150;j<2000;j+=2){ context.lineTo( j , -imgY+Math.sin(vec+j/100*scale22)*(height2*h)+675 ); }
        context.lineTo(2000,800);
        context.closePath();
        context.fillStyle="rgba(0,255,255, 0.8)";
        context.fill(); 
		 context.save();
	context.globalAlpha = animLevel2T;
        context.fillStyle = "yellow";
        context.font = "italic 30pt Arial";
      // context.drawImage(img2,fix1T.body.GetPosition().x* scale-20 , fix1T.body.GetPosition().y* scale-210 , 150, 150);
        animLevel2T += .01; 
        if (animLevel2T > 1) {animLevel2T = 0;}	
   context.restore();
	}		
if (contacts == 'pool_start' && drawater == false && drawtelefer === false) { 
	  rigidBody = new RigidBody(world, {color: "green", type: "static", x:4450/scale, y: 800/scale, height: 40/scale, width: 300/scale}); 
      fi = new RigidBody(world, { color: "green", type: "static",  x:-650/scale, y: 820/scale, height: 20/scale,  width: 500/scale});  
	  fix1T = new Rigid(world, { shape: "block", type: "static", sensor: true, x: 3550/scale, y: 750/scale, height: 2/scale,  width:30/scale, userData: 'fix1T'});
      fix1 = new Rigid(world, { shape: "block", type: "static", sensor: true, x: 850/scale, y: 700/scale, height: 2/scale,  width:30/scale, userData: 'fix1'});
	  fix3 = new Rigid(world, { shape: "block", type: "static", sensor: true, x: 80/scale, y: 700/scale, height: 2/scale,  width:1/scale, userData: 'fix3'});
      Lwall = new Rigid(world, { color: "brown", shape: "block", type: "static", filter: 1, x:-700/scale, y: 1100/scale, height: 150/scale,  width: 500/scale});
      LwallH = new Rigid(world, { color: "brown", shape: "block", type: "static", filter: 1, x: 700/scale, y: 900/scale, height: 5/scale,  width: 250/scale});  
      Rwall = new Rigid(world, { color: "brown", shape: "block", type: "static", x:4500/scale, y: 1100/scale, height: 150/scale, width: 250/scale}); 
      boxT = new Rigid(world, { image: imglo, shape: "block", density: 0.1, x:3700/scale, y: 1500/scale, height: 0.2, width: 0.2}); //, filter: -3	
 
	  boom = new Rigid(world, { image: imglo, userData: 'boat', filter: -3	, shape: "block", density: 1, x:3700/scale, y: 1500/scale, height: 3, width: 0.12}); //, filter: -3	
      lo = new Rigid(world, { image2: imglo, shape: "polygon", density: 1, friction: 1, filter:1,
                          points: [ { x: 0, y: 0 }, { x: -1, y: 2 },{ x: -11, y: 2 }, { x: -12, y: 0 }  ], x: 3800/scale, y: 1500/scale});
		joint_def = new b2RevoluteJointDef();
joint_def.bodyA = lo.body; joint_def.bodyB = boom.body; joint_def.localAnchorA = new b2Vec2(-7, 0.5); joint_def.localAnchorB = new b2Vec2(0, 3);
  joint_def.enableLimit = true; trap = world.CreateJoint(joint_def); 
  
			 tim2 = setInterval(function(){boom.body.SetAngularVelocity(Math.random()*4+2);}, 3000*Math.random()*2+2);
             tim1 = setInterval(function(){audioW.volume=0.2; audioW.play()}, 5000*Math.random()*3+2);
        	  		   		
	 //droid.body.SetFixedRotation(false);
	 joint_defB = new b2RevoluteJointDef();
joint_defB.bodyA = lo.body; joint_defB.bodyB = boxT.body;
joint_defB.localAnchorA = new b2Vec2(-2, 0); joint_def.localAnchorB = new b2Vec2(0, 0);
  joint_defB.enableLimit = true; trapB = world.CreateJoint(joint_defB); 
	bC = new b2BuoyancyController();
	bC.normal.Set(0,-1);	
	bC.offset = -400/scale;	
	bC.density = 2;	
	bC.linearDrag = 5;
	world.AddController(bC); 
	//fix2.body.SetPosition( new b2Vec2( 2150/scale, 170/scale ) );
	droid.body.SetPosition( new b2Vec2( 2100/scale, 170/scale ) ); 
	droid.body.SetLinearVelocity( new b2Vec2( 0, droid.body.GetLinearVelocity().y ) );
	bC.AddBody(droid.body);
	bC.AddBody(lo.body);
	bC.AddBody(boom.body);
	contacts = null; 
	drawater=true; 
	}
 if (contacts == 'pool_end'){ 
	fix2.body.SetPosition( new b2Vec2( 75/scale, -500/scale ) );
	droid.body.SetPosition( new b2Vec2( 55/scale, -500/scale ) ); 
	droid.body.SetLinearVelocity( new b2Vec2( 0, droid.body.GetLinearVelocity().y ) );
	contacts = null; 
	drawater=false; 
	//audioW.src='';
	world.DestroyBody(boom.body);
	world.DestroyBody(lo.body);
	world.DestroyBody(Rwall.body);
	world.DestroyBody(Lwall.body);
	world.DestroyBody(LwallH.body);
	world.DestroyBody(fix1.body);
	world.DestroyBody(fix3.body);
	world.DestroyBody(fi.body);
	world.DestroyBody(rigidBody.body);
	world.DestroyBody(fix1T.body);
	world.RemoveController(bC); 
	animLevel = 0.3;
	animLevel3 = 0;
	animLevel4 = 0;
	ang = 0;
	}
	 if (contacts == 'pool_end1'){	
	 //world.DestroyBody(boom.body);
	}
	
}

  var listener3 = new Box2D.Dynamics.b2ContactListener;
			listener3.BeginContact = function(contact) {
				 fxA=contact.GetFixtureA(); // 1st COLLISION FIXTURE
				 fxB=contact.GetFixtureB(); // 2nd COLLISION FIXTURE
				 sA=fxA.IsSensor(); // Will store whether 1st fixture is a sensor or not (true or false)
				 sB=fxB.IsSensor(); // Will store whether 2nd fixture is a sensor or not (true or false)
				 if((sA && !sB) || (sB && !sA))	{ // Will go on further iff Fixture A or B not both are sensors.
					 if(sA)	{
					 
				 if(fxA.GetBody().GetUserData().data.userData == 'fix1T' && fxB.GetBody() == droid.body)	{
							audio.play(); moveDroid = false;   // contacts = 'pool_end'; contacts = 'pool_end1';
							 }
						  if(fxA.GetBody().GetUserData().data.userData == 'fix1' && fxB.GetBody() == droid.body)	{
							 audio.play(); moveDroid = true; clearInterval(tim2);	// world.DestroyJoint(trapB) ;
							 }
						 
						 else if(fxA.GetBody().GetUserData().data.userData == 'fix3' && fxB.GetBody() == droid.body)	{
							contacts = 'pool_end';audio.play();  clearInterval(tim1);
						 }  
						 }
														
						 if(sB) {
					 if(fxB.GetBody().GetUserData().data.userData == 'fix1T' && fxA.GetBody() == droid.body)	{
							audio.play(); moveDroid = false;    // contacts = 'pool_end'; contacts = 'pool_end1';
							 }
						 if(fxB.GetBody().GetUserData().data.userData == 'fix1' && fxA.GetBody() == droid.body)	{
							 audio.play();  moveDroid = true;  clearInterval(tim2);	//world.DestroyJoint(trapB) ;
							 }
						 else if(fxB.GetBody().GetUserData().data.userData == 'fix3' && fxA.GetBody() == droid.body)	{
							contacts = 'pool_end'; audio.play(); clearInterval(tim1);
							}
					//if(fxB.GetBody().GetUserData().data.userData == 'fix1T' && fxA.GetBody() == droid.body)	{
					//		audio.play();  //contacts = 'teleferik';  contacts = 'pool_end'; contacts = 'pool_end1'  
					//		 }
						}					
							
			}
}


document.addEventListener("keydown", function(e) { 
        switch (event.keyCode) {
            case 39 :			
			if (!moveDroid){
				lo.body.ApplyImpulse(new b2Vec2(10,0), lo.body.GetWorldCenter());  audioB.play();
				}
           break;           
            case 37 :	
			if (!moveDroid){
				lo.body.ApplyImpulse(new b2Vec2(-15,0), lo.body.GetWorldCenter()); audioB.play();
				}
		    break;         			
        } // CONTROLS 
	 
	   }, false)
document.addEventListener("keyup", function(e) { 
        switch (event.keyCode) {
            case 39 :			
			audioB.pause();
           break;           
            case 37 :		
			audioB.pause();
		    break;         			
        } // CONTROLS 
	 
	   }, false)


