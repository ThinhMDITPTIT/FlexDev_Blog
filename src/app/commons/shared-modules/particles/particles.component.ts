import { Component } from '@angular/core';

@Component({
  selector: 'app-particles',
  templateUrl: './particles.component.html',
  styleUrls: ['./particles.component.scss'],
})
export class ParticlesComponent {
  constructor() {}
  id = 'tsparticles';
  particlesOptions: any = {
    background: {
      color: {
        value: '#f0f0f0',
      },
    },
    fps_limit: 30,
    interactivity: {
      events: {
        onClick: { enable: false, mode: 'push' },
        onHover: { enable: true, mode: 'repulse' },
        resize: true,
      },
      modes: {
        push: { particles_nb: 4 },
        repulse: { distance: 100, duration: 0.4 },
      },
    },
    particles: {
      color: { value: '#17a2b8' },
      links: {
        color: '#17a2b8',
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1,
      },
      move: {
        bounce: false,
        direction: 'none',
        enable: true,
        outMode: 'out',
        random: false,
        speed: 1,
        straight: false,
      },
      number: { density: { enable: true, area: 1000 }, value: 80 },
      opacity: { value: 0.5 },
      shape: { type: 'circle' },
      size: { random: true, value: 5 },
    },
    detectRetina: true,
  };

  particlesLoaded(container: any): void {}

  particlesInit(main: any): void {}
}
