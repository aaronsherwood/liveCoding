// an array for the video names, use complete file path
// you need to change the base path (and names) for your own videos!
basePath = "/Users/ags419/Documents/Code/liveCoding/media/"
// basePath = "https://blog.livecoding.nyuadim.com/wp-content/uploads/" //online
videoNames = [basePath+"0.mp4", basePath+"1.mp4", basePath+"2.mp4", basePath+"3.mp4", basePath+"4.mp4"] //"https://media2.giphy.com/media/ny7UCd6JETnmE/giphy.mp4"
vids = []
allLoaded = false
loadedCount = 0
for (let i=0; i<videoNames.length; i++){
	vids[i] = document.createElement('video')
	vids[i].autoplay = true
	vids[i].loop = true
  vids[i].crossOrigin="anonymous"
  vids[i].src = videoNames[i]
	// callback to know if videos loaded
	vids[i].addEventListener(
	"loadeddata", function () {
	  loadedCount += 1;
		console.log(videoNames[i]+" loaded")
		if (loadedCount == videoNames.length){
			allLoaded = true;
			console.log("All loaded");
		}
	}, false);
}

whichVid = 4
