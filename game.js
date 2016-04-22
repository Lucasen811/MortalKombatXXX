var canvas = document.getElementsByTagName('canvas')[0];
var width, height;

var resize = window.onresize = function() {
  canvas.width = (width = canvas.clientWidth) * devicePixelRatio;
  canvas.height = (height = canvas.clientHeight) * devicePixelRatio;
}

window.onblur = function(e) {
  keys = [];
  mouse_buttons = [];
}

resize();

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();
// This function will return the time in seconds since the function 
// was last called
// You should only call this function once per frame
function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();

		// Find the delta time (dt) - the change in time since the last drawFrame
		// We need to modify the delta time to something we can use.
		// We want 1 to represent 1 second, so if the delta is in milliseconds
		// we divide it by 1000 (or multiply by 0.001). This will make our 
		// animations appear at the right speed, though we may need to use
		// some large values to get objects movement and rotation correct
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	
		// validate that the delta is within range
	if(deltaTime > 1)
		deltaTime = 1;
		
	return deltaTime;
}

var ctx = canvas.getContext('2d');
ctx.scale(devicePixelRatio, devicePixelRatio); // For high dpi display support

var LEFT_ARROW = 37;
var UP_ARROW = 38;
var RIGHT_ARROW = 39;
var DOWN_ARROW = 40;
var SPACE = 32;
var KEY_W = 87;
var KEY_A = 65;
var KEY_S = 83;
var KEY_D = 68;
var SHIFT = 16;
var KEY_C = 67;
var KEYPAD_0 = 96;
var DECIMAL_POINT = 110;

var LEFT_MOUSE = 0;
var MIDDLE_MOUSE = 1;
var RIGHT_MOUSE = 2;

var keys = [];

window.onkeydown = function(e) {
  keys[e.keyCode] = true;
}

window.onkeyup = function(e) {
  keys[e.keyCode] = false;
}

var mouse_x = 0;
var mouse_y = 0;

canvas.onmousemove = function(e) {
  mouse_x = e.clientX;
  mouse_y = e.clientY;
}

var last_mouse_buttons = [];
var mouse_buttons = [];

canvas.onmousedown = function(e) {
  mouse_buttons[e.button] = true;
}
canvas.onmouseup = function(e) {
  mouse_buttons[e.button] = false;
}



var tileset = new Image();
tileset.src = "tileset.png";

//creating varables so that future text is easier to understand/read
var margin = level1.tilesets[0].margin;
var spacing = level1.tilesets[0].spacing;
var tileheight = level1.tilesets[0].tileheight;
var tilewidth = level1.tilesets[0].tilewidth;
var columns = level1.tilesets[0].columns;

var LEFT = 0;
var RIGHT = 1;

//player obj
var player = {
  ammo:1,
  x:130,
  y:700,
  vel_x:0,
  vel_y:0,
  width:174/2,
  height:264/2,
  health:100,
  powerup:0,
  left_key:KEY_A,
  right_key:KEY_D,
  jump_key:KEY_W,
  up_key:KEY_W,
  down_key:KEY_S,
  shoot_key:SPACE,
  punch_key:KEY_C,
  facing_direction:RIGHT,
  grounded:true,
};

//player 2 obj
var player2 = {
  ammo:1,
  x:1330,
  y:700,
  vel_x:0,
  vel_y:0,
  width:138/2,
  height:258/2,
  health:100,
  powerup:0,
  left_key:LEFT_ARROW,
  right_key:RIGHT_ARROW,
  jump_key:UP_ARROW,
  up_key:UP_ARROW,
  down_key:DOWN_ARROW,
  shoot_key:DECIMAL_POINT,
  punch_key:KEYPAD_0,
  facing_direction:LEFT,
  grounded:true,
};

var bullets_baraka = [];
var bullets_suijin = [];

var camera = {x:750, y:450};
var screen_center = {x:width/2, y:height/2};

//overlapping function is used to determin whether two objects are overlapping or not by calculating the x, y, width and height of both tiles
function overlapping(x1, y1, w1, h1,   x2, y2, w2, h2) 
{
  if ( y1 + h1 > y2 &&
  y1 < y2 + h2 &&
  x1 + w1 > x2 &&
  x1 < x2 + w2 )
  {
    return true;
  }
  else
  {
    return false;
  }
}

var player_bullet_cooldown = 0;
var player2_bullet_cooldown = 0;

