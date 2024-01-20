const canvas = document.getElementById('ladderCanvas');
const ctx = canvas.getContext('2d');

function drawLine(startX, startY, endX, endY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

function drawLadder() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const players = 4;
    const spacingX = canvas.width / (players + 1);
    const spacingY = 20;
    let currentY = 0;

    // 세로선 그리기
    for (let i = 1; i <= players; i++) {
        drawLine(spacingX * i, 0, spacingX * i, canvas.height);
    }

    // 가로선 랜덤하게 그리기
    while (currentY < canvas.height) {
        let prevX = spacingX;
        for (let i = 2; i <= players; i++) {
            if (Math.random() > 0.5) {
                drawLine(prevX, currentY, spacingX * i, currentY);
            }
            prevX = spacingX * i;
        }
        currentY += spacingY;
    }
}

// 초기 사다리 그리기
drawLadder();
