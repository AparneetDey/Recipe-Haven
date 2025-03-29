const recipeTags = [    
    // Cuisine Types
    'Italian',
    'Indian',
    'Chinese',
    'Mexican',
    'Mediterranean',
    'Japanese',
    'Thai',
    'American',
];

export function getRecipeTags(tagsContainer){
    let html = '';

    recipeTags.forEach(tag => {
        html += `<li><span class="tag">${tag}</span></li>`;
    });

    tagsContainer.innerHTML = html;
}

