import { useEffect, useRef, useState } from "react";

import Background from "../assets/Background.jpg";
import Basketballimage from "../assets/Basketball.jpg";
import Footballimage from "../assets/Football.jpg";
import Valleyballimage from "../assets/volleyball.jpg";
import Humanimage from "../assets/Student.gif";
import Cartoonimage from "../assets/Cartoon.jpg";
import Logoimage from "../assets/Logo.jpg";

const Animation = ({ fieldWidth, fieldHeight, ballRadius }) => {
  const _fieldwidth = fieldWidth || 640;
  const _fieldheight = fieldHeight || 480;
  const _ballradius = ballRadius || 50;

  const ballDiameter = 2 * _ballradius; // Area ball

  const [ballType, setBallType] = useState("none");
  const [isPlaying, setIsPlaying] = useState(false);

  const ballRef = useRef();

  const positionRef = useRef({
    x: 275,
    y: 180,
    vx: 2,
    vy: 2,
    rotation: 0,
  });

  useEffect(() => {
    if (!ballRef.current) return;

    if (ballType === "none") {
      ballRef.current.style.backgroundImage = "";
    } else if (ballType === "basketball") {
      ballRef.current.style.backgroundImage = `url(${Basketballimage})`;
    } else if (ballType === "football") {
      ballRef.current.style.backgroundImage = `url(${Footballimage})`;
    } else if (ballType === "volleyball") {
      ballRef.current.style.backgroundImage = `url(${Valleyballimage})`;
    } else if (ballType === "human") {
      ballRef.current.style.backgroundImage = `url(${Humanimage})`;
    } else if (ballType === "cartoon") {
      ballRef.current.style.backgroundImage = `url(${Cartoonimage})`;
    } else if (ballType === "logo") {
      ballRef.current.style.backgroundImage = `url(${Logoimage})`;
    } else {
      ballRef.current.style.backgroundImage = "";
    }
  }, [ballType]);

  useEffect(() => {
    if (!isPlaying) return;

    let animationFrame;

    const animate = () => {
      const ball = ballRef.current;
      const position = positionRef.current;

      if (!ball) return;

      position.x += position.vx;
      position.y += position.vy;

      if (position.x <= 0) {
        position.x = 0;
        position.vx *= -1;
      }

      if (position.x + ballDiameter >= _fieldwidth) {
        position.x = _fieldwidth - ballDiameter;
        position.vx *= -1;
      }

      if (position.y <= 0) {
        position.y = 0;
        position.vy *= -1;
      }

      if (position.y + ballDiameter >= _fieldheight) {
        position.y = _fieldheight - ballDiameter;
        position.vy *= -1;
      }

      position.rotation += 5;

      // เพื่อทำให้มันขยับได้
      ball.style.left = `${position.x}px`;
      ball.style.top = `${position.y}px`;
      ball.style.transform = `rotate(${position.rotation}deg)`;

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isPlaying, _fieldwidth, _fieldheight, ballDiameter]);

  return (
    <>
      <h3 className="animTitle">68085725 ปวีณ์กร เป็ดแก้ว</h3>
      <div className="animWrap">
        <div
          className="animField"
          style={{
            width: `${_fieldwidth}px`,
            height: `${_fieldheight}px`,
            backgroundImage: `url(${Background})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            overflow: "hidden",
          }}
        >
          <div
            className="animBall"
            style={{
              width: `${ballDiameter}px`,
              height: `${ballDiameter}px`,
              left: "275px",
              top: "185px",
              backgroundColor: "lightblue",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            ref={ballRef}
          />
        </div>

        <div className="animBar">
          <button
            className={`animBtn ${!isPlaying ? "play" : "pause"}`}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>

          <div className="animBtns">
            <button
              className="animBtn gray"
              onClick={() => setBallType("none")}
            >
              None
            </button>

            <button
              className="animBtn blue"
              onClick={() => setBallType("basketball")}
            >
              Basketball
            </button>

            <button
              className="animBtn blue"
              onClick={() => setBallType("football")}
            >
              Football
            </button>

            <button
              className="animBtn blue"
              onClick={() => setBallType("volleyball")}
            >
              Volleyball
            </button>

            <button
              className="animBtn blue"
              onClick={() => setBallType("human")}
            >
              Human
            </button>

            <button
              className="animBtn blue"
              onClick={() => setBallType("cartoon")}
            >
              Cartoon
            </button>

            <button
              className="animBtn blue"
              onClick={() => setBallType("logo")}
            >
              Logo
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Animation;
