// Sélection de l'icône du menu et du menu lui-même
const menuIcon = document.getElementById('menuIcon');
const menuItem = document.getElementById('menuItem');

// Ajout d'un gestionnaire d'événement au clic sur l'icône du menu
menuIcon.addEventListener('click', function() {
    // Vérifie si le menu est visible ou caché
    if (menuItem.style.display === 'block') {
        // Si le menu est visible, le cache
        menuItem.style.display = 'none';
    } else {
        // Sinon, affiche le menu
        menuItem.style.display = 'block';
    }
});
