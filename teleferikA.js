
                           
    var b2Vec2 = Box2D.Common.Math.b2Vec2,
        b2BodyDef = Box2D.Dynamics.b2BodyDef,
        b2Body = Box2D.Dynamics.b2Body,
        b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
        b2World = Box2D.Dynamics.b2World,
        b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
        b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,          
        b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
		b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef ,
  b2PrismaticJoint = Box2D.Dynamics.Joints.b2PrismaticJointDef,
			b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef,  
    b2Transform = Box2D.Common.Math.b2Transform,
   b2FilterData = Box2D.Dynamics.b2FilterData;   
  
  
    tire=new Image();
    tire.src="tire.png";
    crate=new Image();
    crate.src="crate.png";
    crate4=new Image();
    crate4.src="crate4.png";
    imgdesert=new Image();
    imgdesert.src="saharaB.png";
    fond=new Image();
    fond.src="desertlib.png";;
    fond2=new Image();
    fond2.src="desertlib3.png";
    fonda=new Image();
    fonda.src="fonda.png";
    fondb=new Image();
    fondb.src="fondb.png";
    crate2=new Image();
    crate2.src="crate2.png";
    imgFlyManForarm=new Image();
    imgFlyManForarm.src="forarm.png";

	  var directionT, speedT, torque;
      speedT = 2.5; torque = 45; speedT = 2.5;  directionT = 0; 
	
var animLevel4T = 0;
	var contactsT, moveDroid;
	moveDroid = true;
			var audioT = new Audio("315.mp3");
			var audioT2 = new Audio("sfxedrs.wav");
  
   var video1 = document.getElementById("theVideo");  video1.onended = function(e) { magnet=false; video1.src = "about:blank" };
   var video2 = document.getElementById("theVideo2");video2.onended = function(e) { magnet=false; video2.src = "about:blank"  };
   var video3 = document.getElementById("theVideo3");video3.onended = function(e) { magnet=false; video3.src = "about:blank"  };
   var video4 = document.getElementById("theVideo4");  video4.onended = function(e) { magnet=false; video4.src = "about:blank"  };
   var video5 = document.getElementById("theVideo5"); video5.onended = function(e) { magnet=false; video5.src = "about:blank"  };
   var video6= document.getElementById("theVideo6");video6.onended = function(e) { magnet=false; video6.src = "about:blank"  };
  
  
