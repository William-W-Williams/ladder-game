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

    // 가로선이 있는 위치를 추적하기 위한 배열 초기화
    let horizontalLinePositions = new Array(players - 1).fill(false);

    // 세로선 그리기
    for (let i = 1; i <= players; i++) {
        drawLine(spacingX * i, 0, spacingX * i, canvas.height);
    }

    // 가로선 그리기
    for (let y = spacingY; y < canvas.height; y += spacingY) {
        for (let i = 0; i < players - 1; i++) {
            // 이전 행에 가로선이 없고, 랜덤하게 결정된 경우에만 가로선을 그림
            if (!horizontalLinePositions[i] && Math.random() > 0.5) {
                drawLine(spacingX * (i + 1), y, spacingX * (i + 2), y);
                horizontalLinePositions[i] = true; // 가로선을 그렸다고 표시
            } else {
                horizontalLinePositions[i] = false; // 가로선이 없다고 표시
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
