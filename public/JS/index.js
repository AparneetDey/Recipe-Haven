import { generateRecipe } from "./carts/recipe-cart.js";
import { generateTeaser } from "./carts/teaser-cart.js";
import { getRecipeTags } from "./carts/tag-cart.js";

generateRecipe();
generateTeaser();
getRecipeTags();

// Mobile menu handling
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const filter = document.querySelector('.filter');
const popularLinks = document.querySelector('.filter .popular-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

filter.addEventListener('click', () => {
    popularLinks.classList.toggle('active');
});

// Close the menu when clicking outside of it
document.addEventListener('click', (event) => {
    // If the click is outside the hamburger or menu, close the menu
    if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
        navLinks.classList.remove('active');
    }
    if (!filter.contains(event.target) && !popularLinks.contains(event.target)) {
        popularLinks.classList.remove('active');
    }
});

let pageLinks = Array.from(document.querySelectorAll('.nav-links li a'));
pageLinks.push(...document.querySelectorAll('.footer-links li a'));
const page = document.querySelectorAll('.page');

// Check if there is an active page in local storage
let activePage = sessionStorage.getItem('activePage') || 'home';
page.forEach(p => {
    if(p.getAttribute('id') === activePage) {
        p.style.display = 'flex';
        setTimeout(() => {
            p.classList.add('active');
        }, 20); // Slight delay to allow transition
    }
});

// Change the active page
pageLinks.forEach(link => {
    link.addEventListener('click', () => {
        const href = link.getAttribute('href');
        page.forEach(p => {
            p.classList.remove('active');
            setTimeout(() => {
                p.style.display = 'none';
            }, 100);
            if(href === p.getAttribute('id')) {
                setTimeout(() => {
                    p.style.display = 'flex';
                    setTimeout(() => {
                        p.classList.add('active');
                    }, 20); // Slight delay to allow transition
                }, 100);
                sessionStorage.setItem('activePage', href);
            }
        });
    });
});

//Focusing on the search field
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-icon');
searchBtn.addEventListener('click', () => {
    if(searchBar.innerHTML === '') {
        searchBar.focus();
    }
});