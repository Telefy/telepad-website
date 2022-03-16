function myTimer() {
  // console.log("---uuu---")
  let launchTime = new Date('2022-03-05T00:00:00');
  let currentLocalTime = new Date();
  let cDateMillisecs;
  let tDateMillisecs;
  let difference;
  let seconds;
  let minutes;
  let hours;
  let days;
  let estTimNow = new Date(currentLocalTime.toLocaleString('en-US', { timeZone: 'America/New_York' }))
  if (estTimNow.getTime() >= launchTime.getTime()) {

    let endTime1 = new Date('2022-03-20T00:00:00');
    let endTime2 = new Date('2022-04-10T00:00:00');
    let endTime3 = new Date('2022-04-26T00:00:00');
    let estTimNow = new Date(currentLocalTime.toLocaleString('en-US', { timeZone: 'America/New_York' }))
    

    if(endTime1.getTime() >= currentLocalTime.getTime()){
      
      tDateMillisecs = endTime1.getTime();
      document.getElementById('presaleContent').innerText = 'Pre-Sale Level 1 Ends in :';
      document.getElementById('presaleContent1').innerText = 'Pre-Sale Level 1 Ends in :';
      // document.getElementById('presaleContent2').innerText = 'Pre-Sale Level 1 Ends in :';
      
    } else if(endTime2.getTime() >= currentLocalTime.getTime()) {
      
      tDateMillisecs = endTime2.getTime();
      document.getElementById('presaleContent').innerText = 'Pre-Sale Level 2 Ends in :';
      document.getElementById('presaleContent1').innerText = 'Pre-Sale Level 2 Ends in :';
      // document.getElementById('presaleContent2').innerText = 'Pre-Sale Level 2 Ends in :';

    } else if(endTime3.getTime() >= currentLocalTime.getTime()) {

      tDateMillisecs = endTime3.getTime();
      document.getElementById('presaleContent').innerText = 'Pre-Sale Level 3 Ends in :';
      document.getElementById('presaleContent1').innerText = 'Pre-Sale Level 3 Ends in :';
      // document.getElementById('presaleContent2').innerText = 'Pre-Sale Level 3 Ends in :';

    }

    cDateMillisecs = estTimNow.getTime();
    difference = tDateMillisecs - cDateMillisecs;
    seconds = Math.floor(difference / 1000);
    
    minutes = Math.floor(seconds / 60);
    hours = Math.floor(minutes / 60);
    days = Math.floor(hours / 24);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('mins').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
    document.getElementById('days1').innerText = days;
    document.getElementById('hours1').innerText = hours;
    document.getElementById('mins1').innerText = minutes;
    document.getElementById('seconds1').innerText = seconds;
    // document.getElementById('days2').innerText = days;
    // document.getElementById('hours2').innerText = hours;
    // document.getElementById('mins2').innerText = minutes;
    // document.getElementById('seconds2').innerText = seconds;

  } else {

    cDateMillisecs = estTimNow.getTime();
    tDateMillisecs = launchTime.getTime();
    difference = tDateMillisecs - cDateMillisecs;
    seconds = Math.floor(difference / 1000);
    minutes = Math.floor(seconds / 60);
    hours = Math.floor(minutes / 60);
    days = Math.floor(hours / 24);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    document.getElementById('presaleContent').innerText = 'Pre-Sale Starts in :';
    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('mins').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
  }

  
  setTimeout(this.myTimer, 1000);
}
myTimer()