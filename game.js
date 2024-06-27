let food = 0;

let scoreing = document.querySelector("#score");

let can = document.querySelector('#jirung');
let ji = can.getContext('2d');

can.width = window.innerWidth - 100;
can.height = window.innerHeight - 100;
let buger = new Image();
buger.src = 'buger.png';
let jirungeface = new Image();
jirungeface.src = 'myreal.jpeg';

let jirunge = {
    body: [{ x: 700, y: 300 }],
    width : 50,
    height : 50,
    draw() {
        ji.drawImage(jirungeface, this.body[0].x, this.body[0].y, this.width, this.height);
        
        ji.fillStyle = 'brown';
        for (let i = 1; i < this.body.length; i++) {
            ji.fillRect(this.body[i].x, this.body[i].y, this.width, this.height);
        }
    },
    move(x, y) {
        const head = { x: this.body[0].x + x, y: this.body[0].y + y };
        this.body.unshift(head);
        this.body.pop();
    },
    grow() {
        const tail = this.body[this.body.length - 1];
        this.body.push({ x: tail.x+tail.x, y: tail.y+tail.y });
    }
};

jirunge.draw();


class handicap {
    constructor () {
        this.width = 50;
        this.height = 50;

        this.x = Math.random() * (can.width - this.width);
        this.y = Math.random() * (can.height - this.height);
    }
    draw() {
        ji.drawImage(buger, this.x, this.y, 50, 50);
        
    }
}

let wkddo = new handicap();
wkddo.draw();

let time = 0;
let x = 0;
let y = 0;

function fooding(wkddo, jirunge) {
    let breakx = Math.abs(wkddo.x - jirunge.body[0].x);
    let breaky = Math.abs(wkddo.y - jirunge.body[0].y);
    if (breakx <= jirunge.width && breaky <= jirunge.height) {
        ++food;
        scoreing.textContent = food;
        if (food == 20) location.replace("clear.html");
        wkddo.x = Math.random() * (can.width - wkddo.width);
        wkddo.y = Math.random() * (can.height - wkddo.height);
        return true;
    }
    return false;
}

document.addEventListener("keydown", controler);

function controler(btn) {
    time = 0;
    if (btn.code === 'ArrowRight' && x == 0) {
        x = 3;
        y = 0;
    } else if (btn.code === 'ArrowLeft' && x == 0) {
        x = -3;
        y = 0;
    } else if (btn.code === 'ArrowUp' && y == 0) {
        x = 0;
        y = -3;
    } else if (btn.code === 'ArrowDown' && y == 0) {
        x = 0;
        y = 3;
    }

    if (btn.code === 'Space') {
            time++
            if (time < 3) {
                if (x === 0) { //x = 0 즉 세로로 이동할떄
                    if (y < 0) y = -10; //위
                    else y = 10; //아래
                } 
                if (y === 0) { //y = 0 즉 가로로 이동할떄
                    if (x < 0) x = -10; // 왼쪽
                    else x = 10; // 오른쪽
                } 
            }
    }


}

    



function frame() {
    requestAnimationFrame(frame);
    ji.clearRect(0, 0, can.width, can.height);
    wkddo.draw();
    jirunge.draw();
    jirunge.move(x, y); 
    if (fooding(wkddo, jirunge)) {
        jirunge.grow();
    }
    breaking(jirunge);
}
frame();


function breaking(jirunge) {
    let head = jirunge.body[0];
    if (head.x < 0 || head.y < 0 || head.x + jirunge.width > can.width || head.y + jirunge.height > can.height) {
        location.replace("die.html");
    }
}



