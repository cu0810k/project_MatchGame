const match = document.querySelector('.match')
const container = document.querySelector('.container')
const playerList = document.querySelector('.playerList')
const playerBtnList = document.querySelector('.playerBtnList')
const btnGroup = document.querySelector('.btn-group')
const btnFinish = document.querySelector('.btn-finish')
const btnBack = document.querySelector('.btn-back')
const btnRestart = document.querySelector('.btn-restart')
const btnHard = document.querySelector('.btn-hard')
const btnEasy = document.querySelector('.btn-easy')
const text = document.querySelector('.text')


const audio = document.getElementById("bgMusic");


let level = 'easy'
// 先建立球員陣列
// const player = ['Andre_Iguodala', 'Andrew_Wiggins', 'Chris_Chiozza',
//   'Damion_Lee', 'Draymond_Green', 'Gary_Payton_II', 'Jonathan_Kuminga',
//   'Jordan_Poole', 'Juan_Toscano-Anderson', 'Kevon_Looney', 'Klay_Thompson',
//   'Moses_Moody', 'Nemanja_Bjelica', 'Otto_Porter_Jr', 'Quinndary_Weatherspoon',
//   'Stephen_Curry']
let player = ['Andre_Iguodala', 'Andrew_Wiggins', 'Chris_Chiozza',
  'Damion_Lee', 'Draymond_Green', 'Gary_Payton_II', 'Jonathan_Kuminga',
  'Jordan_Poole', 'Juan_Toscano-Anderson', 'Kevon_Looney', 'Klay_Thompson',
  'Moses_Moody', 'Nemanja_Bjelica', 'Otto_Porter_Jr', 'Stephen_Curry']



// 創造球員Dom函式
function PlayerCircle (name, pointWidth, pointHeight, level = 'easy') {
  this.name = name
  this.pointWidth = pointWidth,
    this.pointHeight = pointHeight,
    this.level = level
}

PlayerCircle.prototype.imgCreate = function () {

  // 建立player節點
  const player = document.createElement('div')
  player.className = `player ${this.name}`
  player.dataset.player = this.name

  const pic = document.createElement('div')
  if (this.level === 'hard') {
    pic.style = `
      background-image: url(images/childhood/${this.name}.png),linear-gradient(#fff, #fff);
      background-repeat: no-repeat;
      background-position: top center;
      background-size: cover;`
  } else {
    pic.style = `
              background-image: url(images/${this.name}.png),linear-gradient(#fff, #fff);
              background-repeat: no-repeat;
              background-position: top center;
              background-size: cover;`
  }

  pic.className = `pic ${this.name}`
  pic.dataset.player = this.name


  // 建立point
  const point = document.createElement('span')
  point.className = `point point_DIV ${this.name}`
  point.dataset.player = this.name
  point.style.width = this.pointWidth + 'px'
  point.style.height = this.pointHeight + 'px'

  // pic.appendChild(img)
  player.appendChild(pic)
  player.appendChild(point)
  playerList.appendChild(player)
}



// 建立隨機數
// https://ithelp.ithome.com.tw/articles/10197904
// Math.random() --- 隨機產生出0~1之間的小數
// Math.floor() ---- 無條件捨去
function getRandomInt (max) {
  return Math.floor(Math.random() * max);
}


let playerTemp = []
let pointWidth = '15'
let pointHeight = '15'

// 抓取隨機8人
function getPlayer (status = 'easy') {

  const arr = setInterval(() => {

    if (playerTemp.length == 8) {

      // 當滿8位時 關掉這個循環
      clearInterval(arr)

      // 製作八位球星的Dom
      playerTemp.forEach((item) => {
        const player = new PlayerCircle(item, pointWidth, pointHeight, status)
        player.imgCreate()
      })

      //建立 playerTemp 的對應按鈕
      btnRandom(playerTemp)

      return console.log('playerTemp', playerTemp)

    }

    // 隨機抽數字
    const num = getRandomInt(player.length)
    // if(playerTemp[num].includes())

    // 過濾重複的人
    if (playerTemp.includes(player[num])) {
      return
    }
    // 將 player[num]的人推進 playerTemp
    playerTemp.push(player[num])


  }, 0)

}

