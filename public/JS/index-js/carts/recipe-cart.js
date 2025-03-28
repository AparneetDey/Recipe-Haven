const recipes = [
    {
        name: "Spaghetti Bolognese",
        image: "/Images/spaghetti.jpg",
        description: "A classic Italian pasta dish with a rich, slow-cooked meat sauce."
    },
    {
        name: "Chicken Tikka Masala",
        image: "/Images/chicken-tikka.jpg",
        description: "Marinated chicken in a creamy, spiced curry sauce."
    },
    {
        name: "French Onion Soup",
        image: "/Images/french-onion-soup.jpg",
        description: "Deeply caramelized onions in a rich beef broth topped with melted cheese."
    },
    {
        name: "Pad Thai",
        image: "/Images/pad-thai.jpg",
        description: "Stir-fried rice noodles with tofu, peanuts, eggs, and a tangy tamarind sauce."
    },
    {
        name: "Chocolate Lava Cake",
        image: "/Images/choco-lava.jpg",
        description: "Rich chocolate cake with a gooey molten center."
    },
    {
        name: "Caesar Salad",
        image: "/Images/caesar-salad.jpg",
        description: "Crisp romaine lettuce, Parmesan, croutons, and creamy Caesar dressing."
    },
    {
        name: "Japanese Ramen",
        image: "/Images/ramen.jpg",
        description: "Flavorful broth with noodles, soft-boiled eggs, and a variety of toppings."
    },
    {
        name: "Classic Cheeseburger",
        image: "/Images/burger.jpg",
        description: "Juicy beef patty with cheddar cheese, lettuce, tomato, and pickles in a toasted bun."
    },
    {
        name: "Beef Stroganoff",
        image: "/Images/beef-stroganoff.jpg",
        description: "Tender strips of beef cooked in a creamy mushroom sauce, served over egg noodles."
    }
];

export function generateRecipe(){
    const recipePage = document.querySelector('.recipe .recipe-cards');

    let html = '';
    recipes.forEach((item) =>{
        html += `
            <div class="card">
                <img loading="lazy" src=${item.image} alt=${item.name}>
                <h3>${item.name}</h3>
                <p>${item.description}
                </p>
                <span class="read-more">View Recipe</span>
            </div>
        `
    });

    recipePage.innerHTML = html;
}