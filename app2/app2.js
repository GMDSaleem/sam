document.addEventListener('DOMContentLoaded', function() {
    const usersDropdown = document.getElementById('users');
    const useDropdown = document.getElementById('use');
    const workDropdown = document.getElementById('work');
    const stage1Input = document.getElementById('stage1');
    const stage2Input = document.getElementById('stage2');
    const stage3Input = document.getElementById('stage3');
    const stage4Input = document.getElementById('stage4');
    const resultDiv = document.getElementById('result');

    const userCosts = {
        5: { stage1: 10, stage2: 20, stage3: 30, stage4: 40 },
        10: { stage1: 15, stage2: 30, stage3: 45, stage4: 55 },
        50: { stage1: 20, stage2: 40, stage3: 50, stage4: 70 },

        100: { stage1: 10, stage2: 20, stage3: 30, stage4: 40 },
        200: { stage1: 15, stage2: 30, stage3: 45, stage4: 55 },
        300: { stage1: 50, stage2: 40, stage3: 50, stage4: 70 }


    };

    const scaleFactors = {
        1: 0.1,
        2: 0.9,
        5: 0.8,
        10: 0.8,
        15: 0.7,
        20: 0.6
    };

    function getScaleFactor(value) {
        const keys = Object.keys(scaleFactors).map(Number).sort((a, b) => a - b);
        if (scaleFactors[value] !== undefined) {
            return scaleFactors[value];
        } else {
            for (let i = keys.length - 1; i >= 0; i--) {
                if (value >= keys[i]) {
                    return scaleFactors[keys[i]];
                }
            }
        }
        return 0.1; // Default scale factor
    };
   

    function updateUsersOptions() {
        // Remove existing options
        usersDropdown.innerHTML = '';
        
        // Add a placeholder option
        const placeholderOption = document.createElement('option');
        placeholderOption.value = '';
        placeholderOption.textContent = 'Select Users';
        placeholderOption.disabled = true;
        placeholderOption.selected = true;
        usersDropdown.appendChild(placeholderOption);
    
        // Populate the dropdown based on the selection in the "Use" dropdown
        if (useDropdown.value === 'ex') {
            [100, 200, 300].forEach(optionValue => {
                const option = document.createElement('option');
                option.value = option.textContent = optionValue;
                usersDropdown.appendChild(option);
            });
        } else {
            [5, 10, 50].forEach(optionValue => {
                const option = document.createElement('option');
                option.value = option.textContent = optionValue;
                usersDropdown.appendChild(option);
            });
        }
    }
    

    function calculateTotal() {
        const users = parseInt(usersDropdown.value);
        const use = useDropdown.value === 'in' ? 1 : 0.5;
        const work = parseInt(workDropdown.value);
        const stage1 = parseInt(stage1Input.value);
        const stage2 = parseInt(stage2Input.value);
        const stage3 = parseInt(stage3Input.value);
        const stage4 = parseInt(stage4Input.value);

        const userStageCosts = userCosts[users] || userCosts[Object.keys(userCosts)[0]]; // Default to the first defined user cost if user selection is invalid

        const stage1Cost = userStageCosts.stage1 * stage1;
        const stage2Cost = userStageCosts.stage2 * stage2;
        const stage3Cost = userStageCosts.stage3 * stage3;
        const stage4Cost = userStageCosts.stage4 * stage4;

        const totalStageValue = stage1 + stage2 + stage3 + stage4; // Total of all stages to get the scale factor
        const scale = getScaleFactor(totalStageValue); // Use the scale factor based on the largest available value less than or equal to totalStageValue

        let totalCost = (stage1Cost + stage2Cost + stage3Cost + stage4Cost) * use * work * scale;

        resultDiv.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
    }

    // Call calculateTotal() initially to display the result
    calculateTotal();

    // Add event listeners to update the result whenever there's a change
    usersDropdown.addEventListener('change', calculateTotal);
    useDropdown.addEventListener('change', function() {
        updateUsersOptions();
        calculateTotal();
    });
    workDropdown.addEventListener('change', calculateTotal);
    stage1Input.addEventListener('input', calculateTotal);
    stage2Input.addEventListener('input', calculateTotal);
    stage3Input.addEventListener('input', calculateTotal);
    stage4Input.addEventListener('input', calculateTotal);
});
