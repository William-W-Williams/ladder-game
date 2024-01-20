const canvas = document.getElementById('ladderCanvas');
const ctx = canvas.getContext('2d');
const players = 4;
const spacingX = canvas.width / (players + 1);
const spacingY = 20;
let horizontalLines = [];

function drawLine(startX, startY, endX, endY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

function drawLadder() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    horizontalLines = Array.from({ length: canvas.height / spacingY }, () => []);

    // 세로선 그리기
    for (let i = 1; i <= players; i++) {
        drawLine(spacingX * i, 0, spacingX * i, canvas.height);
    }

    // 가로선 랜덤하게 그리기
    for (let y = spacingY; y < canvas.height; y += spacingY) {
        let possiblePositions = [];
        for (let i = 1; i < players; i++) {
            if (!horizontalLines[y / spacingY - 1].includes(i)) {
                possiblePositions.push(i);
            }
        }
        let linePosition = possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
        if (linePosition !== undefined) {
            drawLine(spacingX * linePosition, y, spacingX * (linePosition + 1), y);
            horizontalLines[y / spacingY].push(linePosition);
        }
    }
}

function getLadderResult() {
    const results = [];
    for (let i = 0; i < players; i++) {
        let position = i; // 플레이어의 시작 위치
        for (let y = spacingY; y <= canvas.height; y += spacingY) {
            if (horizontalLines[y / spacingY] && horizontalLines[y / spacingY].includes(position)) {
                position++; // 오른쪽으로 이동
            } else if (horizontalLines[y / spacingY] && horizontalLines[y / spacingY].includes(position - 1)) {
                position--; // 왼쪽으로 이동
            }
        }
        results.push(position); // 최종 결과 위치 저장
    }
    return results; // 모든 플레이어의 결과 반환
}

function showResult() {
    const results = getLadderResult();
    const resultText = results.map((pos, idx) => `플레이어 ${idx + 1}의 최종 위치: ${pos + 1}`).join("\n");
    alert(resultText); // 결과 텍스트를 알림으로 표시
}

// 게임 시작 버튼에 결과 표시 기능 추가
document.querySelector("button").onclick = function() {
    drawLadder();
    setTimeout(showResult, 500); // 사다리 그리기 후 결과 표시
};

// 초기 사다리 그리기
drawLadder();
