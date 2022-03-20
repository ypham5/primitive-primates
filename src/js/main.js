document.querySelector('.close').style.display = "none";
var menu = document.querySelector('#toggle');

menu.addEventListener('click', slidingNav);

function slidingNav() {
  console.log('checking');
  document.querySelector('header').classList.toggle('active-state');
  if (document.querySelector('header').classList.contains('active-state')) {
    document.querySelector('.close').style.display = "block";
    document.querySelector('.open').style.display = "none";
  } else {
    document.querySelector('.close').style.display = "none";
    document.querySelector('.open').style.display = "block";
  }
}