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

// 가로선을 그릴 위치를 결정하는 함수
function determineHorizontalLines() {
    // 가로선의 시작 위치를 추적하는 배열 초기화
    let horizontalStarts = new Array(players - 1).fill(false);

    for (let y = spacingY; y < canvas.height; y += spacingY) {
        let hasLine = false; // 현재 줄에 가로선이 있는지 추적

        for (let i = 0; i < players - 1; i++) {
            if (Math.random() < 0.5 && !horizontalStarts[i] && !hasLine) {
                drawLine(spacingX * (i + 1), y, spacingX * (i + 2), y);
                horizontalStarts[i] = true; // 현재 위치에 가로선이 있다고 표시
                hasLine = true;
            } else {
                horizontalStarts[i] = false; // 다음 줄을 위해 초기화
            }
        }
    }
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
        let previousLine = false; // 이전 가로선의 위치를 추적
        for (let i = 1; i < players; i++) {
            if (Math.random() > 0.5 && !previousLine) {
                drawLine(spacingX * i, y, spacingX * (i + 1), y);
                previousLine = true; // 가로선을 그렸으므로 플래그 설정
            } else {
                previousLine = false; // 플래그 초기화
            }
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
