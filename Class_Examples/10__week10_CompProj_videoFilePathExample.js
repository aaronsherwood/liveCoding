vid = document.createElement('video')
vid.autoplay = true
vid.loop = true

// here is the base base path for the presentations
// BE SURE TO CHANGE THE NAME AT THE END TO YOUR FOLDER NAME
// BE SURE TO PUT A SLASH AFTER YOUR FOLDER NAME TOO
basePath = "/Users/ags419/liveCoding_fall21_compProject/YOUR_GOOGLE_DRIVE_FOLDER_NAME_HERE/"
videos = [basePath+"4.mp4"]

// choose video source from array
vid.src = videos[0]

// use video within hydra
s0.init({src: vid})

src(s0).out()
