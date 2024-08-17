document.addEventListener('DOMContentLoaded', function() {
    const startDate = dayjs('1991-05-30'); // Replace with the actual start date
    const container = document.getElementById('calendar-container');

    function generateCalendar(startDate) {
        const currentDate = dayjs(); // Get current date
        let date = startDate;
        let lastMonth = date.month();
        let lastYear = date.year();
        let blankDiv = document.createElement('div');
        
        //Adds appropriate blank divs so days line up correctly
        let dayNum = date.$d.getDay();
        for(let i = 0; i < dayNum; i++){
            let blankDiv = document.createElement('div');
            container.appendChild(blankDiv);
        }

        while (date.isBefore(currentDate, 'day') || date.isSame(currentDate, 'day')) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            dayDiv.setAttribute('data-month', date.month()); // Add data attribute for month

            dayDiv.innerHTML = `
                <span>${date.date()}</span>
                <div class="day-content"></div>
            `;

            //Month on 1st day of month
            if(date.$d.getDate() === 1){
                dayDiv.style.fontSize = '11.5px';
                dayDiv.innerHTML = `
                <span>${date.format('MMM')}</span><br/>
                <span>${date.format('YYYY')}</span>
                <div class="day-content"></div>
            `;
            }
            //Year Jan 1st
            if(date.$d.getMonth() === 0 && date.$d.getDate() === 1){
                dayDiv.style.fontSize = '11.5px';
                dayDiv.style.border = '3px gold solid'
            }
            if(date.$d.getMonth() === 11 && date.$d.getDate() === 25){
                dayDiv.style.color = 'green';
            }
            if(date.$d.getMonth() === 11 && date.$d.getDate() === 25){
                dayDiv.style.color = 'green';
            }
            if(date.$d.getMonth() === 1 && date.$d.getDate() === 29){
                dayDiv.style.opacity = '0.80';
            }
            if(date.$d.getMonth() === 6 && date.$d.getDate() === 4){
                dayDiv.style.color = 'blue';
            }
            //Birthday
            if(date.$d.getMonth() === startDate.$d.getMonth() && date.$d.getDate() === startDate.$d.getDate()){
                let age = date.$d.getYear()-startDate.$d.getYear();
                
                let ending = (age) => {
                    let statement;
                    let ageDigit = age.toString()[age.toString().length-1] * 1;
                    console.log(ageDigit);
                    switch(ageDigit){
                        case 0: 
                            statement = `${age}th`;
                            console.log('zero')
                        break;
                        case 1:
                            statement = `${age}st`;
                        break;
                        case 2: 
                            statement = `${age}nd`;
                            console.log('two')
                        break;
                        case 3: 
                            statement = `${age}rd`;
                            console.log('three')
                        break; 
                        default: statement = `${age}th`;
                    }
                    if(age === 0){
                        statement = 'OG';
                    }
                    console.log(statement)
                    return statement;
                }
                dayDiv.style.fontSize = '11.5px';
                dayDiv.style.border = 'dash red 3px';
                dayDiv.innerHTML = `
                <span>${ending(age)}</span><br/>
                <span>Bday</span>
                <div class="day-content"></div>
            `;
            }

            container.appendChild(dayDiv);
            date = date.add(1, 'day'); // Move to the next day

            function editDay(dayDiv, date) {
                    const contentDiv = dayDiv.querySelector('.day-content');
                    const content = prompt(`Edit content for ${date.format('YYYY-MM-DD')}:`, contentDiv.innerHTML);
                    if (content !== null) {
                        contentDiv.innerHTML = content;
                        dayDiv.classList.add('editable');
                    }
                }

            dayDiv.addEventListener('click', () => {
                editDay(dayDiv, date);
            });
        }
    }

    

    generateCalendar(startDate);
});