getPlayer()

// =====================================

let playerBtnTemp = []

function btnRandom (playerTemp) {

  const arr = setInterval(() => {
    // 當 playerBtnTemp == 8 代表已重新排列完
    // 排列完就停止 clearInterval ， 並且開始製作BTN
    if (playerBtnTemp.length == 8) {
      clearInterval(arr)
      // 製作八位球星的BTN
      playerBtnTemp.forEach((item, index) => {
        const playerBtn = new PlayButton(item, pointWidth, pointHeight)
        playerBtn.btnCreate()
      })
      return console.log('playerBtnTemp', playerBtnTemp)
    }

    const num = getRandomInt(playerTemp.length)
    // 過濾重複的人
    if (playerBtnTemp.includes(playerTemp[num])) {
      return
    }
    playerBtnTemp.push(playerTemp[num])

  }, 0)

}


// 創造球員Btn函式
function PlayButton (name, pointWidth, pointHeight) {
  this.name = name
  this.pointWidth = pointWidth,
    this.pointHeight = pointHeight
}

PlayButton.prototype.btnCreate = function () {

  // 建立btnDiv節點
  const playerBtnDiv = document.createElement('div')
  playerBtnDiv.className = `btn ${this.name}`
  playerBtnDiv.dataset.player = this.name

  // 建立button節點
  const playerBtn = document.createElement('button')
  playerBtn.className = `btn-${this.name} ${this.name}`
  playerBtn.dataset.player = this.name
  playerBtn.innerText = this.name.replace('_', ' ')

  // 建立point
  const point = document.createElement('span')
  point.className = `point point_BUTTON ${this.name}`
  point.dataset.player = this.name
  point.style.width = this.pointWidth + 'px'
  point.style.height = this.pointHeight + 'px'

  // playerBtnDiv.appendChild(point)
  playerBtnDiv.appendChild(point)
  playerBtnDiv.appendChild(playerBtn)
  playerBtnList.appendChild(playerBtnDiv)
}

// =====================================


let arr = []
let click = 0;

document.addEventListener('click', e => {


  if (e.target.classList.contains('disabled')) {

    // 已連過的不能再連
    audio.play();
    return // console.log('你已經連過線了')

  } else if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'BUTTON') {

    if (!e.target.classList.contains('pic')) {
      // 不是圖片跟按鈕 也不能連
      return // console.log(e.target.nodeName, '請點圖片或者是按鈕')
    }

  }


  click++

  // 點到A球員 >　抓取A球員Point的位置
  const playerPoint = document.querySelector(`.point.point_${e.target.nodeName}.${e.target.dataset.player}`)

  let obj = {
    cx: playerPoint.offsetLeft + pointWidth / 2,
    cy: playerPoint.offsetTop + pointWidth / 2,
    nodeName: e.target.nodeName,
    name: e.target.dataset.player
  }
  arr.push(obj)
  e.target.classList.add('click')

  if (click == 2) {
    /*
      以下情況不能產生連線
      圖片A + 圖片B
      圖片A + 圖片A
      按鈕A + 按鈕B
      按鈕A + 按鈕A
      >> 兩個項目要不一樣才可以進行
    */
    if (arr[0].nodeName !== arr[1].nodeName) {

      const line = new Svg(
        arr[0].cx,
        arr[0].cy,
        arr[1].cx,
        arr[1].cy,
        arr[0],
        arr[1]
      )
      line.createLine()

      // 將已點到的做標記
      if (arr[0].nodeName === 'DIV') {

        document.querySelector(`.pic.${arr[0].name}`).classList.add('disabled')
        document.querySelector(`.btn-${arr[1].name}`).classList.add('disabled')
        document.querySelector(`.pic.${arr[0].name}`).classList.remove('click')
        document.querySelector(`.btn-${arr[1].name}`).classList.remove('click')

      } else {

        document.querySelector(`.btn-${arr[0].name}`).classList.add('disabled')
        document.querySelector(`.pic.${arr[1].name}`).classList.add('disabled')
        document.querySelector(`.btn-${arr[0].name}`).classList.remove('click')
        document.querySelector(`.pic.${arr[1].name}`).classList.remove('click')

      }

      click = 0;
      arr = []

    } else {

      // 將第二個按到的刪除
      // click也要改回成 1
      // 一個返回上一步的概念
      e.target.classList.remove('click')
      audio.play();
      arr.pop()
      click = 1
      return

    }
  }


})


