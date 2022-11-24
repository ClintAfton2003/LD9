
const groupStars = document.querySelectorAll('.group');
const listFood = document.getElementById('list_food');
fetch('https://63762ab47e93bcb006c4d190.mockapi.io/FoodList')
     // fetch('https://6369c97228cd16bba72454be.mockapi.io/foods')


     .then((res) => res.json())
     .then((data) => {

          const rates = data.map((arr) => {
               const rateInt = parseInt(arr.rate.toString()[0]);
               console.log(data);
               return rateInt > 5 ? 5 : rateInt;
          });

          console.log(rates);
          console.log(groupStars.length);

          for (let i = 0; i < groupStars.length; i++) {
               console.log(rates[i]);

               const stars = Array.prototype.slice
                    .call(groupStars[i].children)
                    .slice(0, rates[i] === undefined ? 0 : rates[i]);

               stars.forEach((star) => star.classList.add('checked'));

               console.log(stars);
          }
     })
     .catch((err) => console.log(err));'
// Hellooo
