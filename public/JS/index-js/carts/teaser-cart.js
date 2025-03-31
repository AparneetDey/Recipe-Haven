const recipes = [
    {
        name: "Butter Chicken",
        description: "A creamy and rich Indian dish made with marinated chicken cooked in a velvety tomato sauce infused with spices, butter, and cream."
    },
    {
        name: "Beef Wellington",
        description: "Tender beef filet coated with mushroom duxelles, wrapped in puff pastry, and baked to perfection."
    },
    {
        name: "Falafel Wrap",
        description: "Crispy fried falafel served in a soft pita or wrap with fresh vegetables, tangy tahini sauce, and pickles."
    },
    {
        name: "Sushi Rolls",
        description: "Delicate rolls of sushi rice filled with fresh seafood, avocado, and vegetables, wrapped in nori."
    },
    {
        name: "Eggplant Parmesan",
        description: "Layers of breaded and fried eggplant, marinara sauce, and melted mozzarella, baked until golden."
    },
    {
        name: "Shakshuka",
        description: "Poached eggs simmered in a spiced tomato sauce with bell peppers and onions."
    },
    {
        name: "Peking Duck",
        description: "Crispy-skinned roasted duck served with thin pancakes, hoisin sauce, and sliced scallions."
    },
    {
        name: "Key Lime Pie",
        description: "A tart and creamy pie made with fresh key lime juice, condensed milk, and a graham cracker crust."
    }
];

export function generateTeaser(teaserPage){
    let html = '<h2>Popular Recipes</h2>';

    recipes.forEach(item =>{
        html += `
            <div class="recipe-preview">
				<h3>${item.name}</h3>
				<p>${item.description}</p>
				<span class="read-more">More Info</span>
			</div>
        `;
    });

    teaserPage.innerHTML = html;
}