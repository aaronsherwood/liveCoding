# C3-116 installation

## TIDALCYCLES

- install tidal with automatic script:
```
curl https://raw.githubusercontent.com/tidalcycles/tidal-bootstrap/master/tidal-bootstrap.command -sSf | sh
```
- install homebrew:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
- install haskell:
```
brew install ghc
```
- install cabal:
```
brew install cabal-install
```
- install cabal tidalcycles library:
```
cabal update
cabal install tidal --lib
```
- open Atom
- go to Preferences >> Packages >> tidalcycles >> Settings
- under GHCI Path put this in the blank space:
```
/usr/local/bin
```

Testing if it works

- Log out of computer and then back in
- Open Supercollider
- Type in
```
SuperDirt.start
```
- Place cursor on that same line and press shift+enter to evaluate
- (the numbers in left hand corner should be green when ready)
- In Atom:
  - create a new file called "test.tidal" and save
  - in the file type in:
  ```
  d1 $ s "bd bd sd ~"
  ```
  - evaluate by doing shift+enter

## HYDRA

In Atom Preferences
- Click: + Install
- Type in:
```
hydra
```
- Then install: atom-hydra
