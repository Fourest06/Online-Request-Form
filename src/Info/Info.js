// Birthday can't be the future dates
document.getElementById('birthday').setAttribute('max', new Date().toISOString().split('T')[0]);

// Education logic
document.getElementById('level').addEventListener('change', function() {
    let gradeSelect = document.getElementById('grade');
    let strandSelect = document.getElementById('strand');
    let level = this.value;
    let gradeLabel = document.querySelector('label[for="grade"]');
    let strandLabel = document.querySelector('label[for="strand"]');

    gradeSelect.innerHTML = '';
    strandSelect.innerHTML = '';

    let defaultGradeOption = document.createElement('option');
    defaultGradeOption.value = '';
    defaultGradeOption.disabled = true;
    defaultGradeOption.selected = true;

    let defaultStrandOption = document.createElement('option');
    defaultStrandOption.value = '';
    defaultStrandOption.disabled = true;
    defaultStrandOption.selected = true;

    if (level === 'JHS (Junior High School)') {
        gradeLabel.textContent = 'Grade';
        defaultGradeOption.textContent = 'Select your grade';
        gradeSelect.appendChild(defaultGradeOption);

        for (let i = 7; i <= 10; i++) {
            let option = document.createElement('option');
            option.value = i;
            option.textContent = `Grade ${i}`;
            gradeSelect.appendChild(option);
        }

        strandLabel.textContent = 'Strand';
        defaultStrandOption.textContent = 'Select your strand';
        strandSelect.appendChild(defaultStrandOption);
        strandSelect.disabled = true;  
    } 
    else if (level === 'SHS (Senior High School)') {
        gradeLabel.textContent = 'Grade';
        defaultGradeOption.textContent = 'Select your grade';
        gradeSelect.appendChild(defaultGradeOption);

        for (let i = 11; i <= 12; i++) {
            let option = document.createElement('option');
            option.value = i;
            option.textContent = `Grade ${i}`;
            gradeSelect.appendChild(option);
        }

        strandLabel.textContent = 'Strand';
        defaultStrandOption.textContent = 'Select your strand';
        strandSelect.appendChild(defaultStrandOption);
        strandSelect.disabled = false; 

        const strands = ['ABM', 'STEM', 'HUMSS', 'ICT', 'TVL']; 
        strands.forEach(strand => {
            let option = document.createElement('option');
            option.value = strand.toLowerCase();
            option.textContent = strand;
            strandSelect.appendChild(option);
        });
    } 
    else if (level === 'College') {
        gradeLabel.textContent = 'Department';
        defaultGradeOption.textContent = 'Select your department';
        gradeSelect.appendChild(defaultGradeOption);

        strandLabel.textContent = 'Program';
        defaultStrandOption.textContent = 'Select your program';
        strandSelect.appendChild(defaultStrandOption);
        strandSelect.disabled = false;

        const departments = ['College of Teacher Education', 'College of Business', 'College of Computer Studies'];
        departments.forEach(dept => {
            let option = document.createElement('option');
            option.textContent = dept;
            gradeSelect.appendChild(option);
        });
    }

    gradeSelect.addEventListener('change', function () {
        strandSelect.innerHTML = '';
        strandSelect.appendChild(defaultStrandOption);

        if (level === 'JHS (Junior High School)') {
            strandSelect.disabled = true;  
        } else if (level === 'SHS (Senior High School)') {
            strandSelect.disabled = false; 
            const selectedGrade = gradeSelect.value;
            const strands = ['ABM', 'STEM', 'HUMSS', 'ICT', 'TVL']; 
            strands.forEach(strand => {
                let option = document.createElement('option');
                option.textContent = strand;
                strandSelect.appendChild(option);
            });
        } else if (level === 'College') {
            strandSelect.disabled = false;
            const selectedDepartment = gradeSelect.value;
            const programsByDepartment = {
                'College of Teacher Education': [
                    'Bachelor of Elementary Education', 
                    'Bachelor of Secondary Education Major in English', 
                    'Bachelor of Secondary Education Major in Filipino', 
                    'Bachelor of Secondary Education Major in Mathematics', 
                    'Bachelor of Secondary Education Major in Science', 
                    'Bachelor of Secondary Education Major in Social Studies', 
                    'Bachelor of Secondary Education Major in Values Education'
                ],
                'College of Business': [
                    'Bachelor of Science in Accountancy', 
                    'Bachelor of Science in Accounting Information Systems', 
                    'Bachelor of Science in Business Administration Major in Financial Management',
                    'Bachelor of Science in Business Administration Major in Human Resource Management'
                ],
                'College of Computer Studies': [
                    'Bachelor of Science in Information Systems'
                ]
            };

            const programs = programsByDepartment[selectedDepartment] || [];
            programs.forEach(program => {
                let option = document.createElement('option');
                option.textContent = program;
                strandSelect.appendChild(option);
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Retrieve stored values
    let storedLevel = localStorage.getItem("userLevel");
    let storedGrade = localStorage.getItem("userGrade");
    let storedStrand = localStorage.getItem("userStrand");

    // Set Level (JHS, SHS, College)
    if (storedLevel) {
        document.getElementById("level").value = storedLevel;
        document.getElementById("level").dispatchEvent(new Event("change")); // Trigger population of grade
    }

    // Set Grade (7-10, 11-12, Department)
    if (storedGrade) {
        setTimeout(() => {
            document.getElementById("grade").value = storedGrade;
            document.getElementById("grade").dispatchEvent(new Event("change")); // Trigger population of strand/program
        }, 100);
    }

    // Set Strand (SHS strands, College programs)
    if (storedStrand) {
        setTimeout(() => {
            document.getElementById("strand").value = storedStrand;
        }, 200);
    }
});


let globalName = "";
let globalAge = "";
let globalGender = "";
let globalBirthday = "";
let globalLevel = "";
let globalGrade = "";
let globalStrand = "";

document.getElementById('infoForm').addEventListener('submit', function(event) {
    event.preventDefault();  

    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');
    const genderError = document.getElementById('genderError');
    const birthday = document.getElementById('birthday').value.trim();
    const level = document.getElementById('level').value;
    const grade = document.getElementById('grade').value;
    const strand = document.getElementById('strand').value;
    const submitError = document.getElementById('submitError');
    let isValid = true;

    document.querySelectorAll('.error').forEach(element => {
        element.classList.remove('error');
    });

    // Name error
    if (!name) {
        document.getElementById('name').classList.add('error');
        isValid = false;
    }

    // Age error
    if (!age) {
        document.getElementById('age').classList.add('error');
        isValid = false;
    }

    // Gender error
    if (!gender) {
        genderError.innerText = "Gender is required";
        genderError.style.display = 'block';
        isValid = false;
    }
    else {
        genderError.style.display = 'none';
    }

    // Birthday error
    if (!birthday) {
        document.getElementById('birthday').classList.add('error');
        isValid = false;
    }

    // Level error
    if (!level) {
        document.getElementById('level').classList.add('error');
        isValid = false;
    }

    // Grade error
    if (!grade) {
        document.getElementById('grade').classList.add('error');
        isValid = false;
    }

    // Level error and strand error
    if (level === 'shs' && !strand) {
        document.getElementById('strand').classList.add('error');
        isValid = false;
    }
    else if (level === 'college' && !strand) {
        document.getElementById('strand').classList.add('error');
        isValid = false;
    }

    // Complete form
    if (isValid) {
        globalName = name;
        globalAge = age;
        globalGender = gender.value;
        globalBirthday = birthday;
        globalLevel = level;
        globalGrade = grade;
        globalStrand = strand

        localStorage.setItem("userName", globalName);
        localStorage.setItem("userAge", globalAge);
        localStorage.setItem("userGender", globalGender);
        localStorage.setItem("userBirthday", globalBirthday);
        localStorage.setItem("userLevel", globalLevel);
        localStorage.setItem("userGrade", globalGrade);
        localStorage.setItem("userStrand", globalStrand);
        
        window.location.href = "../Homepage/home.html"; 
        submitError.style.display = 'none';
    }
    else {
        submitError.innerText = "Please input all fields!";
        submitError.style.display = 'block';
    }
});