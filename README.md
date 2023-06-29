# Lorenz Attractor Animation using Three.js
[![Netlify Status](https://api.netlify.com/api/v1/badges/717d8e4e-4428-41e4-86d4-6cf33a4b28a1/deploy-status)](https://app.netlify.com/sites/lorenz-system/deploys)

This repository contains a JavaScript project that showcases an animation of the Lorenz attractor using the Three.js library. The Lorenz attractor is a set of chaotic solutions to a system of differential equations, and this project visualizes the attractor in a 3D space.

## Lorenz Attractor

The Lorenz attractor is defined by a system of three coupled nonlinear differential equations, which describe the evolution of three variables (x, y, z) over time. The equations capture the dynamics of a simplified convection model and exhibit complex, unpredictable behavior. The attractor is characterized by a strange, butterfly-shaped trajectory in three-dimensional space.

## Chaotic Behavior

One of the defining features of the Lorenz attractor is its chaotic nature. Even though the equations themselves are deterministic and have no random inputs, the system's behavior is highly sensitive to initial conditions. This means that tiny variations in the initial values of (x, y, z) can lead to drastically different trajectories over time. The attractor displays sensitive dependence on initial conditions, a hallmark of chaos.

## Equations

The animation is based on the following equations, known as the Lorenz attractor equations:

$\[\frac{{dx}}{{dt}} = \sigma \cdot (y - x)\]$

$\[\frac{{dy}}{{dt}} = x \cdot (\rho - z) - y\]$

$\[\frac{{dz}}{{dt}} = x \cdot y - \beta \cdot z\]$

where `x`, `y`, and `z` represent the coordinates in 3D space, and `sigma`, `rho`, and `beta` are parameters that control the behavior of the attractor.

## Features

- The animation is rendered using Three.js, a popular JavaScript library for creating 3D graphics in the browser.
- The simulation is based on the Lorenz attractor equations mentioned above, which are used to update the position of the points in the animation.
- Axes helpers are provided to give a reference for the 3D space.
- Dots are rendered as points with a custom sprite texture, and lines are drawn between the dots.
- The color of the dots and lines is determined based on the position of the points in the attractor.
- The animation is continuously updated in real-time.

## Usage

To run the animation, follow these steps:

1. Clone this repository to your local machine.
2. Install the required dependencies using a package manager like npm or yarn.
3. Open the project in a web browser.

## Credits

This project was developed by [Arturo Mendivil](https://www.linkedin.com/in/arturomendivil/).
