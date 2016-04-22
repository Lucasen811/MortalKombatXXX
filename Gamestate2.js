
var BaseState = function() 
{
}

BaseState.prototype.load = function() 
{

}

BaseState.prototype.unload = function() 
{
}

BaseState.prototype.update = function(dt) 
{
	
    ctx.fillStyle = '#d9d9d9';
    ctx.fillRect(0, 0, width, height);

    //creating an offset of the screen
    var vector_to_camera = {
      x:camera.x - screen_center.x,
      y:camera.y - screen_center.y
    };
	
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
  
  if(keyboard.isKeyDown( keyboard.KEY_SPACE ) == true )
	{
		stateManager.switchState( new GameOverState() );
	}
}

BaseState.prototype.draw = function() 
{
}