function Rigid(world, data) {
this.data = data;
     fixDef  = new b2FixtureDef();
        fixDef.density = data.density != null ? data.density : 1.0;
        fixDef.friction = data.friction != null ? data.friction : 0.5;
        fixDef.restitution = data.restitution != null ? data.restitution : 0.2;
	fixDef.filter.groupIndex = data.filter || 0;;
	fixDef.isSensor = data.sensor || false;	
        this.bodyDef = new b2BodyDef();
      this.bodyDef.fixedRotation = data.fixedrot || false; // Prevent any rotation
   this.bodyDef.angle = data.angle || 0;
   this.bodyDef.linearDamping = data.linearDamping || 1;
   this.bodyDef.userData = this;
        this.bodyDef.type = data.type == "static" ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;
         this.bodyDef.position = new b2Vec2(data.x/2 , data.y/2 ); 
       this.body = world.CreateBody(this.bodyDef);
    switch(data.shape) {
      case "circle":
        fixDef.shape = new b2CircleShape(data.radius);
        break;
      case "polygon":
        fixDef.shape = new b2PolygonShape();  
		fixDef.shape.SetAsArray(data.points,data.points.length);
        break;     
      case "block":     
        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(data.width, data.height);
        break;
    }

    this.body.CreateFixture(fixDef); 
}
  
	Rigid.prototype = {
        constructor: Rigid,
        update: function () { 
				var angle1 = this.body.GetAngle()*(180/Math.PI);
					  var pos1 = this.body.GetPosition();					  
					  context.save();					  
					  context.fillStyle = this.data.color;
					  context.translate( pos1.x * 30, pos1.y * 30 );
					  context.rotate( angle1 * (Math.PI/180) );
					  context.translate( -pos1.x * 30, -pos1.y * 30 );
				if(this.data.color) {					  
      switch(this.data.shape) { 
	  case "block":
					  context.fillRect( this.body.GetPosition().x*scale-this.data.width*scale,
                           this.body.GetPosition().y*scale-this.data.height*scale,
                           (this.data.width*2)*scale,
                           (this.data.height*2)*scale); 
						   break;
        case "circle": 
		context.beginPath();
					 context.arc(pos1.x * 30, pos1.y * 30, this.data.radius * 30, 0, 2 * Math.PI, false);
					 context.closePath();
					 context.fill();
          break;
        case "polygon":
					  var points = this.data.points; 
					  context.beginPath();
					  context.moveTo(this.body.GetPosition().x * scale + points[0].x * 30, this.body.GetPosition().y * scale + points[0].y * 30);
				for(var i=1;i<points.length;i++) {						 
					  context.lineTo(points[i].x * 30 + this.body.GetPosition().x* scale, points[i].y * 30 + this.body.GetPosition().y*scale);					  
					  }					    
					  context.closePath();					  
					  context.fill();			  					
		break;
      }
					  }
    if(this.data.image) {
      context.drawImage(this.data.image, this.body.GetPosition().x*scale-this.data.width*scale,
                           this.body.GetPosition().y*scale-this.data.height*scale,
                           (this.data.width*2)*scale,
                           (this.data.height*2)*scale);
    }
	if(this.data.image2) {
          var points = this.data.points;      
          for(var i=1;i<points.length;i++) {
            context.drawImage(this.data.image2,
           this.body.GetPosition().x*30  + points[0].x*30 , this.body.GetPosition().y* 30 + points[0].y*30 , points[i].x*30  - this.body.GetPosition().x/4, points[i].y*30  + this.body.GetPosition().y/4)
          };
    }
	if(this.data.image3 && contactsT == true) {  
      context.drawImage(video3, this.body.GetPosition().x*scale-this.data.width*scale, this.body.GetPosition().y*scale-this.data.height*scale,
                           (this.data.width*2)*scale, (this.data.height*2)*scale);    }
	if(this.data.image22 && contactsT == true) {  
      context.drawImage(video2, this.body.GetPosition().x*scale-this.data.width*scale, this.body.GetPosition().y*scale-this.data.height*scale,
                           (this.data.width*2)*scale, (this.data.height*2)*scale);    }
	 if(this.data.image1  && contactsT == true) {  
      context.drawImage(video1, this.body.GetPosition().x*scale-this.data.width*scale, this.body.GetPosition().y*scale-this.data.height*scale,
                           (this.data.width*2)*scale, (this.data.height*2)*scale);    }						   
	if(this.data.image4 && contactsT == true) {  
      context.drawImage(video4, this.body.GetPosition().x*scale-this.data.width*scale, this.body.GetPosition().y*scale-this.data.height*scale,
                           (this.data.width*2)*scale, (this.data.height*2)*scale);    }
	if(this.data.image5 && contactsT == true) {  
      context.drawImage(video5, this.body.GetPosition().x*scale-this.data.width*scale, this.body.GetPosition().y*scale-this.data.height*scale,
                           (this.data.width*2)*scale, (this.data.height*2)*scale);    }
	 if(this.data.image6  && contactsT == true) {  
      context.drawImage(video6, this.body.GetPosition().x*scale-this.data.width*scale, this.body.GetPosition().y*scale-this.data.height*scale,
                           (this.data.width*2)*scale, (this.data.height*2)*scale);    }
						   
					  context.restore();
			}						
	};

  
	var xA= 10, yA= 400, y2= 120,lengthA= 2000, segments= 40, segmentWidth= 1, restitution= 0, segmentHeight= 1, anchor= new b2Vec2(), prevBody= {}, bodyGroup= [],
	bodyCount= 0, lowerAngle= -21,  upperAngle= 21, enableLimit= true, id= "line";	
                                segmentWidth = ((lengthA - xA) / segments) / 2;			
		