var is_round1 = true;
var is_round2 = false;
var is_round3 = false;
var game_over = false;

var player_hit = 0;
var player2_hit = 0;

var player_reload_cooldown = 0;
var player2_reload_cooldown = 0;

var timer_for_fight = 0;
var timer_for_round = 120;

var Round1 = new Image();
Round1.src = "Round1.png";

var Round2 = new Image();
Round2.src = "Round2.png";

var Round3 = new Image();
Round3.src = "Round3.png";

var Fight = new Image();
Fight.src = "Fight!.png";

var baraka_wins = new Image();
baraka_wins.src = "Health_Bar.png";

var suijin_wins = new Image();
suijin_wins.src = "Health_Bar.png";

var HealthBar = new Image();
HealthBar.src = "Health_Bar.png";

var HealthBarFrame = new Image();
HealthBarFrame.src = "Health_Bar_Frame.png";

var PowerupBar = new Image();
PowerupBar.src = "PowerUp_Bar.png";

var PowerupBarFull = new Image();
PowerupBarFull.src = "PowerUp_Bar.png";

var PowerupBarFrame = new Image();
PowerupBarFrame.src = "PowerUp_Bar_Frame.png";

var bullet_baraka_right = new Image();
bullet_baraka_right.src = "Baraka_Bullet_Right.png"
var bullet_baraka_left = new Image();
bullet_baraka_left.src = "Baraka_Bullet_Left.png"

var Baraka_Right_Still = new Image();
Baraka_Right_Still.src = "Baraka_Right_Still.png";
var Baraka_Left_Still = new Image();
Baraka_Left_Still.src = "Baraka_Left_Still.png";

var Baraka_Fight_Right = new Image();
Baraka_Fight_Right.src = "Baraka_Fight_Right.png";
var Baraka_Fight_Left = new Image();
Baraka_Fight_Left.src = "Baraka_Fight_Left.png";

var Baraka_Shoot_Right = new Image();
Baraka_Shoot_Right.src = "Baraka_Shoot_Right.png";
var Baraka_Shoot_Left = new Image();
Baraka_Shoot_Left.src = "Baraka_Shoot_Left.png";

var bullet_baraka_right = new Image();
bullet_baraka_right.src = "Baraka_Bullet_Right.png"
var bullet_baraka_left = new Image();
bullet_baraka_left.src = "Baraka_Bullet_Left.png"


var Suijin_Right_Still = new Image();
Suijin_Right_Still.src = "Suijin_Right_Still.png";
var Suijin_Left_Still = new Image();
Suijin_Left_Still.src = "Suijin_Left_Still.png";

var Suijin_Fight_Right = new Image();
Suijin_Fight_Right.src = "Suijin_Fight_Right.png";
var Suijin_Fight_Left = new Image();
Suijin_Fight_Left.src = "Suijin_Fight_Left.png";

var suijin_bullet_right = new Image();
suijin_bullet_right.src = "Suijin_Bullet_Right.png"
var suijin_bullet_left = new Image();
suijin_bullet_left.src = "Suijin_Bullet_Left.png"

var PowerupBar_Particle = createPowerupBar_Particle("star.png", 470, 100);
var PowerupBar_Particle2 = createPowerupBar_Particle("star.png", 1200, 100);

var Baraka_Shoot = [];

for ( var i = 0; i < 10; ++i )
{
  var new_sound = new Audio("Baraka_Shoot.mp3");
  new_sound.loop = false;

  Baraka_Shoot.push(new_sound);
}

var Suijin_Shoot = [];

for ( var i = 0; i < 10; ++i )
{
  var new_sound = new Audio("Suijin_Shoot.mp3");
  new_sound.loop = false;

  Suijin_Shoot.push(new_sound);
}



var reload_cooldown = 0;