// -----------------------------

const svgNs = 'http://www.w3.org/2000/svg';

function Svg (cx1, cy1, cx2, cy2, playerA, playerB) {
  this.x1 = cx1,
    this.y1 = cy1,
    this.x2 = cx2,
    this.y2 = cy2,
    this.playerA = playerA,
    this.playerB = playerB
}

Svg.prototype.createLine = function () {
  // let newSvg = document.createElement('svg'); // NG
  let svg = document.createElementNS(svgNs, 'svg');
  svg.setAttributeNS(null, 'class', 'stroke');
  // 為了做上一部的功能而設置的dataset
  svg.setAttributeNS(null, `data-${this.playerA.nodeName}`, `${this.playerA.name}`);
  svg.setAttributeNS(null, `data-${this.playerB.nodeName}`, `${this.playerB.name}`);
  // 線條 x:left , y:top
  const shape = document.createElementNS(svgNs, 'line');
  shape.setAttributeNS(null, 'x1', this.x1);
  shape.setAttributeNS(null, 'y1', this.y1);
  shape.setAttributeNS(null, 'x2', this.x2);
  shape.setAttributeNS(null, 'y2', this.y2);
  shape.setAttributeNS(null, 'stroke-width', '8');
  shape.setAttributeNS(null, 'stroke-linecap', 'round');

  svg.appendChild(shape)
  container.appendChild(svg)

  // 判斷有沒有連線成功
  if (this.playerA.name === this.playerB.name) {
    // console.log('連對了!')
    svg.setAttributeNS(null, 'class', 'stroke Success');

  } else {
    // console.log('連錯了QQ')
    svg.setAttributeNS(null, 'class', 'stroke NG');
  }

}


// =====================================
// 完成送出

btnFinish.addEventListener('click', e => {

  // 抓取目前有幾條線
  const currentLine = document.querySelectorAll('.stroke');

  if (currentLine.length !== 8) {
    text.innerText = '還沒連完(´･_･`)!!!'
    text.className = 'text show'
    setTimeout(() => {
      text.className = 'text'
    }, 1200)
    return
  }

  currentLine.forEach((item, index) => {
    if (item.classList.contains('NG')) {
      item.classList.add('red')
    } else {
      item.classList.add('green')
    }
  })

}, false)


// =====================================
// 返回

btnBack.addEventListener('click', e => {

  // 抓取目前有幾條線
  const currentLine = document.querySelectorAll('.stroke');

  if (!currentLine.length) {
    text.innerText = '還沒連完(´･_･`)!!!'
    text.innerText = '沒了，請向前邁進!!!'
    text.className = 'text show'
    setTimeout(() => {
      text.className = 'text'
    }, 1200)
    return
  }

  // 先前有特別在line上設置分別連線的圖片跟按鈕是誰
  const div = currentLine[currentLine.length - 1].dataset.DIV
  const btn = currentLine[currentLine.length - 1].dataset.BUTTON

  currentLine[currentLine.length - 1].remove()
  document.querySelector(`.pic.${div}`).classList.remove('disabled')
  document.querySelector(`.btn-${btn}`).classList.remove('disabled')

}, false)


// =====================================
// 重新開始