function wor(){
if (contacts == 'wor' && drawtelefer == false) {
                        
                                // BridgeStart
                        
                                fixtureDef = new b2FixtureDef()
                                bodyShapeCircle = new b2CircleShape()
                                bodyDef = new b2BodyDef()
                                bodyDef.userData = id
                                bodyShapeCircle.m_radius = segmentHeight / scale
                                fixtureDef.density = this.density
                                fixtureDef.restitution = restitution
                                fixtureDef.friction = this.friction
                                fixtureDef.shape = bodyShapeCircle
                                bodyDef.position.Set(xA / scale, y2 / scale)
                                body = bodyGroup[0] = world.CreateBody(bodyDef)
                                bodyGroup[0].CreateFixture(fixtureDef)
                                prevBody = bodyGroup[0]
                        
                                // BridgeEnd
                                bodyDef.position.Set(lengthA / scale, y2 / scale)
                                bodyDef.userData = id
                                bodyGroup[1] = world.CreateBody(bodyDef)
                                bodyGroup[1].CreateFixture(fixtureDef)
                        
                                // bridge elements
                                fixtureDef = new b2FixtureDef()
                                bodyShapePoly = new b2PolygonShape()
                                bodyDef = new b2BodyDef()
                                bodyDef.userData = id
								bodyDef.angle=Math.PI/13                                   
                                bodyShapePoly.SetAsBox(segmentWidth / scale, segmentHeight / scale)
                                bodyDef.type = b2Body.b2_dynamicBody;
                                fixtureDef.shape = bodyShapePoly
                                fixtureDef.density = this.density
                                fixtureDef.restitution = restitution
                                fixtureDef.friction = 1
								fixtureDef.filter.groupIndex = -1 
                                jointDef = new b2RevoluteJointDef()
                                jointDef.lowerAngle = lowerAngle / Math.PI
                                jointDef.upperAngle = upperAngle / Math.PI
                                jointDef.enableLimit = enableLimit
                        
                                for (var h = 0, l = segments; h < l; h++) {
                                    bodyDef.position.Set(((xA + segmentWidth) + (segmentWidth * 2) * h) / scale, ((y2 + segmentWidth)+ (segmentWidth*0.5 ) * h)/ scale)
									 bodyGroup[h + 2] = world.CreateBody(bodyDef)
                                    bodyGroup[h + 2].CreateFixture(fixtureDef)
                                    anchor.Set((xA + (segmentWidth * 2) * h) / scale, yA / scale)
                                    jointDef.Initialize(prevBody, bodyGroup[h + 2], anchor)
                                    world.CreateJoint(jointDef)
                                    prevBody = bodyGroup[h + 2]
                                    bodyCount = h + 2
                                }
                        
                                anchor.Set((xA + (segmentWidth * 2) * segments - 1) / scale, (y2  / scale))
                                jointDef.Initialize(prevBody, bodyGroup[1], anchor)
                                world.CreateJoint(jointDef)
                        
	
  
drawtelefer=true;
	  
  fixT = new Rigid(world, {color: "brown", type: "static", sensor: true, userData: "fixT",  shape: "block", x:5, y:17, width: 1, height:0.1}); 
  fixT2 = new Rigid(world, {color: "brown", type: "static", sensor: true, userData: "fixT2",  shape: "block", x:-25, y:20, width: 0.1, height:0.5}); 
  
   
   depart = new Rigid(world, {image: crate, type: "static", userData: "Ground", fixedrot: true, density : 2, friction: 1, restitution : 0.1, shape: "block", x:132, y:59, width: 0.4, height:8.2}); 
   arrive = new Rigid(world, {image: crate, type: "static", userData: "Ground", fixedrot: true, density : 2, friction: 1, restitution : 0.1, shape: "block", x:-20, y:25, width: 10, height:0.5}); 
   arriveh = new Rigid(world, {image: crate, type: "static", userData: "Ground", fixedrot: true, density : 2, friction: 1, restitution : 0.1, shape: "block", x:-2, y:12, width: 1, height:1.5}); 
   arriveb = new Rigid(world, {image: crate, type: "static", userData: "Ground", fixedrot: true, density : 2, friction: 1, restitution : 0.1, shape: "block", x:-5, y:34, width: 0.4, height:5}); 
   	ground = new Rigid(world, {image: crate, type: "static", angle: Math.PI/13, userData: "Ground", density : 2, friction: 1, restitution : 0.1, shape: "block", x:50, y:60, width: 60, height:1}); 
 
		 care1 = new Rigid(world, {image: crate, image1: video1, video1: "movie.mp4", userData: "Care", fixedrot: true, density : 0.13, friction: 1, restitution : 0.1, shape: "block", x:30, y:35, width: 3, height:2}); 
		 care2 = new Rigid(world, {image: crate, image22: video2, video2: "001.mp4", userData: "Care", fixedrot: true, density : 0.13, friction: 1, restitution : 0.1, shape: "block", x:50, y:50, width: 3, height:2}); 
		 care3 = new Rigid(world, {image: crate, image3: video3, video3: "movie.mp4", userData: "Care", fixedrot: true, density : 0.13, friction: 1, restitution : 0.1, shape: "block", x:70, y:60, width: 3, height:2}); 
		 care4 = new Rigid(world, {color: "brown", image4: video4, video4: "001.mp4", userData: "Care", fixedrot: true, density : 0.13, friction: 1, restitution : 0.1, shape: "block", x:90, y:60, width: 3, height:2}); 
		 care5 = new Rigid(world, {color: "brown", image5: video5, video5: "movie.mp4", userData: "Care", fixedrot: true, density : 0.13, friction: 1, restitution : 0.1, shape: "block", x:110, y:65, width: 3, height:2}); 
		 care6 = new Rigid(world, {image: crate, image6: video6, video6: "movie.mp4", userData: "Care", fixedrot: true, density : 0.13, friction: 1, restitution : 0.1, shape: "block", x:10, y:35, width: 3, height:2}); 
	
	 wheel1 = new Rigid(world, {image: crate4, density: 0.8, friction : 5, restitution : 0, shape: "circle", x: 127.3 , y:  37.9 , radius: 0.8, width: 0.8, height: 0.8}); 
	 wheel2 = new Rigid(world, {image: crate4, density: 0.8, friction : 5, restitution : 0, shape: "circle",  x:  120.8 , y:  37.9 , radius: 0.8, width: 0.8, height: 0.8}); 
	 carb = new Rigid(world, {image: crate, density : 2, friction: 0.5, restitution : 0.01, shape: "block", filter: -1, x:124, y: 38, width: 3, height: 0.25}); 
revoluteJointDef = new b2RevoluteJointDef();      revoluteJointDef.enableMotor = true;
      revoluteJointDef.Initialize(carb.body, wheel1.body, wheel1.body.GetWorldCenter());
  this.motor1 = world.CreateJoint(revoluteJointDef);
      revoluteJointDef.Initialize(carb.body, wheel2.body, wheel2.body.GetWorldCenter());
  this.motor2 = world.CreateJoint(revoluteJointDef);
	carc = new Rigid(world, {image: crate, density : 0.5, friction: 1, restitution : 0.01, shape: "block", filter: -1, x:124, y: 40, width: 0.25, height: 1}); 
   	card = new Rigid(world, {image: crate, density : 0.5, linearDamping: 0.3, friction: 1, restitution : 0.01, shape: "block", filter: -1, x:124, y: 43, width: 0.25, height: 0.8}); 
       revoluteJointDef.Initialize(carb.body, carc.body, carb.body.GetWorldCenter());  
      revoluteJointDef.enableMotor = true; 		 revoluteJointDef.enableLimit = true;      world.CreateJoint(revoluteJointDef);
	        			revoluteJointDef2 = new b2RevoluteJointDef(); 
					revoluteJointDef2.bodyA=carc.body;        revoluteJointDef2.bodyB=card.body;
                   revoluteJointDef2.localAnchorA=new b2Vec2(0,0.9);            revoluteJointDef2.localAnchorB=new b2Vec2(0,-0.7);               
				   revoluteJointDef2.enableLimit = true;       revoluteJointDef2.enableMotor = true;
			 revoluteJointDef2.collideConnected = true;  
	revoluteJointDef2.lowerAngle = -90 * Math.PI/2;
	revoluteJointDef2.upperAngle = 190*Math.PI/2;  
							  pivot = world.CreateJoint(revoluteJointDef2);	pivot.SetMaxMotorTorque(30);pivot.SetMotorSpeed(0);
							  
   carf = new Rigid(world, {image: crate, density : 0.6, friction: 1, restitution : 0.1, shape: "block", x:124, y: 51.5, width: 3, height:0.25}); 
 	 	cab1 = new Rigid(world, {  filter: -3, density : 0.003, friction: 1, restitution : 0.1, shape: "block", x:124, y: 48, width: 3, height:2}); 
  revoluteJointDef.Initialize(cab1.body, card.body, cab1.body.GetWorldCenter());  col = world.CreateJoint(revoluteJointDef);
    revoluteJointDef11 = new b2RevoluteJointDef();   revoluteJointDef11.Initialize(carf.body, cab1.body, carf.body.GetWorldCenter());
 revoluteJointDef11.enableLimit = true;     revoluteJointDef11.collideConnected = false;    revoluteJointDef11.enableMotor = true;
 col = world.CreateJoint(revoluteJointDef11); 

  
    var bodyDef = new b2BodyDef;
    var fixDef = new b2FixtureDef;	
    bodyDef.type = b2Body.b2_dynamicBody;
	 bodyDef.userData = "rope";
		bodyDef.linearDamping = 0.3;
    fixDef.density = 0.2;
		fixDef.friction = 1;
  //  var tb1,tb2;
    bodyDef.position.x = 35;
    bodyDef.position.y = 35;
    var radius=0.3;
    fixDef.shape = new b2CircleShape(radius);
    tb1=world.CreateBody(bodyDef);
    //rest node
    bodyDef.type = b2Body.b2_dynamicBody;
	 bodyDef.userData = "rope";
    fixDef.shape = new b2CircleShape(radius);
    tb1.CreateFixture(fixDef);
        var rj = new b2RevoluteJointDef();
rj.enableLimit = true;       rj.enableMotor = true;
			 rj.collideConnected = false; rj.lowerAngle = -55 * Math.PI/2;
	rj.upperAngle = 55*Math.PI/2; 
     rj.bodyA=tb1;
     rj.bodyB=carf.body;
     rj.localAnchorA=new b2Vec2(0,1);
     rj.localAnchorB=new b2Vec2(0,-0.65);
	 
     looo = world.CreateJoint(rj);looo.SetMaxMotorTorque(25);

    linelist = [tb1];
     for(var i = 1; i < 5; ++i) {
       fixDef.shape = new b2CircleShape(radius);
        bodyDef.position.x = 36-i;
        bodyDef.position.y = 38.5;
	fixDef.filter.groupIndex = 1;
		fixDef.friction = 1;
		//fixDef.restitution = 0.2;
     //  fixDef.filter=ropeFilter;
	 bodyDef.userData = "rope";
        tb2=world.CreateBody(bodyDef);
        tb2.CreateFixture(fixDef);
     var rj = new b2RevoluteJointDef();
rj.enableLimit = true;       rj.enableMotor = true;
			 rj.collideConnected = false; rj.lowerAngle = -275 * Math.PI/2;
	rj.upperAngle = 275*Math.PI/2;   
        rj.bodyA=tb1;
        rj.bodyB=tb2;
        if(i==1){
            rj.localAnchorA=new b2Vec2(0,0);
            rj.localAnchorB=new b2Vec2(0,radius);
        }else{
            rj.localAnchorA=new b2Vec2(0,-radius);
            rj.localAnchorB=new b2Vec2(0,radius);
        }
      lo =   world.CreateJoint(rj);lo.SetMaxMotorTorque(5);
        linelist[i]=tb2;
        tb1=tb2;
    
	}
	
    //right forearm
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(1.8, 0.1);
    bodyDef.position.Set(110, 20);
	bodyDef.fixedRotation = false;
		bodyDef.userData = "Sens";
		fixDef.density = 0.15;
		fixDef.friction = 1;
		//fixDef.restitution = 0.2;
   // fixDef.filter=ropeFilter2;
    bodyFlyManForearmR=world.CreateBody(bodyDef);
    bodyFlyManForearmR.CreateFixture(fixDef);
     //connect fly man to rope
     var rj2 = new b2RevoluteJointDef();
     rj2.bodyA=tb2;
     rj2.bodyB=bodyFlyManForearmR;  
     rj2.localAnchorA=new b2Vec2(0,-radius);
     rj2.localAnchorB=new b2Vec2(0,-0.5); 
	 rj2.collideConnected = true;
      world.CreateJoint(rj2);
	
		var bodyDef = new b2BodyDef;
		bodyDef.type = b2Body.b2_dynamicBody;	
		bodyDef.position.Set(65,30);
		bodyDef.linearDamping = 0.3;
	bodyDef.fixedRotation = true;
		var fixDef2 = new b2FixtureDef;
		fixDef2.shape = new b2PolygonShape();
		fixDef2.shape.SetAsBox(1.8,1.5); 
		fixDef2.density = 0;
		fixDef2.isSensor = true; 
      wheel = world.CreateBody(bodyDef);
		wheel.CreateFixture(fixDef2);	
     var rj3 = new b2DistanceJointDef();
			 rj2.length = 0.011;
			 rj3.collideConnected = true; 
        rj3.frequencyHz = 0;
        rj3.dampingRatio = 1;
     rj3.bodyA=wheel;
     rj3.bodyB=bodyFlyManForearmR;
     rj3.localAnchorA=new b2Vec2(0,-0.4);
     rj3.localAnchorB=new b2Vec2(0,0);
   loo = world.CreateJoint(rj3);//loo.SetMaxMotorTorque(55);
       
	droid.body.SetPosition( new b2Vec2( carf.body.GetPosition().x-2, carf.body.GetPosition().y-2 ) );  
	droid.body.SetLinearVelocity( new b2Vec2( 0, droid.body.GetLinearVelocity().y ) );	
	contacts = null; 
drawtelefer = true;
}
	
	if(drawtelefer && !drawater){
       this.motor1.SetMotorSpeed(speedT * Math.PI * directionT);
      this.motor1.SetMaxMotorTorque(torque);
      this.motor2.SetMotorSpeed(speedT * Math.PI * directionT);
      this.motor2.SetMaxMotorTorque(torque);
		
		//context.save();
        context.translate(canvasOffset.x, canvasOffset.y);
        context.scale(1,1);
        context.scale(PTM,PTM);
        context.lineWidth /= PTM; 
		//context.restore();
  
	 if(magnet)  {
		PTM += 0.005;
    if (PTM > 2.2){ PTM = 2.2};  }
	if(!magnet) {PTM -= 0.025; if (PTM < 1){ PTM = 1};}
		
context.globalAlpha = animLevel4T, animLevel4T += .025; 
		if (animLevel4T > 1) {animLevel4T = 1;}
		context.drawImage( fond2,-740, -160, 3200,1500 ); 
	 var pos;
        var pos1;
		context.lineWidth = 1;
        for(var i=0;i<linelist.length-1;++i){ //draw rope
            pos = linelist[i].GetPosition();
            pos1 = linelist[i+1].GetPosition();
			context.strokeStyle = "yellow";
            context.beginPath();
            context.moveTo(pos.x*30,pos.y*30);
            context.lineTo(pos1.x*30,pos1.y*30);
            context.closePath();
            context.stroke();
        }
        if(linelist.length!=0){
            var posArm=bodyFlyManForearmR.GetPosition();
			context.strokeStyle = "red";
            context.beginPath();
            context.moveTo(pos1.x*30,pos1.y*30);
            context.lineTo(posArm.x*30,posArm.y*30);
            context.closePath();
            context.stroke();
        } 
		
        var fPos=bodyFlyManForearmR.GetPosition();
        var angle=bodyFlyManForearmR.GetAngle();
        context.translate(fPos.x*30-offsetX*30,fPos.y*30+offsetY*30);
        context.rotate(angle);
        context.drawImage(imgFlyManForarm,-6,-15,12,30);
        context.rotate(-angle);
        context.translate(-fPos.x*30+offsetX*30,-fPos.y*30-offsetY*30);
		
   for (b = world.GetBodyList() ; b; b = b.GetNext())
			{
				var angle = b.GetAngle()*(180/Math.PI);
				 if (b.GetUserData() == "line")
				  {	
					  var pos = b.GetPosition();					  
					  context.save();					  
					  context.translate( pos.x * 30, pos.y * 30 );
					  context.rotate( angle * (Math.PI/180) );
					  context.translate( -pos.x * 30, -pos.y * 30 );					  
					  context.lineWidth = 1;
					  //context.strokeStyle = "rgb(33, 212, 125)";
					  context.strokeStyle = "rgb(255, 40, 100)";
					  //context.strokeRect(((pos.x * 30) - segmentWidth), ((pos.y * 30) - segmentHeight), segmentWidth , segmentHeight);
					  context.fillStyle = "rgb(255, 40, 100)";
					  context.fillRect( (pos.x * 30)- segmentWidth*2, (pos.y * 30) - segmentHeight*2,segmentWidth*2+2 , segmentHeight*2+2);					  
					  context.restore();					  
				   } 			   		
				   }
		depart.update();
		arrive.update();
		arriveh.update();
		arriveb.update(); 
 wheel1.update();
	wheel2.update();
		carb.update();
	carc.update();
	card.update();
		//fixT.update();
		//fixT2.update();
       if(magnet){
	  
			
				makeParticle(1);		
				for (i=0; i<particles.length; i++)
				{
					var particle = particles[i]; 		
					particle.render(context); 
					particle.update();			
				}								 
				while(particles.length>MAX_PARTICLES)
					particles.shift(); 
	 }
care1.update();
		care2.update();
		care3.update();
		care4.update();
		care5.update();
		care6.update();
     
		}
if (contacts == "telefer_end2" ) {
destroytelefer(); 
	droid.body.SetPosition( new b2Vec2( 55/scale, -520/scale ) ); 
	droid.body.SetLinearVelocity( new b2Vec2( 0, droid.body.GetLinearVelocity().y ) );
drawtelefer = false;
	contacts = null; 
	animLevel = 0.3;
	animLevel3 = 0;
	animLevel4 = 0;
	animLevel4T = 0;
	ang = 0;
	}
	}
