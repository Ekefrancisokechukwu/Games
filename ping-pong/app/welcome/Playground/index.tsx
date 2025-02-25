import { useEffect, useRef, useState } from "react";

const PlayGround = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rightPaddleY, setRightPaddleY] = useState(200);
  const [leftPaddleY, setLeftPaddleY] = useState(200);
  const [ball, setBall] = useState({
    ballY: 200,
    ballX: 400,
    dx: -3,
    dy: -3,
  });

  const paddleHeight = 80;
  const paddleWidth = 10;

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseY = event.clientY - rect.top;
    const mouseX = event.clientX - rect.left;

    if (mouseX >= canvas.width - 50) {
      setRightPaddleY(
        Math.max(
          0,
          Math.min(mouseY - paddleHeight / 2, canvas.height - paddleHeight)
        )
      );
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

      // Set background
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw paddles
      ctx.fillStyle = "white";
      ctx.fillRect(10, leftPaddleY, paddleWidth, paddleHeight); // Left paddle
      ctx.fillRect(canvas.width - 20, rightPaddleY, paddleWidth, paddleHeight); // Right paddle

      // Draw ball
      const ballRadius = 10;
      ctx.beginPath();
      ctx.arc(ball.ballX, ball.ballY, ballRadius, 0, Math.PI * 2, false);
      ctx.fill();

      // Draw center dashed line
      ctx.strokeStyle = "white";
      ctx.lineWidth = 4;
      ctx.setLineDash([10, 10]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);

      // 🏆 AI: Move left paddle (computer player)
      setLeftPaddleY((prevY) => {
        const paddleSpeed = 3;
        const targetY = ball.ballY - paddleHeight / 2;

        // Move paddle towards ball position
        if (prevY < targetY) {
          return Math.min(prevY + 1.5, targetY);
        } else if (prevY > targetY) {
          return Math.max(prevY - 1.5, targetY);
        }
        return prevY;
      });

      setBall((prevBall) => {
        let newBallX = prevBall.ballX + prevBall.dx;
        let newBallY = prevBall.ballY + prevBall.dy;
        let newDx = prevBall.dx;
        let newDy = prevBall.dy;

        // Bounce off top and bottom
        if (newBallY <= 0 || newBallY >= canvas.height - ballRadius) {
          newDy = -newDy;
        }

        if (
          newBallX + ballRadius >= canvas.width - 20 &&
          newBallX - ballRadius <= canvas.width - 10 &&
          newBallY >= rightPaddleY &&
          newBallY <= rightPaddleY + paddleHeight
        ) {
          newDx = -newDx;
        }

        // Left paddle bounce (AI controlled)
        if (
          newBallX - ballRadius <= 20 &&
          newBallY >= leftPaddleY &&
          newBallY <= leftPaddleY + paddleHeight
        ) {
          newDx = Math.abs(newDx);
        }

        // Reset if ball goes out
        if (newBallX < 0 || newBallX - ballRadius > canvas.width) {
          newBallX = canvas.width / 2;
          newBallY = canvas.height / 2;
          newDx = 0.01 * (Math.random() > 0.5 ? 1 : -1);
          newDy = 0.01 * (Math.random() > 0.5 ? 1 : -1);
        }

        return { ballX: newBallX, ballY: newBallY, dx: newDx, dy: newDy };
      });

      requestAnimationFrame(draw);
    };

    draw();
  }, [ball, rightPaddleY, leftPaddleY]);

  return (
    <div>
      {/* Game Canva */}
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="border-y-2   border-white/35"
        onMouseMove={handleMouseMove}
      ></canvas>
    </div>
  );
};
export default PlayGround;
