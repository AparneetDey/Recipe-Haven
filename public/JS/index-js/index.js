import { generateRecipe } from "./carts/recipe-cart.js"
import { generateTeaser } from "./carts/teaser-cart.js";
import { getRecipeTags } from "./carts/tag-cart.js";

document.addEventListener("DOMContentLoaded", () => {
    applyFunction();
})

function applyFunction() {

    // Mobile menu handling
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close the menu when clicking outside of it
    document.addEventListener('click', (event) => {
        // If the click is outside the hamburger or menu, close the menu
        if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove('active');
        }
    });

    //delay on page loading
    const main = document.querySelector('.main');
    setTimeout(() => {
        if (main.classList.contains('active')) {
            main.classList.remove('active');
        }
        main.classList.add('active');
    }, 100);


    const teaserPage = document.querySelector('.popular .recipe-teasers');
    const recipePage = document.querySelector('.recipe .recipe-cards');
    const tagsContainer = document.querySelector('.popular-links');

    if (recipePage !== null) {
        generateRecipe(recipePage);
    }
    else if (teaserPage !== null) {
        generateTeaser(teaserPage);
    }
    else if (tagsContainer !== null) {
        getRecipeTags(tagsContainer);
    }

    try {
        //Focusing on the search field
        const searchBar = document.getElementById('search-bar');
        const searchBtn = document.getElementById('search-icon');
        searchBtn.addEventListener('click', () => {
            if (searchBar.innerHTML === '') {
                searchBar.focus();
            }
        });

        //search bar filter
        const filter = document.querySelector('.filter');
        const popularLinks = document.querySelector('.filter .popular-links');
        filter.addEventListener('click', () => {
            popularLinks.classList.toggle('active');
        });

        document.addEventListener('click', (event) => {
            // If the click is outside the filter, close the filter
            if (!filter.contains(event.target) && !popularLinks.contains(event.target)) {
                popularLinks.classList.remove('active');
            }
        });
    }
    catch(error){
        //pass
    }
    
}