document.addEventListener("keydown", function(e) { if(drawtelefer && moveDroid == false){
        switch (event.keyCode) {
             case 39 :	
			directionT = 1;  audioT.play(); magnet=false;	if (loo.m_length > 1) { loo.m_length -= (2 );  }; $("#theVideo").attr("src", "about:blank");  
			 $("#theVideo2").attr("src", "about:blank"); $("#theVideo3").attr("src", "about:blank"); $("#theVideo4").attr("src", "about:blank"); 
			  $("#theVideo6").attr("src", "about:blank"); $("#theVideo5").attr("src", "about:blank"); contactsT=false; //zoomOut();
           break;           
            case 37 :	
			directionT = -1; audioT.play(); magnet=false;	if (loo.m_length > 1) { loo.m_length -= (2 );  }; $("#theVideo").attr("src", "about:blank"); 
			  $("#theVideo2").attr("src", "about:blank"); $("#theVideo3").attr("src", "about:blank"); $("#theVideo4").attr("src", "about:blank"); 
			  $("#theVideo6").attr("src", "about:blank"); $("#theVideo5").attr("src", "about:blank"); contactsT=false; //zoomOut();
		    break;
          case 40 :	 
		  audioT2.play(); magnet=true; if (loo.m_length < 1.8) {loo.m_length += (2 );}; //zoomIn();
		}
        } // CONTROLS 
	  
	   }, false)
	
	document.addEventListener('keyup', function(e) { 
				switch (event.keyCode) {	
				case 37 :
				directionT = 0; audioT.pause();
				break; 
				case 39: 
				directionT = 0; audioT.pause();
				break;		
				case 40: 
				audioT2.pause();
				break;				 
				}					
					}, false);
  
		
		
		
		
		
			var listener2 = new Box2D.Dynamics.b2ContactListener;
			listener2.BeginContact = function(contact){ 
			fxA=contact.GetFixtureA(); // 1st COLLISION FIXTURE
			 fxB=contact.GetFixtureB(); // 2nd COLLISION FIXTURE
			 sA=fxA.IsSensor(); // Will store whether 1st fixture is a sensor or not (true or false)
			 sB=fxB.IsSensor(); // Will store whether 2nd fixture is a sensor or not (true or false)
if(fxA.GetBody() == droid.body && fxB.GetBody().GetUserData().data.userData === "fixT2") { drawtelefer = false;contacts = "telefer_end2";  audio.play();  } 
if(fxA.GetBody() == droid.body && fxB.GetBody().GetUserData().data.userData === "fixT")	{ contacts = "telefer_end";  audio.play(); moveDroid = true } 
if(fxA.GetBody().GetUserData() == "Sens" && fxB.GetBody().GetUserData().data.userData === "Care") { contactsT=true; } 

			 if((sA && !sB) || (sB && !sA))	{ // Will go on further iff Fixture A or B not both are sensors.
				 if(sA)	{						
					 var bodyB = fxB.GetBody();
					 pull.push(bodyB);
							if(magnet == true ){$("#theVideo").attr("src", bodyB.GetUserData().data.video1).get(0).play();} ;
							if(magnet == true ){$("#theVideo2").attr("src", bodyB.GetUserData().data.video2).get(0).play();} ;
							if(magnet == true ){$("#theVideo3").attr("src", bodyB.GetUserData().data.video3).get(0).play();} ;
							if(magnet == true ){$("#theVideo4").attr("src", bodyB.GetUserData().data.video4).get(0).play();} ;
							if(magnet == true ){$("#theVideo5").attr("src", bodyB.GetUserData().data.video5).get(0).play();} ;
							if(magnet == true ){$("#theVideo6").attr("src", bodyB.GetUserData().data.video6).get(0).play();} ;
					 //console.log(fxB.GetBody().GetUserData());
				 }
				 else	{
				 if(fxB.GetBody() == droid.body && fxA.GetBody().GetUserData().data.userData === "fixT2")	{
				drawtelefer = false;contacts = "telefer_end2";  audio.play();  } 
				 if(fxB.GetBody() == droid.body && fxA.GetBody().GetUserData().data.userData === "fixT")	{
				contacts = "telefer_end";  audio.play(); moveDroid = true } 
				 if(fxB.GetBody().GetUserData() == "Sens" && fxA.GetBody().GetUserData().data.userData === "Care")	{
				 contactsT=true; } 
						
					 var bodyA = fxA.GetBody();
					 pull.push(bodyA);
							if(magnet == true ){$("#theVideo").attr("src", bodyA.GetUserData().data.video).get(0).play();} 
					 //console.log(fxA.GetBody().GetUserData()); 
				 }
			}
			}
			listener2.EndContact = function(contact){
			 fxA=contact.GetFixtureA(); // 1st COLLISION FIXTURE
			 fxB=contact.GetFixtureB(); // 2nd COLLISION FIXTURE
			 sA=fxA.IsSensor(); // Will store whether 1st fixture is a sensor or not (true or false)
			 sB=fxB.IsSensor(); // Will store whether 2nd fixture is a sensor or not (true or false)
			 if((sA && !sB) || (sB && !sA))	{ // Will go on further iff Fixture A or B not both are sensors.
				 if(sA)	{
					 var bodyB = fxB.GetBody();
					 var index = pull.indexOf(bodyB);
					 pull.splice(index,1); 
					 //console.log(pull);
				 }
				 else	{
					 var bodyA = fxA.GetBody();
					 var index = pull.indexOf(bodyA);
					 pull.splice(index,1);
					 //console.log(pull);
				 }
			 }
			}

			
	
	function makeParticle(particleCount) {			
				for(var i=0; i<particleCount;i++) {
					var particle = new ImageParticle(particleImage, bodyFlyManForearmR.GetPosition().x*30, bodyFlyManForearmR.GetPosition().y*30); 										
					particle.velX = randomRange(-0.5,0.5);
					particle.velY = randomRange(-0.8,0.4);
					particle.size = randomRange(0.1,0.6);
					particle.maxSize = 1.5; 
					particle.alpha = randomRange(0.2,0.3);
					particle.gravity = 0.15; 
					particle.drag = 0.96;
					particle.shrink = 1.04; 
					particle.fade = 0.005; 
					particles.push(particle); 					
				}			
			}
			
