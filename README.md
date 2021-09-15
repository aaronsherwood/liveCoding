# IM-UH 2322 Live Coding

Code examples for the NYUAD class [Live Coding](https://livecoding.nyuadim.com/).

Live coding is a performing arts form and creativity technique where music and visuals are improvised through live edits of source code. Live coding is most visible in performance, however the ‘live’ in live coding refers not to a live audience but to live updates of running code. Working across genres, live coding has been seen in algoraves (events where people dance to music generated from algorithms), jazz clubs, and concert halls. Code is projected during performances, exposing the underlying algorithms at work, and thus the patterns of creative thought the performer is developing in real time. Programs are instruments that can change and algorithms are thoughts that can be seen as well as heard. This course explores this new art form and the related themes of algorithmic thought, pattern transformation, artificial language, information theory, improvisation, listening, perception, and structural composition. Students will learn how to create music with code, as well as how to create advanced computer graphics. Students will develop algorithmic audio/visual pieces individually as well as in groups. The course culminates in an algorave.

## Usage

#### You can do the following to work from the command line or just use the github desktop app: [https://desktop.github.com/](https://desktop.github.com/)


### Commandline Initialization (you only need to do these steps once):
If you haven't installed git on your computer, [install git on your computer](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) (or optionally here's [a different set of instructions](https://www.linode.com/docs/development/version-control/how-to-install-git-on-linux-mac-and-windows/)).

Change directory (`cd` on the command line) into the location where you want the class repository to live.

Clone the repo to your computer: `git clone https://github.com/aaronsherwood/liveCoding.git`

Grab submodules:
* `git submodule init`
* `git submodule update`

### Regular Use:
If working off any example, copy that folder and paste it in the __place_your_work_here__ folder to mitigate merge conflicts when new examples are added or old examples are updated. Work only in copies you've put in this folder.

To get new examples: `git pull`

If you're unsure if you've been working in examples directly in the repo you can stash everything before pulling:
* `git stash`
* `git pull`

To get stashed code back: `git stash pop`

To see what's been stashed: `git stash list`

To remove all stashes: `git stash clear`

To reset everything to be just like the repo online:
* `git fetch origin`
* `git reset --hard origin/master`
