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
    // 각 세로선에 대한 가로선 여부를 저장하는 배열
    let hasLine = Array(players - 1).fill(false);

    // 세로선 그리기
    for (let i = 1; i <= players; i++) {
        drawLine(spacingX * i, 0, spacingX * i, canvas.height);
    }

    // 각 행에 가로선 그리기
    for (let y = spacingY; y < canvas.height; y += spacingY) {
        let lineDrawn = false; // 현재 줄에 가로선이 그려졌는지 여부

        for (let i = 0; i < players - 1; i++) {
            // 이전 세로선에 가로선이 없고, 현재 줄에 가로선이 없으며, 랜덤 조건을 만족할 경우
            if (!hasLine[i] && !lineDrawn && Math.random() > 0.5) {
                drawLine(spacingX * (i + 1), y, spacingX * (i + 2), y);
                hasLine[i] = true; // 가로선이 있음을 표시
                lineDrawn = true; // 현재 줄에 가로선을 그렸음을 표시
            } else {
                hasLine[i] = false; // 가로선이 없음을 표시
            }
        }
    }
}


function drawLadder() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let hasLine = new Array(players - 1).fill(false); // 이전 행의 가로줄 여부

    // 세로선 그리기
    for (let i = 1; i <= players; i++) {
        drawLine(spacingX * i, 0, spacingX * i, canvas.height);
    }

    // 가로선 그리기
    for (let y = spacingY; y < canvas.height; y += spacingY) {
        for (let i = 0; i < players - 1; i++) {
            // 현재 위치에 가로줄이 없고, 랜덤 조건을 충족하면 가로줄을 그림
            if (!hasLine[i] && Math.random() > 0.5) {
                drawLine(spacingX * (i + 1), y, spacingX * (i + 2), y);
                hasLine[i] = true; // 현재 행에 가로줄을 그렸다고 표시
            } else {
                hasLine[i] = false; // 가로줄이 없다고 표시
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