function randomRange(min,max)
{return((Math.random()*(max-min))+ min);}			
function ImageParticle(img,posx,posy)
{this.posX=posx;this.posY=posy;this.velX=0;this.velY=0;this.shrink=1;this.size=1;this.maxSize=-1;this.drag=1;
this.gravity=0;this.alpha=1;this.fade=0;this.spin=0;this.rotation=0;this.compositeOperation='source-over';this.img=img;
this.update=function()
{this.velX*=this.drag;this.velY*=this.drag;this.velY+=this.gravity;this.posX+=this.velX;this.posY+=this.velY;this.size*=this.shrink;
if((this.maxSize>0)&&(this.size>this.maxSize))
this.size=this.maxSize;this.alpha-=this.fade;
if(this.alpha<0)this.alpha=0;this.rotation+=this.spin;}
this.render=function(c)
{if(this.alpha==0)return;
c.save();
c.translate(this.posX,this.posY);
c.scale(this.size,this.size);
c.rotate(this.rotation*TO_RADIANS);
c.translate(img.width*-0.5,img.width*-0.5);
c.globalAlpha=this.alpha;
c.globalCompositeOperation=this.compositeOperation;
c.drawImage(img,0,0);
c.restore();}}
  
   
			destroytelefer = function() {  	
				for(body = world.GetBodyList(); body; body = body.GetNext()) {
				if(body.GetUserData() == "rope") {world.DestroyBody(body);};if(body.GetUserData() == "line") {world.DestroyBody(body);}};
			world.DestroyBody(wheel); world.DestroyBody(bodyFlyManForearmR);
			world.DestroyBody(wheel1.body); world.DestroyBody(wheel2.body); world.DestroyBody(carb.body); 
			 world.DestroyBody(carc.body);  world.DestroyBody(card.body); world.DestroyBody(carf.body); world.DestroyBody(cab1.body);
 world.DestroyBody(care1.body); world.DestroyBody(care2.body); world.DestroyBody(care3.body); world.DestroyBody(care4.body);
		 world.DestroyBody(care5.body); world.DestroyBody(care6.body);	world.DestroyBody(fixT.body); world.DestroyBody(fixT2.body);
		 world.DestroyBody(depart.body);
		 world.DestroyBody(arrive.body);
		 world.DestroyBody(arriveh.body);
		 world.DestroyBody(arriveb.body); 	
		 drawtelefer=false; contactsT=false;
			}
  