function player_collisions(player, player2)
{
	if ( overlapping(player.x, player.y, player.width, player.height,
                                  player2.x, player2.y, player2.width, player2.height) )
          {
            var pleft_to_p2right = (player2.x + player2.width) - player.x;
            var pright_to_p2left = (player.x + player.width) - player2.x;
            var ptop_to_p2bottom = (player2.y + player2.height) - player.y;
            var pbottom_to_p2top = (player.y + player.height) - player2.y;

            var smallest = Math.min(pleft_to_p2right, pright_to_p2left, pbottom_to_p2top, ptop_to_p2bottom);

            if (pleft_to_p2right === smallest)
            {
              player.vel_x = 0;
			  player2.vel_x = 0;
              player.x = player2.x + player2.width;
			  player2.x = player.x - player.width;
            }
            else if (pright_to_p2left === smallest)
            {
              player.vel_x = 0;
			  player2.vel_x = 0;
              player.x = player2.x - player.width;
			  player2.x = player.x + player.width;
            }

            else if (ptop_to_p2bottom === smallest)
            {
              player.vel_y = 0;
			  player2.vel_y = 0;
              //player.y = player2.y + player2.height;
			  player2.y = player.y - player.height;
			  player2.grounded = true;
            }
            else if (pbottom_to_p2top === smallest)
            {
              player.vel_y = 0;
			  player2.vel_y = 0;
              player.y = player2.y - player.height;
			  //player2.y = player.y + player2.height;
              player.grounded = true;
            }
          }
}

function player_bullet_collisions(player, bullets_suijin)
{
	if ( overlapping(player.x, player.y, player.width, player.height,
                                  bullets_suijin.x, bullets_suijin.y, bullets_suijin.width, bullets_suijin.height) )
          {
            var pleft_to_bright = (bullets_suijin.x + bullets_suijin.width) - player.x;
            var pright_to_bleft = (player.x + player.width) - bullets_suijin.x;
            var ptop_to_bbottom = (bullets_suijin.y + bullets_suijin.height) - player.y;
            var pbottom_to_btop = (player.y + player.height) - bullets_suijin.y;

            var smallest = Math.min(pleft_to_bright, pright_to_bleft, pbottom_to_btop, ptop_to_bbottom);

            if (pleft_to_bright === smallest)
            {
			 player.health -= 4;
			 player2.powerup += 4;
			 return true;
            }
            else if (pright_to_bleft === smallest)
            {
			  player.health -= 4;
			  player2.powerup += 4;
			  return true;
            }

            else if (ptop_to_bbottom === smallest)
            {
			  player.health -= 4;
			  player2.powerup += 4;
			  return true;
            }
            else if (pbottom_to_btop === smallest)
            {
			  player.health -= 4;
			  player2.powerup += 4;
			  return true;
            }
          }
		  else { // not hit
			  return false;
		  }
}

function player2_bullet_collisions(player2, bullets_baraka)
{
	if ( overlapping(player2.x, player2.y, player2.width, player2.height,
                                  bullets_baraka.x, bullets_baraka.y, bullets_baraka.width, bullets_baraka.height) )
          {
            var p2left_to_bright = (bullets_baraka.x + bullets_baraka.width) - player2.x;
            var p2right_to_bleft = (player2.x + player2.width) - bullets_baraka.x;
            var p2top_to_bbottom = (bullets_baraka.y + bullets_baraka.height) - player2.y;
            var p2bottom_to_btop = (player2.y + player2.height) - bullets_baraka.y;

            var smallest = Math.min(p2left_to_bright, p2right_to_bleft, p2bottom_to_btop, p2top_to_bbottom);

            if (p2left_to_bright === smallest)
            {
			 player2.health -= 4;
			 player.powerup += 4;
			 return true;
            }
            else if (p2right_to_bleft === smallest)
            {
			  player2.health -= 4;
			  player.powerup += 4;
			  return true;
            }

            else if (p2top_to_bbottom === smallest)
            {
			  player2.health -= 4;
			  player.powerup += 4;
			  return true;
            }
            else if (p2bottom_to_btop === smallest)
            {
			  player2.health -= 4;
			  player.powerup += 4;
			  return true;
            }
          }
		  else { // not hit
			  return false;
		  }
}