btnRestart.addEventListener('click', e => {

  playerList.innerHTML = ''
  playerBtnList.innerHTML = ''
  // 刪除全部SVG
  const currentLine = document.querySelectorAll('.stroke');
  currentLine.forEach(item => {
    item.remove()
  })

  playerTemp = []
  playerBtnTemp = []

  if (level === 'easy') {
    getPlayer('easy')
  } else {
    getPlayer('hard')
  }


})


// =====================================
// 到難的關卡

btnHard.addEventListener('click', e => {

  match.style = 'background: url(images/bg-hard.jpg)'
  container.className = 'container hard'
  btnGroup.className = 'btn-group hard'

  playerList.innerHTML = ''
  playerBtnList.innerHTML = ''
  // 刪除全部SVG
  const currentLine = document.querySelectorAll('.stroke');
  currentLine.forEach(item => {
    item.remove()
  })

  player = ['Andre_Iguodala', 'Andrew_Wiggins', 'Damion_Lee', 'Draymond_Green', 'Gary_Payton_II', 'Jonathan_Kuminga', 'Jordan_Poole', 'Juan_Toscano-Anderson', 'Kevon_Looney', 'Klay_Thompson', 'Moses_Moody', 'Stephen_Curry']

  playerTemp = []
  playerBtnTemp = []
  getPlayer('hard')

  level = 'hard'
})

// =====================================
// 到簡單的關卡

btnEasy.addEventListener('click', e => {

  match.style = 'background: url(images/bg.jpg)'
  container.className = 'container'
  btnGroup.className = 'btn-group easy'

  playerList.innerHTML = ''
  playerBtnList.innerHTML = ''
  
  // 刪除全部SVG
  const currentLine = document.querySelectorAll('.stroke');
  currentLine.forEach(item => {
    item.remove()
  })

  player = ['Andre_Iguodala', 'Andrew_Wiggins', 'Chris_Chiozza',
    'Damion_Lee', 'Draymond_Green', 'Gary_Payton_II', 'Jonathan_Kuminga',
    'Jordan_Poole', 'Juan_Toscano-Anderson', 'Kevon_Looney', 'Klay_Thompson',
    'Moses_Moody', 'Nemanja_Bjelica', 'Otto_Porter_Jr', 'Stephen_Curry']

  playerTemp = []
  playerBtnTemp = []
  getPlayer('easy')
  level = 'easy'

})


// =====================================
const saw = document.querySelector('.saw')
const sawH1 = document.querySelector('.saw h1')
const men = document.querySelector('.men')
const head = document.querySelector('.head')
const btnYes = document.querySelector('.btn-yes')
const btnNo = document.querySelector('.btn-no')
const circle = document.querySelector('.circle')
const eyeBrowLeft = document.querySelector('.eyeBrowLeft')
const eyeBrowRight = document.querySelector('.eyeBrowRight')
const foreheadTop = document.querySelector('.foreheadTop')
const mouth = document.querySelector('.mouth')
const mouthTop = document.querySelector('.mouthTop')
const openText = document.querySelector('.saw h1')
const openBtnGroup = document.querySelector('.saw .btnGroup')


btnYes.addEventListener('click', e => {
  men.style.top = '0px'
  openText.style.transform = 'scale(1)'
  circle.style.transform = 'scale(1)'
  openBtnGroup.style.transform = 'scale(1)'
  saw.classList.add('out')
  men.classList.add('out')
  circle.classList.add('out')
  openText.classList.add('out')
  openBtnGroup.classList.add('out')
  match.classList.add('show')
})


btnNo.addEventListener('click', e => {
  head.classList.remove('shake')
  eyeBrowLeft.classList.add('sad')
  eyeBrowRight.classList.add('sad')
  mouth.classList.remove('open')
  mouthTop.style='top:17.84vw'
  foreheadTop.classList.add('move')
  sawH1.innerText='Bye...'
  setTimeout(()=>{
    window.open("about:blank","_self").close()
  },800)
})