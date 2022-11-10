const particlesConfig = {
    particles: {
        number: {
          value: 200,
          density: {
            enable: true,
            value_area: 500
          }
        },
        color: {
          value: "#000000"
        },
        shape: {
          type: "polygon",
          stroke: {
            width: 1,
            color: "#000000"
          },
          polygon: {
            nb_sides: 8
          }
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 1,
          random: true,
          anim: {
            enable: true,
            speed: 20,
            size_min: 3,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#000000",
          opacity: 0.5,
          width: 1
        },
        move: {
          enable: true,
          speed: 3,
          direction: "top",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "window",
        events: {
          onhover: {
            enable: true,
            mode: "repulse"
          },
          onclick: {
            enable: true,
            mode: "repulse"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 143.85614385614386,
            line_linked: {
              opacity: 0.3157095876549456
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 77,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true    
};

export default particlesConfig;