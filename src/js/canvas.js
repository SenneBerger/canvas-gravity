import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
/*
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}
*/
// const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
/*
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})
*/
addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects



function Star(x, y, radius, color) {
  this.x = x
  this.y = y
  this.radius = radius
  this.color = color
  this.velocity = {
    x: (Math.random() - 0.5) * 25,
    y: 3
  }
  this.friction = 0.8
  this.gravity = 1
}

Star.prototype.draw = function() {
  c.beginPath()
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  c.fillStyle = `rgba(255, 255, 255, 1)`
  c.fill()
  c.closePath()
  c.shadowColor = 'white'
  c.shadowBlur = 10;
}

Star.prototype.update = function() {
  this.draw()

  //bounce off bottom
  if (this.y + this.radius + this.velocity.y > canvas.height) {
    this.velocity.y = -this.velocity.y * this.friction
    this.shatter()
  } else {
    this.velocity.y += this.gravity
  }

  this.y += this.velocity.y;
  this.x += this.velocity.x;

  if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
    this.velocity.x = -this.velocity.x;
  }

  this.x += this.velocity.x;

}

Star.prototype.shatter = function() {
  this.radius -= 2
  for (var i = 0; i < 8; i++) {
    miniStars.push(new MiniStar(this.x, this.y, 2))
  }
  console.log(miniStars);
}

function MiniStar(x, y, radius, color) {
  Star.call(this, x, y, radius, color, )
  this.velocity = {
    x: utils.randomIntFromRange(-10, 10),
    y: utils.randomIntFromRange(-32, 32)
  }
  this.friction = 0.8
  this.gravity = 1
  this.live = 100
  this.opac = 1
}
MiniStar.prototype.draw = function() {
  c.beginPath()
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  c.fillStyle = `rgba(255, 255, 255, ${this.opac})`
  c.fill()
  c.closePath()
  c.shadowColor = 'white'
  c.shadowBlur = 15;
}

MiniStar.prototype.update = function() {
  this.draw()

  //bounce off bottom
  if (this.y + this.radius + this.velocity.y > canvas.height) {
    this.velocity.y = -this.velocity.y * this.friction
  } else {
    this.velocity.y += this.gravity
  }
  this.x += this.velocity.x
  this.y += this.velocity.y
  this.live -= 1
  this.opac -= 1 / this.live
}
// Implementation
let stars
let miniStars
let moonStar
let backStars

function init() {
  stars = []
  miniStars = []
  moonStar = []
  backStars = []
  const x = Math.random() * canvas.width
  for (let i = 0; i < 8; i++) {
    const y = Math.random() * -850
    stars.push(new Star(x, y, 16, 'red'));
  }
  for (let i = 0; i < 1; i++) {
    const x = 20
    const y = 50
    const radius = Math.PI * 50
    c.shadowColor = 'white'
    c.shadowBlur = 100
    moonStar.push(new Star(x, y, radius, 'white'));
  }
  for (let i = 0; i < 250; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const radius = Math.random() * 2
    const color = `rgba(255, 255, 0, 0.3)`
    c.shadowColor = 'white'
    c.shadowBlur = 15
    backStars.push(new Star(x, y, radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)


  stars.forEach((star, index) => {
    star.update()
    if (star.radius == 0) {
      stars.splice(index, 1)
    }
  })

  miniStars.forEach((miniStar, index) => {
    miniStar.update()
    if (miniStar.live == 0) {
      miniStars.splice(index, 1)
    }
  });

  moonStar.forEach(moonStar => {
    moonStar.draw()
  })
  backStars.forEach((backStars, index) => {
    backStars.draw()
  })
}


init()
animate()