function platforms(player, layer, world_x, world_y, tilewidth, tileheight) {
	        //using the Math.min function, we are able to find out whther 
        //we are overlapping with a tile from the Platforms layer and 
        //if so the Math.min function helps us find out which side are
        //we overlapping with and how to deal with it (as in if it 
        //bounces us off the walls for example)
        if ( level1.layers[layer].name === "Platforms" )
        {
          if ( overlapping(player.x, player.y, player.width, player.height,
                                  world_x, world_y, tilewidth, tileheight) )
          {
            var pleft_to_tright = (world_x + tilewidth) - player.x;
            var pright_to_tleft = (player.x + player.width) - world_x;
            var ptop_to_tbottom = (world_y + tileheight) - player.y;
            var pbottom_to_ttop = (player.y + player.height) - world_y;

            var smallest = Math.min(pleft_to_tright, pright_to_tleft, pbottom_to_ttop, ptop_to_tbottom);

            if (pleft_to_tright === smallest)
            {
              player.vel_x = 0;
              player.x = world_x + tilewidth;
            }
            else if (pright_to_tleft === smallest)
            {
              player.vel_x = 0;
              player.x = world_x - player.width;
            }

            else if (ptop_to_tbottom === smallest)
            {
              player.vel_y = 0;
              player.y = world_y + tileheight;
            }
            else if (pbottom_to_ttop === smallest)
            {
              player.vel_y = 0;
              player.y = world_y - player.height;
              player.grounded = true;
            }
          }
        }
		
		if ( level1.layers[layer].name === "Walls" )
        {
          if ( overlapping(player.x, player.y, player.width, player.height,
                                  world_x, world_y, tilewidth, tileheight) )
          {
            var pleft_to_tright = (world_x + tilewidth) - player.x;
            var pright_to_tleft = (player.x + player.width) - world_x;
            var ptop_to_tbottom = (world_y + tileheight) - player.y;
            var pbottom_to_ttop = (player.y + player.height) - world_y;

            var smallest = Math.min(pleft_to_tright, pright_to_tleft, pbottom_to_ttop, ptop_to_tbottom);

            if (pleft_to_tright === smallest)
            {
              player.vel_x = 0;
              player.x = world_x + tilewidth;
            }
            else if (pright_to_tleft === smallest)
            {
              player.vel_x = 0;
              player.x = world_x - player.width;
            }

            else if (ptop_to_tbottom === smallest)
            {
              player.vel_y = 0;
              player.y = world_y + tileheight;
            }
            else if (pbottom_to_ttop === smallest)
            {
              player.vel_y = 0;
              player.y = world_y - player.height;
              player.grounded = true;
            }
          }
        }
}

  function movement(player) 
  {
  if (keys[player.right_key] )
  {
    player.vel_x = 10;
    player.facing_direction = RIGHT;
  }
  if (keys[player.left_key] )
  {
    player.vel_x = -10;
    player.facing_direction = LEFT;
  }

  if (keys[player.jump_key] && player.grounded)
  {
    player.vel_y = -30;
    player.grounded = false;
    if (player.facing_direction === RIGHT)
    {
    }
    else if (player.facing_direction === LEFT)
    {
    }
  }

  var gravity = 1.8;

  player.vel_y += gravity;

  player.x += player.vel_x;
  player.y += player.vel_y;

  //Checking if player has fallen out of the world and if he has respawn him
  if ( player.y > level1.height * tileheight )
  {
      player.x = 400;
      player.y = 1400;
  }
  }
  
