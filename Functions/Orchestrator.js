let get = new Date();
let intervals = [];

export function Protype(){

    const convert = (date) => { 
        let v = date.replace(/[/]/gi,'-').replace(' ','T').split('T');
        let dd = v[0].split('-');
        return Date.parse(dd[2]+'-'+dd[1]+'-'+dd[0]+'T'+v[1]);
    }

    const diff = (props) => {
        let curr = convert(new Date().toLocaleString(props.locale||"pt-br"));
        let old = convert(props.value);
        let difference = curr - old;
        if(props.type==="hour") return Math.floor(difference/1000/60/60);
        if(props.type==="minute") return Math.floor(difference/1000/60);
        if(props.type==="second") return Math.floor(difference/1000);
        if(props.type==="day") return Math.floor(difference/1000/60/60/24);
    }

    return { convert, diff }

}

export default function Main (props,callback,reload=false) {
    
    let getReload = get;

    if(reload)
        getReload = new Date();

    const dateNull = (getReload.getDate())+'/'+(getReload.getMonth()+1)+'/'+getReload.getFullYear();
    const hourNull = getReload.getHours()+':'+getReload.getMinutes()+':'+ getReload.getSeconds();

    const date = props.getStartDate ? props.getStartDate.split('/') : dateNull.split('/');
    const hour = props.getStartHour ? props.getStartHour.split(':') : hourNull.split(':');

    let getStart = new Date(
        (date[2]) ? Number(date[2]) : getReload.getFullYear(),
        (date[1]) ? Number(date[1])-1 : getReload.getMonth(),
        (date[0]) ? Number(date[0]) : getReload.getDate(),
        (hour[0]) ? Number(hour[0]) : getReload.getHours(),
        (hour[1]) ? Number(hour[1]) : getReload.getMinutes(),
        (hour[2]) ? Number(hour[2]) : getReload.getSeconds()
    ); 
    
    const New_Date = (ref) => {

        getStart = new Date(ref.next);

        const __prevDate = ref.prev;
        const __nextDate = getStart.toLocaleString(props.locale.toLowerCase());

        try {

            const tmsConvert = ( date ) => {
                const tmsConvert = Protype().convert( date );
                return new Date(tmsConvert).toLocaleDateString(props.locale, { weekday: 'long' });
            }
                
            const config = {
                _name: props.display || 'Nome indefinido',
                _prev:{
                    reference: __prevDate,
                    date: __prevDate.split(' ')[0]||"",
                    hour: __prevDate.split(' ')[1]||"",
                    week: tmsConvert(__prevDate),
                },
                _next:{
                    reference: __nextDate,
                    date: __nextDate.split(' ')[0]||"",
                    hour: __nextDate.split(' ')[1]||"",
                    week: tmsConvert(__nextDate),

                },

            }
            callback(config);
        }
        catch(error) {
            callback(error)
        }

        return getStart
    }
    
    if(intervals[props.display]){
        clearInterval(intervals[props.display]);
    }

    intervals[props.display] = setInterval(async ()=> {

        let a = Protype().diff({
           value:getStart.toLocaleString(props.locale.toLowerCase()),
           type:props.diff.toLowerCase(),
           locale:props.locale
        });

        if(a >= 0) {

            const prev = getStart.toLocaleString(props.locale);
            const interval = (!props.interval)?1:props.interval

            switch(props.diff.toLowerCase()){
                case "day": 
                    New_Date({prev,next:getStart.setDate(getStart.getDate()+interval)});
                break;

                case "hour": 
                    New_Date({prev,next:getStart.setHours(getStart.getHours()+interval)});
                break;

                case "minute": 
                    New_Date({prev,next:getStart.setMinutes(getStart.getMinutes()+interval)});
                break;

                case "second": 
                    New_Date({prev,next:getStart.setSeconds(getStart.getSeconds()+interval)});
                break;
            }

        }

    } , props.timer || 1000);

}

