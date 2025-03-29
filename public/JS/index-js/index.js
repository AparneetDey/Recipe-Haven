import { generateRecipe } from "./carts/recipe-cart.js"
import { generateTeaser } from "./carts/teaser-cart.js";
import { getRecipeTags } from "./carts/tag-cart.js";

document.addEventListener("DOMContentLoaded", () => {
    applyFunction();
})

function applyFunction() {
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
    else {
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
    }

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
        if (p.getAttribute('id') === activePage) {
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
                }, 10);
                if (href === p.getAttribute('id')) {
                    setTimeout(() => {
                        p.style.display = 'flex';
                        setTimeout(() => {
                            p.classList.add('active');
                        }, 5); // Slight delay to allow transition
                    }, 10);
                    sessionStorage.setItem('activePage', href);
                }
            });
        });
    });
}