//main function that runs all my code
function frame() {


    ctx.fillStyle = '#d9d9d9';
    ctx.fillRect(0, 0, width, height);

    //creating an offset of the screen
    var vector_to_camera = {
      x:camera.x - screen_center.x,
      y:camera.y - screen_center.y
    };
	
	var deltaTime = getDeltaTime();

	PowerupBar_Particle.update(deltaTime);
	PowerupBar_Particle2.update(deltaTime);

	//using arrays and objects, we created this for loop so that we can
	//search through every layer in our map and every tile in our layers and...
	for (var layer = 0; layer < level1.layers.length ; ++layer )
	{
		var data = level1.layers[layer].data
		for (var tile = 0; tile < data.length ; ++tile )
		{
			if ( data[tile] != 0)
			{
				var tile_index = data[tile];
				//making the tiles use zero indexing which means they start from zero so the first tile is number 0
				var tile_x = (tile_index - 1) % columns;
				var tile_y = Math.floor((tile_index - 1) / columns);

				//making it VERY easy to locate the EXACT x and y of a tile from a tileset
				var pixel_x = margin + (tile_x * (tilewidth + spacing));
				var pixel_y = margin + tile_y * spacing + tile_y * tileheight;

				//finding actual the x and y inside the screen where we want to place the tiles 
				var world_x = tile % level1.width;
				var world_y = Math.floor(tile / level1.width);

				world_x *= tilewidth;
				world_y *= tileheight;
	  
				//drawing ALL the tiles!
				ctx.drawImage(tileset, pixel_x, pixel_y, tilewidth, tileheight,
				(world_x - vector_to_camera.x)/2,
				(world_y - vector_to_camera.y)/2, 
				tilewidth+1, tileheight+1)

				player_collisions(player, player2);

				platforms(player, layer, world_x/2, world_y/2, tilewidth/2, tileheight/2);
				platforms(player2, layer, world_x/2, world_y/2, tilewidth/2, tileheight/2);
			}
		}
	}

	//setting the player's speed to zero so that straight after
	//this line of code, once we set the keys to make the player 
	//move, we can make sure that the keys make the player move 
	//instead of the player already automatically moving

	player.vel_x = 0;
	player2.vel_x = 0;

	//Calling our movement function for both players
	movement(player);
	movement(player2);

	//testing mouse poop
	if ( mouse_buttons[LEFT_MOUSE] && !last_mouse_buttons[LEFT_MOUSE] )
	{
		var screenx = player.x - vector_to_camera.x;
		var screeny = player.y - vector_to_camera.y;

		if ( mouse_x > 1200 && mouse_x < 1333 &&
			mouse_y > 20 && mouse_y < 153 )
		{
			console.log("Doing it")
		}
	}  

  //setting up bullet stuff for both players
  if (player_bullet_cooldown > 0)
  player_bullet_cooldown--;

  if (player2_bullet_cooldown > 0)
  player2_bullet_cooldown--;

  if ( player_reload_cooldown <= 0 && player.ammo === 0)
  {
    player.ammo = 1;
  }
  player_reload_cooldown--;
  
  if ( player2_reload_cooldown <= 0 && player2.ammo === 0)
  {
    player2.ammo = 1;
  }
  player2_reload_cooldown--;

  //bullets for player 1
  if ( keys[player.shoot_key] && player_bullet_cooldown == 0 && player_reload_cooldown <= 0 && player.ammo > 0)
  {

    var bullet = {
      x:0,
      y:0,
      vel_x:0,
      vel_y:0,
      width:114,
      height:66,
      alive:false,
      damage:8,
      facing_direction:RIGHT
    };

    bullet.x = player.x + 40;
    bullet.y = player.y + 14;
    bullet.facing_direction = player.facing_direction;

    if ( player.facing_direction === LEFT)
    {
      bullet.vel_x = -15;
    }
    else if ( player.facing_direction === RIGHT)
    {
      bullet.vel_x = 15;
    }

    bullet.alive = true;
    bullets_baraka.push(bullet);

    player.ammo--;
    if ( player.ammo === 0)
    {
      player_reload_cooldown = 100;
    }


    for ( var i = 0; i < Baraka_Shoot.length; ++i )
    {
      if ( Baraka_Shoot[i].paused === true )
      {
        Baraka_Shoot[i].play();
        break;
      }
    }

    player_bullet_cooldown = 5;
  }
  
  //bullets for player 2
  if ( keys[player2.shoot_key] && player2_bullet_cooldown == 0 && player2_reload_cooldown <= 0 && player2.ammo > 0)
  {

    var bullet = {
      x:0,
      y:0,
      vel_x:0,
      vel_y:0,
      width:114,
      height:66,
      alive:false,
      damage:3,
      facing_direction:RIGHT
    };

    bullet.x = player2.x;
    bullet.y = player2.y + 25;
    bullet.facing_direction = player2.facing_direction;

    if ( player2.facing_direction === LEFT)
    {
      bullet.vel_x = -15;
    }
    else if ( player2.facing_direction === RIGHT)
    {
      bullet.vel_x = 15;
    }

    bullet.alive = true;
    bullets_suijin.push(bullet);

    player2.ammo--;
    if ( player2.ammo === 0)
    {
      player2_reload_cooldown = 100;
    }


    for ( var i = 0; i < Suijin_Shoot.length; ++i )
    {
      if ( Suijin_Shoot[i].paused === true )
      {
        Suijin_Shoot[i].play();
        break;
      }
    }

    player2_bullet_cooldown = 5;
  }

  for ( var i = 0 ; i < bullets_baraka.length ; ++i )
  {  
    if ( bullets_baraka[i].alive )
    {
      bullets_baraka[i].x += bullets_baraka[i].vel_x;

      var screen_x = bullets_baraka[i].x - vector_to_camera.x;
      var screen_y = bullets_baraka[i].y - vector_to_camera.y;

      if ( screen_x < 0 ||
          screen_x > width ||
          screen_y < 0 ||
          screen_y > height)
      {
        bullets_baraka.splice(i, 1);
        --i;
      }
	  else if (player2_bullet_collisions(player2, bullets_baraka[i]))
	  {
		  bullets_baraka.splice(i, 1);
		  --i;
	  }
    }
  }
  
    for ( var i = 0 ; i < bullets_suijin.length ; ++i )
  {  
    if ( bullets_suijin[i].alive )
    {
      bullets_suijin[i].x += bullets_suijin[i].vel_x;

      var screen_x = bullets_suijin[i].x - vector_to_camera.x;
      var screen_y = bullets_suijin[i].y - vector_to_camera.y;

      if ( screen_x < 0 ||
          screen_x > width ||
          screen_y < 0 ||
          screen_y > height)
      {
        bullets_suijin.splice(i, 1);
        --i;
      }
	  else if (player_bullet_collisions(player, bullets_suijin[i]))
	  {
		  bullets_suijin.splice(i, 1);
		  --i;
	  }
    }
  }
/*
  var t = 0.05;
  //camera.x = (1-t) * camera.x + t * player.x;
  //camera.y = (1-t) * camera.y + t * player.y;
  
  //???
  if ( camera.x < screen_center.x )
  {
    camera.x = screen_center.x;
  }
  if ( camera.x > level1.width * tilewidth - screen_center.x )
  {
    camera.x = level1.width * tilewidth - screen_center.x;
  }
  if ( camera.y < screen_center.y )
  {
    camera.y = screen_center.y;
  }
  if ( camera.y > level1.height * tileheight - screen_center.y )
  {
    camera.y = level1.height * tileheight - screen_center.y;
  }

  //applying
  vector_to_camera = {
    x:camera.x - screen_center.x,
    y:camera.y - screen_center.y
  };
*/
  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;
  
if (is_round1 == true)
  {
	if (timer_for_round > 60)
	{
		ctx.drawImage(Round1, 600, 600, 500, 250);
		timer_for_round -=1;
	}
	if (timer_for_round == 60)
	{
		timer_for_fight = 60;
		timer_for_round = 0;
	}
	if (timer_for_fight > 0)
	{
		ctx.drawImage(Fight, 600, 600, 500, 250)
		timer_for_fight -= 1;
	}
  }
  
else if (is_round2 == true)
  {
	if (timer_for_round > 60)
	{
		ctx.drawImage(Round2, 600, 600, 500, 250);
		timer_for_round -=1;
	}
	if (timer_for_round == 60)
	{
		timer_for_fight = 60;
		timer_for_round = 0;
	}
	if (timer_for_fight > 0)
	{
		ctx.drawImage(Fight, 600, 600, 500, 250)
		timer_for_fight -= 1;
	}
  }
  
else if (is_round3 == true)
  {
	if (timer_for_round > 60)
	{
		ctx.drawImage(Round3, 600, 600, 500, 250);
		timer_for_round -=1;
	}
	if (timer_for_round == 60)
	{
		timer_for_fight = 60;
		timer_for_round = 0;
	}
	if (timer_for_fight > 0)
	{
		ctx.drawImage(Fight, 600, 600, 500, 250)
		timer_for_fight -= 1;
	}
  }

 if (player.health > 0)
 {
	 
	if (!keys[player.punch_key])
	{
		player_hit = 0;
	}
 
	if (keys[player.punch_key])
	{
		if (player.facing_direction === LEFT)
		{
			ctx.drawImage( Baraka_Fight_Left, player.x - vector_to_camera.x - 35, player.y - vector_to_camera.y, player.width + 35, player.height)
			if(player2.x > player.x - player.width - 70 && player2.x < player.x && player_hit == 0 && player.y <= player2.y + 100 && player.y >= player2.y - 300)
			{
				player2.health -= 2;
				player_hit = 1;
				player2.x -= 30;
				if (player.powerup <= 78)
				{
					player.powerup += 2;
				}
			}
		}
		if (player.facing_direction === RIGHT)
		{
			ctx.drawImage( Baraka_Fight_Right, player.x - vector_to_camera.x, player.y - vector_to_camera.y, player.width + 35, player.height)
			if(player2.x < player.x + player.width + 70 && player2.x > player.x && player_hit == 0 && player.y <= player2.y + 100 && player.y >= player2.y - 300)
			{
				player2.health -= 2;
				player_hit = 1;
				player2.x += 30;
				if (player.powerup <= 78)
				{
					player.powerup += 2;
				}
			}
		}  
	}
	else if(keys[player.shoot_key])
	{
		if (player.facing_direction === LEFT)
		{
			ctx.drawImage( Baraka_Shoot_Left, player.x - vector_to_camera.x - 4, player.y - vector_to_camera.y, player.width, player.height )
		}
		if (player.facing_direction === RIGHT)
		{
			ctx.drawImage( Baraka_Shoot_Right, player.x - vector_to_camera.x, player.y - vector_to_camera.y, player.width, player.height )
		}  
	}
	else if (player.facing_direction === RIGHT && player.grounded)
	{
		ctx.drawImage( Baraka_Right_Still, player.x - vector_to_camera.x, player.y - vector_to_camera.y, player.width, player.height )
	}
	else if (player.facing_direction === LEFT && player.grounded)
	{
		ctx.drawImage( Baraka_Left_Still, player.x - vector_to_camera.x, player.y - vector_to_camera.y, player.width, player.height )
	}
	else if (player.facing_direction === RIGHT && !player.grounded)
	{
		ctx.drawImage( Baraka_Right_Still, player.x - vector_to_camera.x, player.y - vector_to_camera.y, player.width, player.height )
	}
	else if (player.facing_direction === LEFT && !player.grounded)
	{
		ctx.drawImage( Baraka_Left_Still, player.x - vector_to_camera.x, player.y - vector_to_camera.y, player.width, player.height )
	}
  }
  
else if (player.health <= 0 && is_round1)
{
	is_round1 = false;
	is_round2 = true;
	timer_for_round = 120;
	player.x = 130;
	player.y = 700;
	player2.x = 1330;
	player2.y = 700;
	ctx.drawImage(suijin_wins, 600, 500, 500, 250)
	player.health = 100;
}

else if (player.health <= 0 && is_round2)
{
	is_round2 = false;
	is_round3 = true;
	timer_for_round = 120;
	player.x = 130;
	player.y = 700;
	player2.x = 1330;
	player2.y = 700;
	ctx.drawImage(suijin_wins, 600, 500, 500, 250)
	player.health = 100;
}

else if (player.health <= 0 && is_round3)
	{
		is_round3 = false;
		game_over = true;
	}
  
 if (player2.health > 0)
  {

 if (!keys[player2.punch_key])
	{
		player2_hit = 0;
	}

if (keys[player2.punch_key])
  {
	 if (player2.facing_direction === LEFT)
		{
		    ctx.drawImage( Suijin_Fight_Left, player2.x - vector_to_camera.x - 40, player2.y - vector_to_camera.y - 10, player2.width + 40, player2.height + 10)
			if(player.x > player2.x - player2.width - 70 && player.x < player2.x && player2_hit == 0 && player2.y <= player.y + 100 && player2.y >= player.y - 300)
				{
					player.health -= 2;
					player2_hit = 1;
					player.x -= 30;
					if (player2.powerup <= 78)
					{
						player2.powerup += 2;
					}
				}
		}
		if (player2.facing_direction === RIGHT)
		{
		    ctx.drawImage( Suijin_Fight_Right, player2.x - vector_to_camera.x, player2.y - vector_to_camera.y - 10, player2.width + 40, player2.height + 10)
			// check if player is within reach of getting hit
			if(player.x < player2.x + player2.width + 80 && player.x > player2.x && player2_hit == 0 && player.y <= player2.y + 100 && player.y >= player2.y - 300)
			{
				player.health -= 2;
				player2_hit = 1;
				player.x += 30;
				if (player2.powerup <= 78)
				{
					player2.powerup += 2;
				}
			}
		}  
}

else if (player2.facing_direction === RIGHT && player2.grounded)
{
    ctx.drawImage( Suijin_Right_Still, player2.x - vector_to_camera.x, player2.y - vector_to_camera.y, player2.width, player2.height )
}
else if (player2.facing_direction === LEFT && player2.grounded)
{
    ctx.drawImage( Suijin_Left_Still, player2.x - vector_to_camera.x, player2.y - vector_to_camera.y, player2.width, player2.height )
}
else if (player2.facing_direction === RIGHT && !player2.grounded)
{
    ctx.drawImage( Suijin_Right_Still, player2.x - vector_to_camera.x, player2.y - vector_to_camera.y, player2.width, player2.height )
}
else if (player2.facing_direction === LEFT && !player2.grounded)
{
    ctx.drawImage( Suijin_Left_Still, player2.x - vector_to_camera.x, player2.y - vector_to_camera.y, player2.width, player2.height )
}
  }
  
else if (player2.health <= 0 && is_round1)
{
	is_round1 = false;
	is_round2 = true;
	timer_for_round = 120;
	player.x = 130;
	player.y = 700;
	player2.x = 1330;
	player2.y = 700;
	ctx.drawImage(baraka_wins, 600, 500, 500, 250)
	player2.health = 100;
}
else if (player2.health <= 0 && is_round2)
{
	is_round2 = false;
	is_round3 = true;
	timer_for_round = 120;
	player.x = 130;
	player.y = 700;
	player2.x = 1330;
	player2.y = 700;
	ctx.drawImage(baraka_wins, 600, 500, 500, 250)
	player2.health = 100;
}
else if (player2.health <= 0 && is_round3)
{
	is_round3 = false;
	game_over = true;
}

   if (player.powerup < 80) 
	 {
	  ctx.drawImage(PowerupBar, 330, 120, 4 * player.powerup, 100)
	  ctx.drawImage(PowerupBarFrame, 330, 120, 320, 100)
	 }
	 
else // if (player.powerup == 80) 
 {
  PowerupBar_Particle.draw();
  ctx.drawImage(PowerupBarFull, 330, 120, 4 * player.powerup, 100)
  ctx.drawImage(PowerupBarFrame, 330, 120, 320, 100)
 }

  if (player2.powerup < 80)
  {
  ctx.drawImage(PowerupBar, 1050, 120, 4 * player2.powerup, 100)
  ctx.drawImage(PowerupBarFrame, 1050, 120, 320, 100)
  }
  
  else
  {
  PowerupBar_Particle2.draw();
  ctx.drawImage(PowerupBarFull, 1050, 120, 4 * player2.powerup, 100)
  ctx.drawImage(PowerupBarFrame, 1050, 120, 320, 100)
  }

  ctx.drawImage(HealthBar, 150, 80, 5 * player.health, 125)
  ctx.drawImage(HealthBarFrame, 150, 80, 500, 125)
  
  ctx.drawImage(HealthBar, 1050, 80, 5 * player2.health, 125)
  ctx.drawImage(HealthBarFrame, 1050, 80, 500, 125)
  

  ctx.mozImageSmoothingEnabled = true;
  ctx.webkitImageSmoothingEnabled = true;
  ctx.msImageSmoothingEnabled = true;
  ctx.imageSmoothingEnabled = true;
  
  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;

  for ( var i = 0; i < bullets_baraka.length; ++i)
  {
    if ( bullets_baraka[i].alive )
    {
      if (bullets_baraka[i].facing_direction === RIGHT)
      {
        ctx.drawImage(bullet_baraka_right, bullets_baraka[i].x - vector_to_camera.x, bullets_baraka[i].y - vector_to_camera.y, bullets_baraka[i].width/2, bullets_baraka[i].height/2)
      }
      else if (bullets_baraka[i].facing_direction === LEFT)
      {
        ctx.drawImage(bullet_baraka_left, bullets_baraka[i].x - vector_to_camera.x, bullets_baraka[i].y - vector_to_camera.y, bullets_baraka[i].width/2, bullets_baraka[i].height/2)
      }
    }
  }
  
  for ( var i = 0; i < bullets_suijin.length; ++i)
  {
    if ( bullets_suijin[i].alive )
    {
      if (bullets_suijin[i].facing_direction === RIGHT)
      {
        ctx.drawImage(suijin_bullet_right, bullets_suijin[i].x - vector_to_camera.x, bullets_suijin[i].y - vector_to_camera.y, bullets_suijin[i].width/2, bullets_suijin[i].height/2)
      }
      else if (bullets_suijin[i].facing_direction === LEFT)
      {
        ctx.drawImage(suijin_bullet_left, bullets_suijin[i].x - vector_to_camera.x, bullets_suijin[i].y - vector_to_camera.y, bullets_suijin[i].width/2, bullets_suijin[i].height/2)
      }
    }
  }
  
    ctx.mozImageSmoothingEnabled = true;
  ctx.webkitImageSmoothingEnabled = true;
  ctx.msImageSmoothingEnabled = true;
  ctx.imageSmoothingEnabled = true;
  
  requestAnimationFrame(frame);


  last_mouse_buttons = mouse_buttons;
  mouse_buttons = [];
}

frame();




