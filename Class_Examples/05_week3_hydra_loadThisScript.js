//triangles grid on screen
//number of divisions (will be 4 X 4)
var n = 4
//create a function that repeats the triangle 4x4 and has a random rotation for that whole grid
a = () => shape(3, .4).rotate(Math.random()*100,Math.random()*3-1.75).repeat(n,n)
