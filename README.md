A simple tool built with [three.js](https://threejs.org/) helping you make your own **cycled** [kinetic sculptures](https://en.wikipedia.org/wiki/Kinetic_art) in seconds.

Demo: https://hermanncain.github.io/kinetic_sculptor/

## Introduction

The most famous cycled kinetic sculpture is the cauldron of 2016 Brazil Olympic Games designed by [Anthony Howe](https://www.howeart.net/). I studied his works and made this simple tool to generate kinetic sculptures like/beyond them.

This online tool is very simple that it contains only 4 types of axis and 5 types of unit. Yet you can obtain a lot variants by editing parameters provided. Besides, this tool supports custom texture <img src="css/icons/add.svg" width = "20" height = "20"/> and unit <img src="css/icons/upload.svg" width = "20" height = "20"/> . So just upload your preferred images as textures and `*.obj` files as units!

## Upload your own mesh

If you choose to upload your own `*.obj` as the unit, make sure that transform of the mesh suits the tool, since this tool won't normalize them. Here are tips to normalize your models:
- **Make the world Y axis be the rotation axis**
- Keep only meshes
- Materials will be ignored

## Texture

Alpha channel of uploaded textures will be ignored, since unit materials offered by this tool are not transparent. You can try the glass material <img src="css/icons/glass.svg" width = "20" height = "20"/> to get refraction effect.

## Acknowledgements

I'd like to thank my colleagues Yu Liu and Yuanxuan Huang for their useful suggestions and modeling built-in units for this tool.