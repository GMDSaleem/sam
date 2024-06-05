const subcategories = {
    p: ['p1', 'p2', 'p3'],
    n: ['n1', 'n2', 'n3'],
    c: ['c1', 'c2', 'c3'],
    f: ['f1', 'f2', 'f3']
};

const securitiesValues = {
    '100': { p1: 25, p2: 25, p3: 25, n1: 25, n2: 25, n3: 25, c1: 25, c2: 25, c3: 25, f1: 25, f2: 25, f3: 25 },
    '100-200': { p1: 37, p2: 37, p3: 37, n1: 37, n2: 37, n3: 37, c1: 37, c2: 37, c3: 37, f1: 37, f2: 37, f3: 37 },
    '200+': { p1: 50, p2: 50, p3: 50, n1: 50, n2: 50, n3: 50, c1: 50, c2: 50, c3: 50, f1: 50, f2: 50, f3: 50 }
};

function updateSubcategory() {
    const category = document.getElementById('category').value;
    const subcategory = document.getElementById('subcategory');
    subcategory.innerHTML = '<option value="" selected disabled>Select Subcategory</option>';

    if (category) {
        subcategories[category].forEach(sub => {
            const option = document.createElement('option');
            option.value = sub;
            option.textContent = sub.toUpperCase();
            subcategory.appendChild(option);
        });
    }
    calculateResult();
}

function calculateResult() {
    const category = document.getElementById('category').value;
    const subcategory = document.getElementById('subcategory').value;
    const securities = document.getElementById('securities').value;
    const users = parseFloat(document.getElementById('users').value);

    if (category && subcategory && securities && users) {
        const baseValue = securitiesValues[securities][subcategory];
        const result = baseValue * users;
        document.getElementById('result-value').textContent = result.toFixed(2);
    } else {
        document.getElementById('result-value').textContent = '0';
    }
}

document.getElementById('category').addEventListener('change', updateSubcategory);
document.getElementById('subcategory').addEventListener('change', calculateResult);
document.getElementById('securities').addEventListener('change', calculateResult);
document.getElementById('users').addEventListener('change', calculateResult);
