const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
//https://6369c97228cd16bba72454be.mockapi.io/foods

// Get Elms
const btnShowAllFood = $('#menu .menu_bottom-btn.btn_see-more')
const btnShowLessFood = $('#menu .menu_bottom-btn.btn_see-less')
const menuCenter = $('#menu .menu_center')

const btnPrevSlider = $('.pageFood_slider .slider-container .slide-btn.prev')
const btnNextSlider = $('.pageFood_slider .slider-container .slide-btn.next')

const slides = $('.pageFood_slider .slider-container .slides')
const slideCotainer = $('.pageFood_slider .slider-container')

// GLB Variables
let lenghtFood;
let currentScollPosition = 0
const scrollAmount = 786
let maxScroll


//Func
const handleShowFood = (type) => {
     if (type === 'show') {
          menuCenter.classList.add('active')
          btnShowLessFood.classList.add('active')
          btnShowAllFood.classList.remove('active')
     } else if (type === 'hide') {
          btnShowLessFood.classList.remove('active')
          btnShowAllFood.classList.add('active')
     }
}

const renderStars = (number) => {
     const stars = document.createElement('div')
     for (let i = 0; i < 5; i++) {
          const star = document.createElement('span')
          star.classList.add('fa', 'fa-star')
          if (i < number) {
               star.classList.add('active')
          }
          stars.appendChild(star)
     }

     return stars.innerHTML
}

const hanldeMoveSlide = (val) => {
     currentScollPosition += (val * scrollAmount)
     if(currentScollPosition > 0) {
          currentScollPosition = maxScroll
     }
     if(currentScollPosition < maxScroll) {
          currentScollPosition = 0
     }
     slides.style.left = currentScollPosition + 'px'
}

// Fetch API
//Food Data
fetch('https://6369c97228cd16bba72454be.mockapi.io/foods')
     .then(res => res.json())
     .then(data => {
          data.forEach(food => {
               const foodItem = document.createElement('div')
               foodItem.classList.add('list_food')
               foodItem.innerHTML = `
                    <div class="list_food-img">
                         <img src=${food.thumbnail} alt="" />
                    </div>
                    <div class="food-desc">
                         <div id="Monney">
                              <h2>${food.name}</h2>
                              <h2>${food.price}đ</h2>
                         </div>
                         <p>${food.description}</p>
                         <br />
                         <div class="best">
                              <button id="Btn-plus">
                                   <i class="fa-solid fa-plus"></i>
                              </button>
                              <div class="group">
                                   ${renderStars(food.rate)}
                              </div>
                    </div>
               </div>
               `
               menuCenter.appendChild(foodItem)
          })
     })
     .catch(err => console.log(err))

// FeedBack Data
fetch('https://6369c97228cd16bba72454be.mockapi.io/foods')
     .then(res => res.json())
     .then(data => {
          lenghtFood = data.length
          data.forEach(feedBack => {
               const feedBackItem = document.createElement('div')
               feedBackItem.classList.add('slide-item')
               feedBackItem.innerHTML = `
                    <div class="feedback-content">
                         <img class="user-avt" alt="" src=${feedBack.thumbnail} />
                         <p class="user-feedback">${feedBack.description}</p> 
                         <div class="user-rate">
                              ${renderStars(feedBack.rate)}
                         </div>
                    </div>
                    <div class="user-info">
                         <h2 class="user-name">${feedBack.name}</h2>
                         <p class="user-job">${feedBack.price}</p>
                    </div>
               `
               slides.appendChild(feedBackItem)
               maxScroll = -(slides.offsetWidth - slideCotainer.offsetWidth + 10)
          })
     })
     .catch(err => console.log(err))


// DOM Events
btnShowAllFood.onclick = () => {
     handleShowFood('show')
}

btnShowLessFood.onclick = () => {
     menuCenter.classList.remove('active')
     setTimeout(() => {
          handleShowFood('hide')
     }, 400);
}

btnNextSlider.onclick = () => {
     hanldeMoveSlide(-1)
}

btnPrevSlider.onclick = () => {
     hanldeMoveSlide(1)
}