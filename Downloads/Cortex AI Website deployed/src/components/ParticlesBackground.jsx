import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      className="absolute inset-0 -z-10"
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: false,
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: false,
            },
            onHover: {
              enable: true,
              mode: "grab",
              parallax: {
                enable: true,
                force: 30,
                smooth: 20
              }
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 200,
              links: {
                opacity: 0.3,
                color: "#6366f1"
              }
            },
          },
        },
        particles: {
          color: {
            value: ["#6366f1", "#8b5cf6", "#3b82f6"],
          },
          links: {
            color: "#6366f1",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
            triangles: {
              enable: true,
              opacity: 0.03
            }
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 0.8,
            straight: false,
            attract: {
              enable: true,
              rotateX: 300,
              rotateY: 600,
              distance: 200,
              maxSpeed: 0.2
            }
          },
          number: {
            density: {
              enable: true,
              area: 1000,
            },
            value: 70,
          },
          opacity: {
            value: 0.3,
            animation: {
              enable: false,
            }
          },
          shape: {
            type: ["circle"],
          },
          size: {
            value: { min: 1, max: 3 },
            animation: {
              enable: false,
            }
          },
          zIndex: {
            value: {
              min: -1,
              max: 1
            },
            opacityRate: 0.05,
            velocityRate: 0.5,
            sizeRate: 0.5
          }
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;
