// Forecasts use a fixed Hualien city location; no user location is requested.
const weatherContent=document.querySelector('#weather-content');
const weatherRetry=document.querySelector('#weather-retry');
function weatherLabel(code){
  if(code===0)return '晴朗';
  if([1,2].includes(code))return '晴時多雲';
  if(code===3)return '陰天';
  if([45,48].includes(code))return '有霧';
  if([51,53,55,56,57].includes(code))return '毛毛雨';
  if([61,63,65,66,67].includes(code))return '有雨';
  if([71,73,75,77,85,86].includes(code))return '降雪';
  if([80,81,82].includes(code))return '陣雨';
  if([95,96,99].includes(code))return '雷雨';
  return '天氣資料未提供';
}
const weatherNumber=(value,unit)=>Number.isFinite(value)?Math.round(value)+unit:'未提供';
async function loadWeather(){
  weatherRetry.disabled=true;
  weatherContent.textContent='正在載入天氣資訊…';
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),10000);
  try{
    const params=new URLSearchParams({latitude:'23.975',longitude:'121.607',current:'temperature_2m,apparent_temperature,weather_code',daily:'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',timezone:'Asia/Taipei',forecast_days:'3'});
    const response=await fetch('https://api.open-meteo.com/v1/forecast?'+params,{signal:controller.signal});
    if(!response.ok)throw new Error('Weather unavailable');
    const data=await response.json();
    const {current,daily}=data;
    if(!current||!daily||!Array.isArray(daily.time)||daily.time.length!==3||!Number.isFinite(current.temperature_2m)||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(current.time))throw new Error('Incomplete weather data');
    const updated=new Intl.DateTimeFormat('zh-TW',{timeZone:'Asia/Taipei',month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(current.time+'+08:00'));
    const forecast=daily.time.map((date,i)=>{
      if(!/^\d{4}-\d{2}-\d{2}$/.test(date))throw new Error('Invalid forecast date');
      const label=new Intl.DateTimeFormat('zh-TW',{timeZone:'Asia/Taipei',month:'numeric',day:'numeric',weekday:'short'}).format(new Date(date+'T12:00:00+08:00'));
      return `<div class="weather-day"><strong>${i===0?'今天 · ':''}${label}</strong><span>${weatherLabel(daily.weather_code?.[i])}</span><span>${weatherNumber(daily.temperature_2m_min?.[i],'°')}–${weatherNumber(daily.temperature_2m_max?.[i],'°C')}</span><small>降雨機率 ${weatherNumber(daily.precipitation_probability_max?.[i],'%')}</small></div>`;
    }).join('');
    weatherContent.innerHTML=`<div class="weather-current"><strong>${weatherNumber(current.temperature_2m,'°C')}</strong><div>${weatherLabel(current.weather_code)}<small>體感 ${weatherNumber(current.apparent_temperature,'°C')} · 資料時間 ${updated}（台灣時間）</small></div></div><div class="weather-forecast">${forecast}</div>`;
  }catch{
    weatherContent.textContent='暫時無法取得天氣，請重新整理或查看氣象署預報。';
  }finally{
    clearTimeout(timeout);weatherRetry.disabled=false;
  }
}
weatherRetry.addEventListener('click',loadWeather);
loadWeather();
