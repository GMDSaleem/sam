function showApp(appId) {
    document.getElementById('category-selection').classList.add('hidden');
    document.getElementById('app1').classList.add('hidden');
    document.getElementById('app2').classList.add('hidden');
    document.getElementById(appId).classList.remove('hidden');
}

function showCategorySelection() {
    document.getElementById('category-selection').classList.remove('hidden');
    document.getElementById('app1').classList.add('hidden');
    document.getElementById('app2').classList.add('hidden');
}
