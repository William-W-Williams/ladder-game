// HTML에 canvas 요소가 있다고 가정하고, id는 'ladderCanvas'로 설정합니다.
// 또한 게임을 시작하는 버튼이 있으며, onclick 이벤트로 drawLadder 함수를 호출합니다.

// Canvas 설정
const canvas = document.getElementById('ladderCanvas');
const ctx = canvas.getContext('2d');

// 게임 설정
const players = 4; // 플레이어 수
const spacingX = canvas.width / (players + 1); // 세로선 간격
const spacingY = 20; // 가로선 간격

// 선을 그리는 함수
function drawLine(startX, startY, endX, endY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

// 사다리를 그리는 함수
function drawLadder() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 클리어

    // 세로선 그리기
    for (let i = 1; i <= players; i++) {
        drawLine(spacingX * i, 0, spacingX * i, canvas.height);
    }

    // 가로선 그리기 - 중복 없이
    let prevHorizontalLines = Array(players - 1).fill(false);
    for (let y = spacingY; y < canvas.height; y += spacingY) {
        for (let i = 0; i < players - 1; i++) {
            if (Math.random() > 0.5 && !prevHorizontalLines[i]) {
                drawLine(spacingX * (i + 1), y, spacingX * (i + 2), y);
                prevHorizontalLines[i] = true; // 현재 줄에 가로선이 그려짐을 표시
            } else {
                prevHorizontalLines[i] = false; // 가로선이 그려지지 않음
            }
        }
    }
}

// 결과 계산 함수
function getLadderResult() {
    // ... 기존의 getLadderResult 함수 코드 ...
}

// 결과 표시 함수
function showResult() {
    // ... 기존의 showResult 함수 코드 ...
}

// 게임 시작 버튼 이벤트 리스너
document.querySelector("button").onclick = function() {
    drawLadder();
    setTimeout(showResult, 500); // 사다리 그리기 후 결과 표시
};

// 초기 사다리 그리기
drawLadder();
