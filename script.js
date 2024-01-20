const canvas = document.getElementById('ladderCanvas');
const ctx = canvas.getContext('2d');
const players = 4;
const spacingX = canvas.width / (players + 1);
const spacingY = 20;

function drawLine(startX, startY, endX, endY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

function drawLadder() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 세로선 그리기
    for (let i = 1; i <= players; i++) {
        drawLine(spacingX * i, 0, spacingX * i, canvas.height);
    }

    // 가로선 랜덤하게 그리기
    for (let y = spacingY; y < canvas.height; y += spacingY) {
        let lineStart = -1;
        for (let i = 1; i <= players; i++) {
            if (Math.random() > 0.5 && lineStart < 0) {
                lineStart = i;
            } else if (lineStart > 0) {
                drawLine(spacingX * lineStart, y, spacingX * i, y);
                lineStart = -1; // Reset lineStart after drawing a line
            }
        }
    }
}

document.querySelector("button").onclick = function() {
    drawLadder();
};


// 초기 사다리 그리기
drawLadder();

// ... 이전 drawLadder 함수 유지 ...

function getLadderResult() {
    const results = [];
    for (let i = 0; i < 4; i++) {
        let position = i;
        for (let y = 0; y < canvas.height; y += spacingY) {
            if (position > 0 && ctx.getImageData(spacingX * position - 10, y, 1, 1).data[3] !== 0) {
                position--;
            } else if (position < 3 && ctx.getImageData(spacingX * (position + 1) + 10, y, 1, 1).data[3] !== 0) {
                position++;
            }
        }
        results.push(position);
    }
    return results;
}

function showResult() {
    const results = getLadderResult();
    alert("결과: " + results.map((pos, idx) => `플레이어 ${idx + 1} -> 위치 ${pos + 1}`).join(", "));
}

// 게임 시작 버튼에 결과 표시 기능 추가
document.querySelector("button").onclick = function() {
    drawLadder();
    setTimeout(showResult, 500);
};
